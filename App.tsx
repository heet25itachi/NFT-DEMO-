
import React, { useState } from 'react';
import { NftData, AppStep } from './types';
import StepIndicator from './components/StepIndicator';
import Step1GenerateImage from './components/Step1GenerateImage';
import Step2GenerateMetadata from './components/Step2GenerateMetadata';
import Step3LaunchSuccess from './components/Step3LaunchSuccess';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.GENERATE_IMAGE);
  const [nftData, setNftData] = useState<NftData>({
    prompt: '',
    imageUrl: null,
    metadata: null,
  });
  const [error, setError] = useState<string | null>(null);

  const handleReset = () => {
    setNftData({ prompt: '', imageUrl: null, metadata: null });
    setStep(AppStep.GENERATE_IMAGE);
    setError(null);
  };

  const renderStep = () => {
    switch (step) {
      case AppStep.GENERATE_IMAGE:
        return (
          <Step1GenerateImage
            setNftData={setNftData}
            nextStep={() => setStep(AppStep.GENERATE_METADATA)}
            setError={setError}
          />
        );
      case AppStep.GENERATE_METADATA:
        return (
          <Step2GenerateMetadata
            nftData={nftData}
            setNftData={setNftData}
            nextStep={() => setStep(AppStep.LAUNCH_SUCCESS)}
            setError={setError}
          />
        );
      case AppStep.LAUNCH_SUCCESS:
        return <Step3LaunchSuccess nftData={nftData} onRestart={handleReset} />;
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-background via-indigo-950 to-black flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8 animate-fade-in-up">
            <div className="flex items-center justify-center gap-3">
                <SparklesIcon className="w-10 h-10 text-brand-primary" />
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-pink to-brand-accent">
                    NFT Launchpad AI
                </h1>
            </div>
          <p className="text-lg text-gray-300 mt-2 max-w-2xl mx-auto">
            Your personal AI assistant to create and launch a unique NFT in minutes.
          </p>
        </header>
        
        <main className="bg-brand-surface/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-brand-primary/10 border border-white/10 p-6 sm:p-10 transition-all duration-500">
            <StepIndicator currentStep={step} />
            {error && (
            <div className="my-4 p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-lg text-center animate-fade-in-up">
              <p><strong>An error occurred:</strong> {error}</p>
              <button onClick={() => setError(null)} className="mt-2 text-sm font-semibold underline">Dismiss</button>
            </div>
            )}
            <div className="mt-8">
                {renderStep()}
            </div>
        </main>
      </div>
       <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>Powered by Gemini. For demonstration purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
