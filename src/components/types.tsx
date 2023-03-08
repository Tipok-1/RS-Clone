export interface IOneEnymy{
    firstGolemLive:boolean,
    startAtaka:boolean
}
export interface IAllLiveEnymy{
    FirstGolem:IOneEnymy
}
export interface ICanvasCharacter{
    canvas:null | HTMLCanvasElement,
    ctx: null | CanvasRenderingContext2D,
    image:null | HTMLImageElement,
    frame:number,
    walk:HTMLImageElement,
    corX:number,
    corY:number,
    animationSpeed:number,
    intervalID:NodeJS.Timer | undefined,
    allSteps:number,
    direction:string,
    stepLength:number,
    init:() => void,
    anim:() => void,
    run:() => void,
    render:() => void,
    start:() => void,
    makeStep:() => void,
    moveRight:(jump:boolean)=>void,
    moveLeft:(jump:boolean)=>void,
    move:(dir:string)=>void,
    checkFall:()=>void,
    checkLet:()=>void,
    jump:(str:string, count:number)=>void,
    startJump:number
    fallStep:number,
    resetJump:()=>void,
    resetFall:()=>void,
    die:()=>void,
    newLife:()=>void,
    attack:()=>void,
    bullet:JSX.Element[],
    allLives:number,
    HP:number,
    checkUpBlock:()=>boolean,
    win:()=>void,
    
}
export interface ICharacter extends ICharacterWhithoutState{
    scrollWindow:(obj:ICanvasCharacter)=>void,
    bullet:JSX.Element[],
    setBullet:(bul:JSX.Element[])=>void,
    setBulletChange:(n:number)=>void,
    setNewLive:(l:number)=>void,
    setCharacterHP:(prosent:number)=>void;
    characterHP:number,
    setLevel?:(n:number)=>void
}
export interface ICharacterWhithoutState{
    width:number,
    height:number
    walk:HTMLImageElement,
    walkSpeed:number
    walkSteps: number,
    jump:HTMLImageElement,
    jumpSpeed:number
    jumpSteps: number,
    die:HTMLImageElement,
    dieSpeed:number
    dieSteps: number,
    attack:HTMLImageElement,
    attackSpeed:number
    attackSteps: number,
    HP:number,
    ico?:string,
    myBullet:IBulletWithoutState
}
export interface IBlock extends IBlockWhithoutImage{
    block_image:{
        center_up:string,
        center:string,
        left:string,
        left_up:string,
        right:string,
        right_up:string,
        down:string,
    }
}
export interface IBlockWhithoutImage{
    id?:string,
    height:number,
    width:number,
    top?:number,
    left?:number,
}

export interface IBullet extends IBulletWithoutState{
    speed:number,
    corX:number,
    corY:number,
    direction:string,
    whoseBullet:string,
}
export interface IBulletWithoutState{
    height:number,
    width:number,
    image:HTMLImageElement,
    stepCount:number,
    damage:number,
    offset?:number
}
export interface IEnymy extends IEnemyWhithoutFunc{
    endLeave:()=>void,
    setBullet:(bul:JSX.Element[])=>void,
    setBulletChange:(n:number)=>void,
    newLive:number,
    showHP:boolean,
    itsAuthoriz:boolean
  // startAttack:boolean,
}
export interface IEnemyWhithoutFunc{
    walk: HTMLImageElement,
    walkSteps: number,
    walkAllEnymySteps:number,
    walkSpeed:number,

    stand:HTMLImageElement,
    standSteps: number
    standAllEnymySteps:number,
    standSpeed:number,

    die:HTMLImageElement,
    dieSteps: number
    dieAllEnymySteps:number,
    dieSpeed:number,

    atack:HTMLImageElement,
    atackSteps: number
    atackAllEnymySteps:number,
    atackSpeed:number,

    width: number,
    height:number,
    left:number,
    top:number,
    rightDirection:boolean,
    key:string,
    HP:number,

    myBullet?:IBulletWithoutState
}