import React,{useState} from 'react'
import './ScanCode.css';
import Header from './../component/Header/Header.js';
import ScanComp from './../component/ScanComp/ScanComp.js';
import ScannedDetails from './../component/ScannedDetails/ScannedDetails.js';
import { useEffect } from 'react';
import { Grid ,Alert,AlertTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ScanCode = () => {

  var [show,setShow] = useState(false)
  var [fetchedData,setFetchedData] = useState({});
  var [showScan,setShowScan] = useState(false)
  var navigate=useNavigate();

  useEffect(()=>{
    var userId =   localStorage.getItem('HabibId')
    if(!userId){
      navigate('/login')
    }

    fetching()
  },[])

  var fetching =async ()=>{
    var getId =  localStorage.getItem('HabibId')
    var type = localStorage.getItem('type')
    if(type=='SuperAdmin'){
    setShowScan(true)
    }else{
      var getPreviliges =  JSON.parse(localStorage.getItem('privileges'))
      var a = getPreviliges.find(printPrivilage)
      showScan = a==undefined ? false : true
      setShowScan(showScan)
    }
  }


  var printPrivilage=(val)=>{
    return val=='scan-barcode'
  }

  
  useEffect(()=>{
    if(fetchedData!={}){
      setShow(true)
    }
  },[fetchedData])
    return (
    <div>
        <Header active='scan' />
        {
          showScan &&
          <ScanComp setShow={setShow} setFetchedData={setFetchedData} />
        }
        {(show && showScan) &&
          <ScannedDetails fetchedData={fetchedData} />
        }
        {
          !showScan &&
          <Alert severity="error" style={{maxWidth:'80%',margin:'auto',marginTop:20}}>
          <AlertTitle>Error</AlertTitle>
                <strong>You are not allowed to scan barcodes</strong>
        </Alert>
                }
    </div>
  )
}

export default ScanCode