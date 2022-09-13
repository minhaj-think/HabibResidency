import React, { useEffect, useState } from 'react'
import './DealerListing.css';
import {Grid} from '@mui/material';
import {AiOutlineCheck} from 'react-icons/ai';
import {MdKeyboardArrowRight,MdKeyboardArrowLeft} from 'react-icons/md'
import axios from 'axios';
import DealerListingModal from './../DealerListingModal/DealerListingModal.js'; 
import {dev} from './../../config/routes.js'
import {GrEdit} from 'react-icons/gr'
import { useNavigate } from 'react-router-dom';
const DealerListing = ({showScan,showSearch,showDelete,showEdit}) => {

    var [windowWidth,setWindowWidth] = useState(window.outerWidth)
    var [dealers,setDealers] = useState([])
    var [pageLength,setPageLength] = useState(null)
    var [headingChecked,setHeadingChecked] = useState(false)
    var [headingChecked1,setHeadingChecked1] = useState(false)
    var [activeIndex,setActiveIndex] = useState(1)
    var [pageArray,setPageArray] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [barCodes, setBarCodes] = useState([]);
    var [filtered,setFiltered] = useState([]);
    var [showFiltered,setShowFiltered] = useState(false);
    var [checked,setChecked] = useState(new Array(20).fill(''))
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
        setTimeout(()=>{
handlePagination(1)

        },2000)
    },[])

    var fetchingData = async()=>{
        setDealers([])
        console.log('fetcing')
        var {data} = await axios.post(dev+'/dealer/getDealers/'+activeIndex);
        console.log('fetcing-==>',data)
        if(data.message=='Success'){
            setDealers(data.doc.dealers)
            console.log(data.doc)
            pageLength=Math.ceil(Number(data.doc.total)/20)
            setPageLength(pageLength)
        }

    }

    window.addEventListener('resize',()=>{
        setWindowWidth(window.outerWidth)
    })
    
    var handleDelete=async()=>{
        var getId =  localStorage.getItem('HabibId')
        var type = localStorage.getItem('type')
    
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
        console.log(list)
        var obj={
            dealerIds : list,
            ...event
        }
        console.log(obj)
        var {data} = await axios.delete(dev+'/admin/deleteDealers',{data:obj}
        )
        if(data.message=='Success'){
            fetchingData()
            console.log('deleted')
        }else{
            console.log('error=>',data)
        }

    }


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

        var {data} = await axios.post(dev+'/dealer/searchDealer',{
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
        console.log(filtered)
    }
catch(err){
    console.log('err=>',err)
}
    }


    return (
        <>
        <DealerListingModal barCodes={barCodes} setOpenModal={setOpenModal}  openModal={openModal} />
    <div className='DealerlistingMain listingMain'>
        <div className='listingTItleDiv'>
            <span className='listingTitle'>Dealer Details</span>
            {
                showSearch &&
            <div className='searchDiv'>
                <input className='SearchInput'
                onChange={handleChangeSearch}
                placeholder='Search here...'
                />
            </div>
            }
        </div>

        <Grid container className={'listingHeadings'}>
                    <Grid item md={0.8} sm={0.5} xs={0.5}>
                        {/* <div className='CheckBox'
                        onClick={()=>{
                            setHeadingChecked(!headingChecked)
                        }}
                        >
                            <AiOutlineCheck color={headingChecked ? 'red' : '#fff'} style={{height:'80%'}} />
                        </div> */}
                    </Grid>
                    <Grid item md={windowWidth>1100 ? 0.4 : 0.4} sm={2.5} xs={windowWidth>500 ? 2.3 : 2}
                    style={{display:'flex',alignItems:'center'}}
                    >
                       {/* <span> <GrEdit color='gray' /> </span> */}
                        </Grid>
                    <Grid item md={windowWidth>1100 ? 2.1 : 2.5} sm={2.5} xs={2.3}>
                    <span>{windowWidth>500 ? 'Name as per CNIC' : 'Name in CNIC' }</span>
                        </Grid>
                    <Grid item md={1.5} sm={1.75} xs={2}>
                    <span>CNIC</span>
                    </Grid>
                    <Grid item md={windowWidth>1100 ? 2.2 : 2} sm={2.25} xs={2.2}>
                       <span>Mobile Number</span>
                    </Grid>
                    <Grid item md={2} sm={2} xs={1.5}>
                       <span>Security ID</span>
                    </Grid>
                    <Grid item md={1.5} sm={1.5} xs={1.5}>
                       <span>No of Codes</span>
                    </Grid>
                    <Grid item md={1.5} sm={1.5} xs={2}>
                    </Grid>
                </Grid>


            { !showFiltered &&
                dealers.map((v,i)=>{
                    return(
                    <div key={i} className={checked[i] ? 'listingItem checkedItem' : 'listingItem'}>
                    <Grid container className={''}>
                    <Grid item md={0.8} sm={0.5} xs={0.5}>
                    <div className='subColDiv' >
                        <div className='CheckBox'
                        onClick={()=>{
                            if(checked[i]!=''){
                                checked[i]=''
                            }else{
                                checked[i] = v._id;
                            }
                            setChecked(checked)
                            console.log(checked)

                            setHeadingChecked1(!headingChecked1)

                        }}
                        >
                            {
                                checked[i]!='' &&
                            <AiOutlineCheck color={'red'} style={{height:'80%'}} />
                            }
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={windowWidth>1100 ? 0.4 : 0.4} sm={2.5} xs={windowWidth>500 ? 2.3 : 2}
                    style={{display:'flex',alignItems:'center'}}
                    >
                        {showEdit &&
                       <span> <GrEdit color='gray'
                       onClick={()=>{
                        navigate('/edit',{
                            state:{
                                user:v,
                                type : 'dealer'
                            }
                        })
                       }}
                        /> </span>
                        }
                        </Grid>
                    <Grid item md={windowWidth>1100 ? 2.1 : 2.5} sm={2.5} xs={2.3}>
                    <div className='subColDiv' >
                       <span style={{wordBreak:'break-all'}} >{v.firmName}</span>
                    </div>
                        </Grid>
                    <Grid item md={1.5} sm={1.75} xs={2}>
                    <div className='subColDiv' >
                    <span style={{wordBreak:'break-all'}} >{v.CNIC}</span>
                    </div>
                    </Grid>
                    <Grid item md={windowWidth>1100 ? 2.2 : 2} sm={2.25} xs={2.2}>
                    <div className='subColDiv' >
                       <span style={{wordBreak:'break-all'}} >{v.phone}</span>
                    </div>
                    </Grid>
                    <Grid item md={2} sm={2} xs={1.5}>
                    <div className='subColDiv' >
                       <span style={{wordBreak:'break-all'}} >{v.securityId}</span>
                    </div>
                    </Grid>
                    <Grid item md={1.5} sm={1.5} xs={1.5}>
                    <div className='subColDiv' >
                       <span style={{wordBreak:'break-all'}} >{v.barcodes.length}</span>
                    </div>
                    </Grid>
                    <Grid item md={1.5} sm={1.5} xs={2}>
                        {
                            showScan &&
                    <div className='subColDiv' >
                    <div className='PrintBtn'
                    onClick={()=>{
                        setBarCodes(v.barcodes)
                        setOpenModal(true)
                    }}
                    >
                        <span>Show Barcode</span>
                    </div>
                    </div>
                    }
                    </Grid>
                </Grid>
        </div>
                )
                        })
            }

{ showFiltered &&
                filtered.map((v,i)=>{
                    return(
                    <div key={i} className={checked[i] ? 'listingItem checkedItem' : 'listingItem'}>
                    <Grid container className={''}>
                    <Grid item md={0.8} sm={0.5} xs={0.5}>
                    <div className='subColDiv' >
                        <div className='CheckBox'
                        onClick={()=>{
                            if(checked[i]!=''){
                                checked[i]=''
                            }else{
                                checked[i] = v._id;
                            }
                            setChecked(checked)
                            console.log(checked)

                            setHeadingChecked1(!headingChecked1)

                        }}
                        >
                            {
                                checked[i]!='' &&
                            <AiOutlineCheck color={'red'} style={{height:'80%'}} />
                            }
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={windowWidth>1100 ? 0.4 : 0.4} sm={2.5} xs={windowWidth>500 ? 2.3 : 2}
                    style={{display:'flex',alignItems:'center'}}
                    >
                        {showEdit &&
                       <span> <GrEdit color='gray'
                       onClick={()=>{
                        navigate('/edit',{
                            state:{
                                user:v,
                                type : 'dealer'
                            }
                        })
                       }}
                        /> </span>
                        }
                        </Grid>
                    <Grid item md={windowWidth>1100 ? 2.1 : 2.5} sm={2.5} xs={2.3}>
                    <div className='subColDiv' >
                       <span style={{wordBreak:'break-all'}} >{v.firmName}</span>
                    </div>
                        </Grid>
                    <Grid item md={1.5} sm={1.75} xs={2}>
                    <div className='subColDiv' >
                    <span style={{wordBreak:'break-all'}} >{v.CNIC}</span>
                    </div>
                    </Grid>
                    <Grid item md={windowWidth>1100 ? 2.2 : 2} sm={2.25} xs={2.2}>
                    <div className='subColDiv' >
                       <span style={{wordBreak:'break-all'}} >{v.phone}</span>
                    </div>
                    </Grid>
                    <Grid item md={2} sm={2} xs={1.5}>
                    <div className='subColDiv' >
                       <span style={{wordBreak:'break-all'}} >{v.securityId}</span>
                    </div>
                    </Grid>
                    <Grid item md={1.5} sm={1.5} xs={1.5}>
                    <div className='subColDiv' >
                       <span style={{wordBreak:'break-all'}} >{v.barcodes.length}</span>
                    </div>
                    </Grid>
                    <Grid item md={1.5} sm={1.5} xs={2}>
                        {
                            showScan &&
                    <div className='subColDiv' >
                    <div className='PrintBtn'
                    onClick={()=>{
                        setBarCodes(v.barcodes)
                        setOpenModal(true)
                    }}
                    >
                        <span>Show Barcode</span>
                    </div>
                    </div>
                    }
                    </Grid>
                </Grid>
        </div>
                )
                        })
            }


    </div>
    <div className='DealerlistingLastDiv listingLastDiv'>
            <div className='paginationDiv'>
                <div className='PrevPagBtn'>
                    <MdKeyboardArrowLeft
                onClick={()=>{
                    if(activeIndex>1){
                        handlePagination(activeIndex-1)
                    }
                }}
                    />
                </div>
                {
                    pageArray.map((v,i)=>(
                <div className={activeIndex==v ? 'CenterPagBtn activePageBtn' : 'CenterPagBtn'} onClick={()=>handlePagination(v)}>
                    <span>{(v=='next' || v=='prev') ? '...' : v }</span>
                </div>
                    ))
                }

                <div className='NextPagBtn'>
                    <MdKeyboardArrowRight
                onClick={()=>{
                    if(activeIndex<pageLength){
                        handlePagination(activeIndex+1)
                    }
                }}
                    />
                </div>
            </div>
            {
                showDelete &&
            <div className='deleteBtn'
            onClick={handleDelete}
            >
                <span className='deleteTxt'>Delete</span>
            </div>
            }

            </div>

    </>
  )
}

export default DealerListing
