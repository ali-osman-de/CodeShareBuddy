import React from 'react'
import { Button, Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap'
import { useSelector } from 'react-redux'

const ProfileHeader = () => {
  const { displayName } = useSelector((state) => state.auth);

  return (
    <div className='d-flex justify-content-center'>

      <div className='d-flex flex-column align-items-center'>
        <img
          className="bd-placeholder-img rounded-circle" width="140" height="140"
          alt="ProfilePicture"
          src="https://picsum.photos/300/200"
        />
        <Card
          style={{
            border: 'none',

          }}
        >
          <CardBody className='text-center'>
            <CardTitle className='fs-3 fw-semibold'>
              {displayName}
            </CardTitle>
            <CardSubtitle
              className="mb-2 fs-6 fw-light text-muted"

            >
              Female, Age 30
            </CardSubtitle>
            <div className='mx-auto gap-3 mt-3'>
              <Button className='bg-light text-dark border-0 fs-6 fw-light'>Edit Profile</Button>
              <Button className='bg-dark text-white border-0 fs-6 fw-light'>Save</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>



  )
}

export default ProfileHeader