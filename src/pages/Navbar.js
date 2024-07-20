import axios from "axios";
import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";


const Navbar = () => {

    const [categories, setCategories] = useState(null);

    const navigate=useNavigate();

    const getCategories = async () => {
        const response = await axios.get(`http://localhost:8080/categories`);
        setCategories(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                <div className="container-fluid">
                <Link className="navbar-brand" to="/">E-Shop</Link>
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

                            <li className="nav-item">
                                <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                            </li>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;