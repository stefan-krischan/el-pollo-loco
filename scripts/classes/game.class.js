/**
 * The main class for the game.
 * It encapsulates the entire state (positions, animations, context).
 */
class Game {
  /**
   * Creates a new world instance and defines the start state.
   * @param {string} canvasId - The HTML ID of the canvas element.
   */
  constructor(canvasId) {
    /**
     * The 2D drawing context of the canvas.
     * Is null if the canvas element was not found.
     * @type {CanvasRenderingContext2D | null}
     */
    this.ctx = this.getCanvasContext(canvasId);

    /**
   * The ID of the current animation (for cancelAnimationFrame).
   * Is zero if no animation is running.
   * @type {number | null}
   */
    this.rafId = null;

    /**
     * Indicates whether the world is currently active.
     * @type {boolean}
     */
    this.isRunning = false;
  }

  /**
   * Helper method: Searches for the canvas in the DOM and returns the 2D context.
   * @param {string} id - The ID of the element to be searched for.
   * @returns {CanvasRenderingContext2D | null} The context or zero forFehler.
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
    if (!this.ctx) return; // Sicherheits-Check
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
    this.rafId = requestAnimationFrame(() => this.animate());
  }
}
