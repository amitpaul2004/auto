<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=timeGradient&height=250&section=header&text=TOONHUB%20🎠&fontSize=80&fontAlignY=35&desc=Premium%203D%20Character%20Figurine%20Carousel&descAlignY=55&descAlign=50" alt="ToonHub Header" />

  <br />
  
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

  <p align="center">
    <strong>A highly polished, interactive React application showcasing 3D character figurines with dynamic glassmorphism and real-time image processing.</strong>
  </p>
</div>

---

## ✨ Features

- **🚀 Circular Carousel Navigation:** A mathematically flawless, infinitely looping circular slider utilizing Euclidean offsets for depth, scaling, and z-index positioning.
- **🎨 Dynamic Theme Sync:** The entire viewport, including the textured grain background, dynamically transitions colors to match the aura of the active figurine.
- **✨ Client-Side Chromakey Filtering:** Automatically removes solid white backgrounds from generated assets in real-time using a custom Euclidean vector distance Canvas algorithm with anti-aliasing.
- **💎 Glassmorphic UI:** Premium frosted-glass collector cards (`backdrop-blur`) that shift and expand during user interaction.
- **🛸 Micro-Animations:** Floating "hover" animations (`translateY` + rotation), pulsing HUD indicators, and animated SVG noise overlays give the app a tactile, living feel.

## 🛠️ Tech Stack

*   **Frontend:** React 18
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS + Vanilla CSS Keyframes
*   **Icons:** `lucide-react`
*   **Build Tool:** Vite

## 🚀 Quick Start

Get the project running locally in just a few seconds!

1. **Clone the repository**
   ```bash
   git clone https://github.com/amitpaul2004/toonhub-carousel.git
   cd toonhub-carousel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🧠 Advanced: Dynamic Chromakey

This project implements a unique, zero-CORS client-side image processing solution. When rendering images with solid backgrounds (like our generated models), the application mounts an HTML5 `<canvas>`, computes the Euclidean distance of each pixel from pure white `(255, 255, 255)`, and applies a feathered alpha-transparency mask. 

This ensures that characters blend flawlessly onto their glassmorphic backing cards without needing pre-edited transparent PNGs!

---

<div align="center">
  <i>Built with ❤️ for smooth animations and beautiful UIs.</i>
</div>
