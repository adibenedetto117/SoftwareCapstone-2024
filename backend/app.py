from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Set up SQLite database
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this to a secure key in production

db = SQLAlchemy(app)
migrate = Migrate(app, db)  # Initialize Flask-Migrate
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

class Equipment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    link = db.Column(db.String(500))
    price = db.Column(db.Float)
    details = db.Column(db.Text)  # Store the details as a single large text field
    image_url = db.Column(db.String(500))
    tech_specs = db.Column(db.Text)  # Store technical specs as JSON string
    category = db.Column(db.String(100))  # E.g., road_bikes, swim
    source = db.Column(db.String(100))


class Selection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    equipment_id = db.Column(db.Integer, db.ForeignKey('equipment.id'), nullable=False)

# Make sure to add the relationship in User model
User.selections = db.relationship('Selection', backref='user', lazy=True)
Equipment.selections = db.relationship('Selection', backref='equipment', lazy=True)

@app.route('/api/selection', methods=['POST'])
@jwt_required()
def add_to_selection():
    data = request.get_json()
    user_id = get_jwt_identity()
    new_selection = Selection(user_id=user_id, equipment_id=data['equipment_id'])
    db.session.add(new_selection)
    db.session.commit()
    return jsonify({"message": "Item added to selection"}), 201

@app.route('/api/selection', methods=['GET'])
@jwt_required()
def get_selection():
    user_id = get_jwt_identity()
    selections = Selection.query.filter_by(user_id=user_id).all()
    
    equipment_data = []
    for selection in selections:
        equipment = Equipment.query.get(selection.equipment_id)
        if equipment:
            equipment_data.append({
                'id': equipment.id,
                'name': equipment.name,
                'brand': equipment.brand,
                'price': equipment.price,
                'image_url': equipment.image_url
            })
    
    return jsonify(equipment_data)



@app.route('/api/selection/<int:item_id>', methods=['DELETE'])
@jwt_required()
def remove_from_selection(item_id):
    user_id = get_jwt_identity()

    # Fetch all selections for the current user and print them
    user_selections = Selection.query.filter_by(user_id=user_id).all()
    available_ids = [selection.id for selection in user_selections]
    print("Available selection IDs for the user:", available_ids)  # Print all available selection IDs

    # Attempt to find the specific item to delete
    selection_item = Selection.query.get(item_id)
    if not selection_item or selection_item.user_id != user_id:
        print("Requested selection ID to delete not found or not owned by user:", item_id)
        return jsonify({"error": "Item not found"}), 404

    # Proceed to delete if found
    db.session.delete(selection_item)
    db.session.commit()
    print(f"Deleted selection item with ID: {item_id}")

    return jsonify({"message": "Item removed from selection"}), 200



# Routes for user authentication
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.username)
        return jsonify(access_token=access_token)
    return jsonify({"error": "Invalid credentials"}), 401

# Route to get equipment data (protected)
import json

@app.route('/api/equipment', methods=['GET'])
def get_equipment():
    page = request.args.get('page', 1, type=int)
    per_page = 20
    search = request.args.get('search', '')  # Get the search term
    category = request.args.get('category', 'all')  # Get category filter
    min_price = request.args.get('min_price', type=float, default=0)
    max_price = request.args.get('max_price', type=float, default=float('inf'))

    # Base query
    query = Equipment.query

    # Search by name
    if search:
        query = query.filter(Equipment.name.ilike(f'%{search}%'))

    # Filter by category
    if category != 'all':
        query = query.filter(Equipment.category == category)

    # Filter by price range
    query = query.filter(Equipment.price >= min_price, Equipment.price <= max_price)

    # Paginate the query
    equipment_pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    
    equipment = equipment_pagination.items  # Get equipment for the current page
    total_items = equipment_pagination.total  # Total number of items
    total_pages = equipment_pagination.pages  # Total number of pages
    
    return jsonify({
        'equipment': [{
            'id': item.id,
            'brand': item.brand,
            'name': item.name,
            'price': item.price,
            'image_url': item.image_url,
            'category': item.category,
            'details': item.details,
            'tech_specs': json.loads(item.tech_specs) if item.tech_specs else {},  # Ensure it's JSON
            'link': item.link
        } for item in equipment],
        'total_items': total_items,
        'total_pages': total_pages
    })


with app.app_context():
    db.create_all()


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
