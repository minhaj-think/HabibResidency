import React from 'react'
import './Dashboard.css';
import Header from '../component/Header/Header';
import Categories from './../component/Categories/Categories.js';
import Listing from './../component/Listing/Listing.js';
import DealerListing from './../component/DealerListing/DealerListing.js';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { dev } from '../config/routes';

const Dashboard = () => {

  var [showScan,setShowScan] = useState(false)
  var [showSearch,setShowSearch] = useState(false)
  var [showDelete,setShowDelete] = useState(false)
  var [showEdit,setShowEdit] = useState(false)
  var [analytics,setAnalytics] = useState(false)
  var navigate=useNavigate();
  
  useEffect(()=>{
    var userId =   localStorage.getItem('HabibId')
    var type = localStorage.getItem('type')
    if(userId){
      // console.log(userId)
      // console.log(type)
    }else{
      navigate('/login')
    }


    fetching()
  },[])



  var fetching =async ()=>{
    var getId =  localStorage.getItem('HabibId')
    var type = localStorage.getItem('type')
    if(type=='SuperAdmin'){
    setShowScan(true)
    setShowSearch(true)
    setShowDelete(true)
    setShowEdit(true)
    setAnalytics(true)
  }else{
    var getPreviliges =  JSON.parse(localStorage.getItem('privileges'))

    var a = getPreviliges.find(printPrivilage)
    showScan = a==undefined ? false : true
    setShowScan(showScan)

    var b = getPreviliges.find(searchPrivilage)
    showSearch = b==undefined ? false : true
    setShowSearch(showSearch)

    var c = getPreviliges.find(deletePrivilage)
    showDelete = c==undefined ? false : true
    setShowDelete(showDelete)

    var d = getPreviliges.find(editPrivilage)
    showEdit = d==undefined ? false : true
    setShowEdit(showEdit)

    var e = getPreviliges.find(analyticsPrivilage)
    analytics = e==undefined ? false : true
    setAnalytics(analytics)

  }

  }

  var searchPrivilage=(val)=>{
    return val=='search-form'
  }

  var printPrivilage=(val)=>{
    return val=='print-barcode'
  }

  var deletePrivilage=(val)=>{
    return val=='delete-form'
  }

  var editPrivilage=(val)=>{
    return val=='edit-form'
  }

  var analyticsPrivilage=(val)=>{
    return val=='analytics'
  }


    return (
    <div>
        <Header active='dash'/>
        {/* <div style={{display:'flex',justifyContent:'flex-end',width:'90%',margin:'auto'}}>
        <button className='LogoutBtn'
        onClick={handleLogout}
        >Logout</button>
        </div> */}

        <div className='dashboardSubDiv'>
          {
            analytics &&
        <Categories analyticsAuth={analytics} />
          }
        <Listing showEdit={showEdit} showDelete={showDelete} showScan={showScan}  showSearch={showSearch} />
        <DealerListing showEdit={showEdit} showDelete={showDelete} showScan={showScan} showSearch={showSearch}  />
        </div>
    </div>
  )
}

export default Dashboard