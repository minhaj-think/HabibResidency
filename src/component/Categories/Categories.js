import React,{useEffect,useState} from 'react'
import './Categories.css';
import axios from 'axios';
import { dev } from '../../config/routes';
import { Grid ,Alert,AlertTitle} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Categories = ({analyticsAuth}) => {

    var [analytics,setAnalytics] = useState({});
    var [alertTxt,setAlertTxt] = useState('');
    var [alertShow,setAlertShow] = useState(false);
    var [progress,setProgress]  = useState(false);

    useEffect(()=>{
        // if(analyticsAuth){
            fetching()
        // }else{
        // }
    },[])

    var fetching=async()=>{
        var getId =  localStorage.getItem('HabibId')
        var type = localStorage.getItem('type')
        if(type=='SuperAdmin'){
            var event={
              operationBy:'superadmin',
            }
          }else{
            var event={
              operationBy:'user',
              user:getId
            }
          }

        var {data}  = await axios.post(dev+'/admin/getAnalytics',{
            ...event,
            logType:"analytics",
            
        });
        if(data.message=='Success'){
            setAnalytics(data.doc)
        }
        else if(data.err=='Operation not allowed'){
            setAnalytics({
                dealers:'..',                
                clients:'..',                
                subadmins:'..',                
                barcodeScanLastMonth:'..',                
            })
            setAlertShow(true)
            setAlertTxt('You are not allowed to see analytics')
        }
        else{
            console.log("there is an error")
        }
    }

    return (
    <div>
            <br/>
    {
        alertShow &&
    <Alert severity="error">
  <AlertTitle>Error</AlertTitle>
        <strong>{alertTxt}</strong>
</Alert>
    }


        <Grid container>
            <Grid md={3} sm={3} xs={6}>
            <div className='CatSubDiv'>
                <span className='catSpan catTitle'>Dealers</span>
                <span className='catSpan catVal'>{analytics.dealers ? analytics.dealers : <CircularProgress size={14}  /> } </span>
            </div>
            </Grid>
            <Grid md={3} sm={3} xs={6}>
            <div className='CatSubDiv'>
                <span className='catSpan catTitle'>Clients</span>
                <span className='catSpan catVal'>{analytics.clients ? analytics.clients : <CircularProgress size={14}  />}</span>
            </div>

            </Grid>
            <Grid md={3} sm={3} xs={6}>
            <div className='CatSubDiv'>
                <span className='catSpan catTitle'>Subadmins</span>
                <span className='catSpan catVal'>{analytics.subadmins ? analytics.subadmins : <CircularProgress size={14}  />}</span>
            </div>

            </Grid>
            <Grid md={3} sm={3} xs={6}>
            <div className='CatSubDiv'>
                <span className='catSpan catTitle custom'>Scan Last month</span>
                <span className='catSpan catVal'>{analytics.barcodeScanLastMonth ? analytics.barcodeScanLastMonth : <CircularProgress size={14} color='error'  />}</span>
            </div>
            </Grid>
            
        </Grid>
    </div>
  )

}

export default Categories