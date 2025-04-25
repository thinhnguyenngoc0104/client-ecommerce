import './Category.css'

const Category = ({categoryName, imgUrl, numberOfItems, bgColor, isSelected, onClick}) => {
    return (
        <div className="d-flex align-items-center p-2 rounded gap-2 position-relative category-hover"
        style={{backgroundColor: bgColor, cursor: 'pointer'}}
        onClick={onClick}>
            <div className="position-relative ms-2">
                <img src={imgUrl} alt={categoryName} className="category-img" />
            </div>
            <div className="ps-2">
                <h6 className="text-light mb-0">{categoryName}</h6>
                <p className="text-light mb-0">{numberOfItems} Items</p>
            </div>
            {isSelected && <div className="active-category"></div>}
        </div>
    )
}

export default Category;