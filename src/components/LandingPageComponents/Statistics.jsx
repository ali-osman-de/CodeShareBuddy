import React from 'react'
import { Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap'
import { FaDev } from "react-icons/fa";
import { FaPeopleRoof } from "react-icons/fa6";
import { PiNotificationLight } from "react-icons/pi";
import { GoCommentDiscussion } from "react-icons/go";



const Statistics = () => {
    return (
        <div className='mx-5 my-5'>
            <h1 className='fw-bold fs-4'>Statistics</h1>
            <div className='d-flex justify-content-between'>
                {/* <Card
                    className='my-4'
                    style={{
                        width: '18rem'
                    }}
                >

                    <CardBody>
                        <MdOutlineCastForEducation size={30} />
                        <CardTitle tag="h5" className='fw-bold my-2'>
                            Card title
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted fw-light"
                            tag="h6"
                        >
                            Lorem ipsum dolor sit amet.
                        </CardSubtitle>
                    </CardBody>
                </Card> */}
                <Card
                    className='my-4'
                    style={{
                        width: '18rem'
                    }}
                >

                    <CardBody>
                        <FaDev size={30} />
                        <CardTitle tag="h5" className='fw-bold my-2'>
                            30
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted fw-normal"
                            tag="h6"
                        >
                            Projects
                        </CardSubtitle>
                    </CardBody>
                </Card>
                <Card
                    className='my-4'
                    style={{
                        width: '18rem'
                    }}
                >

                    <CardBody>
                        <FaPeopleRoof size={30} />
                        <CardTitle tag="h5" className='fw-bold my-2'>
                            10
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted fw-normal"
                            tag="h6"
                        >
                            Collaborators
                        </CardSubtitle>
                    </CardBody>
                </Card>
                <Card
                    className='my-4'
                    style={{
                        width: '18rem'
                    }}
                >

                    <CardBody>
                        <PiNotificationLight size={30} />
                        <CardTitle tag="h5" className='fw-bold my-2'>
                            100
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted fw-normal"
                            tag="h6"
                        >
                            Notifications
                        </CardSubtitle>
                    </CardBody>
                </Card>
                <Card
                    className='my-4'
                    style={{
                        width: '18rem'
                    }}
                >

                    <CardBody>
                        <GoCommentDiscussion size={30} />
                        <CardTitle tag="h5" className='fw-bold my-2'>
                            40
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted fw-normal"
                            tag="h6"
                        >
                            Discussions
                        </CardSubtitle>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Statistics