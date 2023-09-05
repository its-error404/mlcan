import React from "react";
import Logo from "../../../assets/Logo/PNG/MLCAN logo.png";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import { ReactComponent as ContainerIcon } from "../../../assets/single color icons - SVG/container.svg";
import { ReactComponent as CustomersIcon } from "../../../assets/single color icons - SVG/customer.svg";
import { ReactComponent as RepairListIcon } from "../../../assets/single color icons - SVG/repair list.svg";
import { ReactComponent as UsersIcon } from "../../../assets/single color icons - SVG/user management.svg";
import { ReactComponent as CustomerIcon } from "../../../assets/single color icons - SVG/customer.svg";
import { ReactComponent as AccordingOpenIcon } from "../../../assets/single color icons - SVG/accordion open.svg";

const Sidebar = () => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

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

                    <div className="user-arrow">
                        <AccordingOpenIcon width={10} />
                    </div>
                </div>
            </div>
    );
};

export default Sidebar;
