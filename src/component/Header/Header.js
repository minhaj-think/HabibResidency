import React, { useEffect,useState } from 'react'
import './Header.css';
import {Grid} from '@mui/material'
import Logo from './../../assets/HabibLogo.png';
import {useNavigate} from 'react-router-dom'


const Header = ({active}) => {
    
    var navigate = useNavigate()
    var [show,setShow] = useState(false)
    useEffect(()=>{
        var type = localStorage.getItem('type')
        if(type=='SuperAdmin'){
            setShow(true)
        }else{
            setShow(false)
        }
    },[])

    return (
    <div className='headerMain'>

        <div className='headerSub1'>
        <img src={Logo} 
        className='logoImg'
        />
        </div>

        <div className='headerSub2'>
            <div className='headerTitle1 headerDiv'>
                <span className='headerLink1' onClick={()=>navigate('/')}>DASHBOARD</span>
                <div  className={active=='dash' ? 'show' : 'hide'} />
            </div>
            <div className='headerTitle2 headerDiv'>
            <span className='headerLink2' onClick={()=>navigate('/form')}>FORM</span>
            <div  className={active=='form' ? 'show' : 'hide'} />                
            </div>
            <div className='headerTitle3 headerDiv'>
            <span className='headerLink3' onClick={()=>navigate('/scan')}>SCAN BARCODE</span>
            <div  className={active=='scan' ? 'show' : 'hide'} />
            </div>
            {
                show &&
            <div className='headerTitle4 headerDiv'>
            <span className='headerLink4' onClick={()=>navigate('/manage')}>ACCOUNTS</span>
            <div  className={active=='manage' ? 'show' : 'hide'} />
            </div>
            }
            {
                show &&
            <div className='headerTitle5 headerDiv'>
            <span className='headerLink5' onClick={()=>navigate('/logs')}>LOGS</span>
            <div  className={active=='logs' ? 'show' : 'hide'} />
            </div>
            }
        </div>
    </div>
  )
}

export default Header