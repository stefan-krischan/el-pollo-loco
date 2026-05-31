class StatusBarHealth extends StatusBar {
  /** @type {string[]} Paths to the health status bar images */
  imagePaths = [
    "assets/icons/status-bars/character/health/health-0.png",
    "assets/icons/status-bars/character/health/health-20.png",
    "assets/icons/status-bars/character/health/health-40.png",
    "assets/icons/status-bars/character/health/health-60.png",
    "assets/icons/status-bars/character/health/health-80.png",
    "assets/icons/status-bars/character/health/health-100.png",
  ];
  constructor() {
    super();
    this.loadImage("assets/icons/status-bars/character/health/health-100.png");
    this.loadImages(this.imagePaths);

  }
}
