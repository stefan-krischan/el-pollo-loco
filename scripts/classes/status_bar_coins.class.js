class StatusBarCoins extends StatusBar {
  y = 48;

  /** @type {string[]} Paths to the coin status bar images */
  imagePaths = [
    "assets/icons/status-bars/character/coins/coin-0.png",
    "assets/icons/status-bars/character/coins/coin-20.png",
    "assets/icons/status-bars/character/coins/coin-40.png",
    "assets/icons/status-bars/character/coins/coin-60.png",
    "assets/icons/status-bars/character/coins/coin-80.png",
    "assets/icons/status-bars/character/coins/coin-100.png",
  ];

  constructor() {
    super();
    this.loadImage("assets/icons/status-bars/character/coins/coin-0.png");
    this.loadImages(this.imagePaths);
  }

}
