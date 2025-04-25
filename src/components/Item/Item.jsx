import './Item.css'
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";

const Item = ({itemName, itemPrice, itemImage, itemId}) => {
    const {addToCart} = useContext(AppContext);
    const handleAddToCart = () => {
        addToCart({
            name: itemName,
            price: itemPrice,
            quantity: 1,
            itemId: itemId,
        })
    }

    return (
        <div className="p-2 bg-dark rounded shadow-sm h-100 d-flex align-items-center item-card">
            <div className="position-relative ms-2">
                <img className="item-img" src={itemImage} alt={itemName}/>
            </div>
            <div className="flex-grow-1 ms-2">
                <p className="mb-1 text-light">{itemName}</p>
                <span className="badge rounded-pill text-bg-warning">${itemPrice}</span>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <i className="bi bi-cart-plus-fill fs-4 text-warning-emphasis"></i>
                <button type="button" className="btn btn-success btn-sm mt-2" onClick={handleAddToCart}>
                    <i className="bi bi-plus"></i>
                </button>
            </div>
        </div>
    )
}

export default Item;