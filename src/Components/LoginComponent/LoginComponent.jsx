import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';


export default function LoginComponent() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        console.log("email -->", email)
        console.log("password -->", password)

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
            .then((res) => res.json())
            .then((data) => {

                if (data) {

                    localStorage.setItem("email", JSON.stringify(email))
                    console.log(data, "userRegister");
                    Swal.fire({
                        title: "Login Successfully",
                        icon: "success",
                        showConfirmButton: false
                    });
                    setTimeout(() => {
                        window.location = "/Dashboard"
                    }, 2000);
                }
            })
    }
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
                        <button style={buttonStyle}>Login</button>
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
    backgroundColor: 'none',
};

const buttonStyle = {
    border: '2px solid black',
    width: '100%',
    height: '55px',
    borderRadius: '30px',
    marginTop: '15px',
    backgroundColor: '#023D20',
    color: 'white',
};