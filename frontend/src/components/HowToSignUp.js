// src/components/HowToSignUp.js
import React, { useState } from 'react';
import './HowToSignUp.css';

const HowToSignUp = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [gearChecklist, setGearChecklist] = useState({
    swim: false,
    bike: false,
    run: false,
    nutrition: false
  });
  const [progress, setProgress] = useState(0);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setProgress(50);  // Move to 50% progress when type is selected
  };

  const handleChecklistChange = (item) => {
    setGearChecklist({ ...gearChecklist, [item]: !gearChecklist[item] });
    if (!gearChecklist[item]) setProgress(progress + 10);  // Increase progress for each checklist item
  };

  const renderRaceTips = () => {
    switch (selectedType) {
      case "Sprint":
        return "Sprint Triathlon: Focus on shorter, balanced training sessions across swim, bike, and run.";
      case "Olympic":
        return "Olympic Triathlon: Train for endurance with a moderate weekly routine.";
      case "Half Ironman":
        return "Half Ironman: Requires strong endurance. Practice long-distance and pacing.";
      case "Ironman":
        return "Ironman: Elite training with dedicated endurance, pacing, and nutrition.";
      default:
        return "Choose a race type to see specific tips.";
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">How to Sign Up for a Triathlon</h1>

      <div className="progress-tracker">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <p className="progress-text">Progress: {progress}%</p>
      </div>

      {/* Step 1: Choose a Triathlon Type */}
      <section className="step-section">
        <h2>Step 1: Choose Your Triathlon Type</h2>
        <p>Select a race type for customized tips and requirements:</p>
        <div className="race-selector">
          {["Sprint", "Olympic", "Half Ironman", "Ironman"].map((type) => (
            <div
              key={type}
              className={`race-card ${selectedType === type ? 'selected' : ''}`}
              onClick={() => handleTypeSelect(type)}
            >
              <h3>{type}</h3>
              {selectedType === type && (
                <p className="race-details">{renderRaceTips()}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Step 2: Register for the Event */}
      {selectedType && (
        <section className="step-section">
          <h2>Step 2: Register for the Event</h2>
          <p>
            Visit <a href="https://www.active.com" target="_blank" rel="noopener noreferrer">Active.com</a> or <a href="https://www.ironman.com" target="_blank" rel="noopener noreferrer">Ironman</a> to find and register for events. Register early to secure your spot!
          </p>
        </section>
      )}
      
      {/* Step 3: Gear Checklist */}
      {progress >= 50 && (
        <section className="step-section">
          <h2>Step 3: Gather Essential Gear</h2>
          <p>Check off each item as you prepare:</p>
          <ul className="checklist">
            {Object.keys(gearChecklist).map((item) => (
              <li key={item} onClick={() => handleChecklistChange(item)}>
                <input
                  type="checkbox"
                  checked={gearChecklist[item]}
                  onChange={() => handleChecklistChange(item)}
                />
                <span className={`checklist-item ${gearChecklist[item] ? "checked" : ""}`}>
                  {item.charAt(0).toUpperCase() + item.slice(1)} Gear
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Step 4: Training Plan */}
      {progress >= 70 && (
        <section className="step-section training-panel">
          <h2>Step 4: Prepare for Race Day</h2>
          <p>Here’s a suggested training plan based on your race type:</p>
          {selectedType ? (
            <>
              <h3>{selectedType} Training Plan</h3>
              <ul>
                {selectedType === "Sprint" && <li>8 weeks with a focus on balance across all disciplines.</li>}
                {selectedType === "Olympic" && <li>12-week plan with endurance training.</li>}
                {selectedType === "Half Ironman" && <li>16-week plan focusing on endurance and nutrition.</li>}
                {selectedType === "Ironman" && <li>24-week plan with dedicated pacing and recovery.</li>}
              </ul>
            </>
          ) : (
            <p>Select a race type to view a tailored training plan.</p>
          )}
        </section>
      )}

      {/* FAQ Section */}
      {progress >= 90 && (
        <section className="step-section faq-section">
          <h2>FAQs</h2>
          <details>
            <summary>What should I wear during a triathlon?</summary>
            <p>A tri-suit is recommended for smooth transitions between swim, bike, and run stages.</p>
          </details>
          <details>
            <summary>Can beginners try an Ironman?</summary>
            <p>Yes, but extensive training is required. Consult a coach for a structured plan.</p>
          </details>
          <details>
            <summary>How should I fuel during the race?</summary>
            <p>Refuel every 45-60 minutes with electrolytes and snacks for energy.</p>
          </details>
        </section>
      )}
    </div>
  );
};

export default HowToSignUp;
