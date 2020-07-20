import React from 'react';

import classes from './Modal.css';

 const modal =(props)=>
 (   //style for showing modal with transistion
<div className={classes.Modal}
       style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
    }}>
{props.children}


</div>




    
 );

 export default modal;
