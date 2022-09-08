import React,{useState} from 'react'
import './../Form1/Form1.css';
import { Grid } from '@mui/material';
import {AiOutlineCheck} from 'react-icons/ai';
import axios from 'axios';

const Form2 = ({front,back,profile,sign}) => {

    var [checked,setChecked] = useState(true)
    var [name,setName] =  useState('');
    var [ceo,setCeo] =  useState('');
    var [number,setNumber] = useState('');
    var [numberCode,setNumberCode] = useState('');
    var [cnic,setCnic] =  useState('');
    var [busiNum,setBusiNum] =  useState('');
    var [securityId,setSecurityId] = useState('');
    var [ntn,setNtn] =  useState('');
    var [secp,setSecp] =  useState('');
    var [busiAdd,setBusiAdd] =  useState('');
    var [email,setEmail] =  useState('');
    var [formNo,setFormNo] =  useState('');

    var [dealer,setDealer] =  useState('');
    var [dealerNum,setDealerNum] =  useState('');
    var [dealerRegId,setDealerRegId] =  useState('');
    var [remarks,setRemarks] =  useState('');

    var submit = async ()=>{

        var obj={
            firmName:name,
            nameOfCEO:ceo,
            CNIC:cnic,
            phone:number,
            businessNumber:busiNum,
            securityId:securityId,
            NTNnumber:ntn,
            SECPNumber:secp,
            businessAddress:busiAdd,
            email,
            noOfBarcodes:20,
            dealerImage:profile,
            cnicFrontImage:front,
            cnicBackImage:back,
            signatureImage:sign,
        }

        if(checked){
            obj={
            ...obj,                            
            dealerReferred:false,
            }
        }else{
            obj={
                ...obj,                            
        dealerReferred:true,
        referenceName:dealer,
        referenceMobile:dealerNum,
        referenceSecurityId:dealerRegId,            
        additionalRemarks:remarks,
    }   
        }

        // var obj={
        //     firmName:"Test Dealer",
        //     email:"test11@dealer2113.com",
        //     nameOfCEO:"S/O - New User",
        //     NTNnumber:"11845671228",
        //     SECPNumber:"118430241113",
        //     securityId:"11HFH575562300",
        //     CNIC:"1134567892252",
        //     phone:"111012345671",
        //     businessNumber:"111534444444",
        //     businessAddress:"Street 123",
        //     dealerImage:"Path to image",
        //     cnicFrontImage:"Path to image",
        //     cnicBackImage:"Path to image",
        //     signatureImage:"Path to image",
        //     additionalRemarks:"Optional remarks",
        //     noOfBarcodes:10,
        //     dealerReferred:true,
        //     referenceName:"Test Reference",
        //     referenceMobile:"112311234567",
        //     referenceSecurityId:"11FDGH675643657"
        // }

        // console.log(obj)
        var data = await axios.post('https://40e2-75-119-139-19.ngrok.io/dealer/addDealer',obj)
        // console.log(data)
        if(data.data.message=='Success'){
            alert('Successfull')
        }else{
            console.log('There is an error')
        }
    }


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
            value={name}
            onChange={e=>setName(e.target.value)}
            />
        </Grid>

        <Grid item xs={6} className='formSubDiv'>
            <p>Name of CEO</p>
            <input className='form1Input' 
            placeholder='Name'
            value={ceo}
            onChange={e=>setCeo(e.target.value)}
            />
        </Grid>
        <Grid item xs={6} className='formSubDiv'>
        <p>CNIC</p>
            <input className='form1Input form1Input2' 
            placeholder='Number'
            value={cnic}
            onChange={e=>setCnic(e.target.value)}
            />
        </Grid>
        <Grid item md={6} xs={12} className='formSubDiv'>
        <p>Mobile Number</p>
        <div style={{display:'flex',flexDirection:'row',width:'94%'}} className='fonm2Number'>
            <input className='form1Input form1Input1' 
            placeholder='Code'
            value={numberCode}
            onChange={e=>setNumberCode(e.target.value)}
            />
            <input className='form1Input form1Input21' 
            placeholder='Mobile Number'
            value={number}
            onChange={e=>setNumber(e.target.value)}
            />
</div>
        </Grid>

        <Grid item md={6} xs={12} className='formSubDiv'>
            <p>Business Number</p>
            <input className='form1Input form1Input2'  
            placeholder='Business Number'
            value={busiNum}
            onChange={e=>setBusiNum(e.target.value)}
            />
        </Grid>
        <Grid item md={6} xs={12} className='formSubDiv'>
            <p>Security ID</p>
            <input className='form1Input fonm2Changeble' 
            placeholder='Number'
            value={securityId}
            onChange={e=>setSecurityId(e.target.value)}
            />
        </Grid>
        <Grid item md={6} xs={12} className='formSubDiv'>
        <p>NTN No</p>
            <input className='form1Input form1Input2' 
            placeholder='Number'
            value={ntn}
            onChange={e=>setNtn(e.target.value)}
            />
        </Grid>
        <Grid item md={12} xs={12} className='formSubDiv'>
            <p>SECP No</p>
            <input className='form1Input formSubDivFull' 
            placeholder='Permanant Address'
            value={secp}
            onChange={e=>setSecp(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} className='formSubDiv'>
            <p>Business Address</p>
            <input className='form1Input formSubDivFull' 
            placeholder='Address'
            value={busiAdd}
            onChange={e=>setBusiAdd(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} className='formSubDiv'>
        <p>Email</p>
            <input className='form1Input formSubDivFull'  
            placeholder='Email'
            value={email}
            onChange={e=>setEmail(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} className='formSubDiv'>
        <p>Number of Forms</p>
            <input className='form1Input formSubDivFull'  
            placeholder='No. of forms'
            value={formNo}
            onChange={e=>setFormNo(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} style={{marginTop:'30px'}}>
        <p className='clientTxt'>GENERAL INFORMATION</p>
        </Grid>

        <Grid item md={6} xs={12} className='formSubDiv'>
            <p>Dealer Refered by</p>
            <input className='form1Input fonm2Changeble' 
            placeholder='Name'
            value={dealer}
            onChange={e=>setDealer(e.target.value)}
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
            <span>Self</span>
        </div>
        <div></div>
</div>
        </Grid>

        <Grid item xs={12} className='formSubDiv'>
        <p>Mobile No of reference</p>
            <input className='form1Input formSubDivFull' 
            placeholder='Number'
            value={dealerNum}
            onChange={e=>setDealerNum(e.target.value)}
            />            
        </Grid>
        <Grid item xs={12} className='formSubDiv'>
        <p>Registration ID of Dealer</p>
            <input className='form1Input formSubDivFull' 
            placeholder='ID'
            value={dealerRegId}
            onChange={e=>setDealerRegId(e.target.value)}
            
            />            
        </Grid>

        <Grid item xs={12} className='formSubDiv'>
        <p>Additional Remarks</p>
            <textarea className='form1Input formSubDivFull' 
            placeholder='Remarks'
            value={remarks}
            onChange={e=>setRemarks(e.target.value)}
            />            
        </Grid>
    </Grid>
    <button className='SaveBtn'
    onClick={()=>submit()}
    >Save</button>
    </div>
  )

}

export default Form2