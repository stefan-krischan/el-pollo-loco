/**
 * @file script.js
 * @description The main startup file for the game "El Pollo Loco".
 * It contains the global configurations and controls the game start and reset.
 * @author Stefan Krischan
 * @version 1.0.0
 */

/**
 * The active instance of the game.
 * This variable saves the complete game object.
 * @type {World | null}
 */
let currentGame = null;

/**
 * Initializes the game.
 * Creates a new instance of the World class and starts the loop.
 */
function initGame() {
  currentGame = new World("canvas");
  currentGame.start();
}

/**
 * Resets the canvas and the game completely.
 * Stops the current animation and creates a new world instance.
 */
function replayGame() {
  if (currentGame) {
    currentGame.stop();
  }
  initGame();
}

// Start signal when loading the page
window.addEventListener("load", initGame);
