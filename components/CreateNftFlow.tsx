import React, { useState } from 'react';
import { NftData, AppStep } from '../types';
import StepIndicator from './StepIndicator';
import Step1GenerateImage from './Step1GenerateImage';
import Step2GenerateMetadata from './Step2GenerateMetadata';
import Step3SetPrice from './Step3SetPrice';

interface CreateNftFlowProps {
    onLaunch: (nftData: Omit<NftData, 'id'>) => void;
    onBack: () => void;
}

const CreateNftFlow: React.FC<CreateNftFlowProps> = ({ onLaunch, onBack }) => {
    const [step, setStep] = useState<AppStep>(AppStep.GENERATE_IMAGE);
    const [nftData, setNftData] = useState<Omit<NftData, 'id'>>({
        prompt: '',
        imageUrl: null,
        metadata: null,
        price: null,
        transactionId: null,
        owner: 'creator',
        status: 'for_sale',
        priceHistory: []
    });
    const [error, setError] = useState<string | null>(null);

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
                        nextStep={() => setStep(AppStep.SET_PRICE)}
                        setError={setError}
                    />
                );
            case AppStep.SET_PRICE:
                return (
                    <Step3SetPrice
                        nftData={nftData}
                        setNftData={setNftData}
                        onLaunch={onLaunch}
                        setError={setError}
                    />
                );
            default:
                return <div>Invalid step</div>;
        }
    };

    return (
        <div className="bg-brand-surface/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-brand-primary/10 border border-white/10 p-6 sm:p-10 transition-all duration-500 animate-fade-in-up">
            <button onClick={onBack} className="mb-8 text-sm text-brand-secondary hover:underline">
                &larr; Discard and go back to Marketplace
            </button>
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
        </div>
    );
};

export default CreateNftFlow;