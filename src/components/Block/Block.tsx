import React from 'react';
import './Block.css'
import { IBlock } from '../types';
import { v4 as uuid } from 'uuid';


const Block = (props:IBlock) => {
    let w_count = props.width / 100;
    let h_count = props.height /100;
    let img:string[][] = [];
    for(let i = 0; i<h_count; i++)
    {
        let b =[]
        for(let j = 0; j<w_count; j++)
        {
            if(i == 0 && j == 0){b.push(props.block_image.left_up)}
            else if(i == 0 && j == w_count - 1){b.push(props.block_image.right_up)}
            else if(i == 0 && j != 0){b.push(props.block_image.center_up)}
            else if(i == h_count - 1){b.push(props.block_image.down)}
            else if(i !=0 && j == 0){b.push(props.block_image.left)}
            else if(i != 0 && j== w_count-1){b.push(props.block_image.right)}
            else if(i != 0 && j != 0){b.push(props.block_image.center)}
        }
        img.push(b);
    }
    return (
        <div style ={{
            top:`${props.top}px`,
            position:'absolute',
            left:props.left + 'px',
            height:props.height + 10 + 'px',
            width:props.width + 'px',
            backgroundSize:'contain'
        }}>
            {
                img.map(el=>{
                    return(
                    <div 
                    key={uuid()}
                    className='blockParent' 
                    style={{
                        display:'flex'
                    }}>
                       {el.map(b=>{
                            return(
                                <div 
                                key={uuid()}
                                className='blockParent'>
                                    <div className='block'></div>
                                    <div className='blockParent'
                                    style ={{
                                        height:100 + 'px',
                                        width:100+ 'px',
                                        backgroundImage:`url(${b})`,
                                    }}>
            
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    )
            })
            }
        </div>
    );
};

export default Block;