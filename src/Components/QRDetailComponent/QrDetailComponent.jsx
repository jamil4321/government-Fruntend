/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Updated import
// import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function QrDetailComponent() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const { id } = useParams();
  useEffect(() => {
    console.log(id,"id")
    if (!id) navigate("/")
  }, [id]);


  const handleLogin = async (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/get-image/find_by_qr/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)

        let check_pass = data.data[0].password

        if (check_pass === password) {
          Swal.fire({
            title: "File Founded",
            icon: "success",
            showConfirmButton: false,
            customClass: {
              popup: "left-popup",
            },
          });
          navigate(`/FileView/qr/${data.data[0].fileid}`)
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
