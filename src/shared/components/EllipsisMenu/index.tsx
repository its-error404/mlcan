import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import "./EllipsisMenu.scss";
import { Button } from "antd";
import { Icon } from '@iconify/react';


interface EllipsisMenuProps {
  onDelete: () => void;
  onUpdateComment: () => void;
  onUpdatePhoto: () => void;
}

const EllipsisMenu: React.FC<EllipsisMenuProps> = ({
  onDelete,
  onUpdateComment,
  onUpdatePhoto,
}) => {

  const handleDelete = () => {
    console.log("Delete function called in EllipsisMenu");
    onDelete();
  };

  const handleUpdateComment = () => {
    console.log("Update Comment function called in EllipsisMenu");
    onUpdateComment();
  };

  const handleUpdatePhoto = () => {
    console.log("Update Photo function called in EllipsisMenu");
    onUpdatePhoto();
  };

  return (
    <div className="custom-dropdown-container"
    >
      <Button icon={<EllipsisOutlined  rev/>} className="custom-dropdown-button" />
        <div className="custom-dropdown-menu">
        <div className="menu-item" onClick={handleDelete}>
          <Icon icon="material-symbols:delete"  color="#949ea9" width={20} />
          </div>
          <div className="menu-item" onClick={handleUpdatePhoto}>
          <Icon icon="ic:baseline-edit" color="#949ea9" width={20}/>
          </div>
          <div className="menu-item" onClick={handleUpdateComment}>
          <Icon icon="ion:chatbox-ellipses-outline"  color="#949ea9" width={20} />
          </div>
          <div className="menu-item" onClick={handleUpdateComment}>
          <Icon icon="ion:image"  color="#949ea9" width={20} />
          </div>
        </div>
    </div>
  );
};

export default EllipsisMenu;
