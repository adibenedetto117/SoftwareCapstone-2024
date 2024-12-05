import React from 'react';
import './TrainingPlansPage.css'; // Reuse the same CSS file

const NutritionGuide = () => {
  return (
    <div className="training-plans">
      <header className="training-header">
        <h1>Nutrition Guide for Triathletes</h1>
        <p>Fuel your body for optimal performance, from training to race day.</p>
      </header>

      <section className="training-info">
        <h2>Why Nutrition Matters</h2>
        <p>
          Proper nutrition is key to sustaining energy, enhancing recovery, and maximizing performance during triathlon training and racing. 
          A balanced diet tailored to your needs ensures you're ready to tackle each workout and cross the finish line strong.
        </p>
      </section>

      <section className="event-plans">
        <h2>Nutrition Tips</h2>
        <div className="event-plan">
          <h3>Pre-Workout</h3>
          <p>Consume a small meal with carbs and protein 2-3 hours before training. Examples: oatmeal with fruit or a banana with peanut butter.</p>
        </div>
        <div className="event-plan">
          <h3>During Training</h3>
          <p>For workouts longer than an hour, aim for 30-60 grams of carbs per hour. Options: sports drinks, gels, or energy chews.</p>
        </div>
        <div className="event-plan">
          <h3>Post-Workout</h3>
          <p>Refuel with a mix of protein and carbs within 30 minutes of finishing. Examples: protein shake with a banana or grilled chicken with rice.</p>
        </div>
      </section>

      <footer className="training-footer">
        <p>Listen to your body and test your nutrition strategy during training to ensure success on race day.</p>
      </footer>
    </div>
  );
};

export default NutritionGuide;
