import React, { useEffect, useState } from 'react'
import './DealerListing.css';
import {Grid} from '@mui/material';
import {AiOutlineCheck} from 'react-icons/ai';
import {MdKeyboardArrowRight,MdKeyboardArrowLeft} from 'react-icons/md'
import axios from 'axios';

const DealerListing = () => {

    var [windowWidth,setWindowWidth] = useState(window.outerWidth)
    var [dealers,setDealers] = useState([])
    var [pageLength,setPageLength] = useState(2)
    var [headingChecked,setHeadingChecked] = useState(false)
    var [activeIndex,setActiveIndex] = useState(1)
    var [pageArray,setPageArray] = useState([])
    var [a,seta] = useState(false)

    useEffect(()=>{
        fetchingData()
    },[activeIndex])

    useEffect(()=>{
        pageArray=[];
        for(let i=0;i<pageLength;i++){
            pageArray=[...pageArray,i+1]
            setPageArray(pageArray)
        }
        handlePagination(1)
    },[])

    var fetchingData = async()=>{
        var {data} = await axios.post('http://localhost:5353/dealer/getDealers/'+activeIndex);
        if(data.message=='Success'){
            setDealers(data.doc.dealers)
            pageLength=Math.ceil(Number(data.doc.total)/5)
            setPageLength(pageLength)
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


    return (
        <>
    <div className='DealerlistingMain listingMain'>
        <div className='listingTItleDiv'>
            <span className='listingTitle'>Dealer Details</span>
            <div className='searchDiv'>
                <input className='SearchInput'
                placeholder='Search here...'
                />
            </div>
        </div>

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
                    <span>{windowWidth>500 ? 'Name as per CNIC' : 'Name in CNIC' }</span>
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
                       <span>No of Codes</span>
                    </Grid>
                    <Grid item md={1.5} sm={1.5} xs={2}>
                    </Grid>
                </Grid>


            { 
                dealers.map((v,i)=>{
                    return(
                    <div key={i} className={v.checked ? 'listingItem checkedItem' : 'listingItem'}>
                    <Grid container className={''}>
                    <Grid item md={1} sm={0.5} xs={0.5}>
                    <div className='subColDiv' >
                        <div className='CheckBox'
                        onClick={()=>{
                            seta(!a)
                        }}
                        >
                            <AiOutlineCheck color={v.checked ? 'red' : '#fff'} style={{height:'80%'}} />
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={windowWidth>1100 ? 3 : 2.5} sm={2.5} xs={2.3}>
                    <div className='subColDiv' >
                       <span style={{wordBreak:'break-all'}} >{v.firmName}</span>
                    </div>
                        </Grid>
                    <Grid item md={1.5} sm={1.75} xs={2}>
                    <div className='subColDiv' >
                    <span style={{wordBreak:'break-all'}} >{v.CNIC}</span>
                    </div>
                    </Grid>
                    <Grid item md={windowWidth>1100 ? 1.5 : 2} sm={2.25} xs={2.2}>
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
                    <div className='subColDiv' >
                    <div className='PrintBtn'>
                        <span>Show Barcode</span>
                    </div>
                    </div>
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

export default DealerListing
