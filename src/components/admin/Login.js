import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formErrors);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const emailregx = /[a-zA-Z]{4,}(@msg-global.com)$/g;
    const passregx = "";
    if (!values.email) {
      errors.email = "Email required";
    } else if (!emailregx.test(values.email)) {
      errors.email = "Invalid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password should have a minimum of 6 characters";
    }
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="h-screen flex items-center justify-center px-10 py-10">
          <Card className="w-96">
            <CardBody className="flex flex-col gap-6">
              <div className="flex justify-center mb-5">
                <Typography variant="h3" className="flex text-gray-600">
                  <span className="font-serif text-rose-900 font-bold">.</span>
                  msg-
                  <span className="text-rose-900"> Sports</span>
                </Typography>
              </div>
              <div>
                <Input
                  name="email"
                  label="Email"
                  size="lg"
                  error={formErrors.email}
                  value={formValues.email}
                  onChange={handleChange}
                />
                <p className="text-sm ml-1 text-red-400">{formErrors.email}</p>
              </div>
              <div className="flex flex-col">
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  error={formErrors.password}
                  size="lg"
                  value={formValues.password}
                  onChange={handleChange}
                />
                <p className="text-sm ml-1 text-red-400">
                  {formErrors.password}
                </p>
              </div>
              <Button className="bg-rose-800 w-full" onClick={handleSubmit}>
                Sign In
              </Button>
              <div
                variant="small"
                className="mt-3 flex flex-col items-end justify-center"
              >
                <Link
                  to="/forgot-password"
                  className="ml-1 mb-1 font-sans text-sm text-rose-800 underline"
                >
                  Forgot Password?
                </Link>
                <Link
                  to="new-login"
                  className="ml-1 mb-1 font-sans text-sm text-rose-800 underline"
                >
                  New user?
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default Login;
