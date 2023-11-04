import Link from 'next/link'
import React from 'react'


export default function navbarV1() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid justify-center">
      
        <Link href='/' className="navbar-brand"><img
          src="../favicon.ico"
          alt="Picture of the author"
        />Algorithm Vislualizer</Link>
      </div>
    </nav>
  )
}
