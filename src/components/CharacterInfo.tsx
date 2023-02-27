import { ICharacterWhithoutState, IBulletWithoutState} from "./types";
import character_1_walk from '../assets/Sprites/Character/walk/walk.png'
import character_1_jump from '../assets//Sprites/Character/jump/jump.png'
import character_1_die from '../assets//Sprites/Character/die/die.png'
import character_1_attack from '../assets//Sprites/Character/attack/attack.png'
import character_1_ico from '../assets/Sprites/Character/ico.png'
import knife_image from '../assets/Sprites/Character/knife/knife.png' 

import character_2_walk from '../assets/Sprites/Character2/walk/walk.png'
import character_2_jump from '../assets//Sprites/Character2/jump/jump.png'
import character_2_die from '../assets//Sprites/Character2/die/die.png'
import character_2_attack from '../assets//Sprites/Character2/attack/attack.png'
import character_2_ico from '../assets/Sprites/Character2/ico.png'
import bullet from '../assets/Sprites/Character2/bullet/bullet.png' 

export let character1:ICharacterWhithoutState ={
    width:156.78,
    height:159,
    HP:150,
    ico:character_1_ico,

    walkSteps:14,
    walk:character_1_walk,
    walkSpeed:4,

    jumpSteps:7,
    jump:character_1_jump,
    jumpSpeed:15,

    dieSteps:6,
    die:character_1_die,
    dieSpeed:135,

    attackSteps:5,
    attack:character_1_attack,
    attackSpeed:100,

    myBullet:{
        height:40,
        width:40,
        image:knife_image,
        stepCount:8,
        damage:20,
        offset:-5,
    }
}

export let character2:ICharacterWhithoutState ={
    width:156.78,
    height:159,
    HP:150,
    ico:character_2_ico,

    walkSteps:10,
    walk:character_2_walk,
    walkSpeed:4,

    jumpSteps:6,
    jump:character_2_jump,
    jumpSpeed:15,

    dieSteps:6,
    die:character_2_die,
    dieSpeed:100,

    attackSteps:5,
    attack:character_2_attack,
    attackSpeed:2,

    myBullet:{
        height:10,
        width:10,
        image:bullet,
        stepCount:5,
        damage:25,
        offset:20,
    }
}