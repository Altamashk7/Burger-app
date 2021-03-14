import React,{Component} from 'react';
import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 10,
    cheese: 20,
    meat: 30,
    bacon: 25
};
class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,  //for order button
        purchasing:false,
        loading:false

    }

//for checking purchasble or not after each is added

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {                                       //calcuating no of ingredients
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);                              //function calling after ingrdient is added 
                                                                                //argumrnt helps in updating 135
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);   //function calling after ingredient is removed
    }


    purchaseHandler = () => {
        this.setState({purchasing: true});     //for displaying modal fired by order button 
    }


    purchaseCancelHandler = () => {
        this.setState({purchasing: false});         // for hiding modal fired by clicking backdrop
    }

    purchaseContinueHandler = () => {
    //   //  alert('You continue!');                  //ordersumary continue



    //       // alert('You continue!');
    //       this.setState( { loading: true } );
    //       const order = {
    //           ingredients: this.state.ingredients,
    //           price: this.state.totalPrice,
    //           customer: {
    //               name: 'Altamash',
    //               address: {
    //                   street: 'Teststreet 1',
    //                   zipCode: '0000',
    //                   country: 'india'
    //               },
    //               email: 'test@test.com'
    //           },
    //           deliveryMethod: 'fastest'
    //       }
    //           axios.post( '/orders.json', order )
    //          .then( response => {
    //              this.setState({ loading: false, purchasing: false });
    //        } )
    //         .catch( error => {
    //             this.setState({ loading: false, purchasing: false });
    //         } );



    //for storing ingredients
    //225
    //pasing ingredients through query pram
    const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        //encodeuricomponent is used to convert any thing in url format
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }


    render () {
        const disabledInfo = {
            ...this.state.ingredients               //for disabling ingredient less button
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        let orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
    if ( this.state.loading ) {
        orderSummary = <Spinner />;
    }
        return (
            <Aux>

                <Modal show={this.state.purchasing}  modalClosed={this.purchaseCancelHandler}> 
                   {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Aux>                                    //ordered for order button

        );
    }
}


export default withErrorHandler( BurgerBuilder, axios );