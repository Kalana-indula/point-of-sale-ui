import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {

    const [categories, setCategories] = useState(null);


    const getCategories = async () => {
        const response = await axios.get(`${process.env.POS_BACKEND_URL}/categories`);
        setCategories(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                <div className="container-fluid">
                <Link className="navbar-brand" to="/">POS</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav">
                           {categories && categories.map((category)=>(
                            <Link className="nav-link" to={`/categories/${category.id}`} key={category.id}>{category.name}</Link>
                           ))}

                           <Link className="nav-link" to={`/addproduct`}>Add Products</Link>
                           <Link className="nav-link" to={`/checkout`}>Checkout</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;