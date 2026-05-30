/**
 * @file movable-object.class.js
 * @description Base class for all objects that can move within the game environment.
 * @author Stefan Krischan
 * @version 1.0.0
 */

/**
 * Class representing a movable object.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  /**
   * Horizontal speed of the object.
   * @type {number}
   * */
  speedX = 0.15;

  /**
 * Vertical speed of the object.
 * @type {number}
 */
  speedY = 0;

  /**
   * Acceleration for gravity effects.
   * @type {number}
   */
  acceleration = 2.5;

  /**
   * Moving the object to the right by adding speed to the x-coordinate
   * @param {number} speedX - The speed to move the object horizontally.
   */
  moveRight(speedX) {
    this.x += speedX;
  }

  /**
   * Moves the object to the left by subtracting speed from the x-coordinate
   * @param {number} speedX - The speed to move the object horizontally.
   */
  moveLeft(speedX) {
    this.x -= speedX;
  }

  /**
   * Plays an animation by cycling through an array of image paths.
   * Uses the modulo operator to ensure the index stays within array bounds.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let index = this.currentImage % images.length;
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Plays an animation only once and stops at the last image.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimationOnce(images) {
    let index = this.currentImage;
    if (index < images.length) {
      let path = images[index];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }

  /**
   * Checks if this object is colliding with another movable object.
   * @param {MovableObject} movableObject - The other movable object to check collision with.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(movableObject) {
    return (
      this.x < movableObject.x + movableObject.width &&
      this.x + this.width > movableObject.x &&
      this.y < movableObject.y + movableObject.height &&
      this.y + this.height > movableObject.y
    );
  }
}
