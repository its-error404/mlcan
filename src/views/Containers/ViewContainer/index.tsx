import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar";
import "./ViewContainer.scss";
import { getWorkingContainer } from "../../../services/ContainersService/containers.service";
import { ContainerData } from "../../../models/singlecontainer.model";
import { ReactComponent as BackIcon } from "../../../assets/single color icons - SVG/back.svg";
import { ReactComponent as EditIcon } from '../../../assets/single color icons - SVG/edit.svg'
import { ReactComponent as NextIcon } from '../../../assets/Multicolor icons - SVG/next.svg'
import { ReactComponent as PrevIcon } from '../../../assets/Multicolor icons - SVG/previous.svg'

import ActivitySection from "./Activity";
import Comments from "./Comments";
import Log from "./Log";
import { fetchActivityData, fetchCommentsData, fetchLogData } from "../../../services/ContainersService/viewcontainer.service";

const ViewContainer: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [containerData, setContainerData] = useState<ContainerData | null>(null);
  const [activeSection, setActiveSection] = useState("Activity")
  const [, setSectionIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await getWorkingContainer();
          if (response) {
          } else {
            setContainerData(null);
          }
        } catch (error) {
          console.error('Error fetching container data:', error);
          setContainerData(null);
        }
      }
    };

    fetchData();
  }, [id]);

  const sections = ["Activity", "Comments", "Log"]

  const handleSectionClick = async (section: string) => {
    const newIndex = sections.indexOf(section);
    setSectionIndex(newIndex);
    setActiveSection(section);

    if (section === "Activity") {
      if (id) {
        await fetchActivityData();
      }
    } else if (section === "Comments") {
      if (id) {
        await fetchCommentsData();
      }
    } else if (section === "Log") {
      if (id) {
        await fetchLogData();
      }
    }
  };

  return (
    <div className="view-container">
      <Sidebar />
      <div className="page-content">
        <div className="go-to-containers">
          <Link to="/containers"><BackIcon width={15} />&emsp;Containers</Link>
        </div>
        <div className="container-header">
          <div className="container-header__first">
            <h2>hi</h2>
            <h1>ABCD124567</h1>
            <EditIcon width={15} />
          </div>
          <div className="container-header__second">
            <p>1 of 94 </p>
            <PrevIcon width={30} />
            <NextIcon width={30} />
          </div>
        </div>
        <div className="container-headlines">
          <p>Yard name</p>
          <p>Customer</p>
          <p>Owner name</p>
          <p>Submitter Initials</p>
          <p>Length</p>
          <p>Height</p>
          <p>Container Type</p>
          <p>Manufacture Year</p>
        </div>
        <div className="container-data">
          <p>Harbour Link</p>
          <p>Harbour Link</p>
          <p>OOCI</p>
          <p>BC</p>
          <p>20 FEET</p>
          <p>20 FEET</p>
          <p>G1-DV</p>
          <p>2012</p>
        </div>
        <div className="options container-options">
          {sections.map((section, index) => (
            <p key={section} onClick={() => handleSectionClick(section)} className={activeSection === section ? "active-section" : ""}>{section}</p>
          ))}
        </div>
        <div className="section-content">
          {activeSection === "Activity" && <ActivitySection />}
          {activeSection === "Comments" && <Comments />}
          {activeSection === "Log" && <Log />}
        </div>
      </div>
    </div>
  );
};

export default ViewContainer;
