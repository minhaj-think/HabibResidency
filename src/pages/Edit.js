import React,{useState,useEffect} from 'react'
import { Grid ,Alert,AlertTitle} from '@mui/material';
import Header from '../component/Header/Header';
import Form1 from './../component/Form1/Form1.js';
import Form2 from './../component/Form2/Form2.js';
import Image from './../assets/pic4.jpg';
import CnicIcon from './../assets/cnicicon.svg';
import './FormPage.css';
import axios from 'axios';
import { dev } from '../config/routes';
import { useLocation } from 'react-router-dom';

const Edit = () => {

    var [profile,setProfile] = useState('');
    var [front,setFront] = useState('');
    var [back,setBack] = useState('');
    var [sign,setSign] = useState('');
    var {state} = useLocation();
    console.log(state)

    useEffect(()=>{

        
        setFront(state.user.front)
        setBack(state.user.back)
        setProfile(state.user.profile)
        setSign(state.user.sign)

    },[])

var handleProfile = async (e)=>{

    var formData1= new FormData();
    formData1.append('fileData',e.target.files[0]);
    fetch(dev+'/api/uploadFile',{
    method: 'POST',
    body: formData1,
    redirect: 'follow'
  }).then(response => response.json())
  .then(result => {
    setProfile(result.doc.filePath)
    console.log(result.doc.filePath)
})
  .catch(error => console.log('error', error));
}

var handleFront = async (e)=>{
    console.log("ues")
    
    var formData2 = new FormData();
    formData2.append('fileData',e.target.files[0]);
    fetch(dev+'/api/uploadFile',{
        method: 'POST',
        body: formData2,
        redirect: 'follow'
      }).then(response => response.json())
      .then(result => {
        setFront(result.doc.filePath)
        console.log(result.doc.filePath)
    })
      .catch(error => console.log('error', error));
    }

var handleBack = async (e)=>{
    console.log("ues")
    
    var formData3 = new FormData();
    formData3.append('fileData',e.target.files[0]);
    fetch(dev+'/api/uploadFile',{
        method: 'POST',
        body: formData3,
        redirect: 'follow'
      }).then(response => response.json())
      .then(result => {
        setBack(result.doc.filePath)
        console.log(result.doc.filePath)
    })
      .catch(error => console.log('error', error));
    }

var handleSign = async (e)=>{
    console.log("ues")
    
    var formData4 = new FormData();
    formData4.append('fileData',e.target.files[0]);
    fetch(dev+'/api/uploadFile',{
        method: 'POST',
        body: formData4,
        redirect: 'follow'
      }).then(response => response.json())
      .then(result => {
        setSign(result.doc.filePath)
        console.log(result.doc.filePath)
    })
      .catch(error => console.log('error', error));
    }
    

  return (
    <div>
        <Header active='form' />
        <div className='formPageParent'>

            <Grid container>
                <Grid item md={8} sm={8} xs={12}>
                    <div className='formsMain'>
                    {
                        (state?.type=='user') &&
                        <Form1 edit={true} state={state} front={front} back={back} profile={profile} sign={sign} />
                    }
                    {
                        !(state?.type=='user') &&
                        <Form2 edit={true} state={state} front={front} back={back} profile={profile} sign={sign} />
                    }

                    </div>
                </Grid>

                <Grid item md={4} sm={4} xs={12}>
                    <div className='FilesMain'>
                            <input type='file' id='profilePic' style={{display:'none'}} onChange={e=>handleProfile(e)} />
                            <label for='profilePic'>
                        <div className='profileDiv'>
                            <img src={Image} className='profilePic' />
                        </div>
                            </label>
                        <br/>
                        <input type='file' id='front' style={{display:'none'}} onChange={(e)=>handleFront(e)} />
                        <label htmlFor='front'>
                        <div className='CnicDiv'>
                            <img src={CnicIcon} className='CnicIcon' />
                            <p className='ThumbTxt'>CNIC Front</p>
                        </div>
                        </label>
 
                        <input type='file' id='back' style={{display:'none'}} onChange={(e)=>handleBack(e)} />
                        <label htmlFor='back'>
                        <div className='CnicDiv'>
                            <img src={CnicIcon} className='CnicIcon' />
                            <p className='ThumbTxt'>CNIC Back</p>
                        </div>
                        </label>
                
                        <input type='file' id='sign' style={{display:'none'}} onChange={(e)=>handleSign(e)} />
                        <label htmlFor='sign'>
                        <div className='SignDiv'>
                            <p className='ThumbTxt'>Signature as per NIC</p>
                        </div>
                        </label>

                    </div>
                </Grid>
            </Grid>
            </div>
    </div>
  )
}

export default Edit