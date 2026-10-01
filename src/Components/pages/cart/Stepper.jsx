


function Stepper({ currentStep, steps }) {
  const totalSteps = steps.length;
  const progressPercent = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="relative px-6 select-none">
      {/* Background track line */}
      <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1.5 bg-app-hover rounded-full" />

      {/* Progress fill line: uses pure percentage without invalid inline calc syntax */}
      <div
        className="absolute top-1/2 left-6 -translate-y-1/2 h-1.5 bg-app-accent rounded-full transition-all duration-300 ease-out"
        style={{
          width: progressPercent === 0 ? "0px" : `calc(${progressPercent}% - ${(progressPercent * 48) / 100}px)`,
        }}
      />

      <div className="relative flex justify-between items-center z-10">
        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          const isDone = index < currentStep;

          return (
            <div key={step.title} className="relative group flex flex-col items-center">
              <div
                className={[
                  "w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-200",
                  "bg-app-card shadow-sm cursor-default",
                  isActive
                    ? "border-app-accent text-app-accent shadow-app-accent/20"
                    : "border-app-border text-app-muted",
                ].join(" ")}
              >
                {isDone ? (
                  <svg className="w-5 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.icon
                )}
              </div>

              <div className="absolute -bottom-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-app-hover text-app-text text-xs font-semibold py-1 px-2.5 rounded-md border border-app-border whitespace-nowrap shadow-lg z-20">
                {step.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



export default Stepper;