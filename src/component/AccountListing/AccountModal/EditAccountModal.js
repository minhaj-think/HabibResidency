import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import './AccountModal.css';
import axios from 'axios';
import { dev } from '../../../config/routes';
import PasswordModal from './PasswordModal.js';

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

    var [username,setName] = useState(selectedIem.username);
    
    // privilages
    var [search,setSearch] = useState(false);
    var [create,setCreate] = useState(false);
    var [edit,setEdit] = useState(false);
    var [del,setDel] = useState(false);
    var [view,setView] = useState(false);
    var [print,setPrint] = useState(false);
    var [scan,setScan] = useState(false);
    var [analytics,setAnalytics] = useState(false);
    
    var [openPassword,setOpenPassword] = useState(false);
    var [progress,setProgress]=useState(false)
    var [delProgress,setDelProgress]=useState(false)
    
    // privilages
    React.useEffect(()=>{
        setName(selectedIem.username)
        // if(selectedIem?.privileges){
            // for(let i=0;i<selectedIem?.privileges.length;i++){
            //     switch(selectedIem?.privileges[i]){
            //         case 'search-form':
            //         setSearch(true)
            //         break;
            //         case 'create-form':
            //         setCreate(true)
            //         break;
            //         case 'edit-form':
            //         setEdit(true)
            //         break;
            //         case 'delete-form':
            //         setDel(true)
            //         break;
            //         case 'view-form':
            //         setView(true)
            //         break;
            //         case 'print-barcode':
            //         setPrint(true)
            //         break;
            //         case 'scan-barcode':
            //         setScan(true)
            //         break;
            //         default:
            //         break;
            //     }
            // }
        // }
        
    },[selectedIem])

    const handleDelete=async()=>{
        setDelProgress(true)
        var {data} = await axios.delete(dev+'/subadmin/deleteSubadmin',{
            data:{
              id:selectedIem._id
            } 
        })
        if(data.message=='Success'){
            alert("You delete this account successfully")
            setDelProgress(false)
        setRefresh(prev=>!prev)
            setOpen(false)
          }else{
            console.log("failed")
          }
      
    }

  const handleSubmit =async()=>{

    setProgress(true)
    
    if(username==''){
      alert('Please enter name')
    setProgress(false)
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
    if(analytics){
      privileges.push('analytics')
    }
    console.log(privileges,'00',analytics)
    var {data} = await axios.put(dev+'/subadmin/editSubadmin',{
      privileges,
      id:selectedIem._id,
      username
    })
    if(data.message=='Success'){
      setRefresh(prev=>!prev)
      console.log(data)
    setProgress(false)
    setOpen(false)
    }else{
      console.log("failed")
    }
  }

    
    return (
        <>
        <PasswordModal 
        selectedIem={selectedIem} 
        open={openPassword} 
        setRefresh={setRefresh}
        setOpen={setOpenPassword} />
<Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <p className='loginHereTxt'>Edit Account</p>
        <hr className='loginHr' />
        <p className='loginTxt'>UserName:</p>
        <input className='form1Input loginInput' 
            placeholder='Username'
            value={username}
            onChange={e=>setName(e.target.value)}
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
        <input  type={'checkbox'} 
        value={analytics}
        onChange={()=>{
          setAnalytics(!analytics)
        }
        }
        />
        <span>analytics</span>
        </div>

        </div>
   
        <button className='loginBtn'
        onClick={handleSubmit}
        disabled={(progress || delProgress)}
        >{ progress ? <CircularProgress color='error' size={13} /> : 'Submit' }</button>

<button className='loginBtn editPassBtn'
        onClick={()=>setOpenPassword(true)}
        disabled={progress}
        >Edit Passowrd</button>


<button className='loginBtn delPassBtn'
        onClick={handleDelete}
        disabled={(progress || delProgress)}
        >{ delProgress ? <CircularProgress color='error' size={13} /> : 'Delete Account'}</button>

        </Box>
      </Modal>
      </>
        )
}

export default AccountModal