import { CubeState, CubeFace, CubeColor, CubeSticker, Move } from '../types/cube';

export function createSolvedCube(): CubeState {
  const createFace = (color: CubeColor): CubeSticker[][] => 
    Array(3).fill(null).map(() => 
      Array(3).fill(null).map(() => ({ color, originalColor: color }))
    );

  return {
    front: createFace('red'),
    back: createFace('orange'),
    right: createFace('green'),
    left: createFace('blue'),
    up: createFace('white'),
    down: createFace('yellow'),
  };
}

export function rotateFace(face: CubeSticker[][], clockwise: boolean = true): CubeSticker[][] {
  const size = face.length;
  const rotated: CubeSticker[][] = Array(size).fill(null).map(() => Array(size).fill(null));
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (clockwise) {
        rotated[j][size - 1 - i] = face[i][j];
      } else {
        rotated[size - 1 - j][i] = face[i][j];
      }
    }
  }
  
  return rotated;
}

export function rotateEdges(cube: CubeState, edges: Array<{ face: CubeFace; indices: number[] }>, clockwise: boolean = true): CubeState {
  const newCube = JSON.parse(JSON.stringify(cube)) as CubeState;
  const edgeValues = edges.map(edge => 
    edge.indices.map(idx => {
      const row = Math.floor(idx / 3);
      const col = idx % 3;
      return cube[edge.face][row][col];
    })
  );

  if (clockwise) {
    for (let i = 0; i < edges.length; i++) {
      const nextIndex = (i + 1) % edges.length;
      edges[nextIndex].indices.forEach((idx, j) => {
        const row = Math.floor(idx / 3);
        const col = idx % 3;
        newCube[edges[nextIndex].face][row][col] = edgeValues[i][j];
      });
    }
  } else {
    for (let i = 0; i < edges.length; i++) {
      const prevIndex = (i - 1 + edges.length) % edges.length;
      edges[prevIndex].indices.forEach((idx, j) => {
        const row = Math.floor(idx / 3);
        const col = idx % 3;
        newCube[edges[prevIndex].face][row][col] = edgeValues[i][j];
      });
    }
  }

  return newCube;
}

export function applyMove(cube: CubeState, move: Move): CubeState {
  let newCube = JSON.parse(JSON.stringify(cube)) as CubeState;
  const baseMoves: { [key: string]: () => CubeState } = {
    'F': () => {
      newCube.front = rotateFace(newCube.front, true);
      return rotateEdges(newCube, [
        { face: 'up', indices: [6, 7, 8] },
        { face: 'right', indices: [0, 3, 6] },
        { face: 'down', indices: [2, 1, 0] },
        { face: 'left', indices: [8, 5, 2] }
      ], true);
    },
    'B': () => {
      newCube.back = rotateFace(newCube.back, true);
      return rotateEdges(newCube, [
        { face: 'up', indices: [2, 1, 0] },
        { face: 'left', indices: [0, 3, 6] },
        { face: 'down', indices: [6, 7, 8] },
        { face: 'right', indices: [8, 5, 2] }
      ], true);
    },
    'R': () => {
      newCube.right = rotateFace(newCube.right, true);
      return rotateEdges(newCube, [
        { face: 'up', indices: [2, 5, 8] },
        { face: 'back', indices: [0, 3, 6] },
        { face: 'down', indices: [2, 5, 8] },
        { face: 'front', indices: [2, 5, 8] }
      ], true);
    },
    'L': () => {
      newCube.left = rotateFace(newCube.left, true);
      return rotateEdges(newCube, [
        { face: 'up', indices: [0, 3, 6] },
        { face: 'front', indices: [0, 3, 6] },
        { face: 'down', indices: [0, 3, 6] },
        { face: 'back', indices: [8, 5, 2] }
      ], true);
    },
    'U': () => {
      newCube.up = rotateFace(newCube.up, true);
      return rotateEdges(newCube, [
        { face: 'front', indices: [0, 1, 2] },
        { face: 'left', indices: [0, 1, 2] },
        { face: 'back', indices: [0, 1, 2] },
        { face: 'right', indices: [0, 1, 2] }
      ], true);
    },
    'D': () => {
      newCube.down = rotateFace(newCube.down, true);
      return rotateEdges(newCube, [
        { face: 'front', indices: [6, 7, 8] },
        { face: 'right', indices: [6, 7, 8] },
        { face: 'back', indices: [6, 7, 8] },
        { face: 'left', indices: [6, 7, 8] }
      ], true);
    }
  };

  if (move.includes('\'')) {
    const baseMove = move.replace('\'', '') as Move;
    newCube = baseMoves[baseMove]();
    newCube = baseMoves[baseMove]();
    newCube = baseMoves[baseMove]();
  } else if (move.includes('2')) {
    const baseMove = move.replace('2', '') as Move;
    newCube = baseMoves[baseMove]();
    newCube = baseMoves[baseMove]();
  } else {
    newCube = baseMoves[move]();
  }

  return newCube;
}

export function scrambleCube(moves: number = 20): Move[] {
  const possibleMoves: Move[] = ['F', 'B', 'R', 'L', 'U', 'D', 'F\'', 'B\'', 'R\'', 'L\'', 'U\'', 'D\''];
  const scramble: Move[] = [];
  
  for (let i = 0; i < moves; i++) {
    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    scramble.push(randomMove);
  }
  
  return scramble;
}

export function applyScramble(cube: CubeState, scramble: Move[]): CubeState {
  return scramble.reduce((currentCube, move) => applyMove(currentCube, move), cube);
}

export function isSolved(cube: CubeState): boolean {
  const faces: CubeFace[] = ['front', 'back', 'right', 'left', 'up', 'down'];
  
  return faces.every(face => {
    const faceColors = cube[face];
    const firstColor = faceColors[0][0].color;
    return faceColors.every(row => 
      row.every(sticker => sticker.color === firstColor)
    );
  });
}

export function getMoveDescription(move: Move): string {
  const descriptions: { [key in Move]: string } = {
    'F': 'Front face clockwise',
    'F\'': 'Front face counterclockwise',
    'F2': 'Front face 180°',
    'B': 'Back face clockwise',
    'B\'': 'Back face counterclockwise',
    'B2': 'Back face 180°',
    'R': 'Right face clockwise',
    'R\'': 'Right face counterclockwise',
    'R2': 'Right face 180°',
    'L': 'Left face clockwise',
    'L\'': 'Left face counterclockwise',
    'L2': 'Left face 180°',
    'U': 'Upper face clockwise',
    'U\'': 'Upper face counterclockwise',
    'U2': 'Upper face 180°',
    'D': 'Down face clockwise',
    'D\'': 'Down face counterclockwise',
    'D2': 'Down face 180°',
  };
  
  return descriptions[move];
}