<div align="center">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Star-Struck.png" alt="Star Struck" width="75" />
  <h1 align="center">TOONHUB Figurine Showcase</h1>
  <p align="center">
    A premium, high-fidelity 3D character carousel built with React, Vite, and Tailwind CSS.
    <br />
    <a href="#features"><strong>Explore the Features »</strong></a>
    <br />
    <br />
    <a href="#">View Live Demo</a>
    ·
    <a href="#">Report Bug</a>
    ·
    <a href="#">Request Feature</a>
  </p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</div>

---

## 🚀 About The Project

<div align="center">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Camera%20with%20Flash.png" alt="Camera" width="50"/>
  <img width="1342" height="583" alt="image" src="https://github.com/user-attachments/assets/f4cd7a81-058c-4d9d-89da-ff5a3ac6f4b6" />

</div>

TOONHUB is a state-of-the-art collector's portal UI designed to showcase 3D figurines. It moves away from generic grids and introduces a highly immersive, interactive carousel with synchronized animations, glassmorphism, and a custom-built chromakey engine.

### ✨ Dynamic Features

* <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Milky%20Way.png" width="20"/> **Theme Synchronization:** The entire viewport, including backgrounds and glassmorphic cards, seamlessly crossfades to match the dominant color palette of the active figurine.
* <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Input%20Numbers.png" width="20"/> **Euclidean Chromakey Engine:** Built-in client-side `<canvas>` image processing that dynamically calculates vector color distance to key-out and anti-alias solid white backgrounds in real-time.
* <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Mirror.png" width="20"/> **Premium Glassmorphism:** Custom backdrop-blur cards with neon borders and dynamic shadows.
* <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Performing%20Arts.png" width="20"/> **Cinematic Micro-Animations:** Floating idle animations for the active character, animated SVG fractal noise for a "live" analog texture, and perfectly timed component crossfades.
* <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Mobile%20Phone.png" width="20"/> **Fully Responsive:** Flawless layout scaling from mobile to ultra-wide desktop monitors.

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v16 or higher)
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/amitpaul2004/toonhub-carousel.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the development server
   ```sh
   npm run dev
   ```

## 🌌 The Technology Under the Hood

### The Math Behind the Magic
To support an infinite, scalable carousel, the component calculates circular relative distances:
```typescript
let diff = index - activeIndex;
if (diff < -Math.floor(N / 2)) diff += N;
if (diff > Math.floor(N / 2)) diff -= N;
```
This guarantees perfect layout mapping whether you have 3 characters or 30.

### Real-Time Alpha Blending
Using the Pythagorean theorem in 3D color space, our engine removes backgrounds without requiring pre-processed transparent PNGs:
```typescript
// Euclidean distance from pure white
const dist = Math.sqrt(
  Math.pow(255 - r, 2) + Math.pow(255 - g, 2) + Math.pow(255 - b, 2)
);
```

## 🚀 Deployment

This app is optimized for zero-configuration deployments.

**For Vercel:**
1. Import the repository into your Vercel dashboard.
2. Vercel automatically detects the Vite framework.
3. Click **Deploy**.

**For Netlify:**
1. Import the repository.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy Site**.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💎 Acknowledgments

* [Lucide Icons](https://lucide.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Vite](https://vitejs.dev/)

---
<p align="center">Built with <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Yellow%20Heart.png" width="18"/> and lots of <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Hot%20Beverage.png" width="18"/></p>
