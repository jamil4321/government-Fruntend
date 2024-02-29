/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Updated import
// import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function QrDetailComponent() {
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  
  localStorage.setItem("name", JSON.stringify(""))
  localStorage.setItem("fileid", JSON.stringify(""))
  localStorage.setItem("select", JSON.stringify(""))
  localStorage.setItem("image", JSON.stringify(""))
  localStorage.setItem("date", JSON.stringify(""))
  localStorage.setItem("location", JSON.stringify(""))  
  localStorage.setItem("Qrcode", JSON.stringify(""))  
  localStorage.setItem("image2", JSON.stringify(""))  
  localStorage.setItem("image3", JSON.stringify(""))  
  localStorage.setItem("QrCode", JSON.stringify(""))  
  localStorage.setItem("ii", JSON.stringify(""))  
  localStorage.setItem("iii", JSON.stringify(""))  

  const { id } = useParams();
  useEffect(() => {
      var urid = id.slice(3, 17);
      setUrl(urid);
    }, [id]); 

    
    
    
      const handleLogin = async (e) => {
        e.preventDefault();
    
        fetch("https://government-backendpdated.vercel.app/get-image", {
          method: "GET",
        })
        .then((res) => res.json())
        .then((data) => {
          let fileFounded = false;
    
          data.data.forEach((item) => {
            if (item.Qrcode === url && item.password === password) {
              fileFounded = true;
              localStorage.setItem("name", JSON.stringify(item.name))
            localStorage.setItem("fileid", JSON.stringify(item.fileid))
            localStorage.setItem("select", JSON.stringify(item.select))
             localStorage.setItem("image", JSON.stringify(item.image))
            localStorage.setItem("date", JSON.stringify(item.date))
            localStorage.setItem("location", JSON.stringify(item.location))  
            localStorage.setItem("Qrcode", JSON.stringify(item.QrGet))  
            localStorage.setItem("image2", JSON.stringify(item.image2))  
            localStorage.setItem("image3", JSON.stringify(item.image3))  
    
              return; // Exit the loop once a match is found
            }
          });
    
          if (fileFounded) {
            Swal.fire({
              title: "File Founded",
              icon: "success",
              showConfirmButton:false,
              customClass: {
                popup: "left-popup",
              },
            });
             setTimeout(() => {
            window.location = "/FileView"
          }, 2000);
          } else {
            Swal.fire({
              title: "File Not Founded",
              icon: "warning",
              customClass: {
                popup: "left-popup",
              },
              showConfirmButton: false
            });
          }
        });
      }
    
      // Rest of your component code...
    
    
    
    
    
    return (
      <div className="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', height: '100vh' }}>
      <div className="login" style={{ maxWidth: '400px', width: '80%' }}>
        <div className="child1">
          <h1 style={{ fontSize: '25px', fontWeight: 'bold' }}>Hello Again!</h1>
          <h4>Find File</h4>
        </div>
        <div className="child1" style={{}}>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter File Password"
              style={{ ...inputStyle, marginTop: '15px', width: '100%' }}
              onChange={(e) => setPassword(e.target.value)}
              />
            <button style={buttonStyle} onClick={handleLogin}>View File</button>
      
          </form>
        </div>
      </div>
    </div>
  );
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
