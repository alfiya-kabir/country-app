import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Login.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";
import loginImage from "../../assets/login-icon.jpeg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be 8+ chars, include 1 uppercase, 1 number, 1 symbol";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    dispatch(login({ username }));
    navigate("/home");
  };
  return (
    <Container fluid className="login-container">
      <Row className="login-content">
        <Col md={7} className="form-side">
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
                {errors.username && (
                  <div className="error-message">{errors.username}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="custom-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </Form.Group>

              <Form.Group className="checkbox-container">
                <Form.Check type="checkbox" id="remember" />
                <Form.Label htmlFor="remember" className="mb-0">
                  Keep me signed in
                </Form.Label>
              </Form.Group>

              <Button className="signin-btn w-100" type="submit">
                Sign In
              </Button>
            </Form>

            <div className="divider">Or Sign In With</div>

            <div className="social-icons">
              <button className="social-btn">
                <i className="bi bi-facebook"></i>
              </button>
              <button className="social-btn">
                <i className="bi bi-google"></i>
              </button>
              <button className="social-btn">
                <i className="bi bi-instagram"></i>
              </button>
              <button className="social-btn">
                <i className="bi bi-discord"></i>
              </button>
            </div>
          </div>
        </Col>

        <Col
          md={5}
          className="image-side d-none d-md-flex align-items-center justify-content-center"
        >
          <img src={loginImage} alt="Login visual" className="login-image" />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
