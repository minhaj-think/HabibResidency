import React,{useState} from 'react'
import './login.css';
import Logo from './../assets/HabibLogo.png';
import { Grid ,Alert,AlertTitle} from '@mui/material';
import axios from 'axios';
import { dev } from '../config/routes';
import { useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';

const Login = () => {

    var [email,setEmail] = useState("");
    var [supper,setSuper] = useState(false);
    var [password,setPassword] = useState("");
    var [alertTxt,setAlertTxt] = useState('');
    var [alertShow,setAlertShow] = useState(false);
    
    var naivgate = useNavigate();

  const handleSubmit =async()=>{

    if(supper){
      var {data} = await axios.post(dev+'/admin/adminLogin',{
        email,password
      })

      if(data.message=='Success'){
        localStorage.setItem('type','SuperAdmin')
        localStorage.setItem('HabibId',data.doc._id)
        naivgate('/')
      }
      else{
        setAlertShow(true)
        setAlertTxt(data.err)
      }
  
    }
    
    else{
      var {data} = await axios.post(dev+'/subadmin/loginSubadmin',{
        email,password
      })
      if(data.message=='Success'){
        localStorage.setItem('HabibId',data.doc._id)
        localStorage.setItem('type','SubAdmin')
        localStorage.setItem( 'privileges',JSON.stringify(data.doc.privileges) )
        naivgate('/')
      }
      else{
        setAlertShow(true)
        setAlertTxt(data.err)
      }
    
    }


  }


  return (
    <div className='loginMain'>
        <div className='loginSubMainFirst'></div>
        <div className='loginSubMainSecond'>
        <div className='loginFormDiv'>
            <div className='loginFromSubDiv'>
            <img src={Logo}
            style={{width:'20%',height:'20%',display:'block',margin:'auto'}}
              />
        <p className='loginHereTxt'>Login Here</p>
        <hr className='loginHr' />
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
            <br/>
            <br/>
            <span className='switchTxt'>SubAdmin</span>
            <Switch color='error' 
            value={supper}
            onChange={()=>{
              setSuper(!supper)
            }}
            />
            <span className='switchTxt'>SuperAdmin</span>
            {
        alertShow &&
    <Alert severity="error">
  <AlertTitle>Error</AlertTitle>
        <strong>{alertTxt}</strong>
</Alert>
    }

            <br/>
            <button className='loginBtn'
            onClick={handleSubmit}
            >Login</button>
        </div>

        </div>
        </div>
    </div>
  )
}

export default Login