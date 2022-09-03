import React from 'react'
import './Dashboard.css';
import Header from '../component/Header/Header';
import Categories from './../component/Categories/Categories.js';
import Listing from './../component/Listing/Listing.js';
const Dashboard = () => {

    return (
    <div>
        <Header active='dash'/>
        <div className='dashboardSubDiv'>
        <Categories/>
        <Listing />
        </div>
    </div>
  )
}

export default Dashboard