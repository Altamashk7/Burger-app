import React from 'react';
import Aux from '../../../hoc/Auxi';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

 const modal =(props)=>
 (   //style for showing modal with transistion

 <Aux>
     <Backdrop show={props.show} clicked={props.modalClosed}/>
<div className={classes.Modal}
       style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',  /*for transation of nav during mobile device8*/ /**for hiding and showing model */
        opacity: props.show ? '1' : '0'
    }}>
{props.children}


</div>
</Aux>




    
 );

 export default modal;
