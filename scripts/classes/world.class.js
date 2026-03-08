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

  /** @type {Chicken[]} The Array whether opponents in the game*/
  enemies = [
    new Chicken(0),
    new Chicken(1),
    new Chicken(2),
    new Chicken(3),
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
   * @returns {void}
   */
  animate() {
    if (!this.isRunning) return;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width * this.character.scale, this.character.height * this.character.scale);
    this.enemies.forEach((enemy => {
      this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width * enemy.scale, enemy.height * enemy.scale);
    }));
    this.rafId = requestAnimationFrame(() => this.animate());
  }
}
