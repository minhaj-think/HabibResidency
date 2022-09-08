import React,{useState,useRef} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';
import './DealerListingModal.css';

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

// var barCodes=['a','b']

  return (
<Modal
        open={openModal}
        onClose={()=>setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div ref={componentRef}>            
            {
                barCodes.map((v,i)=>(
                    <div className='multiBarCodeMain'>
                    <Barcode value={v} style={{maxWidth:'200px'}} />
                      </div>            
                ))
            }
          </div>
          <ReactToPrint
        trigger={() => <button className='printThisBtn'>Print this out!</button>}
        content={() => componentRef.current}
      />
        </Box>
      </Modal>
    )
}

export default DealerListingModal