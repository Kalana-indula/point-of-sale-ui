import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Await, useParams } from "react-router-dom";
import { CartContext } from "./CreateContext";


const SingleProduct = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const {addToCart}=useContext(CartContext);

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(response.data);
        console.log(response.data);
    }

    useEffect(() => {
        getProductById();
    }, [id]);

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center">
                    <div classNameName="col-lg-4 col-sm-12" id="product-card">

                        {product &&
                            <div>
                                <h1 className="display-6">{product.name}</h1>
                                <div className="product-image">
                                <img src={`${process.env.PUBLIC_URL}/assets/${product.id}.jpg`} alt={product.name} className="img-fluid" />
                                </div>
                                <div className="product-details">
                                    <div>Price - {product.price} LKR.</div>
                                    <div>Stock - {product.qty}</div>
                                </div>
                            </div>
                        }

                        <div className="buy-btn">
                            <button type="button" class="btn btn-primary" onClick={()=>addToCart(product)}>Buy Now</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleProduct;