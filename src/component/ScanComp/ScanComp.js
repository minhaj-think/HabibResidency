import React,{useEffect, useState} from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import axios from 'axios';

import Webcam from "react-webcam";
import './ScanComp.css';

const ScanComp = ({setShow,setFetchedData}) => {

  const [data, setData] = useState("Not Found");
  var [result,setResult] = useState('');

  useEffect(()=>{
fetching();
  },[])

  var fetching =async ()=>{
    var res = await axios.post('https://40e2-75-119-139-19.ngrok.io/dealer/scanBarcode',{
      barcode:'BHRMRM48877541'
    });
    if(res.data.message=='Success'){
      setFetchedData(res.data.doc)
    }else{
      console.log('error-->',res.data)
    }
  }



  return (
    <div className='ScanCompMain'>
      {/* 
      
      <p>{data}</p> */}

        <div className='ScanImgDiv'
        onClick={()=>setShow(true)}
        >
          <BarcodeScannerComponent
        width={600}
        height={600}
        facingMode='user'
        onUpdate={(err, result) => {
          console.log('err=>',err)
          console.log('result=>',result)
          if (result) setData(result.text);
          else {
            console.log('err=>',err)
            console.log('result=>',result)
   setData("Not Found");
          }
        }}
        
      />
          {/* <Webcam
          height={300}
          width={300}
          >
            
            </Webcam> */}
        </div>
        <p className='ScanCompTxt'>Tap to scan barcode</p>
    </div>
  )

}

export default ScanComp