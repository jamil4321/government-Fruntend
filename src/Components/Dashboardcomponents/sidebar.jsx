import React, { useState } from "react";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { InboxIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import "../../App.css";
import { Link } from "react-router-dom";

export function Websidebar(props) {


  // const email = "working"

  var logoutEmail = JSON.parse(localStorage.getItem('email'));
  console.log("logoutEmail", logoutEmail);

  const [logout, setLogout] = useState(logoutEmail)

  // useEffect(() => {
  //   if (logoutEmail === 'user@gmail.com') {
  //     document.getElementById('foruser').style.display = 'none';
  //   }
  // })

  if (logout && logout.length > 0) {
    console.log("User Logged In");
  } else {
    localStorage.setItem('email', JSON.stringify(''))
    setLogout("Login");
    window.location = "/";
  }


  return (
    <div>
      <Card
        className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 fixed w-1/4"
        style={{ width: "500px", marginTop: '-70px' }}
      >
        <List style={{ marginTop: '-70px' }}>
          <br />
          <br />
          <br />
          <br />
          <Link to={props.Dboard}>
            <ListItem className="cardbackground" onClick={() => console.log("Clicked on Dashboard")}>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>
          <Link to={props.Afile} id="foruser">
            <ListItem className="cardbackground" onClick={() => console.log("Clicked on Add File")}>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Add File
            </ListItem>
          </Link>
          <h3 style={{ marginLeft: "15px", marginTop: "20px" }}>SUPPORT</h3>
          <br />
          <ListItem className="cardbackground" onClick={(e) => { setLogout(e.target.value) }}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            logout
          </ListItem>
        </List>
      </Card>
    </div>
  );
}
