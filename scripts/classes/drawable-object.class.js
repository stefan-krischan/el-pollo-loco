/**
 * @file drawable-object.class.js
 * @description Base class for all objects that can be rendered on the game canvas.
 * @author Stefan Krischan
 * @version 1.0.0
 */

/**
 * Represents an object that can be drawn on the canvas.
 */
class DrawableObject {
  /** The horizontal position on the canvas.
   * @type {number}
   */
  x = 120;

  /** The vertical position on the canvas.
   * @type {number}
   */
  y = 150;

  /** The height of the object in pixels.
   * @type {number}
   */
  height = 150;

  /** The width of the object in pixels.
   * @type {number}
   */
  width = 100;

  /** The scale factor of the object (1 = 100%).
   * @type {number}
   */
  percentage = 1;

  /** The HTML image element used for rendering.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * Loads an image from the given path.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the image with current scaling to the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    let scaledWidth = this.width * this.percentage;
    let scaledHeight = this.height * this.percentage;
    ctx.drawImage(this.img, this.x, this.y, scaledWidth, scaledHeight);
  }
}
