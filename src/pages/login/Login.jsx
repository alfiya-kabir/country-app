// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Login.css";
import { FaGoogle, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {login} from '../../features/auth/authSlice'
import loginImage from '../../assets/login-icon.jpeg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be 8+ chars, include 1 uppercase, 1 number, 1 symbol");
      return;
    }

    dispatch(login({ username }));
    navigate("/home");
  };
  return (
    <Container fluid className="login-container">
      <Row className="login-content">
        <Col md={6} className="form-side">
          <div className="form-wrapper">
            <h2 className="signin-heading">Sign In</h2>
            <p className="create-account">
              New user? <a href="#">Create an account</a>
            </p>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username or email"
                  className="custom-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="custom-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="checkbox-container">
                <Form.Check type="checkbox" id="remember" />
                <Form.Label htmlFor="remember" className="mb-0">
                  Keep me signed in
                </Form.Label>
              </Form.Group>

              <Button className="signin-btn w-100" type='submit'>Sign In</Button>
            </Form>

            <div className="divider">Or Sign In With</div>

            <div className="social-icons">
            <i class="bi bi-facebook"></i>
            <i class="bi bi-google"></i>
            <i class="bi bi-instagram"></i>
            <i class="bi bi-discord"></i>
            </div>
          </div>
        </Col>

        <Col
          md={6}
          className="image-side d-none d-md-flex align-items-center justify-content-center"
        >
          <img
            src={loginImage}
            alt="Login visual"
            className="login-image"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
