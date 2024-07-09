import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CreateContext";
import axios from "axios";

const Checkout = () => {

    const {orderProducts,setOrderProducts}=useContext(CartContext);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        const totalAmount=orderProducts.reduce((acc,item)=>acc+item.price,0);
        setTotal(totalAmount);
        setTax(total*3/100);
    },[total],[orderProducts]);


    const createOrder=async()=>{
        const productIds=orderProducts.map(obj=>obj.id);
        console.log(productIds);
        const data={
            products:productIds
        };

        const response=await axios.post(`${process.env.POS_BACKEND_URL}/orders`,data);
        console.log(response);
        if(response.status ===201){
            setOrderProducts([]);
            setTotal(0);
            setTax(0);
        }else{
            //error
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="checkout-section">

                            <h1 className="display-5">Checkout Items</h1>
                            
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Product Id</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderProducts && orderProducts.map((item) => (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                    ))}

                                </tbody>
                                <thad>
                                    <tr>
                                        <th colSpan={2}>Total</th>
                                        <th>{total}</th>
                                    </tr>
                                    <tr>
                                        <th colSpan={2}>Tax</th>
                                        <th>{tax}</th>
                                    </tr>
                                </thad>
                            </table>
                            <button type="button" class="btn btn-primary" onClick={createOrder}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;