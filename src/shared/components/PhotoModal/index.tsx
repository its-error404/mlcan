import React from 'react'
import { Icon } from '@iconify/react';
import './PhotoModal.scss'
import ContainerImage from '../../../assets/container.png'
import { ReactComponent as PrevIcon } from '../../../assets/Multicolor icons - SVG/previous blac.svg'
import { ReactComponent as NextIcon } from '../../../assets/Multicolor icons - SVG/next black.svg'

type ModalProps = {
    children?: React.ReactNode;
    title?: string;
    centered?: boolean;
    visible?: boolean;
    onOk?: () => void;
    onCancel?: () => void;
  }

const PhotoModal:React.FC<ModalProps> = ({onCancel, onOk}) => {
  return (
    <div className='photo-modal'>
      <div className='overlay'>
        <div className='overlay-content'>
            <div className='main-photo-header'>
                <div className='photo-header'>
                    <Icon icon="ph:arrow-up" color="white" rotate={3} width={30} onClick={onCancel}/>
                    <Icon icon="ic:baseline-image" color="red" width={30}/>
                    <p>Damaged area photo</p>
                </div>
                <div className='photo-icon-header'>
                    <Icon icon="ion:print-sharp" color="white" width={30}/>
                    <Icon icon="material-symbols:download" color="white" width={30}/>
                </div>
            </div>
            <div className='photo-image-div'>
            <PrevIcon width={40}/>
            <img src={ContainerImage} alt=''/>
            <NextIcon width={40}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoModal

