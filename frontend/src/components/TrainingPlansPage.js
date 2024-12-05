import React from 'react';
import './TrainingPlansPage.css';

const TrainingPlansPage = () => {
  const eventPlans = [
    {
      eventType: "Sprint Triathlon",
      description: "A beginner-friendly triathlon with shorter distances. Ideal for new athletes to get into the sport.",
      plan: [
        { day: "Monday", activity: "Rest or light stretching" },
        { day: "Tuesday", activity: "Swim 500m + Run 2km" },
        { day: "Wednesday", activity: "Bike 10km" },
        { day: "Thursday", activity: "Swim 750m" },
        { day: "Friday", activity: "Rest" },
        { day: "Saturday", activity: "Brick workout: Bike 15km + Run 5km" },
        { day: "Sunday", activity: "Long Bike 20km" },
      ],
    },
    {
      eventType: "Olympic Triathlon",
      description: "Intermediate triathlon with standard distances for those looking to push their limits.",
      plan: [
        { day: "Monday", activity: "Rest or yoga" },
        { day: "Tuesday", activity: "Swim 1km + Run 5km" },
        { day: "Wednesday", activity: "Bike 20km" },
        { day: "Thursday", activity: "Swim 1.5km" },
        { day: "Friday", activity: "Rest" },
        { day: "Saturday", activity: "Brick workout: Bike 30km + Run 10km" },
        { day: "Sunday", activity: "Long Bike 40km" },
      ],
    },
    {
      eventType: "Ironman Triathlon",
      description: "An advanced and grueling full-distance triathlon for seasoned athletes.",
      plan: [
        { day: "Monday", activity: "Rest or yoga" },
        { day: "Tuesday", activity: "Swim 2km + Run 10km" },
        { day: "Wednesday", activity: "Bike 50km" },
        { day: "Thursday", activity: "Swim 3km" },
        { day: "Friday", activity: "Rest" },
        { day: "Saturday", activity: "Brick workout: Bike 90km + Run 20km" },
        { day: "Sunday", activity: "Long Bike 120km" },
      ],
    },
  ];

  return (
    <div className="training-plans">
      <header className="training-header">
        <h1>Triathlon Training Plans</h1>
        <p>Comprehensive guides for all distances. Plan your path to success with confidence and structure.</p>
      </header>

      <section className="training-info">
        <h2>How Training Plans Work</h2>
        <p>
          A training plan is a structured approach to prepare for a triathlon. Each plan balances endurance,
          strength, and speed training with adequate recovery. By following a plan, you ensure gradual
          improvement without overtraining or burnout.
        </p>
        <ul>
          <li><strong>Rest Days:</strong> Essential for recovery and injury prevention.</li>
          <li><strong>Brick Workouts:</strong> Combine two disciplines, such as biking and running, to simulate race conditions.</li>
          <li><strong>Long Workouts:</strong> Build endurance for the longer distances in your event.</li>
        </ul>
      </section>

      <section className="event-plans">
        <h2>Event-Specific Training Plans</h2>
        {eventPlans.map((plan, index) => (
          <div key={index} className="event-plan">
            <h3>{plan.eventType}</h3>
            <p>{plan.description}</p>
            <div className="plan-calendar">
              {plan.plan.map((item, idx) => (
                <div key={idx} className="calendar-day">
                  <strong>{item.day}:</strong> {item.activity}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="resources">
        <h2>Additional Resources</h2>
        <ul>
          <li><a href="#nutrition-guide">Nutrition Tips for Training</a></li>
          <li><a href="#gear-guide">Essential Gear for Triathletes</a></li>
          <li><a href="#race-day-tips">Race Day Preparation Checklist</a></li>
        </ul>
      </section>

      <footer className="training-footer">
        <p>
          Consistency is key. Stay focused and committed to your plan, and you'll cross the finish line stronger than ever!
        </p>
      </footer>
    </div>
  );
};

export default TrainingPlansPage;
