import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
import {deleteItem} from "../../Service/ItemService.js";

const ItemList = () => {
    const {items, setItems} = useContext(AppContext);
    const [search, setSearch] = useState("");

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    )

    const deleteByItemId = async (itemId) => {
        try {
            const response = await deleteItem(itemId);
            if (response.status === 204) {
                const postRemoval = items.filter(item => item.itemId !== itemId);
                setItems(postRemoval);
                toast.success("Item deleted successfully.");
            } else {
                toast.error("Unable to delete item.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Unable to delete item.");
        }
    }

    return (
        <div className="item-list-container overflow-y-auto overflow-x-hidden h-100 text-light">
            <div className="row pe-2">
                <div className="input-group mb-1">
                    <input type="text"
                           name="keyword"
                           id="keyword"
                           className="form-control"
                           placeholder="Search..."
                           onChange={(e) => setSearch(e.target.value)}
                           value={search}/>
                    <span className="input-group-text bg-warning">
                        <i className="bi bi-search"></i>
                    </span>
                </div>
            </div>
            <div className="row pe-2">
                {filteredItems.map((item, index) => (
                    <div key={index} className="col-md-12 mt-3">
                        <div className="card p-3 bg-dark">
                            <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <img src={item.imgUrl} alt={item.name} className="category-img"/>
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="mb-1 text-light">{item.name}</h5>
                                    <p className="mb-1 text-light">Category: {item.categoryName}</p>
                                    <span className="badge rounded-pill text-bg-warning">
                                        {item.price}
                                    </span>
                                </div>
                                <div>
                                    <button className="btn btn-danger btn-sm"
                                            type="button"
                                            onClick={() => deleteByItemId(item.itemId)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ItemList;