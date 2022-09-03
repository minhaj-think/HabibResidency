import React from 'react'
import './ScanComp.css';

const ScanComp = ({setShow}) => {

    return (
    <div className='ScanCompMain'>
        <div className='ScanImgDiv'
        onClick={()=>setShow(true)}
        ></div>
        <p className='ScanCompTxt'>Tap to scan barcode</p>
    </div>
  )

}

export default ScanComp