/* eslint-disable */
import React from "react"
import '../../App.css'
import { useState, useEffect } from "react"
import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { pdfjs } from 'react-pdf'

export default function FileDetailComponent() {
  const [allImage, setAllImage] = useState([])
  const [location, setLocation] = useState('')


  const localStorageName = JSON.parse(localStorage.getItem("name"))
  const localStorageFileid = JSON.parse(localStorage.getItem("fileid")) //no
  const localStorageSelect = JSON.parse(localStorage.getItem("select"))
  const localStorageDate = JSON.parse(localStorage.getItem("date"))
  const localStoragelocation = JSON.parse(localStorage.getItem("location"))
  const localStorageqrget = JSON.parse(localStorage.getItem("Qrcode"))

  const localStorageimage = localStorage.getItem("image")
  const localStorageimage2 = localStorage.getItem("image2")
  const localStorageimage3 = localStorage.getItem("image3")
  const localStorageimageparse = JSON.parse(localStorage.getItem("image"))
  const localStorageimage2parse = JSON.parse(localStorage.getItem("image2"))
  const localStorageimage3parse = JSON.parse(localStorage.getItem("image3"))

  // // Check if the data is an image
  // const image1IsImage = localStorageimage && localStorageimage.startsWith("data:image")
  // const image2IsImage = localStorageimage2 && localStorageimage2.startsWith("data:image")
  // const image3IsImage = localStorageimage3 && localStorageimage3.startsWith("data:image")

  // Check if the data is a PDF
  // const image1IsPDF = localStorageimage && localStorageimage.startsWith("data:application/pdf")
  // const image2IsPDF = localStorageimage2 && localStorageimage2.startsWith("data:application/pdf")
  // const image3IsPDF = localStorageimage3 && localStorageimage3.startsWith("data:application/pdf")





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
  let pdfRendered = false
  let pdfRendered2 = false
  let pdfRendered3 = false
  var imgflag1 = false
  var imgflag2 = false
  var imgflag3 = false

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between sm-w-full my-0" style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: '200px'
        // marginLeft: '70px',
      }}>        <div className="mb-4 sm:mr-4">
          <h3 className="text-lg font-bold">File Id: {localStorageFileid}</h3>
          <h3 className="text-lg font-bold">Date: {localStorageDate}</h3>
          <h3 className="text-lg font-bold">From: {localStoragelocation}</h3>
          <h3 className="text-lg font-bold text-green">Category: {localStorageSelect}</h3>
        </div>
        {/* <div className="flex items-center" id="categoryresponsive" style={{ marginTop: '-10px' }}>
          <h3 className="text-lg font-bold mr-2">Category</h3>
          <select
            name="opt"
            id="opt"
            className="bg-green-100 text-green-700 px-4 py-2 rounded"
            style={{ width: '150px' }}
          >
            <option value={localStorageSelect}>{localStorageSelect}</option>
          </select>
        </div> */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', marginLeft: '20px' }}>

          <img
            src={localStorageqrget}
            className="w-full  border border-green-500"
            alt=""
            style={{ width: '100px', height: 'auto' }}
          />
          <a href={localStorageqrget} download={`${localStorageName}_QrCode.png`}>
            <button style={{ padding: '7px', backgroundColor: 'rgb(200 230 201)', color: 'green', fontSize: '10px', width: '100px', height: '35px' }}>
              Download QrCode {localStorageName}
            </button>
          </a>
        </div>

      </div>

      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4" style={{ textAlign: 'center' }}>File Name : <b style={{ color: 'green' }}> {localStorageName} </b></h1>

        <img
          className="w-full max-w-3xl mx-auto border border-green-500"
          alt=""
          style={{ width: '85%', height: 'auto' }}
        />
        <br />
     
      </div>
      {

        allImage.map((data, item) => {
          if (!pdfRendered && localStorageFileid == data.fileid && data.image && data.image.includes("data:application/pdf")) {
            pdfRendered = true
            return (
              <div className="text-center mt-4" key={item}>
                <h3 style={{ color: 'green' }}>First Pdf View</h3>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`} >
                  <Viewer fileUrl={data.image} />
                </Worker>
                <br />
                <a href={data.image} download={`${data.name}_pdf1.png`}>
                  <button style={{ backgroundColor: 'green', color: 'white', padding: '6px', borderRadius: '10px' }}>Download Pdf </button>
                </a>
              </div>
            )
          } else {

          }
          return null
        })
      }
      {

        allImage.map((data, item) => {
          if (!pdfRendered2 && localStorageFileid == data.fileid && data.image2 && data.image2.includes("data:application/pdf")) {
            return (
              <div className="text-center mt-4" key={item}>
                <h3 style={{ color: 'green' }}>Second Pdf View</h3>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`} >
                  <Viewer fileUrl={data.image2} pageNumber={1} />
                </Worker>
                <br />
                <a href={data.image2} download={`${data.name}_pdf1.png`}>
                  <button style={{ backgroundColor: 'green', color: 'white', padding: '6px', borderRadius: '10px' }}>Download Pdf </button>
                </a>
              </div>
            )
          }
          return null
        })
      }
      {

        allImage.map((data, item) => {
          if (!pdfRendered3 && localStorageFileid == data.fileid && data.image3 && data.image3.includes("data:application/pdf")) {
            return (
              <div className="text-center mt-4">
                <h3 style={{ color: 'green' }}>Third Pdf View</h3>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`} >
                  <Viewer fileUrl={data.image3} />
                </Worker>
                <br />
                <a href={data.image3} download={`${data.name}_pdf1.png`}>
                  <button style={{ backgroundColor: 'green', color: 'white', padding: '6px', borderRadius: '10px' }}>Download Pdf </button>
                </a>
              </div>
            )
          }
          return null
        })
      }

      {
        allImage.map((data, item) => {
          if (!imgflag1 && localStorageFileid == data.fileid && data.image && data.image.includes("data:image/") ) {
            imgflag1 = true
            return (
              <div className="mt-8">
                <img
                  src={data.image}
                  className="w-full max-w-3xl mx-auto border border-green-500"
                  alt=""
                  style={{ width: '85%', height: 'auto' }}
                />
                <br />
              </div>
            )
          }
          return null
        })
      }
      {
        allImage.map((data, item) => {
          if (!imgflag2 && localStorageFileid == data.fileid && data.image2 && data.image2.includes("data:image/") ) {
            imgflag2 = true
            return (
              <div className="mt-8">
                <img
                  src={data.image2}
                  className="w-full max-w-3xl mx-auto border border-green-500"
                  alt=""
                  style={{ width: '85%', height: 'auto' }}
                />
                <br />
              </div>
            )
          }
          return null
        })
      }
      {
        allImage.map((data, item) => {
          if (!imgflag3 && localStorageFileid === data.fileid && data.image3 && data.image3.includes("data:image/") ) {
            imgflag3 = true
            return (
              <div className="mt-8">
                <img
                  src={data.image3}
                  className="w-full max-w-3xl mx-auto border border-green-500"
                  alt=""
                  style={{ width: '85%', height: 'auto' }}
                />
                <br />
              </div>
            )
          }
          return null
        })
      }

    </div >


  )
}