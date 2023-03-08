import { ICharacterWhithoutState} from "./types";
import character_1_ico from '../assets/Sprites/Character/ico.png'
import character_2_ico from '../assets/Sprites/Character2/ico.png'

interface Image{
    walk:HTMLImageElement,
    jump:HTMLImageElement,
    die:HTMLImageElement,
    atack:HTMLImageElement,
    bullet:HTMLImageElement,
}

export function ch1(img:Image){
    return{
    width:156.78,
    height:159,
    HP:150,
    ico:character_1_ico,

    walkSteps:14,
    walk:img.walk,
    walkSpeed:4,

    jumpSteps:7,
    jump:img.jump,
    jumpSpeed:15,

    dieSteps:6,
    die:img.die,
    dieSpeed:135,

    attackSteps:5,
    attack:img.atack,
    attackSpeed:100,

    myBullet:{
        height:40,
        width:40,
        image:img.bullet,
        stepCount:8,
        damage:20,
        offset:-5,
    }
    }
}

export function ch2(img:Image){
    return {
    width:156.78,
    height:159,
    HP:150,
    ico:character_2_ico,

    walkSteps:10,
    walk:img.walk,
    walkSpeed:4,

    jumpSteps:6,
    jump:img.jump,
    jumpSpeed:15,

    dieSteps:6,
    die:img.die,
    dieSpeed:100,

    attackSteps:5,
    attack:img.atack,
    attackSpeed:100,

    myBullet:{
        height:10,
        width:10,
        image:img.bullet,
        stepCount:5,
        damage:25,
        offset:20,
    }
    }
}