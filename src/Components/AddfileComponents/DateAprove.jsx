/* eslint-disable */
import React, { useContext } from "react";
import "../../App.css";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import QRCode from "qrcode";
import { UserContext } from "../../context";
import { useNavigate } from "react-router-dom";


export default function DateAprove() {
  const navigator = useNavigate()
  const [image, setImage] = useState("");
  const [img, setImage2] = useState("");
  const [img3, setImage3] = useState("");
  const [name, setName] = useState("");
  const [select, setSelect] = useState("");
  const [password, setPassword] = useState("");
  const [ActualQrcode, setQrCode] = useState("");
  const [Textt, setTextt] = useState("");
  const [Textt2, setTextt2] = useState("");
  const [Textt3, setTextt3] = useState("");
  const [imgpresent, setImagepreent] = useState("");
  const [svgpresent, Setsvgpresent] = useState("");
  const [imgpresent2, setImagepreent2] = useState("");
  const [svgpresent2, Setsvgpresent2] = useState("");
  const [imgpresent3, setImagepreent3] = useState("");
  const [svgpresent3, Setsvgpresent3] = useState("");
  // const [getimages, Setgetallimages] = useState("");
  const [fileId, setFileid] = useState("000000")
  const [isButtonDisabled, setButtonDisabled] = useState(false); // const [fileidd, setFileid] = useState('');
  const [uploadbutton, setUploadbutton] = useState("open");
  const [graybutton, setGraybutton] = useState("");
  const { user } = useContext(UserContext)

  let uniqueId;

  async function getImageData() {
    fetch("https://government-backend-production.up.railway.app/get-image-count", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data);
        // Setgetallimages(data.data);
        setFileid(`${String(data.data + 1).padStart(6, '0')}`)

      });
  }
  useEffect(() => {
    getImageData();
  }, []);
  // alldatalength = getimages;
  // let concatid = alldatalength + 1;
  // let incrementalldetaildata = num.concat(concatid);
  // setFileid(incrementalldetaildata)

  useEffect(() => {
    if (image.includes("data:application/pdf;")) {
      setTextt("Pdf Uploaded");
      Setsvgpresent3("");
      setImagepreent3("show");
    } else if (image.includes("data:image/png")) {
      setTextt("Document Uploaded");
      Setsvgpresent3("show");
      setImagepreent3("");
    } else {
      Setsvgpresent3("open");
      setTextt("Upload File");
    }

    if (img.includes("data:application/pdf;")) {
      setTextt2("Pdf Uploaded");
      Setsvgpresent2("");
      setImagepreent2("show");
    } else if (img.includes("data:image/png")) {
      setTextt2("Document Uploaded");
      Setsvgpresent2("show");
      setImagepreent2("");
    } else {
      Setsvgpresent2("open");
      setTextt2("Upload File");
    }

    if (img3.includes("data:application/pdf;")) {
      setTextt3("Pdf Uploaded");
      Setsvgpresent("");
      setImagepreent("show");
    } else if (img3.includes("data:image/png")) {
      setTextt3("Document Uploaded");
      Setsvgpresent("show");
      setImagepreent("");
    } else {
      Setsvgpresent("open");
      setTextt3("Upload File");
    }

    if (image.includes("data:image/png;")) {
      setTextt("Document Uploaded");
      Setsvgpresent3("show");
      setImagepreent3("");
    }
    if (img.includes("data:image/png;")) {
      setTextt2("Document Uploaded");
      Setsvgpresent2("show");
      setImagepreent2("");
    }
    if (img3.includes("data:image/png;")) {
      setTextt3("Document Uploaded");
      Setsvgpresent("show");
      setImagepreent("");
    }
  }, [img, img3, image]);

  const covertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const covertToBase65 = (ev) => {
    var reader1 = new FileReader();
    reader1.readAsDataURL(ev.target.files[0]);
    reader1.onload = () => {
      // console.log(reader1.result);
      setImage2(reader1.result);
      // localStorage.setItem("secondimage", reader1.result);
    };
    reader1.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const covertToBase66 = (eve) => {
    var reader = new FileReader();
    reader.readAsDataURL(eve.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      setImage3(reader.result);
      // localStorage.setItem("thirdimage", reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const formatDate = () => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      new Date()
    );
    return formattedDate;
  };

  const date = formatDate();


  async function uploadImage(e) {
    e.preventDefault();
    setButtonDisabled(true);
    let QrCode = ""
    try {
      uniqueId = Math.round(Math.random() * 10000000000000);
      const QrNavigate = `https://${window.location.host}/Qrdetail/id/${uniqueId}`;
      const response = await QRCode.toDataURL(QrNavigate);
      // console.log("Qrcode", response);
      setQrCode(response);
      // localStorage.setItem("QrCode", response);
      QrCode = response
      setButtonDisabled(true);
    } catch (error) {
      console.log(error);
      setButtonDisabled(false);
    }
    // console.log(QrCode,"ActualQrcode")
    if (name.length > 0 && password.length > 0 && select.length > 0) {
      if (image.length > 0 || img.length > 0 || img3.length > 0) {
        try {
          const response = await fetch(
            "https://government-backend-production.up.railway.app/upload-image",
            {
              method: "POST",
              crossDomain: true,
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                base64: [image, img, img3],
                name,
                select,
                password,
                fileid: fileId,
                date,
                location: user.location,
                QrGet: QrCode,
                uniqueId,
                userId: user._id
                // ii,
                // iii,
              }),
            }
          );

          // localStorage.setItem("name", JSON.stringify(name));
          // localStorage.setItem(
          //   "fileid",
          //   JSON.stringify(incrementalldetaildata)
          // );
          // localStorage.setItem("select", JSON.stringify(select));
          // localStorage.setItem("image", JSON.stringify(image));
          // localStorage.setItem("date", JSON.stringify(date));
          // localStorage.setItem("location", JSON.stringify(location));
          // localStorage.setItem("Qrcode", JSON.stringify(QrGet));
          // localStorage.setItem("image2", JSON.stringify(ii));
          // localStorage.setItem("image3", JSON.stringify(iii));

          // Check if the request was successful
          if (!response.ok) {
            console.error("Failed to upload image"); 
            setButtonDisabled(false);
            return "... uploading";
          } else {
            Swal.fire({
              title: "File Added Successfully",
              html: `<a href="/Dashboard"><div style="padding-left: 10%; padding-right: 10%; display: flex; justify-content: center; align-items: center;"><img src=${QrCode} alt="no image" style="max-width: 100%; height: auto;" /></div></a>`,
              showCancelButton: true,
              confirmButtonColor: "green",
              confirmButtonText: "Download",
              cancelButtonColor: "#FFFFFF",
              cancelButtonText: '<a href="/FileView" style="width:80px; height:45px; border-radius:4px; background-color:gray; border:3px solid #B1CAE3; color:white; display: block; text-align: center; padding-top:7px; ">Ok</a>',
              customClass: {
                popup: "responsive-sweetalert",
              },
            }).then((result) => {
              if (result.isConfirmed) {
                // Trigger download
                const link = document.createElement("a");
                link.href = QrCode;
                link.download = `${name}_QrCode.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Navigate to "/Dashboard" route
                navigator("/Dashboard")
              }
            });


            // Add event listener to overlay or container
            const sweetAlertContainer =
              document.querySelector(".swal2-container");
            sweetAlertContainer.addEventListener("click", () => {
              // Navigate to "/Dashboard" route
              navigator("/Dashboard");
            });

            setButtonDisabled(true);

            // Now use userMessage where needed
            setUploadbutton("");
            setGraybutton("open");

            setTimeout(() => {
              navigator( "/Dashboard")
              setTimeout(() => {
                setUploadbutton("open");
                setGraybutton("");
                setButtonDisabled(true);
              }, 2000);
            }, 7000);
          }

          // ... rest of your code for handling the response
        } catch (error) {
          console.error("Error in fetch:", error);
        }
      } else {
        Swal.fire({
          title: "All The fields are required",
          html: `<div style="padding-left: 10%; padding-right: 10%; display: flex; justify-content: center; align-items: center;"><h2 style="color:green;">File Requirment</h2></div>`,
        });
        setButtonDisabled(false);
      }
    } else {
      Swal.fire({
        title: "All The fields are required",
        html: `<div style="padding-left: 10%; padding-right: 10%; display: flex; justify-content: center; align-items: center;"><h2 style="color:green;">File Requirment</h2></div>`,
      });
      setButtonDisabled(false);
    }
  }

  const formatDate2 = () => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      new Date()
    );
    return formattedDate;
  };

  const newDate = formatDate2()

  return (
    <form
      action="https://government-backend-production.up.railway.app/upload-image"
      method="POST"
      encType="multipart/form-data"
    >
      <div className="container mx-auto p-4 lg:w-3/4 xl:w-2/3">
        <div
          className="flex flex-col lg:flex-row justify-center lg:justify-between"
          style={{ columnGap: "255px" }}
        >
          <div className="mb-4 lg:mr-4">
            <h3 className="text-lg font-bold" style={{ fontSize: "18px" }}>
              FileId:{fileId}
            </h3>
            <h3 className="text-lg font-bold" style={{ fontSize: "18px" }}>
              Date:{newDate}
            </h3>
          </div>
          <div className="block items-center">
            <h3 className="text-lg font-bold mr-2">Category</h3>
            <select
              name="opt"
              id="opt"
              onChange={(e) => setSelect(e.target.value)}
              className="bg-green-100 text-green-700 px-4 py-2 rounded"
              style={{ width: "383px" }}
            >
              <option value="Select Category">Select Category</option>
              <option value="Administrative Document">
                Administrative Document
              </option>
              <option value="Legal and Regulatory Files">
                Legal and Regulatory Files
              </option>
              <option value="Personal Records">Personal Records</option>
              <option value="Financial Document">Financial Document</option>
              <option value="Project Relations and Communications">
                Project Relations and Communications
              </option>
              <option value="Research and Report">Research and Report</option>
              <option value="Contract and Agreements">
                Contract and Agreements
              </option>
              <option value="Property and Asset Records">
                Property and Asset Records
              </option>
              <option value="Technology and IT Document">
                Technology and IT Document
              </option>
              <option value="Archives and Historical Documents">
                Archives and Historical Documents
              </option>
              <option value="Complaints and Resolutions">
                Complaints and Resolutions
              </option>
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
          {/* card no one */}
          <div>
            <label
              id="responsiveuploadfile"
              style={{
                width: "250px",
                backgroundImage: `url(${image})`,
                backgroundPosition: "center",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {svgpresent3 && (
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                )}
                {imgpresent3 && (
                  <img
                    src="https://th.bing.com/th/id/OIP.TxlxbMcPCrVPG71U2H6bbAHaHa?w=219&h=219&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                    style={{ width: "40px", height: "40px" }}
                    alt="no image"
                  />
                )}
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">
                    {Textt ? Textt : "Upload File"}
                  </span>{" "}
                </p>
              </div>
              <input
                type="file"
                accept=".pdf, image/*"
                onChange={covertToBase64}
                className="hidden"
                name="file1"
              />
            </label>
          </div>
          {/* card no two */}

          <div>
            <label
              id="responsiveuploadfile"
              style={{
                width: "250px",
                backgroundImage: `url(${img})`,
                backgroundPosition: "center",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {" "}
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {svgpresent2 && (
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                )}
                {imgpresent2 && (
                  <img
                    src="https://th.bing.com/th/id/OIP.TxlxbMcPCrVPG71U2H6bbAHaHa?w=219&h=219&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                    style={{ width: "40px", height: "40px" }}
                    alt="no image"
                  />
                )}
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">
                    {Textt2 ? Textt2 : "Upload File"}
                  </span>{" "}
                </p>
              </div>
              <input
                type="file"
                accept=".pdf, image/*"
                onChange={covertToBase65}
                className="hidden"
                name="file2"
              />
            </label>
          </div>
          {/* card no three */}
          <div>
            <label
              id="responsiveuploadfile"
              style={{
                width: "250px",
                backgroundImage: `url(${img3})`,
                backgroundPosition: "center",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {" "}
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {svgpresent && (
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                )}
                {imgpresent && (
                  <img
                    src="https://th.bing.com/th/id/OIP.TxlxbMcPCrVPG71U2H6bbAHaHa?w=219&h=219&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                    style={{ width: "40px", height: "40px" }}
                    alt="no image"
                  />
                )}
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">
                    {Textt3 ? Textt3 : "Upload File"}
                  </span>{" "}
                </p>
              </div>
              <input
                type="file"
                accept=".pdf, image/*"
                onChange={covertToBase66}
                className="hidden"
                name="file3"
              />
            </label>
          </div>
        </div>

        <div
          className="mt-8"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "780px",
            margin: "auto",
          }}
        >
          {uploadbutton && (
            <button
              onClick={uploadImage}
              className="w-full lg:w-1/2 bg-green-600 text-white py-2 rounded responsivebtn"
              style={{ width: "250px", marginTop: "20px" }}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Uploading..." : "Upload File"}
            </button>
          )}
          {graybutton && (
            <button
              onClick={uploadImage}
              className="w-full lg:w-1/2 bg-gray-600 text-white py-2 rounded responsivebtn"
              style={{ width: "250px", marginTop: "20px" }}
              disabled={isButtonDisabled}
            >
              File Uploaded
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
