class StatusBarBottles extends StatusBar {
  y = 96;

  /** @type {string[]} Paths to the bottle status bar images */
  imagePaths = [
    "assets/icons/status-bars/character/bottles/bottle-0.png",
    "assets/icons/status-bars/character/bottles/bottle-20.png",
    "assets/icons/status-bars/character/bottles/bottle-40.png",
    "assets/icons/status-bars/character/bottles/bottle-60.png",
    "assets/icons/status-bars/character/bottles/bottle-80.png",
    "assets/icons/status-bars/character/bottles/bottle-100.png",
  ];

  constructor() {
    super();
    this.loadImage("assets/icons/status-bars/character/bottles/bottle-0.png");
    this.loadImages(this.imagePaths);
  }

}
