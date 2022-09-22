import React from 'react'
import './ScannedDetails.css';
import CnicIcon from './../../assets/cnicicon.svg';
import { dev } from '../../config/routes';
const ScannedDetails = ({fetchedData}) => {


    return (
    <div className='scannedDetailsMain'>
    <div className='scannedImg'>
    {
      fetchedData.clientImage &&
    <img src={dev+'/api/getfile'+fetchedData.clientImage} height={'100%'} width={'100%'} style={{borderRadius:'100%'}} />
    }
      
    </div>        
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
    {
                        fetchedData.cnicFrontImage &&
                        <img src={dev+'/api/getfile'+fetchedData.cnicFrontImage} style={{height:'100%',width:'100%'}} />
                      }
                      {
                        !fetchedData.cnicFrontImage &&

    <img src={CnicIcon} className='ScannedIcon' />
  }
                     {
                        !fetchedData.cnicFrontImage &&
    <p className='ScannedTxt'>CNIC Front</p>
  }
        
    </div>

    <div className='ScannedCnicDiv'>
                        {
                        fetchedData.cnicBackImage &&
                        <img src={dev+'/api/getfile'+fetchedData.cnicBackImage} style={{height:'100%',width:'100%'}} />
                      }
                      {
                        !fetchedData.cnicBackImage &&

    <img src={CnicIcon} className='ScannedIcon' />
  }
                      {
                        !fetchedData.cnicBackImage &&

    <p className='ScannedTxt'>CNIC Back</p>
                      }
    </div>
    </div>

    </div>
  )

}

export default ScannedDetails