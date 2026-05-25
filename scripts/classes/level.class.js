/**
 * Represents a level in the game.
 * A level contains all the elements like backgrounds, enemies, and clouds.
 */
class Level {
  /** @type {Chicken[]} The Array whether opponents in the game*/
  enemies = [];

  /** @type {Cloud[]} The array of clouds in the game */
  clouds = [];

  /** @type {Background[]} The array of backgrounds in the game */
  backgrounds = [];

  constructor(backgrounds, clouds, enemies) {
    this.backgrounds = backgrounds;
    this.clouds = clouds;
    this.enemies = enemies;
  }
}
