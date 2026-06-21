import * as Phaser from "phaser";

/**
 * Visual-first world scene: paints a night sky, distant skyline, ground,
 * twinkling stars and a moon. The four destination structures + character are
 * rendered as DOM overlays on top (see Home page) so they stay crisp and
 * clickable. Live WASD movement is a later pass.
 */
export class WorldScene extends Phaser.Scene {
  constructor() {
    super("world");
  }

  create() {
    const { width, height } = this.scale;

    // sky gradient (banded, pixel-friendly)
    const bands = [
      { c: 0x241a4a, h: 0.45 },
      { c: 0x1d1740, h: 0.25 },
      { c: 0x161033, h: 0.3 },
    ];
    let y = 0;
    bands.forEach((b) => {
      const bh = height * b.h;
      this.add.rectangle(0, y, width, bh, b.c).setOrigin(0, 0);
      y += bh;
    });

    // moon
    this.add.circle(width - 130, 110, 46, 0xf3e7a6).setAlpha(0.95);
    this.add.circle(width - 150, 96, 10, 0xe9d98f).setAlpha(0.5);

    // stars
    for (let i = 0; i < 90; i++) {
      const sx = Phaser.Math.Between(0, width);
      const sy = Phaser.Math.Between(0, height * 0.62);
      const s = this.add.rectangle(sx, sy, 3, 3, 0xffffff, Phaser.Math.FloatBetween(0.3, 0.9));
      this.tweens.add({
        targets: s,
        alpha: 0.15,
        duration: Phaser.Math.Between(1200, 2600),
        yoyo: true,
        repeat: -1,
        delay: Phaser.Math.Between(0, 1500),
      });
    }

    // distant skyline silhouette
    const skyline = this.add.graphics();
    skyline.fillStyle(0x120c28, 1);
    let bx = 0;
    while (bx < width) {
      const bw = Phaser.Math.Between(34, 70);
      const bh = Phaser.Math.Between(60, 170);
      skyline.fillRect(bx, height * 0.62 - bh, bw, bh);
      // a few lit windows
      skyline.fillStyle(0x3aa0c8, 0.5);
      for (let w = 0; w < 3; w++) {
        if (Math.random() > 0.6)
          skyline.fillRect(
            bx + 6 + w * 10,
            height * 0.62 - bh + 10 + Phaser.Math.Between(0, bh - 30),
            5,
            6
          );
      }
      skyline.fillStyle(0x120c28, 1);
      bx += bw + 4;
    }

    // ground
    this.add.rectangle(0, height * 0.62, width, height * 0.4, 0x172a18).setOrigin(0, 0);
    this.add.rectangle(0, height * 0.62, width, 6, 0x000000).setOrigin(0, 0);

    // ground tile lines
    const g = this.add.graphics();
    g.lineStyle(2, 0x0e1f10, 0.6);
    for (let gx = 0; gx < width; gx += 48) {
      g.lineBetween(gx, height * 0.62, gx, height);
    }

    this.scale.on("resize", () => this.scene.restart());
  }
}
