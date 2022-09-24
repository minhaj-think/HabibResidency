import React,{useState,useRef} from 'react'
import './ScanCode.css';
import Header from './../component/Header/Header.js';
import ScanComp from './../component/ScanComp/ScanComp.js';
import ScannedDetails from './../component/ScannedDetails/ScannedDetails.js';
import { useEffect } from 'react';
import { Grid ,Alert,AlertTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { dev } from '../config/routes';
import Barcode from 'react-barcode/lib/react-barcode';

const ScanCode = () => {

  var [show,setShow] = useState(false)
  var [fetchedData,setFetchedData] = useState({});
  var [showScan,setShowScan] = useState(false)
  var [barCode,setBarCode] = useState(true)
  var [alertTxt,setAlertTxt] = useState('');
  var [alertShow,setAlertShow] = useState(false);
  var [barCodeVal,setBarCodeVal] = useState('');
  
  var navigate=useNavigate();

  var ref = useRef(null)

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

  useEffect(()=>{
    ref.current.focus()
  },[Barcode])

  const handleBarCodeInputChange=async()=>{
    if(barCodeVal==''){
      return;
    }
    console.log('scanned ==>',barCodeVal)
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
    // console.log('barCodeVal',barCodeVal)
    var res = await axios.post(dev+'/dealer/scanBarcode',{
      barcode:barCodeVal,
      ...obj
    });
    console.log('verfore-->',res.data)
    if(res.data.message=='Success'){
      setFetchedData(res.data.doc)
      setShow(true)
      // handleEvent()
    }else{
      setAlertShow(true)
      setAlertTxt('Its a Wrong barcode')
      console.log('error-->',res.data)
    }

  }

    return (
    <div>
        <Header active='scan' />
<Grid container>
        <Grid item md={12} sm={12} xs={12}>
                    <div className='formBtnsMain buttonDiv'>
                        <div className={barCode ? 'selected barcodeBtn' :'Not_selected barcodeBtn'} onClick={()=>setBarCode(true)}>
                            <span>Using Scanner</span>
                        </div>
                        <div className={!barCode ? 'selected barcodeBtn' :'Not_selected barcodeBtn'} onClick={()=>setBarCode(false)}>
                        <span>Using Website</span>
                        </div>
                    </div>
        </Grid>
        {
          barCode &&
        <Grid item xs={12}>
          <input  autoFocus={true}
          ref={ref}
          // onChange={handleBarCodeInputChange}
          value={barCodeVal}
          onChange={e=>setBarCodeVal(e.target.value)}
          className='barcodeInputBox'
          placeholder='scan with barcode (do not write here)'
          />
        </Grid>
      }
        {
          barCode &&
        <Grid item xs={12}>
        <button className='codeBtn'
        onClick={handleBarCodeInputChange}
        >Search</button>
        </Grid>
      }

        </Grid>
        <br/><br/>
        {
        alertShow &&
    <Alert severity="error">
  <AlertTitle>Error</AlertTitle>
        <strong>{alertTxt}</strong>
</Alert>
    }

        {
          (showScan && !barCode) &&
          <ScanComp 
          setAlertTxt={setAlertTxt}
          setAlertShow={setAlertShow}
          setShow={setShow} setFetchedData={setFetchedData} />
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