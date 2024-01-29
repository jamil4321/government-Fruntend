import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import '../../App.css'


export function Webnavbar(props) {
  const NavigateFunc = () => {
    window.location = "/Dashboard"
  }
  return (
    <div className=" w-full bg-white fixed">
      <Navbar className="border-2" >
        <div id="navbarname">

          <NavbarBrand className="m-0" style={{ height: '90px' }}>
            <div onClick={NavigateFunc} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img id="navbarimg" src="https://th.bing.com/th?id=OIP.LhNZyOyY6Se-L3FaYDTklwHaEc&w=322&h=193&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" style={{ width: '110px', marginLeft: '-20px', height: '70px' }} />
              <p className="font-bold text-inherit m-0 text-sm" style={{ paddingBottom: "3px", color: "black", paddingTop: '28px', marginLeft: '-10px' }}>
                <p className=" text-4" style={{ marginTop: "-15px", fontSize: '25px' }}> <b className="navbarpara">Board of Revenue</b></p>
                <span className="navbarSpan align-middle" style={{ fontSize: '15px' }} > <b className="navbarspan"> Government of Sindh </b></span>
              </p>
            </div>
          </NavbarBrand >
        </div>
        <div id="navbaricon">
          <NavbarBrand className="m-0" style={{ height: '90px', columnGap: '10px', marginRight: '20px' }}>
            <FontAwesomeIcon icon={faBell} size="lg" style={{ border: '2px solid gray', padding: '5px', borderRadius: '10px' }} />
            <FontAwesomeIcon icon={faEnvelope} size="lg" style={{ border: '2px solid gray', padding: '5px', borderRadius: '10px' }} />
            <button style={{ display: props.display }} onClick={() => window.location.reload()}>🔄</button>
          </NavbarBrand>
        </div>
      </Navbar>
    </div>
  );

}
