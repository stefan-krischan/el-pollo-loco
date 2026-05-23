/**
 * Represents a cloud in the game.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  /**
   * The index of the next cloud image.
   * @type {number}
   * @memberof Cloud
   * */
  static nextImageIndex = 0;

  /** @type {number} The speed of the cloud. */
  speedX = 0.8;

  /** @type {number} The scale of the cloud. */
  scale = 0.25;

  /** @type {number} The height of the cloud. */
  height = 1080 * this.scale;

  /** @type {number} The width of the cloud. */
  width = 1920 * this.scale;

  /** @type {number} The x-coordinate of the cloud. */
  x = 0;

  /** @type {number} The y-coordinate of the cloud. */
  y = 0;

  /** @type {string[]} The paths to the cloud images. */
  imagePaths = [
    "assets/images/backgrounds/clouds/cloud-1.png",
    "assets/images/backgrounds/clouds/cloud-2.png"
  ];

  constructor(x = 0) {
    super();
    this.x = x;
    this.setImage();
    this.setNextImageIndex();
  }

  moveLeft() { this.x -= this.speedX; }

  update() {
    if (this.x + this.width < 0) this.x = 720;
    this.moveLeft();
  }

  /**
   * Sets the next cloud image.
   * @returns {void}
   */
  setImage() {
    this.loadImage(this.imagePaths[Cloud.nextImageIndex]);
  }

  /**
   * Sets the index for the next cloud image.
   * @returns {void}
   */
  setNextImageIndex() {
    Cloud.nextImageIndex = (Cloud.nextImageIndex + 1) % this.imagePaths.length;
  }
}
