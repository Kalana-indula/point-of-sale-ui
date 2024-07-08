import React, { createContext, useState } from "react";

export const CartContext=createContext();

export const CartProvider=({children})=>{
    const [orderProducts,setOrderProducts]=useState([]);

    const addToCart=(product)=>{
        setOrderProducts([...orderProducts,product]);
    };

    return(
        <CartContext.Provider value={{orderProducts,addToCart,setOrderProducts}}>
            {children}
        </CartContext.Provider>
    );
};