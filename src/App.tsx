import React, { useState, useEffect, useCallback } from 'react';
import RubiksCube3DCanvas from './components/RubiksCube3D';
import ControlPanel from './components/ControlPanel';
import SolutionPanel from './components/SolutionPanel';
import { CubeState, Move, SolutionResult } from './types/cube';
import { createSolvedCube, applyMove, scrambleCube, applyScramble, isSolved } from './utils/cubeLogic';
import { solveCube } from './utils/solver';
import { Cube } from 'lucide-react';

function App() {
  const [cubeState, setCubeState] = useState<CubeState>(() => createSolvedCube());
  const [solution, setSolution] = useState<SolutionResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-play solution steps
  useEffect(() => {
    if (isPlaying && solution && currentStep < solution.totalMoves) {
      const timer = setTimeout(() => {
        handleNextStep();
      }, 800); // 800ms per move

      return () => clearTimeout(timer);
    } else if (isPlaying && currentStep >= (solution?.totalMoves || 0)) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, solution]);

  const handleSolve = useCallback(async () => {
    if (isSolved(cubeState)) {
      alert('Cube is already solved!');
      return;
    }

    setIsSolving(true);
    setIsAnimating(true);

    // Simulate solving delay for better UX
    setTimeout(() => {
      const solutionResult = solveCube(cubeState);
      setSolution(solutionResult);
      setCurrentStep(0);
      setIsSolving(false);
      setIsAnimating(false);
    }, 1500);
  }, [cubeState]);

  const handleScramble = useCallback(() => {
    const scramble = scrambleCube(25);
    const scrambledCube = applyScramble(createSolvedCube(), scramble);
    setCubeState(scrambledCube);
    setSolution(null);
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const handleReset = useCallback(() => {
    setCubeState(createSolvedCube());
    setSolution(null);
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const handlePlay = useCallback(() => {
    if (solution && currentStep < solution.totalMoves) {
      setIsPlaying(true);
    }
  }, [solution, currentStep]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleNextStep = useCallback(() => {
    if (solution && currentStep < solution.totalMoves) {
      const nextMove = solution.steps[currentStep].move;
      setCubeState(prevState => applyMove(prevState, nextMove));
      setCurrentStep(prev => prev + 1);
    }
  }, [solution, currentStep]);

  const handlePreviousStep = useCallback(() => {
    if (currentStep > 0) {
      // Rebuild cube state from beginning up to previous step
      let newCubeState = createSolvedCube();
      
      // Apply scramble first (we need to track the original scrambled state)
      // For now, just go back one step by reversing the last move
      setCurrentStep(prev => prev - 1);
      
      // Recalculate cube state from the beginning
      if (solution) {
        const scramble = scrambleCube(25); // This should be the original scramble
        newCubeState = applyScramble(newCubeState, scramble);
        
        for (let i = 0; i < currentStep - 1; i++) {
          newCubeState = applyMove(newCubeState, solution.steps[i].move);
        }
        setCubeState(newCubeState);
      }
    }
  }, [currentStep, solution]);

  const handleManualMove = useCallback((move: Move) => {
    setCubeState(prevState => applyMove(prevState, move));
    setSolution(null);
    setCurrentStep(0);
  }, []);

  const canSolve = !isSolved(cubeState);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="relative z-10 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-3">
            <Cube className="w-8 h-8 text-white" />
            <h1 className="text-4xl font-bold text-white">
              Professional Rubik's Cube Solver
            </h1>
          </div>
          <p className="text-center text-white text-opacity-70 mt-2">
            Interactive 3D visualization with step-by-step solving algorithms
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <ControlPanel
              onSolve={handleSolve}
              onScramble={handleScramble}
              onReset={handleReset}
              onPlay={handlePlay}
              onPause={handlePause}
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
              isPlaying={isPlaying}
              isSolving={isSolving}
              currentStep={currentStep}
              totalSteps={solution?.totalMoves || 0}
              canSolve={canSolve}
            />

            {/* Cube Status */}
            <div className="glass-panel p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-white text-sm">
                  <span>State:</span>
                  <span className={isSolved(cubeState) ? 'text-green-400' : 'text-orange-400'}>
                    {isSolved(cubeState) ? 'Solved' : 'Scrambled'}
                  </span>
                </div>
                {solution && (
                  <div className="flex justify-between text-white text-sm">
                    <span>Progress:</span>
                    <span className="text-blue-400">
                      {currentStep}/{solution.totalMoves}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center Panel - 3D Cube */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 h-fit">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">3D Cube</h2>
              <div className="aspect-square">
                <RubiksCube3DCanvas
                  cubeState={cubeState}
                  isAnimating={isAnimating || isPlaying}
                  currentMove={solution?.steps[currentStep]?.move}
                />
              </div>
              <div className="mt-4 text-center text-white text-opacity-70 text-sm">
                Drag to rotate • Scroll to zoom • Right-click to pan
              </div>
            </div>
          </div>

          {/* Right Panel - Solution */}
          <div className="lg:col-span-1">
            <SolutionPanel
              solution={solution}
              currentStep={currentStep}
              isAnimating={isAnimating || isPlaying}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-white text-opacity-50 text-sm">
          <p>Built with React, Three.js, and advanced cube solving algorithms</p>
          <p className="mt-1">© 2024 Professional Rubik's Cube Solver</p>
        </footer>
      </main>
    </div>
  );
}

export default App;