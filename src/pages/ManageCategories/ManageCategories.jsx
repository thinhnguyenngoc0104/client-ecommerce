import './ManageCategories.css'
import CategoryForm from "../../components/CategoryForm/CategoryForm.jsx";
import CategoryList from "../../components/CategoryList/CategoryList.jsx";

const ManageCategories = () => {
    return (
        <div className="container-fluid bg-black categories-container text-light">
            <div className="row h-100">
                <div className="col-md-8 ps-4 pt-4 pb-4">
                    <div className="categories-border h-100 p-4">
                        <CategoryForm/>
                    </div>
                </div>
                <div className="col-md-4 p-4">
                    <div className="categories-border h-100 p-4 flex-column">
                        <CategoryList/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ManageCategories;