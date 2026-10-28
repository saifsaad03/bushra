import React from 'react';
import { Heart, Activity, CheckCircle, Sparkles } from 'lucide-react';

export function JourneyTimeline({ journey }) {
  const percent = Math.min(Math.max(journey?.currentPercentage || 20, 0), 100);

  return (
    <section className="journey-section" id="journey">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Medical Roadmap</span>
          <h2 className="section-title">{journey.heading}</h2>
          <p className="section-subtitle">{journey.subheading} · 5-Year Curriculum</p>
        </div>

        {/* Visual Progress Dashboard Card */}
        <div className="journey-visual-card">
          <div className="journey-header-flex">
            <div>
              <span className="journey-current-badge">
                <Sparkles size={14} />
                <span>{journey.currentYearLabel || "Year 02 · In Progress"}</span>
              </span>
              <h3 className="journey-stage-title">Road to Graduation & Hippocratic Oath</h3>
              <p className="journey-note">{journey.statusNote || "Phase I Completed · Stepping into Clinical Curiosity"}</p>
            </div>

            {/* Big Circular / Radial Percentage Highlight */}
            <div className="journey-percent-bubble">
              <span className="journey-percent-number">{percent}%</span>
              <span className="journey-percent-lbl">Completed</span>
            </div>
          </div>

          {/* Animated Smooth Progress Track */}
          <div className="progress-track-wrapper">
            <div className="progress-track-bar">
              <div
                className="progress-fill-active"
                style={{ width: `${percent}%` }}
              >
                <div className="progress-steth-thumb" title={`${percent}% Completed`}>
                  🩺
                </div>
              </div>
            </div>
          </div>

          {/* 5 Milestone Step Nodes (Year 1 to 5) */}
          <div className="milestones-stepper-grid">
            {(journey.stages || []).map((stg, idx) => {
              const isPast = percent >= stg.percent;
              const isCurrent = percent >= (stg.percent - 20) && percent < stg.percent;

              return (
                <div
                  key={idx}
                  className={`milestone-step-item ${isPast ? 'completed' : ''} ${isCurrent ? 'active' : ''}`}
                >
                  <div className="milestone-step-dot">
                    {isPast ? <CheckCircle size={14} /> : <span>{stg.percent}%</span>}
                  </div>
                  <div className="milestone-step-text">
                    <strong>{stg.year}</strong>
                    <span>{stg.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Understated bottom reflection */}
          <div className="journey-bottom-quote">
            <Activity size={16} color="var(--accent-primary)" />
            <span>“Every hour in the library and lab brings me one step closer to healing lives.”</span>
          </div>
        </div>
      </div>
    </section>
  );
}
