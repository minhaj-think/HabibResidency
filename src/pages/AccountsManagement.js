import React,{useEffect} from 'react'
import Header from '../component/Header/Header'
import './AccountsManagement.css'
import AccountListing from './../component/AccountListing/AccountListing.js';
import axios from 'axios';
import { dev } from '../config/routes';
import { useNavigate } from 'react-router-dom';

const AccountsManagement = () => {

  var navigate = useNavigate()

  useEffect(()=>{
    var userId =   localStorage.getItem('HabibId')
    if(!userId){
      navigate('/login')
    }

  },[])


    return (
    <div>
        <Header active='manage'/>
        <div className='AccountsMain'>
      <AccountListing />

        </div>
    </div>
  )
}

export default AccountsManagement