import React,{useEffect, useState} from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import axios from 'axios';
import { dev } from '../../config/routes';
import Webcam from "react-webcam";
import './ScanComp.css';
import { Html5QrcodeScanner } from 'html5-qrcode';

const ScanComp = ({setShow,setFetchedData}) => {

  const [data, setData] = useState("Not Found");
  var [result,setResult] = useState('');
  var [allow,setAllow] = useState(true);
  var [showScanner,setShowScanner] = useState(false);

  useEffect(()=>{
// fetching();

if(allow){

function onScanSuccess(decodedText, decodedResult) {
  fetching(decodedText)
  console.log(`Code scanned = ${decodedText}`, decodedResult);
}
console.log(document.getElementById('qr-reader'))
var html5QrcodeScanner = new Html5QrcodeScanner(
"qr-reader", { fps: 10, qrbox: 300 });
html5QrcodeScanner.render(onScanSuccess);
}
setAllow(false)

  },[])

  var fetching =async (val)=>{
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
    var res = await axios.post('https://40e2-75-119-139-19.ngrok.io/dealer/scanBarcode',{
      barcode:val,
      ...obj
    });
    if(res.data.message=='Success'){
      setFetchedData(res.data.doc)
      setShow(true)
      // handleEvent()
    }else{
      console.log('error-->',res.data)
    }
  }

  // const handleEvent=async()=>{
  //   var getId =  localStorage.getItem('HabibId')
  //   var type = localStorage.getItem('type')

  

  //   var {data} = await axios.post(dev+'/dealer/testCreateLog',obj);
  //   if(data.message=='Success'){
  //     console.log('successful')
  //   }else{
  //     console.log('falied-->',data)
  //   }
  // }



  return (
    <div className='ScanCompMain'>
      {/* 
      
      <p>{data}</p> */}

        <div className='ScanImgDiv'
        onClick={
          ()=>{
            setShowScanner(true)
        }}
        >
          {
  <div id="qr-reader" style={{width:'25vw',height:'18vw',opacity:showScanner ? 1 : 0}}
  ></div>
          }

        </div>
        <p className='ScanCompTxt'>Tap to scan barcode</p>
    </div>
  )

}

export default ScanComp