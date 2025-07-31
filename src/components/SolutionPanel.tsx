import React from 'react';
import { Clock, Target, Zap } from 'lucide-react';
import { SolutionResult, SolutionStep } from '../types/cube';

interface SolutionPanelProps {
  solution: SolutionResult | null;
  currentStep: number;
  isAnimating: boolean;
}

const SolutionPanel: React.FC<SolutionPanelProps> = ({
  solution,
  currentStep,
  isAnimating
}) => {
  if (!solution) {
    return (
      <div className="glass-panel p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Solution</h2>
        <div className="text-white text-opacity-70 text-center py-8">
          <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Scramble the cube and click "Solve" to see the solution steps</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Solution</h2>
      
      {/* Solution Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{solution.totalMoves}</div>
          <div className="text-sm text-white text-opacity-70">Moves</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">{solution.estimatedTime.toFixed(1)}s</div>
          <div className="text-sm text-white text-opacity-70">Time</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-white">{(solution.totalMoves / solution.estimatedTime).toFixed(1)}</div>
          <div className="text-sm text-white text-opacity-70">TPS</div>
        </div>
      </div>

      {/* Solution Steps */}
      <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
        {solution.steps.map((step, index) => (
          <SolutionStepItem
            key={index}
            step={step}
            isActive={index === currentStep}
            isCompleted={index < currentStep}
            isAnimating={isAnimating && index === currentStep}
          />
        ))}
      </div>

      {/* Algorithm Info */}
      <div className="border-t border-white border-opacity-20 pt-4">
        <h3 className="text-lg font-semibold text-white mb-2">Algorithm Used</h3>
        <p className="text-white text-opacity-70 text-sm">
          Layer-by-Layer method with optimized move sequences
        </p>
      </div>
    </div>
  );
};

interface SolutionStepItemProps {
  step: SolutionStep;
  isActive: boolean;
  isCompleted: boolean;
  isAnimating: boolean;
}

const SolutionStepItem: React.FC<SolutionStepItemProps> = ({
  step,
  isActive,
  isCompleted,
  isAnimating
}) => {
  return (
    <div
      className={`p-3 rounded-lg border transition-all duration-300 ${
        isActive
          ? 'bg-blue-600 bg-opacity-30 border-blue-400 border-opacity-50'
          : isCompleted
          ? 'bg-green-600 bg-opacity-20 border-green-400 border-opacity-30'
          : 'bg-white bg-opacity-5 border-white border-opacity-10'
      } ${isAnimating ? 'animate-pulse' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              isActive
                ? 'bg-blue-500 text-white'
                : isCompleted
                ? 'bg-green-500 text-white'
                : 'bg-gray-600 text-gray-300'
            }`}
          >
            {step.stepNumber}
          </div>
          <div>
            <div
              className={`font-mono text-lg font-bold ${
                isActive ? 'text-blue-300' : isCompleted ? 'text-green-300' : 'text-white'
              }`}
            >
              {step.move}
            </div>
            <div className="text-sm text-white text-opacity-70">
              {step.description}
            </div>
          </div>
        </div>
        
        {isActive && (
          <div className="text-blue-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        )}
        
        {isCompleted && (
          <div className="text-green-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionPanel;