import React, { useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import SharedCodes from './SharedCodes'
import ReceivedComments from './ReceivedComments'
import ProfileInformation from './ProfileInformation'

const ProfileContents = () => {
    const [activeTab, setActiveTab] = useState('shared')

    const renderContent = () => {
        switch (activeTab) {
            case 'shared':
                return <SharedCodes />
            case 'comments':
                return <ReceivedComments />
            case 'profile':
                return <ProfileInformation />
            default:
                return <SharedCodes />
        }
    }

    return (
        <div className='mt-5'>
            <ListGroup horizontal className='justify-content-center'>
                <ListGroupItem
                    action
                    onClick={() => setActiveTab('shared')}
                    active={activeTab === 'shared'}
                    tag="a"
                    className={`d-flex align-items-center justify-content-center fs-small fw-semibold border-0 text-center ${activeTab === 'shared' ? 'bg-secondary' : ''}`}
                >
                    <span>Shared Codes</span>
                </ListGroupItem>
                <ListGroupItem
                    action
                    onClick={() => setActiveTab('comments')}
                    active={activeTab === 'comments'}
                    tag="a"
                    className={`d-flex align-items-center justify-content-center fs-small fw-semibold border-0 text-center ${activeTab === 'comments' ? 'bg-secondary' : ''}`}
                >
                    <span>Received Comments</span>
                </ListGroupItem>
                <ListGroupItem
                    action
                    onClick={() => setActiveTab('profile')}
                    active={activeTab === 'profile'}
                    tag="a"
                    className={`d-flex align-items-center justify-content-center fs-small fw-semibold border-0 text-center ${activeTab === 'profile' ? 'bg-secondary' : ''}`}
                >
                    <span>Profile Information</span>
                </ListGroupItem>
            </ListGroup>
            <hr className="mt-0" />
            {renderContent()}
        </div>
    )
}

export default ProfileContents