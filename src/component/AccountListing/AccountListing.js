import React, { useEffect, useState } from 'react'
import './AccountListing.css';
import {Grid} from '@mui/material';
import {AiOutlineCheck} from 'react-icons/ai';
import {MdKeyboardArrowRight,MdKeyboardArrowLeft, MdFaceRetouchingNatural} from 'react-icons/md'
import AccountModal from './AccountModal/AccountModal.js';
import EditAccountModal from './AccountModal/EditAccountModal.js';
import axios from 'axios'
import { dev } from '../../config/routes';

const AccountListing = () => {

    var [windowWidth,setWindowWidth] = useState(window.outerWidth)
    var [open,setOpen] = useState(false)

    window.addEventListener('resize',()=>{
        setWindowWidth(window.outerWidth)
    })
    
    var [headingChecked,setHeadingChecked] = useState(false)
    var [activeIndex,setActiveIndex] = useState(1)
    var [adminsList,setAdminsList] = useState([])
    var [pageArray,setPageArray] = useState([])
    var [pageLength,setPageLength] = useState(2)
    var [editOpen,setEditOpen] = useState(false)
    var [arr,setArr] = useState([])
    var [a,seta] = useState(false)
    var [selectedIem,setSelectedIem] = useState('')
    var [refresh,setRefresh] = useState(false)
    
    
    useEffect(()=>{
        fetching()
    },[activeIndex,refresh])

useEffect(()=>{
    setTimeout(()=>{
    handlePagination(1)
    
    },2000)
},[])

    var fetching =async ()=>{
        var {data} = await axios.post(dev+'/subadmin/getSubadmins/'+activeIndex)
        if(data.message=='Success'){
            setAdminsList(data.doc.admins)
            pageLength=data.doc.pages
            setPageLength(pageLength)
            console.log(data)
        
        }else{
            console.log('failed')
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

    var handleStatus=async(val)=>{

        if(val.enabled){

            var {data} = await axios.put(dev+'/subadmin/updateAdminStatus',{
                id:val._id,
                status:false
            })
                if(data.message){
                    console.log('true-->',data)
                fetching()
            }else{
                    console.log('true-->Error',data)
                }

        }else{

            var {data} = await axios.put(dev+'/subadmin/updateAdminStatus',{
                id:val._id,
                status:true
            })
            if(data.message){
                console.log('false-->',data)
                fetching()
            }else{
                console.log('false-->Error',data)
            }

        }

    }
    
    return (
        <>
        <EditAccountModal setRefresh={setRefresh} open={editOpen} selectedIem={selectedIem} setOpen={setEditOpen} />
        <AccountModal open={open} setOpen={setOpen} />
    <div className='AccountlistingMain listingMain'>

        <Grid container className={'listingHeadings'}>
                    {/* <Grid item md={1} sm={0.5} xs={0.5}> */}
                        {/* <div className='CheckBox'
                        onClick={()=>{
                            setHeadingChecked(!headingChecked)
                        }}
                        >
                            <AiOutlineCheck color={headingChecked ? 'red' : '#fff'} style={{height:'80%'}} />
                        </div> */}
                    {/* </Grid> */}
                    <Grid item md={windowWidth>1100 ? 3 : 2.5} sm={3} xs={2.8}>
                       <span style={{marginLeft:'10px'}}>UserName</span>
                        </Grid>
                    <Grid item md={2.5} sm={1.75} xs={2}>
                    <span>Email</span>
                    </Grid>
                    <Grid item md={2.5} sm={1.75} xs={2}>
                    <span>Status</span>
                    </Grid>

                    <Grid item md={windowWidth>1100 ? 2.5 : 2} sm={2.25} xs={2.2}>
                       <span>Password</span>
                    </Grid>
                    <Grid item md={1.5} sm={1.5} xs={2} style={{display:'flex',justifyContent:'center'}}>
                    <div className='AddBtn' onClick={()=>setOpen(true)}>
                        <span>Add</span>
                    </div>
                    </Grid>
                </Grid>


            { adminsList &&
                adminsList.map((v,i)=>{
                    return(
                    <div className={v.checked ? 'listingItem checkedItem' : 'listingItem'}>
                    <Grid container className={''}>
                    {/* <Grid item md={1} sm={0.5} xs={0.5}> */}
                    {/* <div className='subColDiv' >
                        <div className='CheckBox'
                        onClick={()=>{
                            arr[i].checked = !v.checked;
                            setArr(arr) 
                            seta(!a)
                        }}
                        >
                            <AiOutlineCheck color={v.checked ? 'red' : '#fff'} style={{height:'80%'}} />
                        </div>
                            </div> */}
                    {/* </Grid> */}
                    <Grid item md={windowWidth>1100 ? 3 : 3.5} sm={3} xs={2.8}>
                    <div className='subColDiv' >
                       <span style={{wordBreak:'break-all',marginLeft:'10px'}} >{v.username}</span>
                    </div>
                        </Grid>
                    <Grid item md={2.5} sm={1.75} xs={2}>
                    <div className='subColDiv' >
                    <span style={{wordBreak:'break-all'}} >{v.email}</span>
                    </div>
                    </Grid>
                    <Grid item md={2.5} sm={1.75} xs={2}>
                    <div className={v.enabled ? 'subColDiv enabled' :'subColDiv disabled'} 
                    onClick={()=>handleStatus(v)}
                    >
                    <span style={{wordBreak:'break-all'}} >{v.enabled ? 'click to suspend' : 'click to restore'}</span>
                    </div>
                    </Grid>
                    <Grid item md={2.5} sm={1.5} xs={1.5}>
                    <div className='subColDiv' >
                       <span style={{wordBreak:'break-all'}} >{v.password}</span>
                    </div>
                    </Grid>
                    <Grid item md={1.5} sm={1.5} xs={2}>
                    <div className='subColDiv' >
                    <div className='EditBtn'
                    onClick={()=>{
                        setSelectedIem(v)
                        setEditOpen(true)
                    }}
                    >
                        <span>Edit</span>
                    </div>
                    </div>
                    </Grid>
                </Grid>
        </div>
                )
                        })
            }

    </div>
    <div className='listingLastDiv listingLastDiv'>
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
                <div className={activeIndex==v ? 'CenterPagBtn activePageBtn' : 'CenterPagBtn'} onClick={()=>handlePagination(v)}>
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
            {/* <div className='accountDelBtn'>
                <span className='deleteTxt'>Delete</span>
            </div> */}
            </div>

    </>
  )
}

export default AccountListing
