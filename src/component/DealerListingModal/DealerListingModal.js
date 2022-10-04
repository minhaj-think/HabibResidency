import React,{useState,useRef} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';
import './DealerListingModal.css';
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
    maxHeight:'60%',
    overflow:'scroll'
  };
  

const DealerListingModal = ({setOpenModal,openModal,barCodes}) => {
  const componentRef = useRef();
  var [verify,setVerify] = useState(false)
  var [progress,setProgress]  = useState(false);
  var [align,setAlign] = useState('center')

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
      setProgress(false)
      console.log('falied-->',data)
    }
  }

  return (
<Modal
        open={openModal}
        onClose={()=>setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <p style={{textAlign:'center',fontSize:24,marginTop:0,fontWeight:600}}>Align</p>
          <div className='listingAlignmentStyle'>

          <button onClick={()=>setAlign('flex-start')}
          className={align=='flex-start' ? 'active' : ''}
          >Left</button>
          <button onClick={()=>setAlign('center')}
          className={align=='center' ? 'active' : ''}
          >Center</button>
          <button onClick={()=>setAlign('flex-end')}
          className={align=='flex-end' ? 'active' : ''}
          >Right</button>
          </div>

          <div ref={componentRef}>            
            {
                barCodes.map((v,i)=>(
                    <div className='multiBarCodeMain'
                    style={{alignItems:align}}
                    >
                    <Barcode value={v} style={{maxWidth:'200px'}} />
                      </div>            
                ))
            }
          </div>
          {
          !verify &&
          <button className='printThisBtn'
          onClick={()=>handleEvent()}
        >{progress ? <CircularProgress color='error' size={13} /> :'Verify to print'}</button>
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

export default DealerListingModal