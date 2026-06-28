# Sourabh Meena - Interactive Portfolio & Web Experience

Welcome to the source code for my personal portfolio! This is a premium, highly interactive web application built with a stunning glassmorphism design language, micro-animations, and a completely bespoke **Interactive Resume** module.

## 🚀 Key Features

* **Premium Glassmorphism Design:** A cohesive aesthetic utilizing `backdrop-filter: blur(20px)`, subtle gradients, and dark-mode optimization across all components.
* **Integrated Interactive Resume:** Replaced the traditional PDF download button with a full-screen, split-layout interactive modal.
  * **Intelligent Search Engine:** Real-time regex highlighting to instantly find skills (e.g., "React", "AI") across experience, projects, and certifications.
  * **Scroll-Spy Navigation:** A sticky sidebar that tracks your position and allows instant jumping to sections.
  * **Custom Micro-Interactions:** Custom `framer-motion` physics for hovering over timeline dots, technology pills, and project cards.
* **3D Globe Visualizer:** An interactive, drag-to-rotate globe to visually represent global reach and technologies.
* **Fully Responsive:** Carefully crafted layouts that scale elegantly from ultrawide desktop monitors down to mobile devices.

## 💻 Tech Stack

* **Core:** React 18, JavaScript (ES6+), Vite
* **Styling:** Vanilla CSS (Glassmorphism, CSS Variables, Custom Animations)
* **Animation Engine:** Framer Motion (`useScroll`, `AnimatePresence`, spring physics)
* **Icons:** Lucide React

## 📂 Project Structure

```text
src/
├── assets/          # Static assets (images, pdfs)
├── components/      # Reusable React components
│   ├── GlobeSection.jsx
│   ├── InteractiveBackground.jsx
│   ├── InteractiveResume.jsx  # Complex resume modal engine
│   └── ...
├── App.jsx          # Main application router and view structure
├── data.jsx         # Centralized data store (Projects, Experience, Skills, Certs)
├── index.css        # Global CSS variables, utility classes, and glassmorphism styling
└── main.jsx         # React application entry point
```

## 🛠️ How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/EnggSourabh/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Live Preview

You can test out the interactive features—especially the "View Resume" functionality—directly by running the local server.

---
*Designed & Engineered by Sourabh Meena*
