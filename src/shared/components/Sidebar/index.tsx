import React, { useEffect, useRef, useState } from "react";
import Logo from "../../../assets/Logo/PNG/MLCAN logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import { ReactComponent as ContainerIcon } from "../../../assets/single color icons - SVG/container.svg";
import { ReactComponent as CustomersIcon } from "../../../assets/single color icons - SVG/customer.svg";
import { ReactComponent as RepairListIcon } from "../../../assets/single color icons - SVG/repair list.svg";
import { ReactComponent as UsersIcon } from "../../../assets/single color icons - SVG/user management.svg";
import { ReactComponent as CustomerIcon } from "../../../assets/single color icons - SVG/customer.svg";
import { ReactComponent as AccordingOpenIcon } from "../../../assets/single color icons - SVG/accordion open.svg";
import { ReactComponent as EmailIcon } from "../../../assets/single color icons - SVG/mail.svg";
import { ReactComponent as PhoneIcon } from '../../../assets/single color icons - SVG/call.svg'
import { ReactComponent as LogoutIcon } from '../../../assets/single color icons - SVG/logout.svg'
import { logoutUser } from "../../../services/AuthService/auth.service";
import { getAuthToken, getUserInfo } from "../../../services/AuthService/authToken";

interface UserData {
    uid: string | null;
    email: string | null;
    phone: string | null;
    is_admin: string | null;
}

const Sidebar = () => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    const [dropDown, setDropDown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const navigate = useNavigate()

    const toggleDropdown = () => {
        setDropDown(!dropDown)
    }

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropDown(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const [data, setData] = useState<UserData>({
        uid: null,
        email: null,
        phone: null,
        is_admin: null,
    });

    const authToken = getAuthToken()

    useEffect(() => {
        if (authToken) {
            const userData = getUserInfo()
            setData(userData)
        }
    }, [authToken])

    const logout = () => {
        logoutUser()
        navigate('/auth/login')
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
                    <p>{data.is_admin}</p>
                </div>

                <div className={`user-arrow ${dropDown ? "drop-active" : ""}`}
                    onClick={toggleDropdown}>
                    <AccordingOpenIcon width={10} />
                </div>

                {dropDown && (
                    <div className="user-dropdown">
                        <div className="user-dropdown-info">
                            <p className="initial">JR</p>

                            <div className="user-information-dropdown">
                                <p>Jeremy Roberts</p>
                                <div className="designation-flex">
                                    <p className="user-role">{data.is_admin}</p>
                                    <div className="dot">.</div>
                                    <p>{data.uid}</p>
                                </div>
                                <div className="align-left">
                                <div className="user-contact">
                                    <div className="mail-container">
                                        <EmailIcon width={20} className="mail-icon" />
                                        <p className="user-email">{data.email}</p>
                                    </div>
                                    <div className="number-container">
                                        <PhoneIcon width={20} className="call-icon" />
                                        <p className="user-number">{data.phone}</p>
                                    </div>
                                </div>
                                <div className="logout-container" onClick={()=> logout()}>
                                    <LogoutIcon width={20} className="logout-icon"/>
                                    <p className="logout-text">Logout</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar
