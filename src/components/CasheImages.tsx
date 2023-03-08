import walk from '../assets/Sprites/Goblin sprite/walk/walk.png'
import stand from '../assets/Sprites/Goblin sprite/stand/stand.png'
import atack from '../assets/Sprites/Goblin sprite/attack/attack.png'
import die from '../assets/Sprites/Goblin sprite/die/die.png'
import bull from '../assets/Sprites/Goblin sprite/bullet/bullet.png'


import walk2 from '../assets/Sprites/Golem sprite/walk/walk.png'
import stand2 from '../assets/Sprites/Golem sprite/stand/stand.png'
import atack2 from '../assets/Sprites/Golem sprite/atack/atack.png'
import die2 from '../assets/Sprites/Golem sprite/die/die.png'
import bull2 from '../assets/Sprites/Golem sprite/bullet/bullet.png'

import character_1_walk from '../assets/Sprites/Character/walk/walk.png'
import character_1_jump from '../assets//Sprites/Character/jump/jump.png'
import character_1_die from '../assets//Sprites/Character/die/die.png'
import character_1_attack from '../assets//Sprites/Character/attack/attack.png'
import knife_image from '../assets/Sprites/Character/knife/knife.png' 

import character_2_walk from '../assets/Sprites/Character2/walk/walk.png'
import character_2_jump from '../assets//Sprites/Character2/jump/jump.png'
import character_2_die from '../assets//Sprites/Character2/die/die.png'
import character_2_attack from '../assets//Sprites/Character2/attack/attack.png'
import bullet from '../assets/Sprites/Character2/bullet/bullet.png' 

import character_1_ico from '../assets/Sprites/Character/ico.png'
import character_2_ico from '../assets/Sprites/Character2/ico.png'
import fon from '../assets/f1.gif'
import GolemImage from '../assets/golem_bigImage.png'
import background from '../assets/level1.png'
import center_up from  '../assets/blocks/center_up.png'
import center from  '../assets/blocks/center.png'
import left from  '../assets/blocks/left.png'
import left_up from  '../assets/blocks/left_up.png'
import right from  '../assets/blocks/right.png'
import right_up from  '../assets/blocks/right_up.png'
import down from  '../assets/blocks/down.png'
import background2 from '../assets/level2.jpg'
import center_up2 from  '../assets/blocks2/center_up.png'
import center2 from  '../assets/blocks2/center.png'
import left2 from  '../assets/blocks2/left.png'
import left_up2 from  '../assets/blocks2/left_up.png'
import right2 from  '../assets/blocks2/right.png'
import right_up2 from  '../assets/blocks2/right_up.png'
import down2 from  '../assets/blocks2/down.png'
import goMenu from '../assets/goMenu.png'
import menuImage from '../assets/menu.jpg'
import wallImage from '../assets/brick.png'
import openDoorImage from '../assets/open_door.png'
import healthImage from '../assets/serdce.png'
import back from '../assets/back.png'
import win from '../assets/win.jpg'
import retry from '../assets/retry.png'
import loze from '../assets/Loze.jpg'
import arrow from '../assets/arrows.png'
import space from '../assets/space.png'

async function loadImage(img:string[]){
    let image:HTMLImageElement[] = img.map(i=>{
        let im = new Image()
        im.src = i;
        return im;
    })
    return Promise.all(image.filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
        return image;
    });
}

let firstLevelImage = loadImage([walk, stand, die, atack, bull]);

let secondLevelImage = loadImage([walk2, stand2, die2, atack2, bull2])

let firstCharacter = loadImage([character_1_walk, character_1_jump, character_1_die, character_1_attack, knife_image]);

let secondCharacter = loadImage([character_2_walk, character_2_jump, character_2_die, character_2_attack, bullet]);

let otherImage = loadImage([fon, character_1_ico, character_2_ico, GolemImage, background, center_up, center, left, left_up, right, right_up, down,background2,
    center_up2, center2, left2, left_up2, right2, right_up2, down2, goMenu, menuImage, wallImage, openDoorImage, healthImage, back, win, retry, loze, arrow, space]);



export {firstLevelImage, secondLevelImage, firstCharacter, secondCharacter, otherImage};
