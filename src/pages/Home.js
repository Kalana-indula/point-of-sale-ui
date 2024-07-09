import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {

    const [products, setProducts] = useState(null);

    const getProducts = async () => {
        const response = await axios.get(`https://point-of-sale-system-production.up.railway.app/products`);
        console.log(response.data);
        setProducts(response.data);
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <h1 className="display-4" id="home-header">All Products</h1>
            {/* <ul className="no-bullets">
                {products && products.map((product) => (
                    <li>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </li>
                ))}
            </ul> */}
            <div className="container-fluid">


                <div className="all-products">
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

export default Products;