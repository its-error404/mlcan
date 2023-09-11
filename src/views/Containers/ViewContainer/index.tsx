import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar";
import './ViewContainer.scss'
import {addContainerRequest} from '../../../services/ContainersService/addcontainer.service'
import {ReactComponent as BackIcon} from '../../../assets/single color icons - SVG/back.svg'
import { SingleContainerData } from "../../../models/singlecontainer.model";

const ViewContainer = () => {
  const { id } = useParams();
  const containerData: SingleContainerData | null = addContainerRequest(id)

  return (
    <div className="view-container">
      <Sidebar />
      <div className="page-content">
        <div className="go-to-containers">
            <BackIcon width={20}/>
            <label>Containers</label>
        </div>
        <div>
    <div>
      <h1>Container Details</h1>
      <p>{containerData?.id}</p>
      

    </div>



        </div>
        </div>
    </div>
  );
};

export default ViewContainer;
