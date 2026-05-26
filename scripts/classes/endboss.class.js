/**
 * Represents the endboss chicken in the game.
 * @extends MovableObject
 */
class Endboss extends MovableObject {

  /** @type {string[]} Paths to the alert animation images */
  imagePathsAlert = [
    "assets/images/final-boss/chicken/alert/alert-1.png",
    "assets/images/final-boss/chicken/alert/alert-2.png",
    "assets/images/final-boss/chicken/alert/alert-3.png",
    "assets/images/final-boss/chicken/alert/alert-4.png",
    "assets/images/final-boss/chicken/alert/alert-5.png",
    "assets/images/final-boss/chicken/alert/alert-6.png",
    "assets/images/final-boss/chicken/alert/alert-7.png",
    "assets/images/final-boss/chicken/alert/alert-8.png",
  ];

  /** @type {string[]} Paths to the walk animation images */
  imagePathsWalk = [
    "assets/images/final-boss/chicken/walk/walk-1.png",
    "assets/images/final-boss/chicken/walk/walk-2.png",
    "assets/images/final-boss/chicken/walk/walk-3.png",
    "assets/images/final-boss/chicken/walk/walk-4.png",
  ];

  /** @type {string[]} Paths to the hurt animation images */
  imagePathsHurt = [
    "assets/images/final-boss/chicken/hurt/hurt-1.png",
    "assets/images/final-boss/chicken/hurt/hurt-2.png",
    "assets/images/final-boss/chicken/hurt/hurt-3.png",
  ];

  imagePathsAttack = [
    "assets/images/final-boss/chicken/attack/attack-1.png",
    "assets/images/final-boss/chicken/attack/attack-2.png",
    "assets/images/final-boss/chicken/attack/attack-3.png",
    "assets/images/final-boss/chicken/attack/attack-4.png",
    "assets/images/final-boss/chicken/attack/attack-5.png",
    "assets/images/final-boss/chicken/attack/attack-6.png",
    "assets/images/final-boss/chicken/attack/attack-7.png",
    "assets/images/final-boss/chicken/attack/attack-8.png",
  ];

  /** @type {string[]} Paths to the dead animation images */
  imagePathsDead = [
    "assets/images/final-boss/chicken/dead/dead-1.png",
    "assets/images/final-boss/chicken/dead/dead-2.png",
    "assets/images/final-boss/chicken/dead/dead-3.png",
  ];

  /** @type {number} The scale of the endboss */
  scale = 0.25;

  /** @type {number} The x position of the endboss */
  x = 1120;

  /** @type {number} The y position of the endboss */
  y = 150;

  animationState = "walk";
  animationFrameIntervalMs = 120;
  lastAnimationFrameTime = 0;
  speedX = 0.5;


  /** @type {number} The width of the endboss */
  width = 1045 * this.scale;

  /** @type {number} The height of the endboss */
  height = 1217 * this.scale;

  constructor() {
    super();
    this.loadImage("assets/images/final-boss/chicken/walk/walk-1.png");
    this.loadImages(this.imagePathsAlert);
    this.loadImages(this.imagePathsWalk);
    this.loadImages(this.imagePathsHurt);
    this.loadImages(this.imagePathsAttack);
    this.loadImages(this.imagePathsDead);

  }

  update() {
    this.moveLeft(this.speedX);
  }

  updateAnimation(timestamp) {
    if (timestamp - this.lastAnimationFrameTime < this.animationFrameIntervalMs) return;
    this.lastAnimationFrameTime = timestamp;

    if (this.animationState === "walk") this.playAnimation(this.imagePathsWalk);
    else if (this.animationState === "alert") this.playAnimation(this.imagePathsAlert);
    else if (this.animationState === "hurt") this.playAnimation(this.imagePathsHurt);
    else if (this.animationState === "attack") this.playAnimation(this.imagePathsAttack);
    else if (this.animationState === "dead") this.playAnimation(this.imagePathsDead);
  }

  /**
   * Returns true when the chicken has fully left the canvas to the left.
   * @returns {boolean}
   */
  isOutOfView() {
    return this.x + this.width < 0;
  }
}
