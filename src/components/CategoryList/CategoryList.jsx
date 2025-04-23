import './CategoryList.css'
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import {deleteCategory} from "../../Service/CategoryService.js";
import toast from "react-hot-toast";

const CategoryList = () => {
    const {categories, setCategories} = useContext(AppContext);
    const [search, setSearch] = useState("");

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(search.toLowerCase())
    )

    const deleteByCategoryId = async (categoryId) => {
        try {
            const response = await deleteCategory(categoryId);
            if (response.status === 204) {
                const postRemoval = categories.filter(category => category.categoryId !== categoryId);
                setCategories(postRemoval);
                toast.success("Category deleted successfully.");
            } else {
                toast.error("Unable to delete category.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Unable to delete category.");
        }
    }

    return (
        <div className="category-list-container overflow-y-auto overflow-x-hidden h-100 text-light">
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
                {filteredCategories.map((category, index) => (
                    <div key={index} className="col-md-12 mt-3">
                        <div className="card p-3" style={{backgroundColor: category.bgColor}}>
                            <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <img src={category.imgUrl} alt={category.name} className="category-img"/>
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="mb-1 text-light">{category.name}</h5>
                                    <p className="mb-0 text-light">{category.items} Items</p>
                                </div>
                                <div>
                                    <button className="btn btn-danger btn-sm"
                                            type="button"
                                            onClick={() => deleteByCategoryId(category.categoryId)}>
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

export default CategoryList;