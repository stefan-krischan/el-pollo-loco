/**
 * Represents a level in the game.
 * A level contains all the elements like backgrounds, enemies, and clouds.
 */
class Level {
  /** @type {Chicken[]} The Array whether opponents in the game*/
  enemies = [];

  /** @type {Cloud[]} The array of clouds in the game */
  clouds = [];

  groundY = 140;

  /** @type {Background[]} The array of backgrounds in the game */
  backgrounds = [];

  /** @type {number} The starting x-coordinate of the level */
  startX = 0;

  /** @type {number} The ending x-coordinate of the level */
  endX = 0;

  /**
   * creates a new level instance
   * @param {Background[]} backgrounds - The array of backgrounds in the level
   * @param {Cloud[]} clouds - The array of clouds in the level
   * @param {Chicken[]} enemies - The array of enemies in the level
   * @param {number} startX - The starting x-coordinate of the level in px
   * @param {number} endX - The ending x-coordinate of the level in px
   */
  constructor(backgrounds, clouds, enemies, startX, endX) {
    this.backgrounds = backgrounds;
    this.clouds = clouds;
    this.enemies = enemies;
    this.startX = startX;
    this.endX = endX;
  }
}
