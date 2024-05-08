import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import "./EllipsisMenu.scss";
import { Button } from "antd";
import { Icon } from '@iconify/react';

interface EllipsisMenuProps {
  onDelete: () => void;
  onUpdateComment: () => void;
  onUpdatePhoto: () => void;
  onEditItem: () => void;
}

const EllipsisMenu: React.FC<EllipsisMenuProps> = ({
  onDelete,
  onUpdateComment,
  onUpdatePhoto,
  onEditItem
}) => {

  const handleDelete = () => {
    onDelete();
  };

  const handleUpdateComment = () => {
    onUpdateComment();
  };

  const handleUpdatePhoto = () => {
    onUpdatePhoto();
  };

  const handleEditItem = () => {
    onEditItem()
  }

  return (
    <div className="custom-dropdown-container"
    >
      <Button icon={<EllipsisOutlined/>} className="custom-dropdown-button" />
        <div className="custom-dropdown-menu">
        <div className="menu-item" onClick={handleDelete}>
          <Icon icon="material-symbols:delete"  color="#949ea9" width={20} />
          </div>
          <div className="menu-item" onClick={handleEditItem}>
          <Icon icon="ic:baseline-edit" color="#949ea9" width={20}/>
          </div>
          <div className="menu-item" onClick={handleUpdateComment}>
          <Icon icon="ion:chatbox-ellipses-outline"  color="#949ea9" width={20} />
          </div>
          <div className="menu-item" onClick={handleUpdatePhoto}>
          <Icon icon="ion:image"  color="#949ea9" width={20} />
          </div>
        </div>
    </div>
  );
};

export default EllipsisMenu;
