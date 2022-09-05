import React from 'react'
import Header from '../component/Header/Header'
import './logs.css';
const LogsPage = () => {
  return (
    <div>
        <Header active='logs'/>
        <div className='logsMain'>
            <div className='logsFirstSub'>
            <span>20/sep/2022</span>
            <span>10:00 PM</span>
            </div>
            <div className='logsSecondSub'>
                <span>There is an error here</span>
            </div>
        </div>
    </div>
  )
}

export default LogsPage