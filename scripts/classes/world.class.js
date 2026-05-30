/**
 * @file game.class.js
 * @description The main class for the game. It encapsulates the entire state.
 * @author Stefan Krischan
 * @version 1.0.0
 */

/**
 * The main class for the game.
 * It encapsulates the entire state (positions, animations, context).
 */
class World {
  /** @type {CanvasRenderingContext2D | null} The 2D drawing context of the canvas.*/
  ctx;

  /** @type {number} The X position of the camera. */
  cameraX = 0;

  /**  @type {number | null} The ID of the current animation frame. */
  rafId = null;

  /** @type {Level | null} The current level of the game */
  level = createLevel1();

  /** @type {boolean}  Indicates whether the world is currently active. */
  isRunning = false;

  /** @type {Character} The main character of the game */
  character = new Character();

  /** @type {Keyboard} The keyboard input handler */
  keyboard = new Keyboard();

  /**
 * Creates a new world instance and defines the start state.
 * @param {string} canvasId - The HTML ID of the canvas element.
 */
  constructor(canvasId) {
    this.ctx = this.getCanvasContext(canvasId);
    this.setWorld();
  }

  /**
   * Helper method: Searches for the canvas in the DOM and returns the 2D context.
   * @param {string} id - The ID of the element to be searched for.
   * @returns {CanvasRenderingContext2D | null} The context or null for error.
   */
  getCanvasContext(id) {
    const element = document.getElementById(id);
    if (element instanceof HTMLCanvasElement) {
      return element.getContext("2d");
    }
    console.error("Canvas not found!");
    return null;
  }

  /**
   * Starts the game loop if a context is available.
   * Sets the status to "running".
   * @returns {void}
   */
  start() {
    if (!this.ctx) return;
    this.isRunning = true;
    this.animate();
  }

  /**
   * Stops the current animation immediately.
   * @returns {void}
   */
  stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /**
   * The game loop (is called approx. 60 times per second).
   * This is where deleting, drawing and calculating takes place.
   * @param {number} timestamp - Timestamp from requestAnimationFrame.
   * @returns {void}
   */
  animate(timestamp = performance.now()) {
    if (!this.isRunning || !this.ctx) return;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.character.updateMovement(timestamp);
    this.character.updateAnimation(timestamp);

    this.level.enemies.forEach((enemy) => {
      enemy.update();
      enemy.updateAnimation(timestamp);
    });
    this.level.enemies = this.level.enemies.filter((enemy) => !enemy.isOutOfView());

    this.level.clouds.forEach((cloud) => cloud.update());

    this.checkCollisions();

    this.clampCamera(this);
    ctx.save();
    ctx.translate(this.cameraX, 0);

    this.level.backgrounds.forEach((background) => this.addToMap(background));
    this.level.clouds.forEach((cloud) => this.addToMap(cloud));
    this.level.enemies.forEach((enemy) => this.addToMap(enemy));
    this.addToMap(this.character);
    this.drawBorder(ctx, this.character);
    this.level.enemies.forEach((enemy) => this.drawBorder(ctx, enemy));
    ctx.restore();

    this.rafId = requestAnimationFrame((nextTimestamp) => this.animate(nextTimestamp));
  }

  /**
   * Draws a drawable object on the canvas.
   * @param {DrawableObject} drawableObject - Object to draw.
   */
  addToMap(drawableObject) {
    if (!this.ctx) return;
    if (drawableObject.otherDirection) {
      this.ctx.save();
      this.ctx.translate(drawableObject.x + drawableObject.width, drawableObject.y);
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(drawableObject.img, 0, 0, drawableObject.width, drawableObject.height);
      this.ctx.restore();
    } else {
      this.ctx.drawImage(drawableObject.img, drawableObject.x, drawableObject.y, drawableObject.width, drawableObject.height);
    }
  }

  setWorld() {
    this.character.world = this;
  }

  clampCamera(tbis) {
    const wantedCameraX = -this.character.x + 100;
    const minCameraX = -(this.level.endX - tbis.ctx.canvas.width);
    const maxCameraX = -this.level.startX;
    this.cameraX = Math.max(minCameraX, Math.min(wantedCameraX, maxCameraX));
  }

  /**
   * Draws a border around the drawable object.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {DrawableObject} drawableObject - The object to draw the border around.
   */
  drawBorder(ctx, drawableObject) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(drawableObject.x + (ctx.lineWidth / 2), drawableObject.y + (ctx.lineWidth / 2), drawableObject.width - ctx.lineWidth, drawableObject.height - ctx.lineWidth);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        console.log("Collision detected!");
      }
    });
  }
}
