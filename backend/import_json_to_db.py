import json
from app import db, Equipment, app

# Load JSON data for competitive cyclist
with open('competitivecyclist.json', 'r') as f:
    competitive_data = json.load(f)

# Load JSON data for triathlete sports
with open('triathletesports.json', 'r') as f:
    triathlete_data = json.load(f)

def insert_equipment_data(data, source):
    for category, items in data.items():
        for item in items:
            # Create a new Equipment object
            equipment = Equipment(
                brand=item.get("Brand"),
                name=item.get("Name"),
                link=item.get("Link"),
                price=item.get("Price"),
                details="\n".join(item.get("Details", [])),
                image_url=item.get("Image_URL"),
                tech_specs=json.dumps(item.get("Tech_Specs", {})),  # Store tech specs as JSON
                category=category.split(":")[0],  # Extract category from key like "road_bikes : 1"
                source=source
            )
            # Add to session and commit
            db.session.add(equipment)
    db.session.commit()

# Insert competitive cyclist data
with app.app_context():
    insert_equipment_data(competitive_data, "Competitive Cyclist")

# Insert triathlete sports data
with app.app_context():
    insert_equipment_data(triathlete_data, "Triathlete Sports")
