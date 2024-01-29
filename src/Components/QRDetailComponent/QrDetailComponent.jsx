import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';


export default function QrDetailComponent() {
  const [password, setPassword] = useState('')
  const [allImage, setAllImage] = useState([]);
  const [url, setUrl] = useState('');



  
  const { id } = useParams();

  useEffect(() => {
    var urid = id.slice(3, 17);
    setUrl(urid);
    getImage();
  }, [id]); 


  useEffect(() => {
    getImage()
  }, [])

  function getImage() {
    fetch("https://government-backend-production.up.railway.app/get-image", {
      method: "GET",
    }).then((res) => res.json()).then((data) => {
      console.log(data)
      setAllImage(data.data)
    })
  }


  const handleLogin = (e) => {
    e.preventDefault()
    /* eslint-disable array-callback-return */
    allImage.map((item, index) => {

      // const currentURL = window.location.href;
      // const startIndex = 34
      // const endIndex = 50 // Assuming the length is always 14 characters

      // const urlid = currentURL.slice(startIndex, endIndex);
      // console.log(currentURL, 'currentUrl');
      // console.log(urlid);

      if (item.Qrcode === url && item.password === password) {
        localStorage.setItem("name", JSON.stringify(item.name))
        localStorage.setItem("fileid", JSON.stringify(item.fileid))
        localStorage.setItem("select", JSON.stringify(item.select))
        localStorage.setItem("image", JSON.stringify(item.image))
        localStorage.setItem("date", JSON.stringify(item.date))


        console.log(item.Qrcode, "Qrcode");
        Swal.fire({
          title: "File Founded",
          icon: "success",
          customClass: {
            popup: "left-popup", // Add a custom class to center the popup
          }
        });
        setTimeout(() => {
          window.location = "/FileView"
        }, 3000);
      } else {
        Swal.fire({
          title: "File Not Founded",
          icon: "warning",
          customClass: {
            popup: "left-popup", // Add a custom class to center the popup
          }
        });
      }
    })

  }

  // const autoName = JSON.parse(localStorage.getItem('QrDetailName'))


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
            <button style={buttonStyle}>View File</button>
            <center>

              <p style={{ marginTop: '20px' }}>Forgot Password</p>
              <p style={{ marginTop: '20px' }}><Link to="/Dashboard">Dashboard</Link></p>
            </center>
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