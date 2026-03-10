import React, { useState, useEffect } from "react";

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

function isWrappedStillActive(endedAt) {
  if (!endedAt) return false;
  return Date.now() - endedAt < TWO_DAYS_MS;
}

export default function SemesterWrappedPopup({ Json, showSemesterWrapped, setShowSemesterWrapped }) {
  const [showWrap, setShowWrap] = useState(false);

  const latestSemester = Json?.semesterHistory?.at(-1);

  useEffect(() => {
    if (!latestSemester) return;
    setShowSemesterWrapped(isWrappedStillActive(latestSemester.endedAt));
  }, [Json?.semesterHistory]);

  if (!latestSemester) return null;

  const {
    semesterBudget,
    savingsGoal,
    totalSpent,
    totalRemaining,
  } = latestSemester.summary;

  const endedDate = new Date(latestSemester.endedAt).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      {/*Notification */}
      {showSemesterWrapped && (
        <div className="bg-blue-500 text-white w-xs p-2 text-sm text-center rounded-2xl fixed top-0
          right-100 translate-x-100 animate-fade-in-scale z-10">

          <i className="fa-regular fa-bell"></i>
          <p className="mt-1">
            Alert: Semester has ended. View your Semester Wrapped
          </p>

          <button
            onClick={() => setShowWrap(true)}
            className="rounded-xl bg-blue-700 p-2 mt-3 cursor-pointer text-sm"
          >
            Semester Wrapped
          </button>

          <button
            onClick={() => setShowSemesterWrapped(false)}
            className="absolute top-2 right-1"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

      {/* 🧾 Modal */}
      {showWrap && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 w-screen h-screen">
          <section className="w-[80%] relative bg-gray-100 rounded-xl sm:w-[50%] max-w-160 overflow-hidden">

            <button
              className="absolute top-2 right-1 cursor-pointer"
              onClick={() => setShowWrap(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <h1 className="text-center text-blue-500 text-2xl font-semibold mb-3">
              <i className="fa-solid fa-graduation-cap"></i>
              {" "}Semester Wrapped{" "}
              <i className="fa-solid fa-graduation-cap"></i>
            </h1>

            <div>
              <InfoCard text={`Your semester ended on ${endedDate}`} />
              <InfoCard text={`Semester Budget: $${semesterBudget}`} />
              <InfoCard text={`Total Spent: $${totalSpent}`} />
              <InfoCard text={`Total Saved: $${totalRemaining}`} />

              {savingsGoal > 0 && (
                <InfoCard text={`Savings Goal: $${savingsGoal}`} />
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

/* 🔹 Reusable Card */
function InfoCard({ text }) {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 
      p-4 rounded-lg text-white mx-3 mb-2 animate-fade-in-scale">
      <p>{text}</p>
    </div>
  );
}
