import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from "../components/LoginPageComponents/Login";
import SignUp from '../components/LoginPageComponents/SignUp';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, expirationTime } = useSelector((state) => state.auth); 

  const [isSignUp, setIsSignUp] = useState(location.state?.isSignUp || false);

  useEffect(() => {
    if (isAuthenticated && expirationTime) {
      const isTokenValid = new Date().getTime() < new Date(expirationTime).getTime();
      if (isTokenValid) {
        navigate('/profile'); 
      }
    }
  }, [isAuthenticated, expirationTime, navigate]);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const navigateToPage = (page) => {
    navigate(page);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100">
        <Col xs="8" className="mx-auto">
          {isSignUp ? <SignUp /> : <Login />}
        </Col>

        <Col xs="4" className="d-flex justify-content-center align-items-center">
          <div className="text-center">
            {isSignUp ? (
              <p>
                Already have an account?{' '}
                <Button
                  color="link"
                  onClick={() => {
                    toggleForm();
                    navigateToPage('/login');
                  }}
                >
                  Sign In
                </Button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <Button
                  color="link"
                  onClick={() => {
                    toggleForm();
                    navigateToPage('/signup');
                  }}
                >
                  Sign Up
                </Button>
              </p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
