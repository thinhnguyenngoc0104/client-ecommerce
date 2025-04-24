import {assets} from "../../assets/assets.js";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
import {addItem} from "../../Service/ItemService.js";

const ItemForm = () => {
    const {categories, setCategories, items, setItems} = useContext(AppContext);

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        price: "",
        description: "",
        categoryId: "",
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!image) {
            toast.error("Please upload an image!");
        }
        const formData = new FormData();
        setLoading(true);
        formData.append("item", JSON.stringify(data));
        formData.append("file", image);

        try {
            const response = await addItem(formData);
            if (response.status === 201) {
                setItems([...items, response.data]);
                setCategories((prevCategories) =>
                    prevCategories.map((category) =>
                    category.categoryId === data.categoryId ? {...category, items: category.items + 1} : category));
                toast.success("Item added!");
                setData({
                    name: "",
                    price: "",
                    description: "",
                    categoryId: "",
                })
                setImage(false);
            }
        } catch (err) {
            console.log(err);
            toast.error("Error adding item!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mt-2">
            <div className="card container-fluid">
                <div className="card-body">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                <img src={image ? URL.createObjectURL(image) : assets.upload}
                                     alt="" width={48}/>
                            </label>
                            <input type="file" name="image"
                                   id="image" className="form-control" hidden
                                   onChange={(e) => setImage(e.target.files[0])}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" name="name"
                                   id="name" className="form-control"
                                   placeholder="Item Name"
                                   onChange={onChangeHandler}
                                   value={data.name}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="categoryId" className="form-label">Category</label>
                            <select name="categoryId" id="categoryId" className="form-control"
                                    onChange={onChangeHandler}
                                    value={data.categoryId}>
                                <option value="">--SELECT CATEGORY--</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.categoryId}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" name="price"
                                   id="price" className="form-control"
                                   placeholder="$200"
                                   onChange={onChangeHandler}
                                   value={data.price}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea name="description" id="description"
                                      className="form-control" rows="5"
                                      placeholder="Write content here..."
                                      onChange={onChangeHandler}
                                      value={data.description}/>
                        </div>
                        <button type="submit" className="btn btn-warning w-100"
                                disabled={loading}>{loading ? "Loading..." : "Save"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ItemForm;