import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar";
import './ViewContainer.scss'


const ViewContainer = () => {
  const { id } = useParams();
  // const containerData: SingleContainerData | null = addContainerRequest(id)

  return (
    <div className="view-container">
      <Sidebar />
      <div className="page-content">
        <div className="go-to-containers">
            {/* <BackIcon width={20}/> */}
            <label>Containers</label>
        </div>
        <div>
    <div>
      <h1>Container Details</h1>
      {/* <p>{containerData?.id}</p> */}
      

    </div>



        </div>
        </div>
    </div>
  );
};

export default ViewContainer;
