import React,{useState,useEffect} from 'react'
import './Form1.css';
import { Grid } from '@mui/material';
import axios from 'axios';

const Form1 = ({front,back,profile,sign}) => {

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

    var submit = async()=>{
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
            clientImage:profile
        }
        var {data} = await axios.post('https://40e2-75-119-139-19.ngrok.io/client/addClient',obj)
        if(data.message=='Success'){
            alert('Successfull')
        }else{
            console.log('There is an error')
        }
        // console.log('object==>',obj)
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
            value={number}
            onChange={e=>setNumber(e.target.value)}
            />
</div>
        </Grid>
        <Grid item md={6} xs={6} className='formSubDiv'>
            <p>Security ID</p>
            <input className='form1Input' 
            placeholder='ID'
            value={securityId}
            onChange={e=>setSecurityId(e.target.value)}
            />
        </Grid>
        <Grid item md={6} xs={6} className='formSubDiv'>
        <p>Landline</p>
            <input className='form1Input form1Input2' 
            placeholder='Landline Number'
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
        <p className='clientTxt'>NEXT TO KIM INFORMATION</p>
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
    <button className='SaveBtn'
    onClick={submit}
    >Save</button>
    </div>
  )

}

export default Form1