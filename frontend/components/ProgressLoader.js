import React, { useState, useEffect } from 'react';

const steps = [
  'Analyzing content...',
  'Extracting key insights...',
  'Summarizing main points...',
  'Formatting summary...',
  'Adding finishing touches...',
  'Reviewing for accuracy...',
  'Generating final report...',
  'Finalizing...'
];

const ProgressLoader = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration1 = 30 * 1000; 
    const totalDuration2 = 25 * 1000; 
    const increment1 = 89 / (totalDuration1 / 1000); 
    const increment2 = 8 / (totalDuration2 / 1000); 

    let timeout;

    const updateProgress = () => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) {
          clearInterval(timeout);
          timeout = setTimeout(() => {
            clearInterval(timeout);
            timeout = setInterval(() => {
              setProgress((prevProgress) => {
                if (prevProgress >= 99) {
                  clearInterval(timeout);
                  return 99;
                }
                return prevProgress + increment2;
              });
            }, 1000);
          }, 500);
          return 90;
        }
        return prevProgress + increment1;
      });
    };

    timeout = setInterval(updateProgress, 1000);

    return () => clearInterval(timeout);
  }, []);

  useEffect(() => {
    if (progress >= 90 && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [progress]);

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-200">{steps[currentStep]}</span>
        <span className="text-sm font-medium text-gray-200">{`${Math.round(progress)}%`}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressLoader;
