import React from 'react';
import './TrainingPlansPage.css'; // Reuse the same CSS file

const GearGuide = () => {
  return (
    <div className="training-plans">
      <header className="training-header">
        <h1>Essential Gear for Triathletes</h1>
        <p>Get the right equipment to train and race like a pro.</p>
      </header>

      <section className="training-info">
        <h2>Must-Have Gear</h2>
        <p>
          Having the proper gear can make training and racing safer, more comfortable, and more effective. Here’s what every triathlete needs:
        </p>
      </section>

      <section className="event-plans">
        <h2>Gear Checklist</h2>
        <div className="event-plan">
          <h3>Swimming</h3>
          <p>Wetsuit, goggles, swim cap, and optional paddles or pull buoys for training.</p>
        </div>
        <div className="event-plan">
          <h3>Cycling</h3>
          <p>Road bike or triathlon bike, helmet, cycling shoes, and repair kit (spare tube, CO2 inflator).</p>
        </div>
        <div className="event-plan">
          <h3>Running</h3>
          <p>Running shoes, moisture-wicking socks, and a comfortable race outfit.</p>
        </div>
        <div className="event-plan">
          <h3>Race Day</h3>
          <p>Transition bag, race belt, and nutrition (gels, chews, or drinks).</p>
        </div>
      </section>

      <footer className="training-footer">
        <p>Invest in quality gear and test everything during training to avoid surprises on race day.</p>
      </footer>
    </div>
  );
};

export default GearGuide;
