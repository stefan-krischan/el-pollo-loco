/**
 * Represents the main character of the game
 * @extends MovableObject
 */
class Character extends MovableObject {
  /** @type {number} The speed of the character */
  speedX = 1.0;

  /** @type {number} The scale of the character */
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

  imagePathsWalk = [
    "assets/images/character/walk/walk-1.png",
    "assets/images/character/walk/walk-2.png",
    "assets/images/character/walk/walk-3.png",
    "assets/images/character/walk/walk-4.png",
    "assets/images/character/walk/walk-5.png",
    "assets/images/character/walk/walk-6.png",
  ];

  constructor() {
    super();
    this.loadImage("assets/images/character/idle/idle-1.png");
    this.loadImages(this.imagePathsIdle);
    this.loadImages(this.imagePathsLongIdle);
    this.loadImages(this.imagePathsWalk);
  }

  /**
   * Sets the current animation state.
    * @param {"idle" | "long-idle" | "walk"} state - The active animation state.
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

    if (this.animationState === "idle") {
      if (timestamp - this.idleSinceTimestamp >= this.longIdleDelayMs) this.setAnimationState("long-idle");
      else this.playAnimation(this.imagePathsIdle);
    } else if (this.animationState === "long-idle") this.playAnimation(this.imagePathsLongIdle);
    else if (this.animationState === "walk") this.playAnimation(this.imagePathsWalk);
  }

  /**
   * Stores the timestamp of the last movement frame.
   * @param {number} timestamp - Current timestamp.
   */
  markLastMovement(timestamp) {
    this.idleSinceTimestamp = timestamp;
  }

  moveLeft() {
    this.x -= this.speedX;
  }

  moveRight() {
    this.x += this.speedX;
  }

  /**
   * Updates the movement state based on keyboard input.
   * @param {number} timestamp - Current timestamp.
   */
  updateMovement(timestamp) {
    if (!currentGame) return;
    if (currentGame.keyboard.left) {
      this.moveLeft();
      this.otherDirection = true;
      this.markLastMovement(timestamp);
      this.setAnimationState("walk");
    } else if (currentGame.keyboard.right) {
      this.moveRight();
      this.otherDirection = false;
      this.markLastMovement(timestamp);
      this.setAnimationState("walk");
    } else {
      if (this.animationState === "walk") {
        this.setAnimationState("idle");
      }
    }
  }


}
