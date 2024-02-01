import React from "react";
import '../../App.css'
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import QRCode from "qrcode";
let uniqueId;
export default function DateAprove() {
  const [image, setImage] = useState("");
  const [name, setName] = useState('');
  const [select, setSelect] = useState('');
  const [password, setPassword] = useState('');
  const [ActualQrcode, setQrCode] = useState('');
  let uniqueId;

  const covertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const formatDate = () => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
    return formattedDate;
  };

  const date = formatDate();

  useEffect(() => {
    // getImage()
  }, []);

  var logoutEmail = JSON.parse(localStorage.getItem('email'));
  console.log("logoutEmail", logoutEmail);

  async function uploadImage(e) {
    e.preventDefault();

    try {
      uniqueId = Math.round(Math.random() * 10000000000000);
      console.log(uniqueId, "uniqueid");

      const QrNavigate = `https://${window.location.host}/Qrdetail/id/id:${uniqueId}`;

      const response = await QRCode.toDataURL(QrNavigate);
      console.log('Qrcode' , response);
      setQrCode(response);
      localStorage.setItem("QrCode", response);
    } catch (error) {
      console.log(error);
    }

    localStorage.setItem("QrDetailName", JSON.stringify(name));

    var location = '';

    if (logoutEmail === "user@gmail.com") {
      location = "Karachi camp office";
    } else if (logoutEmail === "user2@gmail.com") {
      location = "hyderabad head office";
    } else if (logoutEmail === "admin@gmail.com") {
      location = "Admin";
    } else {
      console.log("Invalid email");
      return;
    }
    
    const QrGet = localStorage.getItem("QrCode");
    console.log(QrGet);
    try {
      const response = await fetch("https://government-backend-production.up.railway.app/upload-image", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          base64: image,
          name,
          select,
          password,
          fileid: '002345',
          date,
          location,
          QrGet,
          uniqueId
        }),
      });
      
      // Check if the request was successful
      if (!response.ok) {
        console.error("Failed to upload image");
        return;
      }
  
      // ... rest of your code for handling the response

    } catch (error) {
      console.error("Error in fetch:", error);
    }


    Swal.fire({
      title: "File Added Seccessfully",
      html: `<div style="padding-left: 10%; padding-right: 10%; display: flex; justify-content: center; align-items: center;"><img src=${QrGet} alt="no image" style="max-width: 100%; height: auto;" /></div>`,
      showCancelButton: true,
      confirmButtonColor: 'green',
      confirmButtonText: `<a style="color: white; text-decoration: none; cursor: pointer;" href=${QrGet} download >Download</a>`,
      cancelButtonText: '<a style="color: white; text-decoration: none;" href="/Dashboard">Ok</a>',
      customClass: {
        popup: 'responsive-sweetalert'
      }
    });
    
  }




  return (
    <form action="https://government-backend-production.up.railway.app/upload-image" method="POST" enctype="multipart/form-data">
    <div className="container mx-auto p-4 lg:w-3/4 xl:w-2/3">
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between">
        <div className="mb-4 lg:mr-4">
          <h3 className="text-lg font-bold">File Id: 031516</h3>
          <h3 className="text-lg font-bold">Date: 30-1-23</h3>
        </div>
        <div className="block items-center">
          <h3 className="text-lg font-bold mr-2">Category</h3>
          <select
            name="opt"
            id="opt"
            onChange={(e) => setSelect(e.target.value)}
            className="bg-green-100 text-green-700 px-4 py-2 rounded "
            style={{width:'200px'}}
          >
            <option value="Select Category">Select Category</option>
            <option value="Administrative Document">Administrative Document</option>
            <option value="Legal and Regulatory Files">Legal and Regulatory Files</option>
            <option value="Personal Records">Personal Records</option>
            <option value="Financial Document">Financial Document</option>
            <option value="Project Relations and Communications">Project Relations and Communications</option>
            <option value="Research and Report">Research and Report</option>
            <option value="Contract and Agreements">Contract and Agreements</option>
            <option value="Property and Asset Records">Property and Asset Records</option>
            <option value="Technology and IT Document">Technology and IT Document</option>
            <option value="Archives and Historical Documents">Archives and Historical Documents</option>
            <option value="Complaints and Resolutions">Complaints and Resolutions</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center mt-8 lg:space-x-4">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-lg font-bold">File Name</h3>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="border-b-2 border-black lg:w-96"
            id="datainpresponsive"
          />
        </div>
        <div className="mb-4 lg:mb-0">
          <h3 className="text-lg font-bold">File Password</h3>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border-b-2 border-black lg:w-96"
            id="datainpresponsive"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center mt-8 space-y-4 lg:space-y-0 lg:space-x-4">
        <div>
        <label htmlFor="dropzone-file" id="responsiveuploadfile" style={{width: '250px'}}
      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">upload File</span> </p>
            </div>
            <input id="dropzone-file" type="file"  accept=".pdf, image/*" onChange={covertToBase64} className="hidden" name="file" />
          </label>
        </div>
        <div>
          <label htmlFor="dropzone-file" style={{width: '250px',backgroundImage: `url(${image})`,backgroundPosition: 'center',backgroundSize: 'cover',}} className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          </label>
        </div> 
        <div>
          <label htmlFor="dropzone-file" style={{width: '250px',backgroundImage: `url(${image})`,backgroundPosition: 'center',backgroundSize: 'cover',}} className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          </label>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={uploadImage}
          className="w-full lg:w-1/2 bg-green-600 text-white py-2 rounded"
        >
          Submit
        </button>
      </div>
     

    </div>
    </form>

  )
}

