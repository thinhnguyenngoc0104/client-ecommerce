import {createContext, useEffect, useState} from "react";
import {fetchCategories} from "../Service/CategoryService.js";
import {fetchItems} from "../Service/ItemService.js";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [auth, setAuth] = useState({token: null, role: null});
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.itemId === item.itemId)
        if (existingItem) {
            setCartItems(cartItems.map((cartItem) => cartItem.itemId === item.itemId ? {
                ...cartItem,
                quantity: cartItem.quantity + 1
            } : cartItem));
        } else {
            setCartItems([...cartItems, {...item, quantity: 1}]);
        }
    }

    const removeFromCart = (item) => {
        setCartItems(cartItems.filter(cartItem => cartItem.itemId !== item.itemId));
    }

    const updateQuantity = (itemId, newQuantity) => {
        setCartItems(cartItems.map((cartItem) => cartItem.itemId === itemId ? {...cartItem, quantity: newQuantity} : cartItem));
    }

    useEffect(() => {
        async function loadData() {
            const response = await fetchCategories();
            const itemResponse = await fetchItems();
            setCategories(response.data);
            setItems(itemResponse.data);
        }

        loadData();
    }, []);

    const setAuthData = (token, role) => {
        setAuth({token, role});
    }

    const contextValue = {
        categories,
        setCategories,
        items,
        setItems,
        auth,
        setAuthData,
        addToCart,
        cartItems,
        removeFromCart,
        updateQuantity,
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}