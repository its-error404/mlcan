import React, { PropsWithChildren } from "react";
import { useNetwork } from "../../hooks/useNetwork";

interface RequireNetworkProps {}

const RequireNetwork = ({
  children,
}: PropsWithChildren<RequireNetworkProps>) => {
  const { networkStatus } = useNetwork();

  const { onLine } = networkStatus;

  return (
    <div className="network-status-wrapper">
      {!onLine && (
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
