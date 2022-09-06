import React, { useEffect, useState } from 'react'
import './AccountListing.css';
import {Grid} from '@mui/material';
import {AiOutlineCheck} from 'react-icons/ai';
import {MdKeyboardArrowRight,MdKeyboardArrowLeft} from 'react-icons/md'

const AccountListing = () => {

    var [windowWidth,setWindowWidth] = useState(window.outerWidth)

    window.addEventListener('resize',()=>{
        setWindowWidth(window.outerWidth)
    })
    
    var [headingChecked,setHeadingChecked] = useState(false)
    var [activeIndex,setActiveIndex] = useState(1)
    var [pageArray,setPageArray] = useState([])
    var [arr,setArr] = useState([
        {checked:false,name:'abcd',cnic:'1220102120412',mobile:'02910291021',id:'0987654',city:'Karachi'},
        {checked:true,name:'qrst',cnic:'1220102120412',mobile:'02910291021',id:'0987654',city:'Lahore'},
        {checked:false,name:'ijkl mnop',cnic:'1220102120412',mobile:'02910291021',id:'0987654',city:'Chicago'},
        {checked:false,name:'efgh',cnic:'1220102120412',mobile:'02910291021',id:'0987654',city:'Sydney'},
    ])
    var [a,seta] = useState(false)

    var pageLength = 10
    useEffect(()=>{
        pageArray=[];
        for(let i=0;i<pageLength;i++){
            pageArray=[...pageArray,i+1]
            setPageArray(pageArray)
        }
        handlePagination(1)
    },[])

    var handlePagination = currentPage =>{

        if(currentPage=='prev'){
            currentPage=Math.floor(activeIndex/2)
        }else
        if(currentPage=='next'){
            currentPage=Math.floor((activeIndex+pageLength)/2)
        }

        // less than five
        if(pageLength<6){
            setPageArray([1,2,3,4,5])
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


    return (
        <>
    <div className='AccountlistingMain listingMain'>

        <Grid container className={'listingHeadings'}>
                    <Grid item md={1} sm={0.5} xs={0.5}>
                        <div className='CheckBox'
                        onClick={()=>{
                            setHeadingChecked(!headingChecked)
                        }}
                        >
                            <AiOutlineCheck color={headingChecked ? 'red' : '#fff'} style={{height:'80%'}} />
                        </div>
                    </Grid>
                    <Grid item md={windowWidth>1100 ? 3 : 2.5} sm={2.5} xs={2.3}>
                       <span>Name</span>
                        </Grid>
                    <Grid item md={1.5} sm={1.75} xs={2}>
                    <span>CNIC</span>
                    </Grid>
                    <Grid item md={windowWidth>1100 ? 1.5 : 2} sm={2.25} xs={2.2}>
                       <span>Mobile Number</span>
                    </Grid>
                    <Grid item md={2} sm={2} xs={1.5}>
                       <span>Security ID</span>
                    </Grid>
                    <Grid item md={1.5} sm={1.5} xs={1.5}>
                       <span>City</span>
                    </Grid>
                    <Grid item md={1.5} sm={1.5} xs={2}>
                    <div className='AddBtn'>
                        <span>Add</span>
                    </div>
                    </Grid>
                </Grid>


            { 
                arr.map((v,i)=>{
                    return(
                    <div className={v.checked ? 'listingItem checkedItem' : 'listingItem'}>
                    <Grid container className={''}>
                    <Grid item md={1} sm={0.5} xs={0.5}>
                    <div className='subColDiv' >
                        <div className='CheckBox'
                        onClick={()=>{
                            arr[i].checked = !v.checked;
                            setArr(arr) 
                            seta(!a)
                        }}
                        >
                            <AiOutlineCheck color={v.checked ? 'red' : '#fff'} style={{height:'80%'}} />
                        </div>
                            </div>
                    </Grid>
                    <Grid item md={windowWidth>1100 ? 3 : 2.5} sm={2.5} xs={2.3}>
                    <div className='subColDiv' >
                       <span style={{wordBreak:'break-all'}} >{v.name}</span>
                    </div>
                        </Grid>
                    <Grid item md={1.5} sm={1.75} xs={2}>
                    <div className='subColDiv' >
                    <span style={{wordBreak:'break-all'}} >{v.cnic}</span>
                    </div>
                    </Grid>
                    <Grid item md={windowWidth>1100 ? 1.5 : 2} sm={2.25} xs={2.2}>
                    <div className='subColDiv' >
                       <span style={{wordBreak:'break-all'}} >{v.mobile}</span>
                    </div>
                    </Grid>
                    <Grid item md={2} sm={2} xs={1.5}>
                    <div className='subColDiv' >
                       <span style={{wordBreak:'break-all'}} >{v.id}</span>
                    </div>
                    </Grid>
                    <Grid item md={1.5} sm={1.5} xs={1.5}>
                    <div className='subColDiv' >
                       <span style={{wordBreak:'break-all'}} >{v.city}</span>
                    </div>
                    </Grid>
                    <Grid item md={1.5} sm={1.5} xs={2}>
                    <div className='subColDiv' >
                    <div className='EditBtn'>
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
                <div className='PrevPagBtn'>
                    <MdKeyboardArrowLeft/>
                </div>
                {
                    pageArray.map((v,i)=>(
                <div className={activeIndex==v ? 'CenterPagBtn activePageBtn' : 'CenterPagBtn'} onClick={()=>handlePagination(v)}>
                    <span>{(v=='next' || v=='prev') ? '...' : v }</span>
                </div>
                    ))
                }

                <div className='NextPagBtn'>
                    <MdKeyboardArrowRight/>
                </div>
            </div>
            <div className='deleteBtn'>
                <span className='deleteTxt'>Delete</span>
            </div>
            </div>

    </>
  )
}

export default AccountListing
