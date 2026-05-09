/**
 * Represents a normal opponent in the game
 */
class Chicken extends MovableObject {
  /** @type {number} The scale of the chicken */
  scale = 0.35;

  /** @type {number} The Y position of the chicken */
  y = 350;

  /** @type {number} The width of the chicken */
  width = 248 * this.scale;

  /** @type {number} The height of the chicken  */
  height = 243 * this.scale;

  animationState = "walk";
  animationFrameIntervalMs = 120;
  lastAnimationFrameTime = 0;

  /** @type {string[]} Paths to the walk animation images */
  imagePathsWalk = [
    "assets/images/enemies/chicken/normal/walk/walk-1.png",
    "assets/images/enemies/chicken/normal/walk/walk-2.png",
    "assets/images/enemies/chicken/normal/walk/walk-3.png",
  ];

  /**
   * creates the chicken object
   * @param {number} index The index of the chicken in the array
   */
  constructor(index) {
    super();
    this.loadImage("assets/images/enemies/chicken/normal/walk/walk-1.png");
    this.loadImages(this.imagePathsWalk);
    this.x = this.calculatePositionX(index);
  }

  /**
   * Calculates the X position for the chicken based on its index
   * @param {number} index The index of the chicken in the array
   * @returns {number} The calculated X position for the chicken
   */
  calculatePositionX(index) {
    let chickenWidth = this.width * this.scale;
    let safeZoneOffset = 250;
    let baseDistance = chickenWidth + 100;
    let variance = Math.random() * 90;
    return safeZoneOffset + (index * baseDistance) + variance;
  }

  /**
   * Sets the current animation state.
   * @param {"idle" | "long-idle"} state - The active animation state.
   */
  setAnimationState(state) {
    if (this.animationState === state) return;
    this.animationState = state;
    this.currentImage = 0;
  }

  /**
   * Sets the current animation state.
   * @param {"idle" | "long-idle"} state - The active animation state.
   */
  setAnimationState(state) {
    if (this.animationState === state) return;
    this.animationState = state;
    this.currentImage = 0;
  }

  /**
   * Updates the character animation based on state and time.
   * @param {number} timestamp - Timestamp from requestAnimationFrame.
   */
  updateAnimation(timestamp) {
    if (timestamp - this.lastAnimationFrameTime < this.animationFrameIntervalMs) return;
    this.lastAnimationFrameTime = timestamp;

    if (this.animationState === "walk") {
      this.playAnimation(this.imagePathsWalk);
    }
  }
}
