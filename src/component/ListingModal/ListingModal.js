import React,{useState,useRef} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';
import './ListingModal.css';

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
          <ReactToPrint
        trigger={() => <button className='printThisBtn'>Print this out!</button>}
        content={() => componentRef.current}
      />

        </Box>
      </Modal>
    )
}

export default ListingModal