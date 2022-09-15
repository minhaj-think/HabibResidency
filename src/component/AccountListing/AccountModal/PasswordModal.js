import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './AccountModal.css';
import axios from 'axios';
import { dev } from '../../../config/routes';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:window.outerWidth>470 ? 400 : window.outerWidth>370 ? 300 : 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    maxHeight:'80vh',
    overflowY:'scroll',
    // overflowx:'scroll',
    p: 4,
  };

const AccountModal = ({open,setOpen,selectedIem,setRefresh}) => {

    var [password,setPassword] = useState("");
    var [progress,setProgress]=useState(false)


    const handleSubmit =async()=>{
      setProgress(true)
if(password.length<8){
      setProgress(false)
      alert('Password should be atleast of 8 characters')
      return
    }

    var {data} = await axios.put(dev+'/subadmin/updateSubadminPassword',{
        newPassword:password,
        id:selectedIem._id
    })
    if(data.message=='Success'){
      console.log("success")
      setOpen(false)
      setProgress(false)
      setRefresh(prev=>!prev)
    }else{
      setProgress(false)
      console.log("failed")
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
        <p className='loginHereTxt'>Change Password</p>
        <hr className='loginHr' />
        <p className='loginTxt'>Password:</p>
        <input className='form1Input loginInput' 
            placeholder='Password'
            value={password}
            onChange={e=>setPassword(e.target.value)}
            type='password'
            />
   
        <button className='loginBtn'
        onClick={handleSubmit}
        >{ progress ? <CircularProgress color='error' size={13} /> :  'Submit'}</button>

        </Box>
      </Modal>
        )
}

export default AccountModal