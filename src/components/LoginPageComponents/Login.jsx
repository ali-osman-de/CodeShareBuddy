import React, { useState } from 'react';
import { auth } from '../../../firebase';
import { Container, Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle, Toast, ToastBody, ToastHeader, Spinner } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import LogInUser from '../../utils/LogInUser';
import { useDispatch } from 'react-redux';
import { login } from '../../features/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('success');
  const [loadingToastVisible, setLoadingToastVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadingToastVisible(true);

      const user = await LogInUser(auth, formData.email, formData.password);

      dispatch(login({
        uid: user.uid,
        email: user.email,
      }));

      setToastMessage('Login successful!');
      setToastColor('success');
      setTimeout(() => {
        setToastVisible(true);
        setLoadingToastVisible(false);
        setTimeout(() => {
          navigate('/profile');
        }, 5000);
      }, 1000);

    } catch (error) {
      console.error('Error:', error);
      setLoadingToastVisible(false);
      setToastMessage("Check your password or e-mail");
      setToastColor('danger');
      setToastVisible(true);
    }
  };

  const inputStyles = {
    borderRadius: '12px',
    border: '1px solid #e0e6ed',
  };

  const buttonStyles = {
    borderRadius: '12px',
    padding: '0.8rem',
    fontSize: '1.1rem',
    fontWeight: '500',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card style={{ maxWidth: '400px', width: '100%', borderRadius: '20px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', border: 'none' }}>
        <CardBody style={{ padding: '2rem' }}>
          <CardTitle tag="h2" className="text-center mb-4" style={{ color: '#5a6b87', fontWeight: '600', fontSize: '1.8rem' }}>
            Welcome Back
          </CardTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup floating>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyles}
                required
              />
              <Label for="email">Email</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                style={inputStyles}
                required
              />
              <Label for="password">Password</Label>
            </FormGroup>
            <Button type="submit" color="primary" block className="mt-4" style={buttonStyles}>
              Sign In
            </Button>
          </Form>

          {/* Loading Toast */}
          {loadingToastVisible && (
            <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
              <Toast>
                <ToastHeader icon={<Spinner size="sm">Loading...</Spinner>}>
                  Logging In...
                </ToastHeader>
                <ToastBody>
                  Please wait while we log you in.
                </ToastBody>
              </Toast>
            </div>
          )}

          {/* Success or Error Toast */}
          {toastVisible && (
            <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
              <Toast className={toastColor === 'success' ? 'bg-success' : 'bg-danger'}>
                <ToastHeader className='fs-5 fw-normal '>
                  {toastColor === 'success' ? 'Success' : 'Error'}
                </ToastHeader>
                <ToastBody className='fw-light text-center fs-6 text-light'>
                  {toastMessage}
                </ToastBody>
              </Toast>
            </div>
          )}
        </CardBody>
      </Card>
    </Container>
  );
};

export default Login;
