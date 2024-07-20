import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register =()=>{

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");

    const navigate=useNavigate();

    const handleUsername=(event)=>{
        setUsername(event.target.value);
    }

    const handlePassword=(event)=>{
        setPassword(event.target.value);
    }

    const handleEmail=(event)=>{
        setEmail(event.target.value);
    }

    const handleRegister= async (event)=>{
        event.preventDefault();

        const data={
            "name":username,
            "email":email,
            "password":password
        }

        const response=await axios.post(`http://localhost:8080/auth/register`,data);

        if(response.status===200){
            // console.log("registered");
            navigate("/login")
        }else{
            console.log("error");
        }

    }
    return(
        <>
            <div className="login-box">
                <div className="text-center mb-5">
                    <h1>User Register</h1>
                </div>
                <form onSubmit={handleRegister}>
                    <div className="form-group mb-3">
                        <input type="text" className="form-control" onChange={handleUsername} placeholder="Username" required/>
                    </div>

                    <div className="form-group mb-3">
                        <input type="password" className="form-control" onChange={handlePassword} placeholder="Password" required/>
                    </div>

                    <div className="form-group mb-3">
                        <input type="email" className="form-control" onChange={handleEmail} placeholder="Email Address" required/>
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </>
    );
}

export default Register;