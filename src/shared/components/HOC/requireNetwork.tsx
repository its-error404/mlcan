import React, { PropsWithChildren } from "react";
import { useNetwork } from "../../hooks/useNetwork";

interface RequireNetworkProps {}

const RequireNetwork = ({
  children,
}: PropsWithChildren<RequireNetworkProps>) => {
  const {
    networkStatus: { isOnline },
  } = useNetwork();

  return (
    <div className="network-status-wrapper">
      {!isOnline && (
        <div className="offline">
          <span className="text-white offline__text">
            No internet connection. Connect internet to proceed
          </span>
        </div>
      )}
      {children}
    </div>
  );
};

export default RequireNetwork;
