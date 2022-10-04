import React,{useState} from 'react'
import { Grid } from '@mui/material'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './logFilter.css';
import {AiOutlineConsoleSql, AiOutlineSearch} from 'react-icons/ai';
import { useEffect } from 'react';
import axios from 'axios';
import { dev } from '../../config/routes';
import moment from 'moment';

export default function LogsFilter({handleFiltered,setType,activeIndex,type,usersList}) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedUser,setSelectedUser] = useState('');
    useEffect(()=>{
        if(type=='filter'){
            handleFilter(true)
        }
    },[activeIndex])

    const handleFilter=async(cond)=>{
        setType('filter')
        // var starting = startDate.toString().split(' ')
        // var startingDate = moment(`${starting[1]} ${starting[2]} ${starting[3]}`).format('Z')
        // var startingDate= startingDate;

        // var ending = endDate.toString().split(' ')
        // var endingDate = moment(`${ending[1]} ${ending[2]} ${ending[3]}`).format()
        var {data}  = await axios.post(dev+'/admin/filterLogs/'+activeIndex,{
            user:selectedUser,
            startDate: new Date(startDate),
            endDate :new Date(endDate)
        })
        console.log('data-->',data)
        if(data.message=='Success'){
            if(cond){
                handleFiltered(data.doc,activeIndex)
            }else{
                handleFiltered(data.doc,1)
            }
        }else{
            // error
        }

    }

    return (
    <div className='logFilterMain'>
    <Grid container>
    <Grid item md={window.outerWidth>999 ? 1 : 1}  xs={0}>
</Grid>
    <Grid item xl={3} lg={3} md={window.outerWidth>999 ? 3 : 5} sm={5} xs={8} className='removeMargin' style={{marginLeft:'0.5%'}}>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <span style={{width:'40%',fontSize:14}}>Start Date:</span>
    <DatePicker selected={startDate} className='picker' onChange={(date) => setStartDate(date)} />
        </div>
    </Grid>

    <Grid item xl={3} lg={3} md={window.outerWidth>999 ? 3 : 5} sm={5} xs={8}>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <span style={{width:'40%',fontSize:14}}>End Date:</span>
    <DatePicker selected={endDate} className='picker' onChange={(date) => setEndDate(date)} />
        </div>
    </Grid>
    <Grid item xl={3} lg={3} md={window.outerWidth>999 ? 3 : 5} sm={6} xs={8} >
    <div className='selectFloat' style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <span style={{width:'40%',fontSize:14}}>User Id:</span>
        <select className='logFilterSelect' value={selectedUser} onChange={e=>setSelectedUser(e.target.value)} >
        { usersList &&
        usersList.map((v,i)=>(
            <option value={v._id}>{v.username}</option>
        )) 
        }
        </select>
        </div>
    </Grid>

    <Grid item xl={0.75} lg={0.75} md={0.75} sm={4} xs={2}>
        <div className='logFilterIcon' onClick={()=>handleFilter(false)}>
            <AiOutlineSearch  color='#fff' />
        </div>
    </Grid>

    </Grid>        
    </div>
  )
}
