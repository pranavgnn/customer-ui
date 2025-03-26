import React from "react";

export interface Step {
  name: string;
  status: "complete" | "current" | "upcoming";
}

interface ProgressIndicatorProps {
  steps: Step[];
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  className = "",
}) => {
  return (
    <div className={`w-full py-2 ${className}`}>
      {/* Mobile Progress Indicator (pill style) */}
      <div className="sm:hidden mb-1">
        <div className="text-xs text-neutral-500 flex justify-between mb-2">
          <span>
            Step {steps.findIndex((step) => step.status === "current") + 1} of{" "}
            {steps.length}
          </span>
          <span>{steps.find((step) => step.status === "current")?.name}</span>
        </div>
        <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${
                ((steps.findIndex((step) => step.status === "current") + 1) /
                  steps.length) *
                100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Desktop Progress Indicator */}
      <div className="hidden sm:flex items-center gap-1">
        <div className="flex-1 flex">
          {steps.map((step, index) => (
            <React.Fragment key={step.name}>
              {/* Step circle */}
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    step.status === "complete"
                      ? "bg-primary-500"
                      : step.status === "current"
                      ? "ring-2 ring-primary-500 bg-primary-500"
                      : "bg-neutral-300"
                  }`}
                />

                {/* Step label - only show for current and completed steps */}
                <div
                  className={`
                    absolute top-5 text-xs font-medium whitespace-nowrap transition-opacity duration-200
                    ${
                      step.status === "upcoming"
                        ? "text-neutral-400"
                        : "text-neutral-600"
                    }
                    ${
                      index === 0
                        ? "left-0"
                        : index === steps.length - 1
                        ? "right-0"
                        : ""
                    }
                  `}
                  style={{
                    transform:
                      index === 0
                        ? "none"
                        : index === steps.length - 1
                        ? "none"
                        : "translateX(-50%)",
                    left:
                      index === 0
                        ? 0
                        : index === steps.length - 1
                        ? "auto"
                        : "50%",
                  }}
                >
                  {step.name}
                </div>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-[2px] mx-1">
                  <div
                    className={`h-full ${
                      step.status === "complete"
                        ? "bg-primary-500"
                        : "bg-neutral-300"
                    } transition-colors duration-300`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
