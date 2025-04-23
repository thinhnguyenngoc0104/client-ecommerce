const ItemForm = () => {
    return (
        <div className="mt-2">
            <div className="card col-md-8 form-container">
                <div className="card-body">
                    <form action="">
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                <img src="https://placehold.co/48x48" alt="" width={48}/>
                            </label>
                            <input type="file" name="image" id="image" className="form-control" hidden/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" name="name" id="name" className="form-control" placeholder="Item Name"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select name="category" id="category" className="form-control">
                                <option value="">--SELECT CATEGORY--</option>
                                <option value="Category 1">Category 1</option>
                                <option value="Category 2">Category 2</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" name="price" id="price" className="form-control" placeholder="$200"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea name="description" id="description" className="form-control" rows="5" placeholder="Write content here..."/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bgColor" className="form-label">Background Color</label>
                            <br/>
                            <input type="color" name="bgColor" id="bgColor" placeholder="#ffffff"/>
                        </div>
                        <button type="submit" className="btn btn-warning w-100">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ItemForm;