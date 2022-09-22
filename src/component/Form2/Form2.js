import React,{useState,useEffect} from 'react'
import './../Form1/Form1.css';
import { Grid ,Alert,AlertTitle} from '@mui/material';
import {AiOutlineCheck} from 'react-icons/ai';
import axios from 'axios';
import { dev } from '../../config/routes';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Form2 = ({front,back,profile,sign,edit,state}) => {


    var [alertTxt,setAlertTxt] = useState('');
    var [alertShow,setAlertShow] = useState(false);
    var navigate = useNavigate()
    var [progress,setProgress]  = useState(false);

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

    useEffect(()=>{

        if(edit && state){
            setName(state.user.firmName)
            setCeo(state.user.nameOfCEO)
            setCnic(state.user.CNIC)
            setNumber(state.user.phone)
            setBusiNum(state.user.businessNumber)
            setBusiAdd(state.user.businessAddress)
            setSecp(state.user.SECPNumber)
            setSecurityId(state.user.securityId)
            setEmail(state.user.email)
            setFormNo(state.user.barcodes.length)
            setNtn(state.user.NTNnumber)
            setRemarks(state.user.additionalRemarks)
            setDealer(state.user.referenceName)
            setDealerNum(state.user.referenceMobile)
            setChecked(state.user.dealerReferred)

        }

    },[])


    var submit = async ()=>{
        var getId =  localStorage.getItem('HabibId')
        var type = localStorage.getItem('type')

        setAlertShow(false)
        setProgress(true)
        if(profile==''){
            setAlertShow(true)
            setAlertTxt('Please select your profile picture first.')
            return
        }if(front==''){
            setAlertShow(true)
            setAlertTxt('Please select front image of your CNIC .')
            return
        }if(back==''){
            setAlertShow(true)
            setAlertTxt('Please select back side image of your CNIC .')
            return
        }if(sign==''){
            setAlertShow(true)
            setAlertTxt('Please select your signature image.')
            return
        }if(formNo<1){
            setAlertShow(true)
            setAlertTxt('Please enter atleast 1 form.')
            return
        }else
        // if(!edit){
            if(name==''){
                setAlertShow(true)
        setAlertTxt('Please Enter name.')
        setProgress(false)
        return
            }else if(ceo==''){
                setAlertShow(true)
        setAlertTxt('Please Enter CEO Name.')
        setProgress(false)
        return
            }else if(cnic==''){
                setAlertShow(true)
        setAlertTxt('Please Enter Your CNIC.')
        setProgress(false)
        return
            }else if(cnic==''){
                setAlertShow(true)
        setAlertTxt('Please Enter Your mobile number.')
        setProgress(false)
        return
            }else if(securityId==''){
                setAlertShow(true)
        setAlertTxt('Please Enter security Id.')
        setProgress(false)
        return
            }else if(ntn==''){
                setAlertShow(true)
        setAlertTxt('Please Enter Your NTN Number.')
        setProgress(false)
        return
            }else if(busiNum==''){
                setAlertShow(true)
        setAlertTxt('Please Enter Your Business Number.')
        setProgress(false)
        return
            }else if(email==''){
                setAlertShow(true)
        setAlertTxt('Please Enter Your Email.')
        setProgress(false)
        return
            }else{
                setAlertShow(true)
                setAlertTxt('Please Enter Your Business Address.')
        setProgress(false)
        return
            }
        // }
        if(type=='SuperAdmin'){
            //   logType:val,
            var event={
              operationBy:'superadmin',
            }
          }else{
              //   logType:val,
            var event={
              operationBy:'user',
              user:getId
            }
          }
  

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
            noOfBarcodes:formNo,
            dealerImage:profile,
            cnicFrontImage:front,
            cnicBackImage:back,
            signatureImage:sign,
            ...event,
            logType:edit ? 'edit-form' : 'submit-form'
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

        if(edit){
            var {data} = await axios.put(dev+'/dealer/editDealer',{
                data:obj,
                id:state.user._id
            })
            if(data.data.message=='Success'){
                alert('Form editted Successfull')
        setProgress(false)
        // handleEvent('edit-form')
                navigate("/")

            }else{
                console.log('There is an error')
        setProgress(false)
    }    
        }else{
            var data = await axios.post(dev+'/dealer/addDealer',obj)
            if(data.data.message=='Success'){
                alert('Form submitted Successfull')
                // handleEvent('submit-form')
                setProgress(false)
                navigate("/")
            }else{
                console.log('There is an error')
        setProgress(false)
    }    
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
            type='number'
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
            type='number'
            value={number}
            onChange={e=>setNumber(e.target.value)}
            />
</div>
        </Grid>

        <Grid item md={6} xs={12} className='formSubDiv'>
            <p>Business Number</p>
            <input className='form1Input form1Input2'  
            placeholder='Business Number'
            type='number'
            value={busiNum}
            onChange={e=>setBusiNum(e.target.value)}
            />
        </Grid>
        <Grid item md={6} xs={12} className='formSubDiv'>
            <p>Security ID</p>
            <input className='form1Input fonm2Changeble' 
            placeholder='Number'
            type='number'
            value={securityId}
            onChange={e=>setSecurityId(e.target.value)}
            />
        </Grid>
        <Grid item md={6} xs={12} className='formSubDiv'>
        <p>NTN No</p>
            <input className='form1Input form1Input2' 
            placeholder='Number'
            type='number'
            value={ntn}
            onChange={e=>setNtn(e.target.value)}
            />
        </Grid>
        <Grid item md={12} xs={12} className='formSubDiv'>
            <p>SECP No</p>
            <input className='form1Input formSubDivFull' 
            placeholder='Permanant Address'
            type='number'
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
            type={'number'}
            min={0}
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
            type='number'
            value={dealerNum}
            onChange={e=>setDealerNum(e.target.value)}
            />            
        </Grid>
        <Grid item xs={12} className='formSubDiv'>
        <p>Registration ID of Dealer</p>
            <input className='form1Input formSubDivFull' 
            type='number'
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
    <br/>
    {
        alertShow &&
    <Alert severity="error">
  <AlertTitle>Error</AlertTitle>
        <strong>{alertTxt}</strong>
</Alert>
    }

    <button className='SaveBtn'
    onClick={()=>submit()}
    >{progress ? <CircularProgress color='error' size={13} /> : 'Save'}</button>
    </div>
  )

}

export default Form2