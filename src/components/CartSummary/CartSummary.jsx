import './CartSummary.css'
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import {addOrder, deleteOrder} from "../../Service/OrderService.js";
import toast from "react-hot-toast";
import STRIPE_KEY from "../../constant/Key.js";
import {addCharge} from "../../Service/PaymentService.js";

const CartSummary = ({customerName, setCustomerName, phone, setPhone}) => {
    const {cartItems, clearCart} = useContext(AppContext);

    const [isProcessing, setIsProcessing] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const totalAmount = cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    const tax = totalAmount * 0.01;
    const grandTotal = totalAmount + tax;

    const clearAll = () => {
        setCustomerName("");
        setPhone("");
        clearCart();
    }

    const placeOrder = () => {
        setShowPopup(true);
        clearAll();
    }

    const handlePrintReceipt = () => {
        window.print();
    }

    const loadStripeScript = () => {
        return new Promise((resolve, reject) => {
            if (window.StripeCheckout) {
                return resolve(true);
            }

            const script = document.createElement('script');
            script.src = "https://checkout.stripe.com/checkout.js";
            script.async = true;

            script.onload = () => {
                resolve(true);
                if (script.parentNode) script.parentNode.removeChild(script);
            };

            script.onerror = () => {
                reject(new Error("Failed to load Stripe script"));
                if (script.parentNode) script.parentNode.removeChild(script);
            };

            document.body.appendChild(script);
        });
    };

    const deleteOrderOnFailure = async (orderId) => {
        try {
            await deleteOrder(orderId);
            toast.error("Order deleted due to stripe errors");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const completePayment = async (paymentMethod) => {
        if (!customerName || !phone) {
            toast.error("Please enter valid customer details");
            return;
        }
        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }
        const order = {
            customerName,
            phone,
            cartItems,
            subtotal: totalAmount,
            tax,
            grandTotal,
            paymentMethod: paymentMethod.toUpperCase(),
        }
        console.log(order);
        setIsProcessing(true);
        try {
            const response = await addOrder(order);
            const savedData = response.data;
            if (response.status === 201 && paymentMethod === "cash") {
                toast.success("Payment completed successfully");
                setOrderDetails(savedData);
            } else if (response.status === 201 && paymentMethod === "upi") {
                try {
                    // Load Stripe script
                    const stripeLoaded = await loadStripeScript();
                    if (!stripeLoaded) {
                        toast.error("Unable to load Stripe");
                        await deleteOrderOnFailure(savedData.orderId);
                        return;
                    }

                    // Configure Stripe Checkout
                    const stripeHandler = window.StripeCheckout.configure({
                        key: STRIPE_KEY,
                        locale: "auto",
                        currency: "usd",
                        token: async (token) => {
                            try {
                                // Prepare data for addCharge
                                const chargeData = {
                                    amount: grandTotal, // Amount in cents
                                    currency: "usd",
                                    source: token.id, // Stripe token
                                    description: `Payment for order #${savedData.orderId}`,
                                };

                                // Call addCharge to process payment
                                const responseCharge = await addCharge(chargeData);

                                if (!responseCharge || responseCharge.status !== 201) {
                                    setIsProcessing(false);
                                    toast.success("Payment failed!");
                                    await deleteOrderOnFailure(savedData.orderId);
                                    return;
                                }
                                setIsProcessing(false);
                                setOrderDetails(savedData);
                                toast.success("Payment completed successfully");
                            } catch (error) {
                                console.error("Payment error:", error);
                                toast.error(error.message || "Payment failed");
                                await deleteOrderOnFailure(savedData.orderId);
                            }
                        },
                        // closed: async () => {
                        //     if (!charge) {
                        //         setIsProcessing(false);
                        //         toast.error("Payment failed!");
                        //     }
                        // },
                    });

                    // Open Stripe Checkout
                    stripeHandler.open({
                        name: "Ecommerce",
                        description: `Order #${savedData.orderId}`,
                        amount: Math.round(grandTotal * 100), // Amount in cents
                    });
                } catch (error) {
                    console.error("Stripe error:", error);
                    toast.error(error.message || "Payment initiation failed");
                    await deleteOrderOnFailure(savedData.orderId);
                    setIsProcessing(false);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Create order failed");
            setIsProcessing(false);
        }
    }

    return (
        <div className="mt-2">
            <div className="cart-summary-details">
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light">Item:</span>
                    <span className="text-light">{totalAmount.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light">Tax (1%):</span>
                    <span className="text-light">{tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-light">Total:</span>
                    <span className="text-light">{grandTotal.toFixed(2)}</span>
                </div>
            </div>

            <div className="d-flex gap-3">
                <button className="btn btn-success flex-grow-1"
                        onClick={() => completePayment("cash")}
                        disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Cash"}
                </button>
                <button className="btn btn-primary flex-grow-1"
                        onClick={() => completePayment("upi")}
                        disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "UPI"}
                </button>
            </div>
            <div className="d-flex gap-3 mt-3">
                <button className="btn btn-warning flex-grow-1"
                onClick={placeOrder}
                disabled={isProcessing || !orderDetails}>
                    Place Order
                </button>
            </div>
            {/*<ReceiptPopup/>*/}
        </div>
    )
}

export default CartSummary;