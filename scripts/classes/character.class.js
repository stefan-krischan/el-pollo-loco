/**
 * Represents the main character of the game
 * @extends MovableObject
 */
class Character extends MovableObject {
  /** @type {number} The speed of the character */
  speedX = 1.4;

  /** @type {number} The scale of the character */
  scale = 0.25;
  height = 1200 * this.scale;
  width = 610 * this.scale;
  x = 100;
  y = 0;

  /** @type {number} The energy of the character */
  energy = 100;

  /** @type {number} Duration of hurt state in milliseconds */
  hurtDurationMs = 400;

  /** @type {number} End timestamp for the current hurt state */
  hurtUntilTimestamp = 0;

  /** @type {number} Minimum time between two hits in milliseconds */
  hitCooldownMs = 500;

  /** @type {number} Timestamp of the last accepted hit */
  lastHitTimestamp = 0;


  /** @type {number} The vertical speed of the character */
  speedY = 0;

  /** @type {number} The acceleration of the character */
  acceleration = 0.5;

  /** @type {number} Initial upward speed for jumps */
  jumpForce = -13;

  animationState = "idle";
  animationFrameIntervalMs = 120;
  lastAnimationFrameTime = 0;
  idleSinceTimestamp = 0;
  longIdleDelayMs = 3000;

  /** @type {World|null} The world the character belongs to  */
  world = null;

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

  imagePathsJump = [
    "assets/images/character/jump/jump-1.png",
    "assets/images/character/jump/jump-2.png",
    "assets/images/character/jump/jump-3.png",
    "assets/images/character/jump/jump-4.png",
    "assets/images/character/jump/jump-5.png",
    "assets/images/character/jump/jump-6.png",
    "assets/images/character/jump/jump-7.png",
    "assets/images/character/jump/jump-8.png",
    "assets/images/character/jump/jump-9.png",
  ];

  imagePathsHurt = [
    "assets/images/character/hurt/hurt-1.png",
    "assets/images/character/hurt/hurt-2.png",
    "assets/images/character/hurt/hurt-3.png",
  ];

  imagePathsDead = [
    "assets/images/character/dead/dead-1.png",
    "assets/images/character/dead/dead-2.png",
    "assets/images/character/dead/dead-3.png",
    "assets/images/character/dead/dead-4.png",
    "assets/images/character/dead/dead-5.png",
    "assets/images/character/dead/dead-6.png",
  ];

  constructor() {
    super();
    this.loadImage("assets/images/character/idle/idle-1.png");
    this.loadImages(this.imagePathsIdle);
    this.loadImages(this.imagePathsLongIdle);
    this.loadImages(this.imagePathsWalk);
    this.loadImages(this.imagePathsJump);
    this.loadImages(this.imagePathsHurt);
    this.loadImages(this.imagePathsDead);
  }

  /**
   * Sets the current animation state.
    * @param {"idle" | "long-idle" | "walk" | "jump" | "hurt" | "dead"} state - The active animation state.
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

    if (this.isDead()) {
      if (this.animationState !== "dead") this.setAnimationState("dead");
      this.playAnimationOnce(this.imagePathsDead);
      return;
    }

    if (this.isHurt(timestamp)) {
      if (this.animationState !== "hurt") this.setAnimationState("hurt");
      this.playAnimation(this.imagePathsHurt);
      return;
    }

    if (this.animationState === "idle") {
      if (timestamp - this.idleSinceTimestamp >= this.longIdleDelayMs) this.setAnimationState("long-idle");
      else this.playAnimation(this.imagePathsIdle);
    } else if (this.animationState === "long-idle") this.playAnimation(this.imagePathsLongIdle);
    else if (this.animationState === "walk") this.playAnimation(this.imagePathsWalk);
    else if (this.animationState === "jump") this.playAnimation(this.imagePathsJump);
  }

  /**
   * Stores the timestamp of the last movement frame.
   * @param {number} timestamp - Current timestamp.
   */
  markLastMovement(timestamp) {
    this.idleSinceTimestamp = timestamp;
  }

  /**
   * Moves the character to the left by subtracting speed from the x-coordinate.
   * @returns {void}
   */
  moveLeft() {
    this.x -= this.speedX;
  }

  /**
   * Moves the character to the right by adding speed to the x-coordinate.
   * @returns {void}
   */
  moveRight() {
    this.x += this.speedX;
  }

  /**
   * Updates the movement state based on keyboard input.
   * @param {number} timestamp - Current timestamp.
   */
  updateMovement(timestamp) {
    const game = currentGame;
    if (!game || !this.world || !this.world.level) return;

    if (this.isDead()) {
      this.applyGravity();
      return;
    }

    if (game.keyboard.space && !this.isAboveGround() && this.speedY === 0) {
      this.jump(timestamp);
    }

    if (game.keyboard.left && this.x > this.world.level.startX) {
      this.moveLeft();
      this.otherDirection = true;
      this.markLastMovement(timestamp);
    } else if (game.keyboard.right && this.x + this.width < this.world.level.endX) {
      this.moveRight();
      this.otherDirection = false;
      this.markLastMovement(timestamp);
    }

    this.applyGravity();

    if (this.isHurt(timestamp)) return;

    if (this.isAboveGround() || this.speedY < 0) this.setAnimationState("jump");
    else if (game.keyboard.left || game.keyboard.right) this.setAnimationState("walk");
    else if (this.animationState === "walk" || this.animationState === "jump") this.setAnimationState("idle");
  }

  /**
   * Starts a jump with upward velocity.
   * @param {number} timestamp - Current timestamp.
   */
  jump(timestamp) {
    this.speedY = this.jumpForce;
    this.markLastMovement(timestamp);
    this.setAnimationState("jump");
  }

  /**
   * Applies gravity to the character.
   * @returns {void}
   */
  applyGravity() {
    if (!this.world || !this.world.level) return;
    const groundY = this.world.level.groundY;

    if (this.y < groundY || this.speedY !== 0) {
      this.y = Math.min(groundY, this.y + this.speedY);
      this.speedY += this.acceleration;
      if (this.y >= groundY && this.speedY > 0) {
        this.y = groundY;
        this.speedY = 0;
      }
    }
  }

  /**
   * Checks if the character is above the ground.
   * @returns {boolean} True if the character is above the ground, false otherwise.
   */
  isAboveGround() {
    if (!this.world || !this.world.level) return false;
    return this.y < this.world.level.groundY;
  }

  /**
   *
   * @param {number} timestamp
   * @returns {void}
   */
  hit(timestamp = performance.now()) {
    if (this.isDead()) return;
    if (timestamp - this.lastHitTimestamp < this.hitCooldownMs) return;

    this.lastHitTimestamp = timestamp;
    this.energy = Math.max(0, this.energy - 10);

    if (this.isDead()) {
      this.setAnimationState("dead");
      return;
    }

    this.hurtUntilTimestamp = timestamp + this.hurtDurationMs;
    this.setAnimationState("hurt");
  }

  isDead() {
    return this.energy <= 0;
  }

  isHurt(timestamp = performance.now()) {
    return !this.isDead() && timestamp < this.hurtUntilTimestamp;
  }
}
