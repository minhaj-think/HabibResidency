import React, { useEffect, useState } from 'react'
import './Listing.css';
import {Grid} from '@mui/material';
import {AiOutlineCheck} from 'react-icons/ai';
import {MdKeyboardArrowRight,MdKeyboardArrowLeft} from 'react-icons/md'
import {GrEdit} from 'react-icons/gr'
import axios from 'axios';
import {dev} from './../../config/routes.js';
import ListingModal from './../ListingModal/ListingModal.js'; 
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Listing = ({showScan,showSearch,showDelete,showEdit}) => {

    var [windowWidth,setWindowWidth] = useState(window.outerWidth)
    var [clients,setClients] = useState([])
    var [pageLength,setPageLength] = useState(2)
    var [headingChecked,setHeadingChecked] = useState(false)
    var [headingChecked1,setHeadingChecked1] = useState(false)
    var [activeIndex,setActiveIndex] = useState(1)
    var [pageArray,setPageArray] = useState([])
    const [open, setOpen] = useState(false);
    const [barCode, setBarCode] = useState('');
    var [filtered,setFiltered] = useState([]);
    var [showFiltered,setShowFiltered] = useState(false);
    var [checked,setChecked] = useState(new Array(20).fill(''))
    var [progress,setProgress]  = useState(false);
    var navigate = useNavigate();

    useEffect(()=>{
        fetchingData()
        setChecked(new Array(20).fill(''))
    },[activeIndex])

    useEffect(()=>{
        pageArray=[];
        for(let i=0;i<pageLength;i++){
            pageArray=[...pageArray,i+1]
            setPageArray(pageArray)
        }
        handlePagination(1)
        setTimeout(()=>{
handlePagination(1)

        },2000)

    },[])


    var fetchingData = async()=>{
        setClients([])
        var {data} = await axios.post(dev+'/client/getClients/'+activeIndex);
        if(data.message=='Success'){
            setClients(data.doc.clients)
            pageLength=Math.ceil(Number(data.doc.total)/20)
            setPageLength(pageLength)
        }else{
            console.log(data)
        }
    }

    window.addEventListener('resize',()=>{
        setWindowWidth(window.outerWidth)
    })
 
    var handlePagination = currentPage =>{

        if(currentPage=='prev'){
            currentPage=Math.floor(activeIndex/2)
        }else
        if(currentPage=='next'){
            currentPage=Math.floor((activeIndex+pageLength)/2)
        }

        // less than five
        if(pageLength<6){
            pageArray=[];
            for(let i=0;i<pageLength;i++){
                pageArray=[...pageArray,i+1]
            }
            setPageArray(pageArray)
        }
        else{
            // for 1 and 2
            if(currentPage<3){
                setPageArray([1,2,3,'next',pageLength])
            }else if(currentPage==3){
                // for 3
                setPageArray([1,2,3,4,'next',pageLength])
            }
            else if(currentPage==pageLength){
                // for last index
                setPageArray([1,'prev',Math.floor(pageLength/2),'next',pageLength-1,pageLength])
            }else if(currentPage==pageLength-1){
                // for last index
                setPageArray([1,'prev',currentPage-1,currentPage,currentPage+1])
            }else if(currentPage==pageLength-2){
                // for last index
                setPageArray([1,'prev',currentPage-1,currentPage,currentPage+1,currentPage+2])
            }else{
                // for others
                setPageArray([1,'prev',currentPage-1,currentPage,currentPage+1,'next',pageLength])
                
            }
        }
        setActiveIndex(currentPage)
    }

    var handleDelete=async()=>{
        var getId =  localStorage.getItem('HabibId')
        var type = localStorage.getItem('type')
        setProgress(true)
        if(type=='SuperAdmin'){
          var event={
            logType:'delete-form',
            operationBy:'superadmin',
          }
        }else{
          var event={
            logType:'delete-form',
            operationBy:'user',
            user:getId
          }
        }

        var list = [];
        checked.map((v)=>{
            if(v!=''){
                list.push(v)
            }
        })
        var obj={
            clientIds : list,
            ...event
        }
        var {data} = await axios.delete(dev+'/admin/deleteClients',{data:obj});

        if(data.message=='Success'){
        setProgress(false)
        fetchingData()
            // handleEvent()
        }else{
            console.log('error=>',data)
        setProgress(false)
    }

    }



    const handleChangeSearch =async (e)=>{
        var getId =  localStorage.getItem('HabibId')
        var type = localStorage.getItem('type')
    
        if(type=='SuperAdmin'){
          var obj={
            logType:'search-form',
            operationBy:'superadmin',
          }
        }else{
          var obj={
            logType:'search-form',
            operationBy:'user',
            user:getId
          }
        }
    
        try{

        var {data} = await axios.post(dev+'/client/searchClient',{
            securityId: e.target.value,
            ...obj
        })
        if(data.message=='Success'){
            setShowFiltered(true)
            filtered=[data.doc]
            setFiltered(filtered)
        }else{
            setShowFiltered(false)
        }
    }
catch(err){
    console.log('err=>',err)
}
    }

    return (
        <>
        <ListingModal setOpen={setOpen} barCode={barCode} open={open} />
    <div className='listingMain'>
        <div className='listingTItleDiv'>
            <span className='listingTitle'>Client Details</span>
            {
                showSearch &&
            <div className='searchDiv'>
                <input className='SearchInput'
                placeholder='Search here...'
                onChange={handleChangeSearch}
                />
            </div>
            }
        </div>
            <div className='subMainListing'>
        <div className={'clientLstItem clientLstHeadingMain' }>
                       <div style={{minWidth:'6%',textAlign:'center'}} className='listingCheck'>
                        <p></p>
                       </div>
                       <div style={{minWidth:'6%',textAlign:'center'}} className='listingEditTit'>
                       <p></p>
                       </div>
                       <p className='clientSubItemTitle'>Creation Date</p>
                       <p className='clientSubItemTitle'>Name as per CNIC</p>
                       <p className='clientSubItemTitle' >CNIC</p>
                       <p className='clientSubItemTitle' >Phone Number</p>
                       <p className='clientSubItemTitle' >Security Id</p>
                       <p className='clientSubItemTitle' >City</p>
                       <div style={{minWidth:'150px',textAlign:'center'}} className='listingEditTit'>
                       <p></p>
                       </div>
                        </div>


            { !showFiltered &&
                clients.map((v,i)=>{
                    return(
                        <div key={i} className={'clientLstItem' }>

<div style={{minWidth:'6%',textAlign:'center'}} className={checked[i] ? 'listingCheck listChk checkedItem' : 'listingCheck listChk' } >
                        <div className='CheckBox'
                        onClick={()=>{
                            if(checked[i]!=''){
                                checked[i]=''
                            }else{
                                checked[i] = v._id;
                            }
                            setChecked(checked)

                            setHeadingChecked1(!headingChecked1)

                        }}
                        >
                            {
                                checked[i]!='' &&
                            <AiOutlineCheck color={'red'} style={{height:'80%'}} />
                            }
                            </div>
                        </div>

                            <div style={{minWidth:'6%',textAlign:'center'}} className='editWid' >
                        {showEdit &&
                       <p className={checked[i] ? 'listingEdit checkedItem' : 'listingEdit'} >  <GrEdit color='gray'
                       onClick={()=>{
                        navigate('/edit',{
                            state:{
                                user:v,
                                type : 'user'
                            }
                        })
                       }}
                        /> </p>
                        }
                        </div>
                       <p className={checked[i] ? 'clientSubItemNormal checkedItem' : 'clientSubItemNormal '}>{v.createdDate.split('T')[0]}</p>
                       <p className={checked[i] ? 'clientSubItemNormal checkedItem' : 'clientSubItemNormal '}>{v.fName}</p>
                       <p className={checked[i] ? 'clientSubItemNormal checkedItem' : 'clientSubItemNormal '} >{v.CNIC}</p>
                       <p className={checked[i] ? 'clientSubItemNormal checkedItem' : 'clientSubItemNormal '} >{v.phone}</p>
                       <p className={checked[i] ? 'clientSubItemNormal checkedItem' : 'clientSubItemNormal '} >{v.securityId}</p>
                       <p className={checked[i] ? 'clientSubItemNormal checkedItem' : 'clientSubItemNormal '} >{v.city}</p>
                       <p style={{minWidth:'150px'}} className={checked[i] ? 'checkedItem clientSubItemBarCodeMain' : 'clientSubItemBarCodeMain'} >
                       {
                            showScan &&
                    <div className='clientPrintBtn'
                    onClick={()=>{
                        setBarCode(v.barcode)
                        setOpen(true)
                    }}
                    >
                        <span>Show Barcode</span>
                    </div>
                    }
                       </p>
                        </div>
                )
                        })
            }

{ showFiltered &&
                filtered.map((v,i)=>{
                    return(
                        <div key={i} className={checked[i] ? 'clientLstItem' : 'clientLstItem' }>

<div style={{minWidth:'6%',textAlign:'center'}} className={checked[i] ? 'listingCheck listChk checkedItem' : 'listingCheck listChk' }>
                    <div className='subColDiv' >
                        <div className='CheckBox'
                        onClick={()=>{
                            if(checked[i]!=''){
                                checked[i]=''
                            }else{
                                checked[i] = v._id;
                            }
                            setChecked(checked)

                            setHeadingChecked1(!headingChecked1)

                        }}
                        >
                            {
                                checked[i]!='' &&
                            <AiOutlineCheck color={'red'} style={{height:'80%'}} />
                            }
                            </div>
                            </div>
                        </div>

                            <div style={{minWidth:'6%',textAlign:'center'}} className='editWid'>
                        {showEdit &&
                    <p className={checked[i] ? 'listingEdit checkedItem' : 'listingEdit'}>
                    <GrEdit color='gray'
                       onClick={()=>{
                        navigate('/edit',{
                            state:{
                                user:v,
                                type : 'user'
                            }
                        })
                       }}
                        /> </p>
                        }
                        </div>
                       <p className={checked[i] ? 'clientSubItemNormal checkedItem' : 'clientSubItemNormal '}>{v.createdDate.split('T')[0]}</p>
                       <p className={checked[i] ? 'clientSubItemNormal checkedItem' : 'clientSubItemNormal '}>{v.fName}</p>
                       <p className={checked[i] ? 'clientSubItemNormal checkedItem' : 'clientSubItemNormal '} >{v.CNIC}</p>
                       <p className={checked[i] ? 'clientSubItemNormal checkedItem' : 'clientSubItemNormal '} >{v.phone}</p>
                       <p className={checked[i] ? 'clientSubItemNormal checkedItem' : 'clientSubItemNormal '} >{v.securityId}</p>
                       <p className={checked[i] ? 'clientSubItemNormal checkedItem' : 'clientSubItemNormal '} >{v.city}</p>
                       <p style={{minWidth:'150px'}} className={checked[i] ? 'checkedItem clientSubItemBarCodeMain' : 'clientSubItemBarCodeMain'} >
                       {
                            showScan &&
                    <div className='clientPrintBtn'
                    onClick={()=>{
                        console.log(v)
                        setBarCode(v.barcode)
                        setOpen(true)
                    }}
                    >
                        <span>Show Barcode</span>
                    </div>
                    }
                       </p>
                        </div>
                )
                        })
            }

</div>
    </div>
        { !showFiltered &&

    <div className='listingLastDiv'>
            <div className='paginationDiv'>
                <div className='PrevPagBtn'
                onClick={()=>{
                    if(activeIndex>1)
                    handlePagination(activeIndex-1)
                    }}>
                    <MdKeyboardArrowLeft/>
                </div>
                {
                    pageArray.map((v,i)=>(
                <div key={i} className={activeIndex==v ? 'CenterPagBtn activePageBtn' : 'CenterPagBtn'} onClick={()=>handlePagination(v)}>
                    <span>{(v=='next' || v=='prev') ? '...' : v }</span>
                </div>
                    ))
                }

                <div className='NextPagBtn'
                onClick={()=>{
                    if(activeIndex<pageLength){
                        handlePagination(activeIndex+1)
                    }
                }}
                >
                    <MdKeyboardArrowRight/>
                </div>
            </div>
{
    showDelete &&
            <div className='deleteBtn'
            onClick={()=>handleDelete()}>
                <span className='deleteTxt'>
                {progress ? <CircularProgress color='error' size={13} /> : 'Delete'}
                    </span>
            </div>
        }

            </div>
    }

    </>
  )
}

export default Listing
