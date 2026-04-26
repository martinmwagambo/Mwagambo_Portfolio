# Martin Mwagambo — Personal Portfolio

A modern, responsive personal portfolio website built with **React**, **Tailwind CSS**, and **Framer Motion**.

🔗 Live site: https://mwagambo-portfolio.vercel.app/
📧 Contact: martmwagambo2000@gmail.com  
💼 LinkedIn: [linkedin.com/in/martin-mwagambo](https://www.linkedin.com/in/martin-mwagambo)  
🐙 GitHub: [github.com/martinmwagambo](https://github.com/martinmwagambo)

---

## ✨ Features

- Light / Dark mode toggle
- Animated hero section with 3D tilt & glow profile card
- Scroll-driven glowing timeline for Experience & Projects
- Floating tech icon cloud (Skills section)
- Fully responsive — mobile, tablet, desktop
- Smooth Framer Motion animations throughout
- Real project showcase with GitHub links

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | React 18 (Vite)                     |
| Styling     | Tailwind CSS v3                     |
| Animations  | Framer Motion                       |
| Icons       | React Icons + Iconify               |
| Fonts       | Google Fonts (Inter)                |
| Build Tool  | Vite                                |

---

## 🚀 Running Locally

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) **v18 or higher**
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

Check your versions:

```bash
node -v
npm -v
git --version
```

---

### 1. Clone the Repository

```bash
git clone https://github.com/lemayan/Martin_Portfolio.git
cd Martin_Portfolio
```

---

### 2. Install Dependencies

```bash
npm install
```

This installs everything listed in `package.json`, including React, Tailwind CSS, Framer Motion, and icon libraries.

---

### 3. Start the Development Server

```bash
npm run dev
```

Open your browser and navigate to:

```
http://localhost:5173
```

The page auto-reloads whenever you save a file.

---

### 4. Build for Production (Optional)

```bash
npm run build
```

The optimized output is placed in the `dist/` folder. You can preview it locally with:

```bash
npm run preview
```

---

## 📁 Project Structure

```
Martin_Portfolio/
├── public/
│   ├── martin.jpg          # Profile photo
│   ├── logo.png            # MM brand logo
│   └── greenview.png       # Greenview Hotel project screenshot
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Sticky navbar with dark mode toggle
│   │   ├── Hero.jsx        # Hero section with tilt card & profile image
│   │   ├── About.jsx       # About / bio section
│   │   ├── Skills.jsx      # Animated floating tech icon cloud
│   │   ├── Experience.jsx  # Scroll-driven glowing timeline
│   │   ├── Projects.jsx    # Real GitHub projects with glow timeline
│   │   ├── Contact.jsx     # Contact form + info
│   │   ├── Footer.jsx      # Footer with social links
│   │   └── useInView.js    # Custom scroll-intersection hook
│   ├── App.jsx             # Root component + theme state
│   ├── index.css           # Global styles + Tailwind directives
│   └── main.jsx            # React entry point
├── tailwind.config.js      # Tailwind theme customisation
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies & scripts
```

---

## 🎨 Customisation

To use this portfolio as a template for yourself:

1. **Replace personal info** — edit the data inside each component (`Hero.jsx`, `About.jsx`, `Experience.jsx`, `Projects.jsx`, `Contact.jsx`)
2. **Swap the profile photo** — replace `public/martin.jpg` with your own image
3. **Update links** — GitHub, LinkedIn, and email appear in `Hero.jsx`, `Contact.jsx`, and `Footer.jsx`
4. **Change colour theme** — edit `tailwind.config.js` to update the `brand` colour palette

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ by [Martin Mwagambo](https://github.com/martinmwagambo)
