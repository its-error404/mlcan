import React, { useState } from "react";
import Logo from "../../../assets/Logo/PNG/MLCAN logo.png";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import { ReactComponent as ContainerIcon } from "../../../assets/single color icons - SVG/container.svg";
import { ReactComponent as CustomersIcon } from "../../../assets/single color icons - SVG/customer.svg";
import { ReactComponent as RepairListIcon } from "../../../assets/single color icons - SVG/repair list.svg";
import { ReactComponent as UsersIcon } from "../../../assets/single color icons - SVG/user management.svg";
import { ReactComponent as CustomerIcon } from "../../../assets/single color icons - SVG/customer.svg";
import { ReactComponent as AccordingOpenIcon } from "../../../assets/single color icons - SVG/accordion open.svg";
import { ReactComponent as EmailIcon } from "../../../assets/single color icons - SVG/mail.svg";
import { ReactComponent as PhoneIcon } from '../../../assets/single color icons - SVG/call.svg'
import { Button } from "antd";
import { loginUser, logoutUser } from "../../../services/AuthService/auth.service";
import axiosInstance from "../../../interceptor/axiosInstance";
import { ApiRoutes } from "../../../routes/routeConstants/apiRoutes";


const Sidebar = () => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    const [dropDown, setDropDown] = useState(false)

    const toggleDropdown = () =>{
        setDropDown(!dropDown)
    }

    const navigate = useNavigate()

    const logout = ()=>{
        logoutUser()
        navigate('/auth/login')
    }

    const [data, setData] = useState(null)

    const loginUser = async (email: string, password: string) => {
        try {
      
          const response = await axiosInstance.post(ApiRoutes.USER_LOGIN, {
            email,
            password,
          });
        } catch {
            console.log("Error")
        }
    }

    return (
            <div className="side-bar">
                <img src={Logo} alt="" width={200} className="logo" />
                <div className="side-bar__options">
                    <div className="side-bar__options-text">
                        <Link
                            to="/containers"
                            className={splitLocation[1] === "containers" ? "active" : ""}
                        >
                            <span>
                                <ContainerIcon width={20} />
                            </span>
                            Containers
                        </Link>
                        <Link
                            to="/customers"
                            className={splitLocation[1] === "customers" ? "active" : ""}
                        >
                            <span>
                                <CustomersIcon width={20} />
                            </span>
                            Customers
                        </Link>
                        <Link
                            to="/repair-list"
                            className={splitLocation[1] === "repair-list" ? "active" : ""}
                        >
                            <span>
                                <RepairListIcon width={20} />
                            </span>
                            Repair List
                        </Link>
                        <Link
                            to="/user-management"
                            className={splitLocation[1] === "user-management" ? "active" : ""}
                        >
                            <span>
                                <UsersIcon width={20} />
                            </span>
                            User Management
                        </Link>
                    </div>
                </div>

                <div className="user-info">
                    <CustomerIcon width={30} className="customer-icon" />

                    <div className="user-information">
                        <p>Richard Williams</p>
                        <p>Admin</p>
                    </div>

                    <div className={`user-arrow ${dropDown ? "drop-active" : ""}`}
 onClick={toggleDropdown}>
                        <AccordingOpenIcon width={10} />
                    </div>

                    {dropDown && (
          <div className="user-dropdown">
            <div className="user-info">
                    <CustomerIcon width={30} className="customer-icon" />

                    <div className="user-information-dropdown">
                        <p>Richard Williams</p>
                        <div className="designation-flex">
                            <p className="user-role">Admin</p>
                            <p>.</p>
                            <p>A00989</p>
                        </div>
                        <div className="user-contact">
                            <div className="mail-container">
                            <EmailIcon width={20} className="mail-icon"/>
                            <p className="user-email">jeremyroberts.yahoo.com</p>
                            </div>
                            <div className="number-container">
                            <PhoneIcon width={20} className="call-icon"/>
                            <p className="user-number">(183)019-1934</p>
                            </div>
                        </div>
                    </div>
                    </div>
            {/* <Button onClick={logout}>Logout</Button> */}
          </div>
        )}
                </div>
            </div>
    );
};

export default Sidebar
