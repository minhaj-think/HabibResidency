import React,{useState,useRef} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';
import './ListingModal.css';
import axios from 'axios';
import { dev } from '../../config/routes';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

const ListingModal = ({setOpen,open,barCode}) => {
  const componentRef = useRef();
  var [verify,setVerify] = useState(false)
  var [progress,setProgress]  = useState(false);

  const handleEvent=async()=>{
    var getId =  localStorage.getItem('HabibId')
    var type = localStorage.getItem('type')
    setProgress(true)
    if(type=='SuperAdmin'){
      var obj={
        logType:'print-barcode',
        operationBy:'superadmin',
      }
    }else{
      var obj={
        logType:'print-barcode',
        operationBy:'user',
        user:getId
      }
    }

    var {data} = await axios.post(dev+'/client/printBarcode',obj);
    if(data.message=='Success'){
      console.log('successful')
    setProgress(false)
    setVerify(true)
    }else{
      console.log('falied-->',data)
    setProgress(false)
  }
  }

  return (
<Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div  ref={componentRef} className='singleBarCodeMain'>
        <Barcode value={barCode} style={{maxWidth:'200px'}} />
          </div>
          {
          !verify &&
          <button className='printThisBtn'
          onClick={()=>handleEvent()}
          disabled={progress}
        > {progress ? <CircularProgress color='error' size={13} /> :'Verify to print'}</button>
          }
        {
          verify &&
          <ReactToPrint
        trigger={() => <button className='printThisBtn'
        >Print this out!</button>}
        onAfterPrint={()=>setVerify(false)}
        content={() => componentRef.current}
      />
        }

        </Box>
      </Modal>
    )
}

export default ListingModal