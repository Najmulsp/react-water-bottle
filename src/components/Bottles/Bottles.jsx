import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLs, getStoredCart, removeFromLs} from "../../Utilities/localStorage";
import Cart from "../Cart/Cart";


const Bottles = () => {
    const [bottles,setBottles] =useState([]);
    const [cart,setCart] =useState([]);

    const handleAddToCart = bottle =>{
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLs(bottle.id);
    }

const handleRemoveFromCart = (id) =>{
    // remove from ui display
    const remainingCart = cart.filter(bottle => bottle.id !== id);
    setCart(remainingCart);

    // remove from LocalStorage
    removeFromLs(id);

}

    useEffect(() =>{
        fetch('Bottles.json')
        .then(res => res.json())
        .then(data => setBottles(data))

    },[])

    // load cart from local storage
    useEffect(() =>{
        if(bottles.length > 0){
            const storedCart = getStoredCart();
            console.log(storedCart, bottles);
                const savedCart = [];
            for(const id of storedCart){
                console.log(id);
                const bottle = bottles.find(bottle => bottle.id ===id);
                if(bottle){
                    savedCart.push(bottle);
                }
            }
            console.log(savedCart);
            setCart(savedCart);
        }
    },[bottles])




    return (
        <>
            <h2>Available Bottles: {bottles.length}</h2>
            {/* <h3>Cart {cart.length}</h3> */}
            <Cart cart= {cart} handleRemoveFromCart= {handleRemoveFromCart} ></Cart>
            <div className="bottles-container">
            
                {
                  bottles.map(bottle =><Bottle 
                    key ={bottle.id} 
                    bottle = {bottle}
                    handleAddToCart = {handleAddToCart}
                     ></Bottle>)
                }
            </div>
        </>
    );
};

export default Bottles;