import axios from "axios";
import { useEffect, useState } from "react";

const AddProduct = () => {

    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState([]);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQty] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handlePrice = (event) => {
        setPrice(event.target.value);
    }

    const handleQty = (event) => {
        setQty(event.target.value);
    }

    const handleCategory = (event) => {
        setCategoryId(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            "name": name,
            "price": price,
            "qty": qty,
            "categoryId": categoryId
        };

        try {
            const response = await axios.post(`https://point-of-sale-system-production.up.railway.app/products`, data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setProducts([...products, response.data]);
            console.log(response.data);
            //reset fields
            setName('');
            setPrice('');
            setQty('');
            setCategoryId('');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const response = await axios.get(`https://point-of-sale-system-production.up.railway.app/categories`);
        console.log(response.data);
        setCategories(response.data);
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-sm-12">
                        <div className="form-header">
                            <h1 className="display-6">Add New Product</h1>
                        </div>

                        <div className="form-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label for="formGroupExampleInput" className="form-label">Product Name</label>
                                    <input type="text" required className="form-control" value={name} onChange={handleName} placeholder="Enter product name" />
                                </div>
                                <div className="mb-3">
                                    <label for="formGroupExampleInput2" className="form-label">Price</label>
                                    <input type="text" required className="form-control" value={price} onChange={handlePrice} placeholder="Enter product price" />
                                </div>
                                <div className="mb-3">
                                    <label for="formGroupExampleInput" className="form-label">Quantity</label>
                                    <input type="text" required className="form-control" value={qty} onChange={handleQty} placeholder="Enter product quantity" />
                                </div>
                                <div className="drop-down">
                                    <label for="formGroupExampleInput" className="form-label">Category</label>
                                    <select required className="form-select" onChange={handleCategory} aria-label="Default select example">
                                        <option selected>Select a category</option>
                                        {categories && categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="submit-button">
                                    <button type="submit" className="btn btn-primary">Save Product</button>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddProduct;