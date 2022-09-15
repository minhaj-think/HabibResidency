import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './AccountModal.css';
import axios from 'axios';
import { dev } from '../../../config/routes';

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

const AccountModal = ({open,setOpen}) => {

    var [name,setName] = useState("");
    var [email,setEmail] = useState("");
    var [password,setPassword] = useState("");

    // privilages
    var [search,setSearch] = useState(false);
    var [create,setCreate] = useState(false);
    var [edit,setEdit] = useState(false);
    var [del,setDel] = useState(false);
    var [view,setView] = useState(false);
    var [print,setPrint] = useState(false);
    var [scan,setScan] = useState(false);

  const handleSubmit =async()=>{

    if(name=='' || email==''){
      alert('Please fill from completely')
      return
    }else if(password.length<8){
      alert('Password should be atleast of 8 characters')
      return
    }
    var privileges=[];
    if(search){
      privileges.push('search-form')
    }
    if(create){
      privileges.push('create-form')
    }
    if(edit){
      privileges.push('edit-form')
    }
    if(del){
      privileges.push('delete-form')
    }
    if(view){
      privileges.push('view-form')
    }
    if(print){
      privileges.push('print-barcode')
    }
    if(scan){
      privileges.push('scan-barcode')
    }
    var {data} = await axios.post(dev+'/subadmin/createSubadmin',{
      privileges,
      email,
      password,
      username:name
    })
    if(data.message=='Success'){
      setOpen(false)
    }else{
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
        <p className='loginHereTxt'>Signup Here</p>
        <hr className='loginHr' />
        <p className='loginTxt'>UserName:</p>
        <input className='form1Input loginInput' 
            placeholder='Username'
            value={name}
            onChange={e=>setName(e.target.value)}
            />

        <p className='loginTxt'>Email:</p>
        <input className='form1Input loginInput' 
            placeholder='Email'
            value={email}
            onChange={e=>setEmail(e.target.value)}
            />
        <p className='loginTxt'>Password:</p>
        <input className='form1Input loginInput' 
            placeholder='Password'
            value={password}
            onChange={e=>setPassword(e.target.value)}
            />
        <p className='loginTxt'>Privileges values:</p>

{/* first div */}
        <div className='selectMain'>
            
        <div className='selectSubMain'>
        <input  type={'checkbox'} 
        value={search}
        onChange={()=>setSearch(!search)}
        />
        <span>search-form</span>
        </div>

        <div className='selectSubMain'>
        <input className='formSelect' type={'checkbox'} 
        value={create}
        onChange={()=>setCreate(!create)}
        />
        <span>create-form</span>
        </div>

        </div>
        {/* <br/> */}

{/* second div */}
        <div className='selectMain'>
            
        <div className='selectSubMain'>
        <input  type={'checkbox'} 
        value={edit}
        onChange={()=>setEdit(!edit)}
        />
        <span>edit-form</span>
        </div>

        <div className='selectSubMain'>
        <input className='formSelect' type={'checkbox'}
        value={del}
        onChange={()=>setDel(!del)}
         />
        <span>delete-form</span>
        </div>

        </div>

{/* third div */}
<div className='selectMain'>
            
            <div className='selectSubMain'>
            <input  type={'checkbox'}
        value={view}
        onChange={()=>setView(!view)}
             />
            <span>view-form</span>
            </div>
    
            <div className='selectSubMain'>
            <input className='formSelect' type={'checkbox'} 
        value={print}
        onChange={()=>setPrint(!print)}
            />
            <span>print-barcode</span>
            </div>
    
            </div>

 {/* fourth div */}
        <div className='selectMain'>
            
        <div className='selectSubMain'>
        <input  type={'checkbox'} 
        value={scan}
        onChange={()=>setScan(!scan)}
        />
        <span>scan-form</span>
        </div>

        <div className='selectSubMain'>
        </div>

        </div>
   
        <button className='loginBtn'
        onClick={handleSubmit}
        >Submit</button>

        </Box>
      </Modal>
        )
}

export default AccountModal