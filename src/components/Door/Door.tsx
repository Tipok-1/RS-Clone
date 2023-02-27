import React from 'react';
import './Door.css'
interface IDoor{
    wallImage:string,
    wallLeft:number,
    wallTop:number,
    doorImage:string,
    doorHeight:number,
    doorWidth:number,
}
const Door = (props:IDoor) => {

    return (
        <div id='castle'
        style={{
            position:'absolute',
            width:'300px',
            height:'900px',
            backgroundImage:`url(${props.wallImage}`,
            left:props.wallLeft+'px',
            top:props.wallTop + 'px',
        }}>
            <div id='door'
            style={{
                height:props.doorHeight +'px',
                width:props.doorWidth + 'px',
                backgroundImage:`url(${props.doorImage}`
            }}></div>
        </div>
    );
};

export default Door;