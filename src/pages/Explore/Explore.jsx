import './Explore.css'
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import DisplayCategory from "../../components/DisplayCategory/DisplayCategory.jsx";
import DisplayItems from "../../components/DisplayItems/DisplayItems.jsx";
import CustomerForm from "../../components/CustomerForm/CustomerForm.jsx";
import CartItems from "../../components/CartItems/CartItems.jsx";
import CartSummary from "../../components/CartSummary/CartSummary.jsx";

const Explore = () => {
    const {categories} = useContext(AppContext);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");

    return (
        <div className="explore-container row text-light me-0">
            <div className="col-md-8 wrapper p-4">
                <div className="explore-container_child overflow-y-auto">
                    <div className="first-row p-3">
                        <DisplayCategory
                            selectedCategory={selectedCategory}
                            setSelectCategory={setSelectedCategory}
                            categories={categories}/>
                    </div>
                    <div className="second-row overflow-y-auto p-3">
                        <DisplayItems
                            selectedCategory={selectedCategory}/>
                    </div>
                </div>
            </div>
            <div className="col-md-4 wrapper pt-4 pb-4">
                <div className="explore-container_child flex-column">
                    <div className="customer-form-container p-3">
                        <CustomerForm
                            customerName={customerName}
                            setCustomerName={setCustomerName}
                            phone={phone}
                            setPhone={setPhone}/>
                    </div>
                    <div className="cart-items-container overflow-y-auto p-3">
                        <CartItems/>
                    </div>
                    <div className="cart-summary-container overflow-y-auto p-3">
                        <CartSummary
                            customerName={customerName}
                            setCustomerName={setCustomerName}
                            phone={phone}
                            setPhone={setPhone}/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Explore;