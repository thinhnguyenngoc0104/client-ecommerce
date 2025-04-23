import {useContext, useEffect, useState} from "react";
import {assets} from "../../assets/assets.js";
import toast from "react-hot-toast";
import {addCategory} from "../../Service/CategoryService.js";
import {AppContext} from "../../context/AppContext.jsx";

const CategoryForm = () => {
    const {categories, setCategories} = useContext(AppContext);

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        bgColor: "#2c2c2c",
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
        formData.append("category", JSON.stringify(data));
        formData.append("file", image);

        try {
            const response = await addCategory(formData);
            if (response.status === 201) {
                setCategories([...categories, response.data]);
                toast.success("Category added!");
                setData({
                    name: "",
                    description: "",
                    bgColor: "#2c2c2c",
                })
                setImage(false);
            }
        } catch (err) {
            console.log(err);
            toast.error("Error adding category!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mt-2">
            <div className="card form-container">
                <div className="card-body">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                <img src={image ? URL.createObjectURL(image) : assets.upload}
                                     alt="" width={48}/>
                            </label>
                            <input type="file"
                                   name="image"
                                   id="image"
                                   className="form-control"
                                   hidden
                                   onChange={(e) => setImage(e.target.files[0])}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text"
                                   name="name"
                                   id="name"
                                   className="form-control"
                                   placeholder="Category Name"
                                   onChange={onChangeHandler}
                                   value={data.name}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea name="description"
                                      id="description"
                                      className="form-control" rows="5"
                                      placeholder="Category Description"
                                      onChange={onChangeHandler}
                                      value={data.description}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bgColor" className="form-label">Background Color</label>
                            <br/>
                            <input type="color"
                                   name="bgColor"
                                   id="bgColor"
                                   placeholder="#ffffff"
                                   onChange={onChangeHandler}
                                   value={data.bgColor}/>
                        </div>
                        <button type="submit"
                                disabled={loading}
                                className="btn btn-warning w-100">{loading ? "Loading..." : "Submit"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CategoryForm;