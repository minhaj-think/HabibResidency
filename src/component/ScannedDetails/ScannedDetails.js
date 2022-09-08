import React from 'react'
import './ScannedDetails.css';
import CnicIcon from './../../assets/cnicicon.svg';

const ScannedDetails = ({fetchedData}) => {


    return (
    <div className='scannedDetailsMain'>
    <div className='scannedImg'></div>        
    <div className='scannedSubDiv'>
        <p className='scannedSubTitle'>Name</p>
        <p className='scannedSubTxt'>{fetchedData.NTNnumber ? fetchedData.firmName : fetchedData.fName}</p>
    </div>
    <div className='scannedSubDiv'>
    <p className='scannedSubTitle'>CNIC</p>
    <p className='scannedSubTxt'>{fetchedData.CNIC}</p>        
    </div>
    <div className='scannedSubDiv'>
    <p className='scannedSubTitle'>Mobile Number</p>
    <p className='scannedSubTxt'>{fetchedData.phone}</p>        
    </div>
    <div className='scannedSubDiv'>
    <p className='scannedSubTitle'>Security ID</p>
    <p className='scannedSubTxt'>{fetchedData.securityId}</p>        
    </div>
    <div className='ScannedCnicMain'>
    <div className='ScannedCnicDiv'>
    <img src={CnicIcon} className='ScannedIcon' />
    <p className='ScannedTxt'>CNIC Front</p>
        
    </div>
    <div className='ScannedCnicDiv'>
    <img src={CnicIcon} className='ScannedIcon' />
    <p className='ScannedTxt'>CNIC Back</p>

    </div>
    </div>

    </div>
  )

}

export default ScannedDetails