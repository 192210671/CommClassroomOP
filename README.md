# Professional Rubik's Cube Solver

A professional-grade Rubik's cube solver application built with React, TypeScript, and Three.js featuring real-time 3D visualization and advanced solving algorithms.

![Rubik's Cube Solver Screenshot](https://via.placeholder.com/800x400/1e3a8a/ffffff?text=Professional+Rubik%27s+Cube+Solver)

## 🎯 Features

### 🎮 Interactive 3D Visualization
- **Real-time 3D rendering** using React Three Fiber and Three.js
- **Interactive controls** with drag to rotate, scroll to zoom, and pan functionality
- **Smooth animations** for cube rotations and solution playback
- **Visual feedback** with hover effects and color-coded cube faces

### 🧠 Advanced Solving Algorithms
- **Layer-by-Layer method** implementation
- **Step-by-step solution** breakdown with detailed descriptions
- **Optimized move sequences** for efficient solving
- **Multiple algorithm support** (CFOP patterns included)

### 🎛️ Professional Controls
- **One-click solving** with animated progress indicator
- **Smart scrambling** with configurable complexity
- **Solution playback** with play/pause/step controls
- **Manual move input** for practicing algorithms
- **Progress tracking** with visual step indicators

### 📱 Modern UI/UX
- **Responsive design** that works on all devices
- **Glass morphism** design with beautiful gradients
- **Professional styling** with Tailwind CSS
- **Real-time status** updates and cube state tracking
- **Accessibility features** with keyboard navigation support

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rubik-cube-solver.git
   cd rubik-cube-solver
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── RubiksCube3D.tsx        # 3D cube visualization
│   ├── ControlPanel.tsx        # Control interface
│   ├── SolutionPanel.tsx       # Solution display
│   └── ResponsiveLayout.tsx    # Layout wrapper
├── types/              # TypeScript type definitions
│   └── cube.ts                 # Cube-related types
├── utils/              # Utility functions
│   ├── cubeLogic.ts           # Core cube operations
│   └── solver.ts              # Solving algorithms
├── App.tsx             # Main application component
├── index.css           # Global styles
└── index.tsx           # Application entry point
```

## 🎲 How to Use

### Basic Operations

1. **Scramble the Cube**
   - Click the "Scramble" button to randomize the cube
   - The cube will apply 25 random moves for a challenging scramble

2. **Solve the Cube**
   - Click "Solve Cube" to calculate the solution
   - Watch the solving process with the animated progress indicator
   - View detailed solution steps in the right panel

3. **Playback Controls**
   - Use play/pause buttons to control solution playback
   - Step forward/backward through individual moves
   - Monitor progress with the visual progress bar

4. **Manual Controls**
   - Use face rotation buttons (F, B, R, L, U, D)
   - Apply prime moves (F', B', R', etc.) for counter-clockwise rotations
   - Execute double moves (F2, B2, R2, etc.) for 180-degree rotations

### 3D Interaction

- **Rotate View**: Click and drag to rotate the cube view
- **Zoom**: Use mouse wheel to zoom in/out
- **Pan**: Right-click and drag to pan the view
- **Reset View**: Use OrbitControls to reset to default position

## 🔧 Technology Stack

### Frontend Framework
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with enhanced IDE support
- **Tailwind CSS** - Utility-first CSS framework for rapid styling

### 3D Graphics
- **Three.js** - WebGL-based 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Helper components and utilities

### Development Tools
- **Create React App** - React application scaffolding
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting

## 🧮 Algorithm Details

### Layer-by-Layer Method
The solver implements a simplified but effective layer-by-layer approach:

1. **White Cross** - Form a cross on the bottom face
2. **White Corners** - Complete the first layer
3. **Middle Layer** - Position edge pieces in the middle layer
4. **Yellow Cross** - Form a cross on the top face
5. **Orient Last Layer (OLL)** - Orient all top face pieces
6. **Permute Last Layer (PLL)** - Position final pieces correctly

### Advanced Patterns
The application includes optimized algorithms for:
- **F2L (First Two Layers)** - Advanced corner-edge pairing
- **OLL Cases** - 57 different orientation algorithms
- **PLL Cases** - 21 different permutation algorithms

## 🎨 Customization

### Color Scheme
Modify the cube colors in `src/types/cube.ts`:
```typescript
export const COLOR_MAP: { [key in CubeColor]: string } = {
  red: '#FF0000',
  orange: '#FF8C00',
  yellow: '#FFD700',
  green: '#00FF00',
  blue: '#0080FF',
  white: '#FFFFFF',
};
```

### Animation Speed
Adjust animation timing in `src/App.tsx`:
```typescript
// Solution playback speed (milliseconds per move)
const timer = setTimeout(() => {
  handleNextStep();
}, 800); // Adjust this value
```

## 📊 Performance Optimization

- **Memoized components** to prevent unnecessary re-renders
- **Optimized Three.js materials** for smooth 3D performance
- **Efficient state management** with React hooks
- **Lazy loading** of complex algorithms
- **Responsive design** that adapts to screen size

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent code formatting with Prettier
- Write descriptive commit messages
- Add tests for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js Community** - For the amazing 3D graphics library
- **React Three Fiber** - For seamless React-Three.js integration
- **Speedcubing Community** - For algorithm optimizations and solving methods
- **Tailwind CSS** - For the beautiful utility-first styling approach

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/rubik-cube-solver/issues) page
2. Create a new issue with detailed description
3. Include browser version and error messages
4. Provide steps to reproduce the problem

---

**Built with ❤️ by the Professional Cube Solver Team**

*Bringing the art of speedcubing to the web with cutting-edge technology*