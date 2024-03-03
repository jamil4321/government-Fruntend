/* eslint-disable */
import React from "react";
import '../../App.css';
import { useState, useEffect } from "react";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner } from "@nextui-org/react";
import Swal from "sweetalert2";

export default function FileDetailComponent() {
  const [allImage, setAllImage] = useState();
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const navigate = useNavigate()
  const [location, setLocation] = useState('');


  // const localStorageName = JSON.parse(localStorage.getItem("name"))
  // const localStorageFileid = JSON.parse(localStorage.getItem("fileid")) //no
  // const localStorageSelect = JSON.parse(localStorage.getItem("select"))
  // const localStorageDate = JSON.parse(localStorage.getItem("date"))
  // const localStoragelocation = JSON.parse(localStorage.getItem("location"))
  // const localStorageqrget = JSON.parse(localStorage.getItem("Qrcode"))

  // const localStorageimage = localStorage.getItem("image")
  // const localStorageimage2 = localStorage.getItem("image2")
  // const localStorageimage3 = localStorage.getItem("image3")
  // const localStorageimageparse = JSON.parse(localStorage.getItem("image"))
  // const localStorageimage2parse = JSON.parse(localStorage.getItem("image2"))
  // const localStorageimage3parse = JSON.parse(localStorage.getItem("image3"))

  // // Check if the data is an image
  // const image1IsImage = localStorageimage && localStorageimage.startsWith("data:image");
  // const image2IsImage = localStorageimage2 && localStorageimage2.startsWith("data:image");
  // const image3IsImage = localStorageimage3 && localStorageimage3.startsWith("data:image");

  // Check if the data is a PDF
  // const image1IsPDF = localStorageimage && localStorageimage.startsWith("data:application/pdf;");
  // const image2IsPDF = localStorageimage2 && localStorageimage2.startsWith("data:application/pdf;");
  // const image3IsPDF = localStorageimage3 && localStorageimage3.startsWith("data:application/pdf;");





  useEffect(() => {
    if (!params.id) { navigate('/') } else getImage()
  }, [params])

  function getImage() {
    // console.log("localStorageFileid", localStorageFileid, params)
    setLoading(true)
    fetch(`https://government-backend-production.up.railway.app/get-image/${params.id}`, {
      method: "GET",
    }).then((res) => {
      if(!res.ok) throw new Error("")
      return res.json()
    }).then((data) => {
      console.log(data)
      setLoading(false)
      setAllImage(data.data)
    }).catch(() => {
      Swal.fire({
        title: "Server Error",
        icon: "error",
        showConfirmButton: false,
        timer: 2000, // Set the timer to 2 seconds
        // onClose: () => {
        //     setButtonDisabled(false);
        // }
      });
      navigate('/')
    })
  }
  // let pdfRendered = false;
  // let pdfRendered2 = false;
  // let pdfRendered3 = false;
  // let imgflag1 = false;
  // let imgflag2 = false;
  // let imgflag3 = false;
  if (loading) return <div className="max-w-5xl mx-auto p-4">
    <Spinner />
  </div>
  return (
    <div className="p-4  flex flex-col align-middle justify-center ">
      <div className="flex flex-col sm:flex-row justify-between sm-w-full my-0" style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: '200px'
        // marginLeft: '70px',
      }}>
        {allImage && <div className="mb-4 sm:mr-4">
          <h3 className="text-lg font-bold">File Id: {allImage[0]?.fileid}</h3>
          <h3 className="text-lg font-bold">Date: {allImage[0]?.date}</h3>
          <h3 className="text-lg font-bold">From: {allImage[0]?.location}</h3>
          <h3 className="text-lg font-bold text-green">Category:{allImage[0]?.select}</h3>
        </div>}
        {allImage &&  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', marginLeft: '20px' }}>

          <img
            src={allImage[0]?.QrGet}
            className="w-full  border border-green-500"
            alt=""
            style={{ width: '100px', height: 'auto' }}
          />
          <a href={allImage[0]?.QrGet} download={`${allImage[0]?.Qrcode}_QrCode.png`}>
            <button style={{ padding: '7px', backgroundColor: 'rgb(200 230 201)', color: 'green', fontSize: '10px', width: '100px', height: '35px' }}>
              Download QrCode {allImage[0]?.Qrcode}
            </button>
          </a>
        </div>}

      </div>

      {allImage && <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4" style={{ textAlign: 'center' }}><b style={{ color: 'green', fontSize: '25px' }}> {allImage[0]?.name} </b></h1>

        <img
          className="w-full max-w-3xl mx-auto border border-green-500"
          alt=""
          style={{ width: '85%', height: 'auto' }}
        />
        <br />

      </div>}
      {

        allImage && allImage.map((data, item) =>

          data.image.includes("data:application/pdf") ? (
            <div className="text-center mt-4" key={item}>
              <h3 style={{ color: 'green' }}>First Pdf View</h3>
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`} >
                <Viewer fileUrl={data.image} />
              </Worker>
              <br />
              <a href={data.image} download={`${data.name}_pdf1.pdf`}>
                <button style={{ backgroundColor: 'green', color: 'white', padding: '6px', borderRadius: '10px' }}>Download Pdf </button>
              </a>
            </div>
          ) : (<div className="mt-8">
            <img
              src={data.image}
              className="w-full max-w-3xl mx-auto border border-green-500"
              alt=""
              style={{ width: '85%', height: 'auto' }}
            />
            <br />
          </div>))


      }

    </div >


  );
}