import Compositor from './Compositor.js';
import { loadLevel } from './loaders.js';
import { loadMarioSprite, loadBackgroundSprites } from './sprites.js';
import { createBackgrounLayer } from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(sprites, pos) {
    return function drawSpriteLayer(context) {
        for (let i = 0; i < 20; ++i) {
            sprites.draw('idle', context, pos.x + i * 16, pos.y);
        }
    };
}

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1')
]).then(([marioSprite, backgroundSprites, level]) => {
    const comp = new Compositor();

    const drawBackgroundLayer = createBackgrounLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(drawBackgroundLayer);

    const pos = {
        x: 0,
        y: 0
    };

    const spriteLayer = createSpriteLayer(marioSprite, pos);
    comp.layers.push(spriteLayer);

    function update() {
        comp.draw(context);
        pos.x += 2;
        pos.y += 2;
        requestAnimationFrame(update);
    }

    update();
});