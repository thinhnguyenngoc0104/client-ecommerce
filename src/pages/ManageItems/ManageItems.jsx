import './ManageItems.css'
import ItemForm from "../../components/ItemForm/ItemForm.jsx";
import ItemList from "../../components/ItemList/ItemList.jsx";

const ManageItems = () => {
    return (
        <div className="container-fluid bg-black items-container text-light">
            <div className="row h-100">
                <div className="col-md-8 ps-4 pt-4 pb-4">
                    <div className="items-border h-100 p-4">
                        <ItemForm/>
                    </div>
                </div>
                <div className="col-md-4 p-4">
                    <div className="items-border h-100 p-4 flex-column">
                        <ItemList/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ManageItems;