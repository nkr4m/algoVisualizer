import React from 'react'
import '../components/bar.css'


export default function Bar({color, height}) {
  return (
    <>
    <div className='vl shadow-sm mb-5 rounded' style={{backgroundColor: color, height: height}}>
      {height}
      
      </div>
      </>
  )
}
