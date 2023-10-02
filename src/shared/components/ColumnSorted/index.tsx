import React from "react";
import { Tooltip } from "antd";

const SortableColumnHeader = ({ title, onSortChange }) => {
  return (
    <div onClick={onSortChange}>
      <Tooltip title="Sort" placement="bottom">
        {title}
      </Tooltip>
    </div>
  );
};

export default SortableColumnHeader;
