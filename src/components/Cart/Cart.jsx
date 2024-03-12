import PropTypes from 'prop-types';

import './Cart.css'
const Cart = ({cart,handleRemoveFromCart}) => {
    return (
        <div>
            <h3>Selected Cart: {cart.length}</h3>
            <div className="cart-container">
                {cart.map(bottle=>
                     <div className="img-container" key={bottle.id}>
                    <img src={bottle.img}></img>
                    <br/>
                    <button style={{padding:'20px'}} onClick={()=> handleRemoveFromCart(bottle.id)}>Remove</button>
                </div>)}
            </div>
        </div>
    );
};

Cart.propTypes ={
    cart: PropTypes.array.isRequired,
    handleRemoveFromCart: PropTypes.func.isRequired
}

export default Cart;