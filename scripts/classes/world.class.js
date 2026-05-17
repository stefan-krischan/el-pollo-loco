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

  /**  @type {number | null} The ID of the current animation frame. */
  rafId = null;

  /** @type {boolean}  Indicates whether the world is currently active. */
  isRunning = false;

  /** @type {Character} The main character of the game */
  character = new Character();

  /** @type {Keyboard} The keyboard input handler */
  keyboard = new Keyboard();

  /** @type {Chicken[]} The Array whether opponents in the game*/
  enemies = [
    new Chicken(0),
    new Chicken(1),
    new Chicken(2),
    new Chicken(3),
  ];

  /** @type {Cloud[]} The array of clouds in the game */
  clouds = [
    new Cloud(300),
    new Cloud(880)
  ];

  /** @type {Background[]} The array of backgrounds in the game */
  backgrounds = [
    new Background("assets/images/backgrounds/air/air.png", 0),
    new Background("assets/images/backgrounds/layers/3/1.png"),
    new Background("assets/images/backgrounds/layers/2/1.png"),
    new Background("assets/images/backgrounds/layers/1/1.png"),
  ];

  /**
   * Creates a new world instance and defines the start state.
   * @param {string} canvasId - The HTML ID of the canvas element.
   */
  constructor(canvasId) {
    this.ctx = this.getCanvasContext(canvasId);
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
    if (!this.isRunning) return;
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.character.updateMovement(timestamp);
    this.character.updateAnimation(timestamp);
    this.enemies.forEach(enemy => {
      enemy.update();
      enemy.updateAnimation(timestamp);
    });
    this.enemies = this.enemies.filter(enemy => !enemy.isOutOfView());
    this.clouds.forEach(cloud => cloud.update());
    this.backgrounds.forEach(background => this.addToMap(background));
    this.addToMap(this.character);
    this.clouds.forEach(cloud => {
      cloud.update();
      this.addToMap(cloud);
    });
    this.enemies.forEach(enemy => this.addToMap(enemy));
    this.rafId = requestAnimationFrame((nextTimestamp) => this.animate(nextTimestamp));
  }

  /**
   * Draws a drawable object on the canvas.
   * @param {DrawableObject} drawableObject - Object to draw.
   */
  addToMap(drawableObject) {
    if (!this.ctx) return;
    this.ctx.drawImage(drawableObject.img, drawableObject.x, drawableObject.y, drawableObject.width, drawableObject.height);
  }
}
