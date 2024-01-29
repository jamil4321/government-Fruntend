import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import Swal from 'sweetalert2';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import {List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { InboxIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios'; // Import axios
import '../../App.css'
import { Link } from "react-router-dom";

const TABLE_HEAD = ["FILE ID", "FILE NAME", "STATUS", "CATEGORY", "CREATION DATE", "VIEW FILE"];

let datalength;

export default function TableWeb() {
  const [allImage, setAllImage] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getImage()
  }, [])

  async function getImage() {
    try {
      const response = await axios.get("http://localhost:5000/get-image");
      
      // Check if the response is successful (status code 200)
      if (response.status === 200) {
        setAllImage(response.data.data);
        console.log("tabledatalength" , response.data.data.length)
        datalength = response.data.data.length
      } else {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

//   var logoutEmail = JSON.parse(localStorage.getItem('email'));

//   useEffect(() => {
//     if (logoutEmail === 'user@gmail.com') {
//       document.getElementById('foruser2').style.display = 'none';
//     }
//   }, [logoutEmail])
// console.log(datalength)

var logoutEmail = JSON.parse(localStorage.getItem('email'));
console.log("logoutEmail", logoutEmail);

const  [logout , setLogout] = useState(logoutEmail)
if (logout && logout.length > 0) {
  console.log("User Logged In");
}else {
  localStorage.setItem('email' , JSON.stringify(''))
  setLogout("Login");
  window.location = "/";
}
 
  return (
    <Card className="h-full w-full" id="cardresponsive">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8 " id="tabletop">
          <div>
            <Typography variant="h5" color="blue-gray">
              Files List
            </Typography>
          </div>
          <div id="foruser2" className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="/AddFile">
              <Button className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add File
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className=" border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {allImage.map((data, index) => {
              const isLast = index === allImage.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              if (
                data &&
                data.name &&
                (search.toLowerCase() === data.name.toLowerCase() ||
                  (search.length > 0 && data.name.toLowerCase().includes(search.toLowerCase())) ||
                  search === "")
              ) {
                return (
              <tr key={data.selct}>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data.fileid}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        >
                        {data.name}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value='Approved'
                        style={{
                          color: data.select === "Scheduled" ? "orange" :
                            data.select === "In Review" ? "orange" :
                              data.select === "Approved" ? "green" :
                                data.select === "Rejected" ? "red" : "inherit",

                          backgroundColor: data.select === "Scheduled" ? "#FFF9E9" :
                            data.select === "In Review" ? "#FFF6E9" :
                              data.select === "Approved" ? "#EDFFEA" :
                                data.select === "Rejected" ? "#FFEAEA" : "inherit",
                        }}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        >
                        {data.select}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {data.date}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Open File">
                      <IconButton variant="text">
                        <Button onClick={() => {
                          localStorage.setItem("name", JSON.stringify(data.name))
                          localStorage.setItem("fileid", JSON.stringify(data.fileid))
                          localStorage.setItem("select", JSON.stringify(data.select))
                          localStorage.setItem("image", JSON.stringify(data.image))
                          localStorage.setItem("date", JSON.stringify(data.date))
                          localStorage.setItem("location", JSON.stringify(data.location))
                          window.location = "/FileView"
                        }}
                          className="flex items-center gap-3" size="sm">
                          view
                        </Button>
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            }
            })}
          </tbody>
        </table>
      </CardBody>
      <List>
      <ListItem  className="mobilelogoutbutton" onClick={(e)=>{setLogout(e.target.value)}}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
             <p> logout </p>
            </ListItem>
        </List>
    </Card>
  );
}

export  {datalength}
