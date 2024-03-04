/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import Swal from 'sweetalert2';
import { UserContext } from "../../context";
import { useNavigate } from "react-router-dom";


export default function LoginComponent() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const { login, user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) navigate('/dashboard')
    }, [user])
    const handleLogin = (e) => {
        e.preventDefault();
        setButtonDisabled(true)
        fetch("https://government-backend-production.up.railway.app/login-user", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("")
                }
                return res.json();
            })
            .then((data) => {
                console.log(data,"data from user")
                login(data.user)
                Swal.fire({
                    title: "Login Successfully",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000, // Set the timer to 2 seconds
                });
                setButtonDisabled(false)
                // navigate("/dashboard")
            })
            .catch((error) => {
                console.error("Login failed:", error);
                Swal.fire({
                    title: "Invalid Email or Password",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000, // Set the timer to 2 seconds
                    onClose: () => {
                        setButtonDisabled(false);
                    }
                });
                setButtonDisabled(false)
            });
    };

    return (
        <div className="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', height: '100vh' }}>
            <div className="login" style={{ maxWidth: '400px', width: '80%' }}>
                <div className="child1">
                    <h1 style={{ fontSize: '25px', fontWeight: 'bold' }}>Hello Again!</h1>
                    <h4>Welcome Back</h4>
                </div>
                <div className="child1" style={{}}>
                    <form onSubmit={handleLogin}>

                        <input
                            type="email"
                            placeholder="Email Address"
                            style={{ ...inputStyle, width: '100%' }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            style={{ ...inputStyle, marginTop: '15px', width: '100%' }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button style={buttonStyle} disabled={isButtonDisabled}>
                            {isButtonDisabled ? "Logining..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}


const inputStyle = {
    border: '2px solid gray',
    width: '100%',
    height: '55px',
    borderRadius: '30px',
    paddingLeft: '20px',
    marginTop: '15px',
    backgroundColor: 'none'
};

const buttonStyle = {
    border: '2px solid black',
    width: '100%',
    height: '55px',
    borderRadius: '30px',
    marginTop: '15px',
    backgroundColor: '#023D20',
    color: 'white'
};