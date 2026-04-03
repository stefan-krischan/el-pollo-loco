/**
 * Represents a cloud in the game.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  static nextImageIndex = 0;

  /** @type {number} The scale of the cloud. */
  scale = 0.25;

  /** @type {number} The height of the cloud. */
  height = 1080 * this.scale;

  /** @type {number} The width of the cloud. */
  width = 1920 * this.scale;

  x = 0;

  y = 0;

  imagePaths = [
    "assets/images/backgrounds/clouds/cloud-1.png",
    "assets/images/backgrounds/clouds/cloud-2.png"
  ];

  constructor() {
    super();
    this.loadImage(this.imagePaths[Cloud.nextImageIndex]);
    Cloud.nextImageIndex = (Cloud.nextImageIndex + 1) % this.imagePaths.length;
    this.loadImages(this.imagePaths);
  }
}
