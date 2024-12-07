import React from 'react'
import { Button, Navbar, NavbarBrand } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

function NavigationBar() {
  const navigate = useNavigate()

  return (
    <Navbar
      className="border rounded-pill my-3 shadow-sm"
      color="white"
      light
    >
      <NavbarBrand
        role="button"
        onClick={() => navigate('/')}
        className='my-2 mx-3 fw-normal text-muted'
      >
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
      <NavbarBrand className='my-2'>
        <Button
          onClick={() => navigate('/sign-in')}
          className='rounded-3 px-4 fw-bold'
          color='primary'
          style={{ opacity: "90%" }}
        >
          Sign In
        </Button>
        <Button
          className='rounded-3 mx-2 px-4 fw-bold'
          color='secondary'
          style={{ opacity: "50%" }}
          onClick={() => navigate('/sign-in', { state: { isSignUp: true } })}
        >
          Register
        </Button>
      </NavbarBrand>
    </Navbar>
  )
}

export default NavigationBar