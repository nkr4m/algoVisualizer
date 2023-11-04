"use client"
import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import NavbarV1 from './components/navbarV1'
import { useEffect } from 'react'




export const metadata = {
  title: 'Algorithm Visualizer',
  description: 'Program to visualize algorithms',
}

export default function RootLayout({ children }) {

  useEffect(() => {
    require('../../node_modules/bootstrap/dist/js/bootstrap.bundle')
  }, [])
  

  return (
    <html lang="en">

      <body>
        <NavbarV1></NavbarV1>
        <div>{children}</div>
        </body>
    </html>
  )
}
