import axios from 'axios';
import React,{useEffect,useState} from 'react'
import Header from '../component/Header/Header'
import './logs.css';
import { dev } from '../config/routes';
import {MdKeyboardArrowRight,MdKeyboardArrowLeft} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import LogsFilter from './../component/LogsFilter/LogsFilter.js';

const LogsPage = () => {

  var [logs,setLogs] = useState([])
  var [activeIndex,setActiveIndex] = useState(1)
  var [pageArray,setPageArray] = useState([])
  var [pageLength,setPageLength] = useState(2)
  var navigate=useNavigate();
  var [type,setType] = useState('all')
  var [usersList,setUsersList] = useState([])

  useEffect(()=>{
    // console.log(new Date())
    userFetching()

    var userId =   localStorage.getItem('HabibId')
    if(!userId){
      navigate('/login')
    }
    if(type=='all'){
      fetching()
    }
  },[])

  var userFetching = async ()=>{
    try{

      var {data} = await axios.get(dev+'/subadmin/allSubadminNames');
      if(data.message=='Success'){
        setUsersList(data.doc)
      }else{
        // error
      }

    }catch(err){
      console.log('err',err)
    }
  }

var fetching=async()=>{
  console.log('fetcgin')
  var {data} = await axios.post(dev+'/admin/getSystemLogs/'+activeIndex)
  if(data.message=='Success'){
    setLogs(data.doc.logs)
    pageLength=data.doc.pages
    setPageLength(pageLength)
  }else{
    // console.log('error-=>',data)
  }

  setTimeout(()=>{
handlePagination(1)

},2000)

}


var handlePagination = async (currentPage) =>{

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
  
  var {data} = await axios.post(dev+'/admin/getSystemLogs/'+currentPage)
  if(data.message=='Success'){
    setLogs(data.doc.logs)
  }else{
    console.log('error-=>',data)
  }

}

const handleFiltered=(data,pageFor)=>{
  console.log("inter handle filter")
  pageLength=data.pages
  setPageLength(pageLength)
  handlePagination(pageFor)      
  console.log(pageLength)
  setTimeout(()=>{
    setLogs(data.logs)
  },1000)
}

  return (
    <div>
        <Header active='logs'/>
        <LogsFilter 
        usersList={usersList}
        handleFiltered={handleFiltered} type={type} setType={setType}  activeIndex={activeIndex} />
          {logs!=[] &&
            logs.map((v,i)=>{
              var msg;

              if(v.logType=='delete-form'){
                msg= `${v.operationBy == "superadmin" ?  'superadmin' : v.user.username} deleted a form.`
              }else if(v.logType=='search-form'){
                msg= `${v.operationBy == "superadmin" ?  'superadmin' : v.user.username} search the form.`
              }else if(v.logType=='new-user'){
                msg= `${v.operationBy == "superadmin" ?  'superadmin' : v.user.username} created a new user.`
              }else if(v.logType=="print-barcode"){
                msg= `${v.operationBy == "superadmin" ?  'superadmin' : v.user.username} prints a barcode.`
              }else if(v.logType=="logout-user"){
                msg= `${v.operationBy == "superadmin" ?  'superadmin' : v.user.username} logged out.`
              }else if(v.logType=="edit-form"){
                msg= `${v.operationBy == "superadmin" ?  'superadmin' : v.user.username} edits a form.`
              }else if(v.logType=="delete-form"){
                msg= `${v.operationBy == "superadmin" ?  'superadmin' : v.user.username} deleted a form.`
              }else if(v.logType=="scan-barcode"){
                msg= `${v.operationBy == "superadmin" ?  'superadmin' : v.user.username} scans a barcode.`
              }else if(v.logType=="login-user"){
                msg= `${v.operationBy == "superadmin" ?  'superadmin' : v.user.username} is loged in.`
              }else if(v.logType=="submit-form"){
                msg= `${v.operationBy == "superadmin" ?  'A superadmin' : v.user.username} submits a form.`
              }
              

              var year = v.createdDate.split('-')[0]
              var month = v.createdDate.split('-')[1]
              var date = v.createdDate.split('-')[2].split('T')[0]
              var hours = v.createdDate.split('T')[1].split(':')[0]
              var time = 'AM'
              if(hours>12){
                time= 'PM'
                hours=hours-12
              }
              var minutes = v.createdDate.split('T')[1].split(':')[1]
              return(
                <div className='logsMain'>
            <div className='logsFirstSub'>
            <span>{date}/{month}/{year}</span>
            <span>{hours}:{minutes} {time}</span>
            </div>
            <div className='logsSecondSub'>
                {msg}
            </div>
        </div>              
            )
              }
            )
          }
{
  logs==[] && 
  <CircularProgress />
}
<div className='paginationDiv logPagination'>
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

    </div>
  )
}

export default LogsPage