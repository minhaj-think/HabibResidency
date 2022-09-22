import React,{useState,useEffect} from 'react'
import './Form1.css';
import { Grid ,Alert,AlertTitle} from '@mui/material';
import axios from 'axios';
import { dev } from '../../config/routes';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Form1 = ({front,back,profile,sign,edit,state}) => {

    var [alertTxt,setAlertTxt] = useState('');
    var [alertShow,setAlertShow] = useState(false);
    var navigate = useNavigate()
    var [progress,setProgress]  = useState(false);
    
    var [name,setName] = useState('');
    var [cnic,setCnic] = useState('');
    var [rel,setRel] = useState('');
    var [surName,setSurName] = useState('');
    var [number,setNumber] = useState('');
    var [numberCode,setNumberCode] = useState('');
    var [securityId,setSecurityId] = useState('');
    var [landLine,setLandLine] = useState('');
    var [currentAddress,setCurrentAddress] = useState("");
    var [permanentAddress,setPermanentAddress] = useState('');
    var [city,setCity] = useState('');
    var [country,setCountry] = useState('');
    var [email,setEmail] = useState('');
    var [passport,setPassport] = useState('');

    var [kimName,setKimName] = useState('');
    var [kimRel,setKimRel] = useState('');
    var [kimsurName,setKimSurName] = useState('');
    var [kimNumber,setKimNumber] = useState('');
    var [kimNumberCode,setKimNumberCode] = useState('');
    var [kimAddress,setKimAddress] = useState("");
    var [remarks,setRemarks] = useState("");
    var [relation,setRelation] = useState("");
    var [kimCelNumber,setKimCelNumber] = useState("");


    useEffect(()=>{

        if(edit && state){
            setName(state.user.fName)
            setCnic(state.user.CNIC)
            setEmail(state.user.email)
            setSecurityId(state.user.securityId)
            setSurName(state.user.SWDO)
            setNumber(state.user.phone)
            setLandLine(state.user.landline)
            setCurrentAddress(state.user.currentAddress)
            setPermanentAddress(state.user.parmanentAddress)
            setCity(state.user.city)
            setCountry(state.user.country)
            setPassport(state.user.passport)
            setKimName(state.user.nextKinName)
            setKimAddress(state.user.nextKinAddress)
            setKimNumber(state.user.nextKinPhone)
            setKimCelNumber(state.user.nextKinPhone)
            setRemarks(state.user.additionalRemarks)
            setRelation(state.user.nextKinRelation)
            setLandLine(state.user.phone)
            // SWDO:rel+'-'+surName,
            // phone:numberCode+number,

            // nextKinSWDO:kimRel+'-'+kimsurName,
            // nextKinPhone:kimNumberCode+kimNumber,
        }

    },[])

    var submit = async()=>{

        var getId =  localStorage.getItem('HabibId')
        var type = localStorage.getItem('type')

        setAlertShow(false)
        setProgress(true)
        if(profile==''){
            setAlertShow(true)
            setAlertTxt('Please select your profile picture first.')
            return
        }else if(front==''){
            setAlertShow(true)
            setAlertTxt('Please select front image of your CNIC .')
            return
        }else if(back==''){
            setAlertShow(true)
            setAlertTxt('Please select back side image of your CNIC .')
            return
        }else if(sign==''){
            setAlertShow(true)
            setAlertTxt('Please select your signature image.')
        return
        }else
        // if(!edit){
            if(name==''){
                setAlertShow(true)
                setAlertTxt('Please Enter name.')
                setProgress(false)
                return
            }else if(cnic==''){
                setAlertShow(true)
                setAlertTxt('Please Enter your CNIC.')
                setProgress(false)
                return
            }else if(cnic.length<13){
                setAlertShow(true)
                setAlertTxt('Your CNIC should have 13 digits.')
                setProgress(false)
                return
            }else if(securityId==''){
                setAlertShow(true)
                setAlertTxt('Please Enter your security Id.')
                setProgress(false)
                return
            }else if(rel==''){
                setAlertShow(true)
                setAlertTxt('Please Enter your relative relation.')
                setProgress(false)
                return
            }else if(surName==''){
                setAlertShow(true)
                setAlertTxt('Please Enter your relative name.')
                setProgress(false)
                return
            }else if(number==''){
                setAlertShow(true)
                setAlertTxt('Please Enter your mobile number.')
                setProgress(false)
                return
            }else if(currentAddress==''){
                setAlertShow(true)
                setAlertTxt('Please Enter your current address.')
                setProgress(false)
                return
            }else if(permanentAddress==''){
                setAlertShow(true)
                setAlertTxt('Please Enter your permanent address.')
                setProgress(false)
                return
            }else if(city==''){
                setAlertShow(true)
                setAlertTxt('Please Enter your city.')
                setProgress(false)
                return
            }else if(country==''){
                setAlertShow(true)
                setAlertTxt('Please Enter your country.')
                setProgress(false)
                return
            }else if(permanentAddress==''){
                setAlertShow(true)
                setAlertTxt('Please Enter your permanent address.')
                setProgress(false)
                return
            }else if(kimName==''){
                setAlertShow(true)
                setAlertTxt('Please Enter your kin name.')
                setProgress(false)
                return
            }else if(kimNumber==''){
                setAlertShow(true)
                setAlertTxt('Please Enter your kin address.')
                setProgress(false)
                return
            }else if(kimAddress==''){
                setAlertShow(true)
                setAlertTxt('Please Enter your kin address.')
                setProgress(false)
                return
            }else if(kimsurName==''){
                setAlertShow(true)
                setAlertTxt('Please Enter your kin relation name.')
                setProgress(false)
                return
            }else
        if(relation=='' ){
            setAlertShow(true)
            setAlertTxt('Please enter your kin relationship with appliance.')
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
            fName:name,
            CNIC:cnic,
            email,securityId,
            SWDO:rel+'-'+surName,
            phone:numberCode+number,
            landline:landLine,
            currentAddress,
            parmanentAddress:permanentAddress,
            city,country,passport,
            nextKinName:kimName,
            nextKinSWDO:kimRel+'-'+kimsurName,
            nextKinRelation:relation,
            nextKinPhone:kimNumberCode+kimNumber,
            nextKinAddress:kimAddress,
            additionalRemarks:remarks,
            cnicFrontImage:front,
            cnicBackImage:back,
            signatureImage:sign,
            clientImage:profile,
            ...event,
            logType:edit ? 'edit-form' : 'submit-form'

        }
        if(edit){
            var {data} = await axios.put(dev+'/client/editClient',{
                data:obj,
                id:state.user._id
            })
            if(data.message=='Success'){
                alert('Form editted Successfull')
        setProgress(false)
        // handleEvent('edit-form')
                navigate("/")
            }else{
                console.log('There is an error')
        setProgress(false)
    }
    
        }else{
            var {data} = await axios.post(dev+'/client/addClient',obj)
            if(data.message=='Success'){
                alert('Form submitted Successfull')
                setProgress(false)
                // handleEvent('submit-form')
                navigate("/")
            }else{
                console.log('There is an error')
                setProgress(false)
            }
    
        }
    }

    const handleEvent=async(val)=>{
        var getId =  localStorage.getItem('HabibId')
        var type = localStorage.getItem('type')
    
        if(type=='SuperAdmin'){
          var obj={
            logType:val,
            operationBy:'superadmin',
          }
        }else{
          var obj={
            logType:val,
            operationBy:'user',
            user:getId
          }
        }
    
        var {data} = await axios.post(dev+'/dealer/testCreateLog',obj);
        if(data.message=='Success'){
          console.log('successful')
            navigate("/")
            }else{
          console.log('falied-->',data)
        }
      }
    

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
            value={name}
            onChange={e=>setName(e.target.value)}
            />
        </Grid>
        <Grid item md={6} xs={6} className='formSubDiv'>
        <p>CNIC</p>
            <input className='form1Input form1Input2' 
            placeholder='Number'
            type='number'
            value={cnic}
            onChange={e=>setCnic(e.target.value)}
            />
        </Grid>
        <Grid item md={12} xs={12} className='formSubDiv'>
            <p>S/W/D/O</p>
        <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
            <select className='SelectForm'
            value={rel}
            onChange={e=>setRel(e.target.value)}
            >
                <option value={'S/O'}>S/O</option>
                <option value={'W/O'}>W/O</option>
                <option value={'D/O'}>D/O</option>
            </select>
            <input className='form1Input NameForm' 
            placeholder='Name'
            value={surName}
            onChange={e=>setSurName(e.target.value)}
            />
            

</div>            
        </Grid>
        <Grid item md={12} xs={12} className='formSubDiv'>
        <p>Mobile Number</p>
        <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
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
        <Grid item md={6} xs={6} className='formSubDiv'>
            <p>Security ID</p>
            <input className='form1Input' 
            placeholder='ID'
            type='number'
            value={securityId}
            onChange={e=>setSecurityId(e.target.value)}
            />
        </Grid>
        <Grid item md={6} xs={6} className='formSubDiv'>
        <p>Landline</p>
            <input className='form1Input form1Input2' 
            placeholder='Landline Number'
            type='number'
            value={landLine}
            onChange={e=>setLandLine(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} className='formSubDiv'>
            <p>Current Address</p>
            <input className='form1Input formSubDivFull' 
            placeholder='Current Address'
            value={currentAddress}
            onChange={e=>setCurrentAddress(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} className='formSubDiv'>
        <p>Permanant Address</p>
            <input className='form1Input formSubDivFull'  
            placeholder='Permanant Address'
            value={permanentAddress}
            onChange={e=>setPermanentAddress(e.target.value)}
            />
        </Grid>
        <Grid item xs={6} className='formSubDiv'>
            <p>City</p>
            <input className='form1Input' 
            placeholder='City'
            value={city}
            onChange={e=>setCity(e.target.value)}
            />
        </Grid>
        <Grid item xs={6} className='formSubDiv'>
        <p>Country</p>
            <input className='form1Input form1Input2' 
            placeholder='Country'
            value={country}
            onChange={e=>setCountry(e.target.value)}
            />
        </Grid>
        <Grid item xs={6} className='formSubDiv'>
            <p>Email</p>
            <input className='form1Input' 
            placeholder='Email'
            value={email}
            onChange={e=>setEmail(e.target.value)}
            />
        </Grid>
        <Grid item xs={6} className='formSubDiv'>
        <p>Passport No</p>
            <input className='form1Input form1Input2' 
            placeholder='Number'
            value={passport}
            onChange={e=>setPassport(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} style={{marginTop:'30px'}}>
        <p className='clientTxt'>NEXT TO KIN INFORMATION</p>
        </Grid>

        <Grid item xs={12} className='formSubDiv'>
        <p>Name</p>
            <input className='form1Input formSubDivFull' 
            placeholder='Name'
            value={kimName}
            onChange={e=>setKimName(e.target.value)}
            />            
        </Grid>

        <Grid item xs={12} className='formSubDiv'>
        <p>S/O,W/O,D/O</p>
        <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
        <select className='SelectForm'
        value={kimRel}
        onChange={e=>setKimRel(e.target.value)}
        >
                <option value={'S/O'}>S/O</option>
                <option value={'W/O'}>W/O</option>
                <option value={'D/O'}>D/O</option>
            </select>
            <input className='form1Input NameForm' 
            placeholder='Name'
            value={kimsurName}
            onChange={e=>setKimSurName(e.target.value)}
            />
            </div>
        </Grid>
        <Grid item xs={6} className='formSubDiv'>
            <p>Number</p>
            <input className='form1Input' 
            placeholder='Number'
            value={kimNumber}
            type='number'
            onChange={e=>setKimNumber(e.target.value)}
            />
        </Grid>
        <Grid item xs={6} className='formSubDiv'>
            <p>Relationship With Appliance</p>
            <input className='form1Input form1Input2' 
            placeholder='Name'
            value={relation}
            onChange={e=>setRelation(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} className='formSubDiv'>
        <p>Phone/Cel</p>
        <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
            <input className='form1Input form1Input1' 
            placeholder='Code'
            value={kimNumberCode}
            onChange={e=>setKimNumberCode(e.target.value)}
            />
            <input className='form1Input form1Input21' 
            placeholder='Number'
            value={kimCelNumber}
            type='number'
            onChange={e=>setKimCelNumber(e.target.value)}
            />
</div>
        </Grid>

        <Grid item xs={12} className='formSubDiv'>
        <p>Address</p>
            <input className='form1Input formSubDivFull' 
            placeholder='Address'
            value={kimAddress}
            onChange={e=>setKimAddress(e.target.value)}
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
    onClick={submit}
    >{progress ? <CircularProgress color='error' size={13} /> : 'Save'}</button>
    </div>
  )

}

export default Form1