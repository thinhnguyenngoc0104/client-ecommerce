import './Explore.css'
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";

const Explore = () => {
    const {categories} = useContext(AppContext);
    console.log(categories);

    return (
        <div className="explore-container row text-light">
            <div className="col-md-6 wrapper p-4">
                <div className="explore-container_child overflow-y-auto">
                    <div className="first-row p-3">
                        categories
                    </div>
                    <div className="second-row overflow-y-auto p-3">
                        items
                    </div>
                </div>
            </div>
            <div className="col-md-6 wrapper pt-4 pe-4 pb-4">
                <div className="explore-container_child flex-column">
                    <div className="customer-form-container p-3">
                        customer form
                    </div>
                    <div className="cart-items-container overflow-y-auto p-3">
                        cart item
                    </div>
                    <div className="cart-summary-container overflow-y-auto p-3">
                        cart summary
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Explore;