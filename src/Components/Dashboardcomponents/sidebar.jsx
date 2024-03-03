/* eslint-disable */
import React, { useState, useContext } from "react";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { InboxIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../context'

export function Websidebar(props) {
  const { user, logout } = useContext(UserContext)
  const navigate = useNavigate()
  React.useEffect(() => {
    if (!user && !localStorage.getItem("user")) navigate('/')
  }, [user])






  return (
    <div>
      <Card
        className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 fixed w-1/4"
        style={{ width: "500px", marginTop: '-70px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
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
        </List>
        <button style={{ marginBottom: '5rem' }} onClick={logout}>
          <ListItem className="cardbackground">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Logout
          </ListItem>
        </button>
      </Card>



    </div>
  );
}
