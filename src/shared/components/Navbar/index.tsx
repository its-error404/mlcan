import React from "react";
import { Menu } from 'antd';
import "./navbar.scss";
import AuthContainer from "../../../store/container/AuthContainer";
import Notification from "../Notification";
import { NotificationTypes } from "../../../enums/notificationTypes";

const Navbar = (props: any) => {

  const handleClick = () => {
    Notification({ message: "Logout", description: "user loggedout successfully", type: NotificationTypes.SUCCESS })
    return props.setUnAuthenticated();
  };

  return (
    <Menu onClick={handleClick} mode="horizontal">
      <Menu.Item className="navbar-item" key="alipay">
        Logouts
        </Menu.Item>
    </Menu>
  );
}

export default AuthContainer(Navbar);