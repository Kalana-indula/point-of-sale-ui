import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Category = () => {

    const { id } = useParams();

    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        getCategoryById();
        getProductsByCategory();
    }, [id]);

    const getCategoryById = async () => {
        const response = await axios.get(`${process.env.POS_BACKEND_URL}/categories/${id}`);
        console.log(response.data);
        setCategory(response.data);
    }

    const getProductsByCategory = async () => {
        const response = await axios.get(`${process.env.POS_BACKEND_URL}/products`);
        console.log(response.data);
        setProducts(response.data);
    }



    return (
        <>
            <div className="category-body">
                <div className="category-header">
                    {category &&
                        <h1 className="display-6">{category.name}</h1>
                    }
                </div>
                <div className="category-items">
                    {/* <ul className="no-bullets">
                        {products && products.map((product) => (
                            <li>
                                <Link to={`/products/${product.id}`}>{product.name}</Link>
                            </li>
                        ))}
                    </ul> */}
                    {[products && products.map((product) => (

                        <Link to={`/products/${product.id}`} className="no-lines">
                            <div className="card-body">

                                <div className="card-image">
                                    <img src={`${process.env.PUBLIC_URL}/assets/${product.id}.jpg`} className="img-thumbnail" alt="..." />
                                </div>
                                <div className="card-details">
                                    {product.name}
                                </div>
                                <div className="price">
                                    {product.price} LKR.
                                </div>
                            </div>
                        </Link>

                    ))]}
                </div>
            </div>
        </>
    );
}

export default Category;