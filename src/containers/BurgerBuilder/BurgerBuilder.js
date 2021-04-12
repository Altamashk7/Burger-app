import React,{Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions'; 

class BurgerBuilder extends Component{
    state = {
      
    
        purchasing: false,
        loading: false,
        error: false

    }

//for checking purchasble or not after each is added

updatePurchaseState ( ingredients ) {
    const sum = Object.keys( ingredients )
        .map( igKey => {
            return ingredients[igKey];
        } )                                                           //calculating price logic
        .reduce( ( sum, el ) => {
            return sum + el;
        }, 0 );
    return sum > 0;
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
            ...this.props.ings              //for disabling ingredient less button
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        let orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.price}
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
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}   //they recive props from buildcontrol.js as ctrl.type
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    price={this.props.price} />
            </Aux>                                    //ordered for order button

        );
    }
}

//redux
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));