import React,{useState} from 'react'
import { Grid } from '@mui/material'
import Header from '../component/Header/Header';
import Form1 from './../component/Form1/Form1.js';
import Form2 from './../component/Form2/Form2.js';
import Image from './../assets/pic4.jpg';
import CnicIcon from './../assets/cnicicon.svg';
import './FormPage.css';

const FormPage = () => {

const [page,setPage] = useState(0)

  return (
    <div>
        <Header active='form' />
        <div className='formPageParent'>
            <Grid container>
                <Grid item md={8} sm={8} xs={12}>
                    <div className='formsMain'>
                    <div className='formBtnsMain'>
                        <div className={page==0 ? 'selected' :'Not_selected'} onClick={()=>setPage(0)}>
                            <span>Client Registration</span>
                        </div>
                        <div className={page==1 ? 'selected' :'Not_selected'} onClick={()=>setPage(1)}>
                        <span>Dealer Registration</span>
                        </div>
                    </div>
                    {
                        page==0 &&
                        <Form1/>
                    }
                    {
                        page==1 &&
                        <Form2/>
                    }

                    </div>
                </Grid>

                <Grid item md={4} sm={4} xs={12}>
                    <div className='FilesMain'>
                        <div className='profileDiv'>
                            <img src={Image} className='profilePic' />
                        </div>
                        <div className='ThumbDiv'>
                            <p className='ThumbTxt'>Thumb impression</p>
                        </div>
                        <br/>
                        <div className='CnicDiv'>
                            <img src={CnicIcon} className='CnicIcon' />
                            <p className='ThumbTxt'>CNIC Front</p>
                        </div>
                        <div className='CnicDiv'>
                            <img src={CnicIcon} className='CnicIcon' />
                            <p className='ThumbTxt'>CNIC Back</p>
                        </div>
                        <div className='SignDiv'>
                            <p className='ThumbTxt'>Signature as per NIC</p>
                        </div>

                    </div>
                </Grid>
            </Grid>
        </div>
    </div>
  )
}

export default FormPage