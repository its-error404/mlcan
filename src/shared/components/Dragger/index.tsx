import React, { FC } from 'react';
import { Upload, message } from 'antd';
import { ReactComponent as CameraIcon } from "../../../assets/Multicolor icons - SVG/add photo.svg";
import './Dragger.scss'
interface DraggerProps {
    onFileUpload: () => void;
    className? : string
}

const { Dragger } = Upload;

const PhotoDragger: FC<DraggerProps> = ({ onFileUpload }) => {
    const handleFileUpload = (info: any) => {
        if (info) {
            if (info.file && info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file && info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };

    return (
        <Dragger
            className="ant-upload-dragger"
            showUploadList={false}
            onChange={handleFileUpload}
            beforeUpload={() => false}
            accept="image/*"
        >
            <div className="upload-flex">
                <p className="ant-upload-drag-icon">
                    <CameraIcon width={20} />
                </p>
                <p className="ant-upload-text" onClick={onFileUpload}>
                    Add Photo
                </p>
            </div>
        </Dragger>
    );
};

export default PhotoDragger;
