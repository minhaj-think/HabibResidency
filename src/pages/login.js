import React,{useState} from 'react'
import './login.css';
import Logo from './../assets/HabibLogo.png'
const Login = () => {

    var [email,setEmail] = useState("");
    var [password,setPassword] = useState("");

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
            <button className='loginBtn'>Login</button>
        </div>

        </div>
        </div>
    </div>
  )
}

export default Login