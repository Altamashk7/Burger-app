import React from 'react';
import classes from './BuildControl.css';
const buidControl=(props)=>{
    return(
<div className={classes.BuidControl}>
<div className={classes.Label}>{props.Label}</div>
<button className={classes.Less}>Less</button>
<button className={classes.More}>More</button>
</div>

    )
}

export default buidControl ;