import React,{useState} from 'react'
import './ScanCode.css';
import Header from './../component/Header/Header.js';
import ScanComp from './../component/ScanComp/ScanComp.js';
import ScannedDetails from './../component/ScannedDetails/ScannedDetails.js';


const ScanCode = () => {

  var [show,setShow] = useState(false)
  var [fetchedData,setFetchedData] = useState({});

    return (
    <div>
        <Header active='scan' />
        <ScanComp setShow={setShow} setFetchedData={setFetchedData} />
        {show &&
        <ScannedDetails fetchedData={fetchedData} />
        }
    </div>
  )
}

export default ScanCode