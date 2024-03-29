/* eslint-disable */
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
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
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { InboxIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios"; // Import axios
import "../../App.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context";

const TABLE_HEAD = [
  "FILE ID",
  "FILE NAME",
  "STATUS",
  "CATEGORY",
  "CREATION DATE",
  "VIEW FILE",
];

let datalength;

export default function TableWeb({allImage}) {
  // const [allImage, setAllImage] = useState([]);
  const [search, setSearch] = useState("");
  const {logout} = useContext(UserContext)
  const navigate = useNavigate();

  // useEffect(() => {
  //   getImage();
  // }, []);

  // async function getImage() {
  //   try {
  //     const response = await axios.get(
  //       "http://192.168.100.2:5000/get-image"
  //     );

  //     // Check if the response is successful (status code 200)
  //     if (response.status === 200) {
  //       setAllImage(response.data.data);
  //       console.log("tabledatalength", response.data.data.length);
  //       datalength = response.data.data.length;
  //     } else {
  //       throw new Error(`Network response was not ok: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }
  // localStorage.setItem("name", JSON.stringify(""));
  // localStorage.setItem("fileid", JSON.stringify(""));
  // localStorage.setItem("select", JSON.stringify(""));
  // localStorage.setItem("image", JSON.stringify(""));
  // localStorage.setItem("date", JSON.stringify(""));
  // localStorage.setItem("location", JSON.stringify(""));
  // localStorage.setItem("Qrcode", JSON.stringify(""));
  // localStorage.setItem("image2", JSON.stringify(""));
  // localStorage.setItem("image3", JSON.stringify(""));
  // localStorage.setItem("QrCode", JSON.stringify(""));
  // localStorage.setItem("iii", JSON.stringify(""));
  // localStorage.setItem("ii", JSON.stringify(""))

  return (
    <Card className="h-full w-full" id="cardresponsive">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div
          className="mb-8 flex items-center justify-between gap-8 "
          id="tabletop"
        >
          <div>
            <Typography variant="h5" color="blue-gray">
              Files List
            </Typography>
          </div>
          <div
            id="foruser2"
            className="flex shrink-0 flex-col gap-2 sm:flex-row"
          >
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
              label="Search By Name"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className=" p-3 ">
        <div
          className="table-container"
          style={{ maxHeight: "580px", overflowY: "auto" }}
        >
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead
              style={{
                zIndex: 5,
                position: "sticky",
                top: -1,
                background: "white",
              }}
            >
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allImage.map((data, index) => {
                const isLast = index === allImage.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                if (
                  data &&
                  data.name &&
                  (search.toLowerCase() === data.name.toLowerCase() ||
                    (search.length > 0 &&
                      data.name.toLowerCase().includes(search.toLowerCase())) ||
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
                      <td className={classes} style={{ marginLeft: "-20px" }}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value="Approved"
                            style={{ marginLeft: "-1px" }}
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
                            <Button
                              // style={{ marginLeft: "20px" }}
                              onClick={() => navigate( `/FileView/${data.fileid}`)}
                              // className="flex items-center gap-3"
                              size="sm"
                            >
                              view
                            </Button>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </CardBody>
      <List>
        <ListItem
          className="mobilelogoutbutton"
          onClick={logout}
        >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <p> logout </p>
        </ListItem>
      </List>
    </Card>
  );
}

export { datalength };
