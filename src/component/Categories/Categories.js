import React from 'react'
import './Categories.css';
import {Grid} from '@mui/material'

const Categories = () => {

    return (
    <div>
        <Grid container>
            <Grid md={3} sm={3} xs={6}>
            <div className='CatSubDiv'>
                <span className='catSpan catTitle'>SILVER</span>
                <span className='catSpan catVal'>1234</span>
            </div>
            </Grid>
            <Grid md={3} sm={3} xs={6}>
            <div className='CatSubDiv'>
                <span className='catSpan catTitle'>GOLD</span>
                <span className='catSpan catVal'>1234</span>
            </div>

            </Grid>
            <Grid md={3} sm={3} xs={6}>
            <div className='CatSubDiv'>
                <span className='catSpan catTitle'>PLATINUM</span>
                <span className='catSpan catVal'>1234</span>
            </div>

            </Grid>
            <Grid md={3} sm={3} xs={6}>
            <div className='CatSubDiv'>
                <span className='catSpan catTitle custom'>CUSTOM</span>
                <span className='catSpan catVal'>1234</span>
            </div>
            </Grid>
            
        </Grid>
    </div>
  )

}

export default Categories