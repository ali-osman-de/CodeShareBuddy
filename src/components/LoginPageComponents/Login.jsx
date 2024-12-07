import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(location.state?.isSignUp || false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);

  }



  return (
    <Container className="d-flex align-items-center justify-content-center vh-100" >
      <Card className="login-container" style={{
        maxWidth: '400px',
        width: '100%',
        borderRadius: '20px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        border: 'none'
      }}>
        <CardBody className="form-container" style={{ padding: '2rem' }}>
          <CardTitle tag="h2" className="text-center mb-4" style={{
            color: '#5a6b87',
            fontWeight: '600',
            fontSize: '1.8rem'
          }}>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
          <Form>
            {isSignUp && (
              <FormGroup floating>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                  type="text"
                  required
                  style={{ borderRadius: '12px', border: '1px solid #e0e6ed' }}
                />
                <Label for="fullName">Full Name</Label>
              </FormGroup>
            )}
            <FormGroup floating>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                required
                style={{ borderRadius: '12px', border: '1px solid #e0e6ed' }}
              />
              <Label for="email">Email</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                required
                style={{ borderRadius: '12px', border: '1px solid #e0e6ed' }}
              />
              <Label for="password">Password</Label>
            </FormGroup>
            {isSignUp && (
              <FormGroup floating>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  required
                  style={{ borderRadius: '12px', border: '1px solid #e0e6ed' }}
                />
                <Label for="confirmPassword">Confirm Password</Label>
              </FormGroup>
            )}
            <Button
              color="primary"
              block
              className="mt-4"
              onClick={() => { navigate('/profile') }}
              style={{
                borderRadius: '12px',
                padding: '0.8rem',
                fontSize: '1.1rem',
                fontWeight: '500',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <div className="text-center mt-4" style={{ color: '#5a6b87' }}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <span
                onClick={toggleForm}
                className="ms-2"
                style={{
                  cursor: 'pointer',
                  color: '#667eea',
                  fontWeight: '500',
                  textDecoration: 'underline'
                }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </span>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Login;
