import React,{useEffect,useState} from 'react'
import './Categories.css';
import {Grid} from '@mui/material'
import axios from 'axios';
import { dev } from '../../config/routes';

const Categories = () => {

    var [analytics,setAnalytics] = useState({});

    useEffect(()=>{
        fetching()
    },[])

    var fetching=async()=>{
        var {data} = await axios.get(dev+'/admin/getAnalytics');
        console.log(data.doc)
        if(data.message=='Success'){
            setAnalytics(data.doc)
        }
        else{
            console.log("there is an error")
        }
    }

    return (
    <div>
        <Grid container>
            <Grid md={3} sm={3} xs={6}>
            <div className='CatSubDiv'>
                <span className='catSpan catTitle'>Dealers</span>
                <span className='catSpan catVal'>{analytics.dealers} </span>
            </div>
            </Grid>
            <Grid md={3} sm={3} xs={6}>
            <div className='CatSubDiv'>
                <span className='catSpan catTitle'>Clients</span>
                <span className='catSpan catVal'>{analytics.clients} </span>
            </div>

            </Grid>
            <Grid md={3} sm={3} xs={6}>
            <div className='CatSubDiv'>
                <span className='catSpan catTitle'>Subadmins</span>
                <span className='catSpan catVal'>{analytics.subadmins}</span>
            </div>

            </Grid>
            <Grid md={3} sm={3} xs={6}>
            <div className='CatSubDiv'>
                <span className='catSpan catTitle custom'>Scan Last month</span>
                <span className='catSpan catVal'>{analytics.barcodeScanLastMonth}</span>
            </div>
            </Grid>
            
        </Grid>
    </div>
  )

}

export default Categories