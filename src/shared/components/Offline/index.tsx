import React from "react";

import "./offline.scss";

interface OfflineProps {
  isOffline: boolean;
}

const Offline = ({ isOffline }: OfflineProps) => {
  return isOffline ? (
    <div className="offline">
      <span className="offline__text">No Internet Connection</span>
    </div>
  ) : (
    <></>
  );
};

export default Offline;
