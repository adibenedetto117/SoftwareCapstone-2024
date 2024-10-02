from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dummy data for equipment prices
price_data = [
    {
        "id": 1,
        "name": "Road Bike",
        "options": [
            {"site": "Amazon", "price": "$899", "link": "https://www.amazon.com/road-bike"},
            {"site": "Walmart", "price": "$850", "link": "https://www.walmart.com/road-bike"},
            {"site": "Local Bike Shop", "price": "$920", "link": "https://localbikeshop.com/road-bike"},
        ],
    },
    {
        "id": 2,
        "name": "Triathlon Suit",
        "options": [
            {"site": "Amazon", "price": "$99", "link": "https://www.amazon.com/tri-suit"},
            {"site": "Ebay", "price": "$85", "link": "https://www.ebay.com/tri-suit"},
            {"site": "Wiggle", "price": "$95", "link": "https://www.wiggle.com/tri-suit"},
        ],
    },
]

# Dummy data for timeline tasks
timeline_data = [
    {"week": "12-16 Weeks Before", "task": "Start your training with a focus on building endurance. Swim, bike, and run 3 times a week."},
    {"week": "8-12 Weeks Before", "task": "Increase training frequency. Practice combining two disciplines (bike-run, swim-bike)."},
    {"week": "4-8 Weeks Before", "task": "Focus on brick workouts (back-to-back training of two disciplines)."},
    {"week": "2-4 Weeks Before", "task": "Simulate race conditions. Participate in local sprint triathlons or train at full intensity."},
    {"week": "1 Week Before", "task": "Taper down your training. Focus on rest and light activity to avoid fatigue."},
    {"week": "Race Day", "task": "Stay hydrated, follow your nutrition plan, and most importantly, enjoy the experience!"},
]

# Dummy data for training tips
training_tips_data = [
    {"title": "Swimming Tips", "content": "Focus on breathing techniques. Practice bilateral breathing (breathing on both sides)."},
    {"title": "Cycling Tips", "content": "Maintain a steady cadence of 80-90 RPM. Practice transitioning from biking to running."},
    {"title": "Running Tips", "content": "Shorten your stride and maintain a steady pace after the bike leg. Train on tired legs to simulate race conditions."},
    {"title": "Nutrition", "content": "Test your race nutrition plan during long training sessions to avoid surprises."},
    {"title": "Rest & Recovery", "content": "Incorporate rest days into your training plan. Muscles need time to recover and grow."},
]

# Separate API routes for each data type
@app.route('/api/prices', methods=['GET'])
def get_prices():
    return jsonify(price_data)

@app.route('/api/timeline', methods=['GET'])
def get_timeline():
    return jsonify(timeline_data)

@app.route('/api/training-tips', methods=['GET'])
def get_training_tips():
    return jsonify(training_tips_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
