/* eslint-disable no-unused-vars */
import React from "react";
import '../../App.css';
import { useState, useEffect } from "react";
export default function FileDetailComponent() {
  const [allImage, setAllImage] = useState([]);
  const [location, setLocation] = useState('');
  
  
  const localStorageName = JSON.parse(localStorage.getItem("name"))
  const localStorageFileid = JSON.parse(localStorage.getItem("fileid"))
  const localStorageSelect = JSON.parse(localStorage.getItem("select"))
  const localStorageimage = JSON.parse(localStorage.getItem("image"))
  const localStorageDate = JSON.parse(localStorage.getItem("date"))
  const localStoragelocation = JSON.parse(localStorage.getItem("location")) 
  const localStorageqrget = JSON.parse(localStorage.getItem("Qrcode")) 


  

  useEffect(() => {
    getImage()
  }, [])

  function getImage() {
    fetch("https://government-backendpdated.vercel.app/get-image", {
      method: "GET",
    }).then((res) => res.json()).then((data) => {
      setAllImage(data.data)
    })
  }

  return (
<div className="max-w-5xl mx-auto p-4">
  <div className="flex flex-col sm:flex-row justify-between">
    <div className="mb-4 sm:mr-4">
      <h3 className="text-lg font-bold">File Id: {localStorageFileid}</h3>
      <h3 className="text-lg font-bold">Date: {localStorageDate}</h3>
      <h3 className="text-lg font-bold">From: {localStoragelocation}</h3>
    </div>
    <div style={{display:'flex' , flexDirection:'column' , marginBottom:'15px'}}>

    <img
      src={localStorageqrget}
      className="w-full  border border-green-500"
      alt=""
      style={{ width: '100px', height: 'auto' }}
      />
    <a href={localStorageqrget} download><button style={{padding:'7px' , backgroundColor:' rgb(200 230 201)' , color:'green' , fontSize:'10px' , width:'100px' , height:'25px'}}>Download QrCode</button></a>
      </div>
    <div className="flex items-center">
      <h3 className="text-lg font-bold mr-2">Category</h3>
      <select
        name="opt"
        id="opt"
        className="bg-green-100 text-green-700 px-4 py-2 rounded"
        style={{ width: '150px' }}
      >
        <option value={localStorageSelect}>{localStorageSelect}</option>
      </select>
    </div>
  </div>

  <div className="mt-8">
    <h1 className="text-3xl font-bold mb-4">{localStorageName}</h1>
    
    <img
      src={localStorageimage}
      className="w-full max-w-3xl mx-auto border border-green-500"
      alt=""
      style={{ width: '100%', height: 'auto' }}
    />
  </div>
  {
    allImage.map((data, item) => {
      if (localStorageName === data.name) {
        if (data.image && data.image.includes("data:application/pdf;")) {
          console.log("pdf found in", data.image);
          return (
            <div key={item} className="text-center mt-4">
              <a href={data.image} target="_blank" rel="noopener noreferrer" download>
                <button className="w-32 h-10 bg-green-500 text-white rounded-md">Download Pdf</button>
              </a>
            </div>
          )
        } else {
          console.log("no pdf found");
        }
      }
      return null;
    })
  }
</div>

  
  );
}