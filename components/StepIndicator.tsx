import React from 'react';
import { AppStep } from '../types';

interface StepIndicatorProps {
  currentStep: AppStep;
}

const steps = [
  { id: AppStep.GENERATE_IMAGE, title: 'Design' },
  { id: AppStep.GENERATE_METADATA, title: 'Describe' },
  { id: AppStep.SET_PRICE, title: 'Price & Launch' },
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.title} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20 flex-1' : ''}`}>
            {step.id < currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-brand-primary" />
                </div>
                <div className="relative flex h-9 w-9 items-center justify-center bg-brand-primary rounded-full">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                  </svg>
                </div>
              </>
            ) : step.id === currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-700" />
                </div>
                <div className="relative flex h-9 w-9 items-center justify-center bg-brand-surface rounded-full border-2 border-brand-primary">
                  <span className="h-2.5 w-2.5 bg-brand-primary rounded-full" aria-hidden="true" />
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-700" />
                </div>
                <div className="relative flex h-9 w-9 items-center justify-center bg-brand-surface rounded-full border-2 border-gray-600">
                </div>
              </>
            )}
             <span className="absolute -bottom-6 text-xs font-semibold text-center w-full left-1/2 -translate-x-1/2 whitespace-nowrap text-gray-300">
                {step.title}
             </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepIndicator;