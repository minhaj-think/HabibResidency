import React,{useState} from 'react'
import './../Form1/Form1.css';
import { Grid } from '@mui/material';
import {AiOutlineCheck} from 'react-icons/ai';

const Form2 = () => {

    var [checked,setChecked] = useState(true)

    return (
        <div className='formSubMain'>
    <Grid container>
    <Grid item xs={12} style={{marginTop:'30px'}}>
        <p className='clientTxt'>DEALER REGISTRATION</p>
        </Grid>

    <Grid item md={12} xs={12} className='formSubDiv'>
            <p>Name of firm</p>
            <input className='form1Input formSubDivFull' 
            placeholder='Name'
            />
        </Grid>

        <Grid item xs={6} className='formSubDiv'>
            <p>Name of CEO</p>
            <input className='form1Input' 
            placeholder='Name'
            />
        </Grid>
        <Grid item xs={6} className='formSubDiv'>
        <p>CNIC</p>
            <input className='form1Input form1Input2' 
            placeholder='Number'
            />
        </Grid>
        <Grid item md={6} xs={12} className='formSubDiv'>
        <p>Mobile Number</p>
        <div style={{display:'flex',flexDirection:'row',width:'94%'}} className='fonm2Number'>
            <input className='form1Input form1Input1' 
            placeholder='Code'
            />
            <input className='form1Input form1Input21' 
            placeholder='Mobile Number'
            />
</div>
        </Grid>

        <Grid item md={6} xs={12} className='formSubDiv'>
            <p>Business Number</p>
            <input className='form1Input form1Input2'  
            placeholder='Business Number'
            />
        </Grid>
        <Grid item md={6} xs={12} className='formSubDiv'>
            <p>Security ID</p>
            <input className='form1Input fonm2Changeble' 
            placeholder='Number'
            />
        </Grid>
        <Grid item md={6} xs={12} className='formSubDiv'>
        <p>NTN No</p>
            <input className='form1Input form1Input2' 
            placeholder='Number'
            />
        </Grid>
        <Grid item md={12} xs={12} className='formSubDiv'>
            <p>SECP No</p>
            <input className='form1Input formSubDivFull' 
            placeholder='Permanant Address'
            />
        </Grid>
        <Grid item xs={12} className='formSubDiv'>
            <p>Business Address</p>
            <input className='form1Input formSubDivFull' 
            placeholder='Address'
            />
        </Grid>
        <Grid item xs={12} className='formSubDiv'>
        <p>Email</p>
            <input className='form1Input formSubDivFull'  
            placeholder='Email'
            />
        </Grid>
        <Grid item xs={12} style={{marginTop:'30px'}}>
        <p className='clientTxt'>GENERAL INFORMATION</p>
        </Grid>

        <Grid item md={6} xs={12} className='formSubDiv'>
            <p>Dealer Refered by</p>
            <input className='form1Input fonm2Changeble' 
            placeholder='Name'
            />
        </Grid>
        <Grid item md={6} xs={12} className='formSubDiv'>
        <p style={{marginTop:'35px'}}>{''}</p>
        <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
        <div className='form2CheckBx' onClick={()=>setChecked(!checked)}>
            {
                checked &&
            <AiOutlineCheck className='checkIconForm2' />
            }
        </div>
        <div className={checked ? 'form2CheckRes' : 'form2CheckRes CheckresChecked' }>
            <span>Saif</span>
        </div>
        <div></div>
</div>
        </Grid>

        <Grid item xs={12} className='formSubDiv'>
        <p>Mobile No of reference</p>
            <input className='form1Input formSubDivFull' 
            placeholder='Number'
            />            
        </Grid>
        <Grid item xs={12} className='formSubDiv'>
        <p>Registration ID of Dealer</p>
            <input className='form1Input formSubDivFull' 
            placeholder='ID'
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

export default Form2