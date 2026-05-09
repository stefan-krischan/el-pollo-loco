/**
 * Represents the main character of the game
 * @extends MovableObject
 */
class Character extends MovableObject {
  scale = 0.25;
  height = 1200 * this.scale;
  width = 610 * this.scale;
  x = 0;
  y = 140;
  animationState = "idle";
  animationFrameIntervalMs = 120;
  lastAnimationFrameTime = 0;
  idleSinceTimestamp = 0;
  longIdleDelayMs = 3000;

  /** @type {string[]} Paths to the idle animation images */
  imagePathsIdle = [
    "assets/images/character/idle/idle-1.png",
    "assets/images/character/idle/idle-2.png",
    "assets/images/character/idle/idle-3.png",
    "assets/images/character/idle/idle-4.png",
    "assets/images/character/idle/idle-5.png",
    "assets/images/character/idle/idle-6.png",
    "assets/images/character/idle/idle-7.png",
    "assets/images/character/idle/idle-8.png",
    "assets/images/character/idle/idle-9.png",
    "assets/images/character/idle/idle-10.png",
  ];

  imagePathsLongIdle = [
    "assets/images/character/long-idle/long-idle-1.png",
    "assets/images/character/long-idle/long-idle-2.png",
    "assets/images/character/long-idle/long-idle-3.png",
    "assets/images/character/long-idle/long-idle-4.png",
    "assets/images/character/long-idle/long-idle-5.png",
    "assets/images/character/long-idle/long-idle-6.png",
    "assets/images/character/long-idle/long-idle-7.png",
    "assets/images/character/long-idle/long-idle-8.png",
    "assets/images/character/long-idle/long-idle-9.png",
    "assets/images/character/long-idle/long-idle-10.png",
  ];

  constructor() {
    super();
    this.loadImage("assets/images/character/idle/idle-1.png");
    this.loadImages(this.imagePathsIdle);
    this.loadImages(this.imagePathsLongIdle);
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
    if (timestamp - this.lastAnimationFrameTime < this.animationFrameIntervalMs) {
      return;
    }

    this.lastAnimationFrameTime = timestamp;

    if (this.animationState === "idle") {
      if (timestamp - this.idleSinceTimestamp >= this.longIdleDelayMs) {
        this.setAnimationState("long-idle");
      } else {
        this.playAnimation(this.imagePathsIdle);
      }
    } else if (this.animationState === "long-idle") {
      this.playAnimation(this.imagePathsLongIdle);
    }
  }

  /**
   * Resets the idle timer. Call this when the character starts moving.
   * @param {number} timestamp - Current timestamp.
   */
  resetIdleTimer(timestamp) {
    this.idleSinceTimestamp = timestamp;
    this.setAnimationState("idle");
  }
}
