# El Pollo Loco 🐔🌵

A web-based 2D jump-and-run game, developed with modern **Vanilla JavaScript (OOP)**, HTML5 Canvas and CSS3. This project was created as part of agile development (Scrum).

---

## 🚀 Features

- **Object-oriented architecture:** Modular structure through classes (Game, World, MovableObjects).
- **PWA support:** Installable on mobile devices thanks to Web App Manifest.
- **Responsive gameplay:** Optimized for keyboard (desktop) and touch (mobile) control.
- **Professional documentation:** Full JSDoc integration for all classes and methods.

---

## 🛠 Installation & start

### Prerequisites

Make sure that you have installed [Node.js](https://nodejs.org/) to use the developer tools (JSDoc).

1. **clone repository:**

   ```Bash
    git clone https://github.com/stefan-krischan/el-pollo-loco.git
   ```

Install dependencies:

```Bash
npm install
```

Start the game: Open the index.html with a live server (e.g. VS Code Live Server Extension).

📖 Documentation (JSDoc)
To generate the technical documentation of the class structure, use the command:

```Bash
npm run docs
```

The documentation is created in the docs/jsdoc/ folder. Open the index.html there to view the class overview, parameters and method descriptions.

🎮 Control system
Arrow keys: Move

Space bar: Jump

D: Throw bottle

📂 Project structure
The project follows a strict separation of logic and assets:

/assets: Images, sounds and fonts.

/scripts/classes: The entire game logic (OOP).

/styles: CSS stylesheets and font integration.

📜 License
This project is licensed under the MIT license - see the LICENSE file for details.

Developed by Stefan Krischan (2025)
