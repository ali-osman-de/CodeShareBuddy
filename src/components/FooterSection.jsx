import React from 'react'

const FooterSection = () => {
    return (
        <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted fw-light">Home</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted fw-light">Features</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted fw-light">Pricing</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted fw-light">FAQs</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted fw-light">About</a></li>
            </ul>
            <p className="text-center text-muted fw-semibold">© 2024 CodeShareBuddy, Inc</p>
        </footer>
    )
}

export default FooterSection