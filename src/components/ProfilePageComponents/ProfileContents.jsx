import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

const ProfileContents = () => {
    return (
        <div className='mt-5'>
            <ListGroup horizontal className='justify-content-center'>
                <ListGroupItem
                    action
                    href="#"
                    tag="a"
                    className='d-flex align-items-center justify-content-center fs-small fw-semibold border-0 text-center'
                >
                    <span>Shared Codes</span>
                </ListGroupItem>
                <ListGroupItem
                    action
                    href="#"
                    tag="a"
                    className='d-flex align-items-center justify-content-center fs-small fw-semibold border-0 text-center'
                >
                    <span>Received Comments</span>
                </ListGroupItem>
                <ListGroupItem
                    action
                    href="#"
                    tag="a"
                    className='d-flex align-items-center justify-content-center fs-small fw-semibold border-0 text-center'
                >
                    <span>Profile Information</span>
                </ListGroupItem>
            </ListGroup>
            <hr className="mt-0" />
        </div>
    )
}

export default ProfileContents