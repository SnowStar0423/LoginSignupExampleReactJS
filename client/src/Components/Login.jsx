import { AiOutlineUser} from 'react-icons/ai';
import { BsLock } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import './Login.css';
import { useHistory  } from "react-router-dom";

//Hashing working missing sessions

function Login(){
    //Declaration of state variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    //Error message
    const[loginStatus, setLoginStatus] = useState("")

    const userLogin = () =>{
        Axios.post('http://localhost:3001/login', {
            email: email,
            password: password
        }).then((response) =>{
            if(response.data.message){
                setLoginStatus(response.data.message);
               // console.log(response);
            } else{
                setLoginStatus("Log as: " + response.data[0].username)
                let path = "/Header"; 
                history.push(path);
            }
        });
    };


    return ( 
        <div className = "login-form-container">
            <div className ="login">
                <div className = "login-title">
                    <h1>LOGIN</h1>
                </div>
                <div className = "login-data">
                    <div className = "login-username-container">
                        <div className = "login-username">
                            <AiOutlineUser size={30} color={"white"} className ="user-img"/>
                            <input type="text" placeholder = "Email" onChange={(event) =>{
                                setEmail(event.target.value)}}/>
                        </div>
                    </div>
                    <div className="login-password-container">
                        <div className ="login-password">
                            <BsLock size={30} color={"white"} className ="password-img"/>
                            <input type="password" placeholder = "Password" onChange={(event) =>{
                                setPassword(event.target.value)}}/>
                        </div>
                    </div>
                    <h4 className = "login-status">{loginStatus}</h4>
                </div>
                <div className = "login-button">
                    <button onClick={userLogin}>Login</button>
                    <span>New here? <Link to="/signup">Sign Up</Link></span>
                </div>
            </div>
        </div>
     );
    
}
 
export default Login;