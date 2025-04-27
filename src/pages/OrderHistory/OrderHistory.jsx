import './OrderHistory.css';
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import item from "../../components/Item/Item.jsx";
import {fetchLastestOrders} from "../../Service/OrderService.js";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchLastestOrders();
                setOrders(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
                toast.error("Error fetching orders...");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    const formatItems = (items) => {
        return items.map((item) => `${item.name} x ${item.quantity}`).join(', ');
    }

    const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }
        return new Date(date).toLocaleDateString('en-US', options);
    }

    if (loading) {
        return <div className="text-center py-4">Loading orders</div>
    }

    if (orders.length === 0) {
        return <div className="text-center py-4">No orders found</div>
    }

    return (
        <div className="order-history p-4">
            <h2 className="text-light">Recent Orders</h2>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th>OrderId</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.customerName} <br/>
                                <small className="text-muted">{order.phone}</small>
                            </td>
                            <td>{formatItems(order.cartItems)}</td>
                            <td>{order.grandTotal}</td>
                            <td>{order.paymentMethod}</td>
                            <td>
                                <span className={`badge ${order.paymentDetails?.status === "COMPLETED"} ? bg-success : bg-warning text-dark`}>
                                    {order.paymentDetails?.status || "PENDING"}
                                </span>
                            </td>
                            <td>{formatDate(order.createdAt)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderHistory;