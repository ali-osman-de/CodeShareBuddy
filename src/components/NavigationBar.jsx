import React from 'react'
import { Button, Navbar, NavbarBrand } from 'reactstrap'

function NavigationBar() {
  return (
    <Navbar
      className="border rounded-pill my-3"
      color="white"
      light
    >
      <NavbarBrand href="/" className='my-2 mx-3 fw-normal text-muted'>
        <img
          alt="logo"
          src="/vite.svg"
          style={{
            height: 30,
            width: 30
          }}
          className='mx-2'
        />
        CodeShareBuddy
      </NavbarBrand>
      <NavbarBrand href="/" className=' my-2'>
        <Button className='rounded-3 px-4 fw-bold' color='primary' style={{ opacity: "90%" }}>Sign In</Button>
        <Button className='rounded-3 mx-2 px-4 fw-bold' color='secondary' style={{ opacity: "50%" }}>Register</Button>
      </NavbarBrand>
      {/* <NavbarBrand href="/" className='my-2'>
        <Button className='rounded-4 px-4 fw-bold' color='secondary'>Sign In</Button>
      </NavbarBrand> */}
    </Navbar>
  )
}

export default NavigationBar