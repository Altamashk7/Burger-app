import React from 'react';


import Aux from '../../../hoc/Auxi';
 const ordersummary=(props)=>{
    const ingredientSummary = Object.keys( props.ingredients )
    .map( igKey => {
        return (
            <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
            </li> );
    } );

return(
<Aux>
<h3>Burger is ready dude or madame</h3>
<ul>{ingredientSummary}</ul>





</Aux>


)



 }
  export default ordersummary;