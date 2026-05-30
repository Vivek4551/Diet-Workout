import { useState } from "react";
import DietPage from "./pages/DietPage.jsx";
import WorkoutPage from "./pages/WorkoutPage.jsx";

export default function App() {
  const [activePage, setActivePage] = useState("main");

  const isSubpage = activePage !== "main";

  return (
    <div className={`app-shell${isSubpage ? " app-shell--subpage" : ""}`}>
      <div className={`app-card main-card${isSubpage ? " main-card--subpage" : ""}`}>
        {!isSubpage && (
          <header className="hero">
            <div>
              <p className="eyebrow">Diet & Workout</p>
              <h1>Choose Your Plan</h1>
              <p className="hero-copy">
                Start from a single screen and switch between the Diet plan and
                the Workout plan instantly.
              </p>
            </div>
            <div className="hero-icon">💪</div>
          </header>
        )}

        <div className={`page-panel${isSubpage ? " page-panel--subpage" : ""}`}>
          {activePage === "main" ? (
            <div className="main-select">
              <p className="main-copy">
                Tap one of the cards below to open the Diet or Workout page.
              </p>
              <div className="options-grid">
                <button
                  className="option-card diet"
                  onClick={() => setActivePage("diet")}
                >
                  <span className="option-title">Diet</span>
                  <p>
                    View the full diet plan with calories, schedule, and meal
                    samples.
                  </p>
                </button>
                <button
                  className="option-card workout"
                  onClick={() => setActivePage("workout")}
                >
                  <span className="option-title">Workout</span>
                  <p>View the workout split, daily focus, and sample routine.</p>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="top-bar">
                <button
                  className="back-button"
                  onClick={() => setActivePage("main")}
                >
                  ← Back
                </button>
                <span className="active-label">
                  {activePage === "diet" ? "Diet Plan" : "Workout Plan"}
                </span>
              </div>
              {activePage === "diet" && <DietPage />}
              {activePage === "workout" && <WorkoutPage />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
