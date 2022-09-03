import React from 'react'
import './Form1.css';
import { Grid } from '@mui/material';

const Form1 = () => {

    return (
        <div className='formSubMain'>
    <Grid container>
        <Grid item md={12} xs={12} style={{marginTop:'30px'}}>
<p className='clientTxt'>CLIENT REGISTRATION</p>
    </Grid>            
        <Grid item md={6} xs={6} className='formSubDiv'>
            <p>Name as per CNIC</p>
            <input className='form1Input' 
            placeholder='Name'
            />
        </Grid>
        <Grid item md={6} xs={6} className='formSubDiv'>
        <p>CNIC</p>
            <input className='form1Input form1Input2' 
            placeholder='Number'
            />
        </Grid>
        <Grid item md={6} xs={6} className='formSubDiv'>
            <p>S/W/D/O</p>
            <input className='form1Input' 
            placeholder='Name'
            />
        </Grid>
        <Grid item md={6} xs={12} className='formSubDiv'>
        <p>Mobile Number</p>
        <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
            <input className='form1Input form1Input1' 
            placeholder='Code'
            />
            <input className='form1Input form1Input21' 
            placeholder='Mobile Number'
            />
</div>
        </Grid>
        <Grid item md={6} xs={6} className='formSubDiv'>
            <p>Security ID</p>
            <input className='form1Input' 
            placeholder='ID'
            />
        </Grid>
        <Grid item md={6} xs={6} className='formSubDiv'>
        <p>Landline</p>
            <input className='form1Input form1Input2' 
            placeholder='Landline Number'
            />
        </Grid>
        <Grid item xs={12} className='formSubDiv'>
            <p>Current Address</p>
            <input className='form1Input formSubDivFull' 
            placeholder='Current Address'
            />
        </Grid>
        <Grid item xs={12} className='formSubDiv'>
        <p>Permanant Address</p>
            <input className='form1Input formSubDivFull'  
            placeholder='Permanant Address'
            />
        </Grid>
        <Grid item xs={6} className='formSubDiv'>
            <p>City</p>
            <input className='form1Input' 
            placeholder='City'
            />
        </Grid>
        <Grid item xs={6} className='formSubDiv'>
        <p>Country</p>
            <input className='form1Input form1Input2' 
            placeholder='Country'
            />
        </Grid>
        <Grid item xs={6} className='formSubDiv'>
            <p>Email</p>
            <input className='form1Input' 
            placeholder='Email'
            />
        </Grid>
        <Grid item xs={6} className='formSubDiv'>
        <p>Passport No</p>
            <input className='form1Input form1Input2' 
            placeholder='Number'
            />
        </Grid>
        <Grid item xs={12} style={{marginTop:'30px'}}>
        <p className='clientTxt'>NEXT TO KIM INFORMATION</p>
        </Grid>
        <Grid item xs={6} className='formSubDiv'>
            <p>Name</p>
            <input className='form1Input' 
            placeholder='Name'
            />
        </Grid>
        <Grid item xs={6} className='formSubDiv'>
        <p>S/O,W/O,D/O</p>
            <input className='form1Input form1Input2' 
            placeholder='Number'
            />
        </Grid>
        <Grid item xs={6} className='formSubDiv'>
            <p>Relationship With Appliance</p>
            <input className='form1Input' 
            placeholder='Name'
            />
        </Grid>
        <Grid item xs={12} className='formSubDiv'>
        <p>Phone/Cel</p>
        <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
            <input className='form1Input form1Input1' 
            placeholder='Code'
            />
            <input className='form1Input form1Input21' 
            placeholder='Number'
            />
</div>
        </Grid>

        <Grid item xs={12} className='formSubDiv'>
        <p>Address</p>
            <input className='form1Input formSubDivFull' 
            placeholder='Address'
            />            
        </Grid>
        <Grid item xs={12} className='formSubDiv'>
        <p>Additional Remarks</p>
            <textarea className='form1Input formSubDivFull' 
            placeholder='Remarks'
            
            />            
        </Grid>
    </Grid>
    <button className='SaveBtn'>Save</button>
    </div>
  )

}

export default Form1