export type CubeColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'white';

export type CubeFace = 'front' | 'back' | 'right' | 'left' | 'up' | 'down';

export type CubeSticker = {
  color: CubeColor;
  originalColor: CubeColor;
};

export type CubeFaceState = CubeSticker[][];

export type CubeState = {
  [key in CubeFace]: CubeFaceState;
};

export type Move = 'F' | 'B' | 'R' | 'L' | 'U' | 'D' | 
                    'F\'' | 'B\'' | 'R\'' | 'L\'' | 'U\'' | 'D\'' |
                    'F2' | 'B2' | 'R2' | 'L2' | 'U2' | 'D2';

export type SolutionStep = {
  move: Move;
  description: string;
  stepNumber: number;
};

export type SolutionResult = {
  steps: SolutionStep[];
  totalMoves: number;
  estimatedTime: number;
};

export type CubePosition = {
  x: number;
  y: number;
  z: number;
};

export type CubePiece = {
  id: string;
  position: CubePosition;
  colors: { [face in CubeFace]?: CubeColor };
  rotation: { x: number; y: number; z: number };
};

export const COLOR_MAP: { [key in CubeColor]: string } = {
  red: '#FF0000',
  orange: '#FF8C00',
  yellow: '#FFD700',
  green: '#00FF00',
  blue: '#0080FF',
  white: '#FFFFFF',
};

export const FACE_POSITIONS: { [key in CubeFace]: CubePosition } = {
  front: { x: 0, y: 0, z: 1 },
  back: { x: 0, y: 0, z: -1 },
  right: { x: 1, y: 0, z: 0 },
  left: { x: -1, y: 0, z: 0 },
  up: { x: 0, y: 1, z: 0 },
  down: { x: 0, y: -1, z: 0 },
};