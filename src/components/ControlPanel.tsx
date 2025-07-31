import React from 'react';
import { Play, Pause, RotateCcw, Shuffle, SkipForward, SkipBack, RefreshCw } from 'lucide-react';
import { Move } from '../types/cube';

interface ControlPanelProps {
  onSolve: () => void;
  onScramble: () => void;
  onReset: () => void;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isPlaying: boolean;
  isSolving: boolean;
  currentStep: number;
  totalSteps: number;
  canSolve: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onSolve,
  onScramble,
  onReset,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  isPlaying,
  isSolving,
  currentStep,
  totalSteps,
  canSolve
}) => {
  return (
    <div className="glass-panel p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Controls</h2>
      
      {/* Main Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onSolve}
          disabled={!canSolve || isSolving}
          className="control-button w-full flex items-center justify-center space-x-2"
        >
          <RefreshCw className={`w-5 h-5 ${isSolving ? 'animate-spin' : ''}`} />
          <span>{isSolving ? 'Solving...' : 'Solve Cube'}</span>
        </button>
        
        <button
          onClick={onScramble}
          disabled={isSolving}
          className="control-button w-full flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700"
        >
          <Shuffle className="w-5 h-5" />
          <span>Scramble</span>
        </button>
        
        <button
          onClick={onReset}
          disabled={isSolving}
          className="control-button w-full flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Solution Playback Controls */}
      {totalSteps > 0 && (
        <div className="border-t border-white border-opacity-20 pt-4">
          <h3 className="text-lg font-semibold text-white mb-3">Solution Playback</h3>
          
          <div className="flex items-center justify-center space-x-2 mb-3">
            <button
              onClick={onPrevious}
              disabled={currentStep === 0}
              className="control-button p-2"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            
            <button
              onClick={isPlaying ? onPause : onPlay}
              className="control-button p-2"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            
            <button
              onClick={onNext}
              disabled={currentStep >= totalSteps}
              className="control-button p-2"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-2">
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0}%` }}
              />
            </div>
          </div>
          
          <div className="text-center text-white text-sm">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      )}

      {/* Manual Move Buttons */}
      <div className="border-t border-white border-opacity-20 pt-4">
        <h3 className="text-lg font-semibold text-white mb-3">Manual Moves</h3>
        <ManualMoveControls disabled={isSolving} />
      </div>
    </div>
  );
};

interface ManualMoveControlsProps {
  disabled: boolean;
}

const ManualMoveControls: React.FC<ManualMoveControlsProps> = ({ disabled }) => {
  const moves: Move[] = ['F', 'B', 'R', 'L', 'U', 'D'];

  const handleMove = (move: Move) => {
    // This would be connected to the cube state management
    console.log(`Manual move: ${move}`);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {moves.map((move) => (
        <div key={move} className="space-y-1">
          <button
            onClick={() => handleMove(move)}
            disabled={disabled}
            className="control-button w-full text-sm py-1"
          >
            {move}
          </button>
          <button
            onClick={() => handleMove(`${move}'` as Move)}
            disabled={disabled}
            className="control-button w-full text-sm py-1 bg-purple-600 hover:bg-purple-700"
          >
            {move}'
          </button>
          <button
            onClick={() => handleMove(`${move}2` as Move)}
            disabled={disabled}
            className="control-button w-full text-sm py-1 bg-green-600 hover:bg-green-700"
          >
            {move}2
          </button>
        </div>
      ))}
    </div>
  );
};

export default ControlPanel;