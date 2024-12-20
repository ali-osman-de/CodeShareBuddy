import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { IoHomeOutline, IoSearch, IoAdd, IoNotifications, IoPerson, IoExit } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

const SideMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout());

    navigate("/");
  }

  return (
    <ListGroup className='mt-3'>
      <ListGroupItem
        action
        onClick={() => navigate('/home')}
        tag="a"
        className='d-flex align-items-center fs-6 fw-normal rounded-3 border-0'
      >
        <IoHomeOutline size={18} /> <span className='ms-2'>Home</span>
      </ListGroupItem>
      <ListGroupItem
        action
        onClick={() => navigate('/explore')}
        tag="a"
        className='d-flex align-items-center fs-6 fw-normal rounded-3 border-0'
      >
        <IoSearch size={18} /> <span className='ms-2'>Explore</span>
      </ListGroupItem>
      <ListGroupItem
        action
        onClick={() => navigate('/create-new-content')}
        tag="a"
        className='d-flex align-items-center fs-6 fw-normal rounded-3 border-0'
      >
        <IoAdd size={18} /> <span className='ms-2'>Create</span>
      </ListGroupItem>
      <ListGroupItem
        action
        onClick={() => navigate('/notifications')}
        tag="a"
        className='d-flex align-items-center fs-6 fw-normal rounded-3 border-0'
      >
        <IoNotifications size={18} /> <span className='ms-2'>Notifications</span>
      </ListGroupItem>
      <ListGroupItem
        action
        onClick={() => navigate('/profile')}
        tag="a"
        className='d-flex align-items-center fs-6 fw-normal rounded-3 border-0'
      >
        <IoPerson size={18} /> <span className='ms-2'>Profile</span>
      </ListGroupItem>
      <ListGroupItem
        action
        onClick={logOut}
        tag="a"
        className='d-flex align-items-center fs-6 fw-normal rounded-3 border-0'
      >
        <IoExit size={18} /> <span className='ms-2'>Log out</span>
      </ListGroupItem>
    </ListGroup>
  )
}

export default SideMenu