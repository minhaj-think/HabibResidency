import React,{useEffect, useState} from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import axios from 'axios';
import Webcam from "react-webcam";
import './ScanComp.css';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { dev } from '../../config/routes';
import { Alert,AlertTitle } from '@mui/material';

const ScanComp = ({setShow,setFetchedData,setAlertShow,setAlertTxt}) => {

  var [allow,setAllow] = useState(true);
  var [data,setData] = useState('');
  var [showScanner,setShowScanner] = useState(false);

  useEffect(()=>{

if(allow){

function onScanSuccess(decodedText, decodedResult) {
  console.log("scann success")
  fetching(decodedText)
  console.log(`Code scanned = ${decodedText}`, decodedResult);
}
var html5QrcodeScanner = new Html5QrcodeScanner(
"qr-reader", { fps: 10, qrbox: {width: '100%', height: '100%'}});
html5QrcodeScanner.render(onScanSuccess);
}
setAllow(false)

  },[])

  var fetching =async (val)=>{
    setAlertShow(false)
    var getId =  localStorage.getItem('HabibId')
    var type = localStorage.getItem('type')


    if(type=='SuperAdmin'){
      var obj={
        logType:'scan-barcode',
        operationBy:'superadmin',
      }
    }else{
      var obj={
        logType:'scan-barcode',
        operationBy:'user',
        user:getId
      }
    }
    var res = await axios.post(dev+'/dealer/scanBarcode',{
      barcode:val,
      ...obj
    });
    console.log(res.data)
    if(res.data.message=='Success'){
      setFetchedData(res.data.doc)
      setShow(true)
      // handleEvent()
    }else{
      setAlertShow(true)
      setAlertTxt('Its a long Wrong barcode')
      console.log('error-->',res.data)
    }
  }



  return (
    <div className='ScanCompMain'>

        <div className='ScanImgDiv'
        onClick={
          ()=>{
            setShowScanner(true)
        }}
        >
  <div id="qr-reader" className='qrMain' style={{width:'25vw',height:'18vw',opacity:showScanner ? 1 : 0}}
  ></div>
  {/* <div className='qrMain'>

<BarcodeScannerComponent
        width={'100%'}
        height={'100%'}
        
        onUpdate={(err, result) => {
          if (result){
            fetching(result.text)
            setData(result.text)
          }
          else setData("Not Found");
        }}
      />
  </div> */}

      {/* <p>{data}</p> */}
        </div>
        <p className='ScanCompTxt'>Tap to scan barcode</p>
<div className='alertDIv'>
</div>
    </div>
  )

}

export default ScanComp