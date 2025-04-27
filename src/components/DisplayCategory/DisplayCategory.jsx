import './DisplayCategory.css'
import Category from "../Category/Category.jsx";
import {assets} from "../../assets/assets.js";

const DisplayCategory = ({selectedCategory, setSelectCategory, categories}) => {
    return (
        <div className="row g-3 w-100 m-0">
            <div className="col-md-3 col-sm-6 pe-1 ps-1" key="all">
                <Category
                    categoryName="All Items"
                    imgUrl={assets.upload}
                    numberOfItems={categories.reduce((acc, curr) => acc + curr.items, 0)}
                    bgColor="#6c757d"
                    isSelected={selectedCategory === ""}
                    onClick={() => setSelectCategory("")}
                />
            </div>

            {categories.map((category) => (
                <div className="col-md-3 col-sm-6 pe-1 ps-1" key={category.categoryId}>
                    <Category
                        categoryName={category.name}
                        imgUrl={category.imgUrl}
                        numberOfItems={category.items}
                        bgColor={category.bgColor}
                        isSelected={selectedCategory === category.categoryId}
                        onClick={() => setSelectCategory(category.categoryId)}
                    />
                </div>
            ))}
        </div>
    )
}

export default DisplayCategory;