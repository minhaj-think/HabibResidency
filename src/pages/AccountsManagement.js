import React from 'react'
import Header from '../component/Header/Header'
import './AccountsManagement.css'
import AccountListing from './../component/AccountListing/AccountListing.js';


const AccountsManagement = () => {

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