/**
 * createLevel1
 * @returns {Level} The created level 1 instance.
 */
function createLevel1() {
  /** @type {Background[]} Level 1 backgrounds */
  const backgrounds = [
    new Background("assets/images/backgrounds/air/air.png", 0, 0),
    new Background("assets/images/backgrounds/layers/3/1.png"),
    new Background("assets/images/backgrounds/layers/2/1.png"),
    new Background("assets/images/backgrounds/layers/1/1.png"),
    new Background("assets/images/backgrounds/air/air.png", 720, 0),
    new Background("assets/images/backgrounds/layers/3/2.png", 720),
    new Background("assets/images/backgrounds/layers/2/2.png", 720),
    new Background("assets/images/backgrounds/layers/1/2.png", 720),
  ];

  /**
   * @type {Cloud[]} Level 1 clouds
   */
  const clouds = [
    new Cloud(300),
    new Cloud(880),
    new Cloud(1460),
  ];

  const enemies = [
    new Chicken(0),
    new Chicken(1),
    new Chicken(2),
    new Chicken(3),
  ];

  return new Level(backgrounds, clouds, enemies);
}
