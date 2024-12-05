import React from 'react';
import './TrainingPlansPage.css'; // Reuse the same CSS file

const RaceDayPreparation = () => {
  return (
    <div className="training-plans">
      <header className="training-header">
        <h1>Race Day Preparation</h1>
        <p>Plan and prepare to ensure a smooth, stress-free race day.</p>
      </header>

      <section className="training-info">
        <h2>Pre-Race Checklist</h2>
        <p>
          A well-prepared race day starts the night before. Follow these steps to set yourself up for success:
        </p>
        <ul>
          <li>Lay out your gear and nutrition the night before.</li>
          <li>Double-check your bike and tire pressure.</li>
          <li>Review the race course and transition area layout.</li>
        </ul>
      </section>

      <section className="event-plans">
        <h2>Race Day Timeline</h2>
        <div className="event-plan">
          <h3>Morning of the Race</h3>
          <p>Eat a light breakfast 2-3 hours before the start. Examples: bagel with peanut butter or a banana with energy drink.</p>
        </div>
        <div className="event-plan">
          <h3>Transition Setup</h3>
          <p>Arrive early to set up your transition area with your gear organized for quick changes.</p>
        </div>
        <div className="event-plan">
          <h3>During the Race</h3>
          <p>Stay hydrated, pace yourself, and stick to your nutrition plan. Most importantly, enjoy the experience!</p>
        </div>
      </section>

      <footer className="training-footer">
        <p>With preparation and focus, race day will be an incredible achievement. You've got this!</p>
      </footer>
    </div>
  );
};

export default RaceDayPreparation;
