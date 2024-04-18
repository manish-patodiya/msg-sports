import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const NewUserLogin = () => {
  const initialValues = { email: "", newPassword: "", confirmPassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formErrors));
  };

  const validate = (values) => {
    const errors = {};
    const emailregx = /[a-zA-Z]{4,}(@msg-global.com)$/g;
    const passregx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/g;
    if (!values.email) {
      errors.email = "Email required";
    } else if (!emailregx.test(values.email)) {
      errors.email = "Invalid email";
    }
    //New Password
    if (!values.newPassword) {
      errors.newPassword = "Password is required";
    } else if (!passregx.test(values.newPassword)) {
      errors.newPassword = "Password should have a minimum of 6 characters";
    }
    //Confirm Password
    if (!values.confirmPassword) {
      errors.confirmPassword = "Password is required";
    } else if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword = "Password not matching";
    }

    return errors;
  };

  return (
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
                label="New Password"
                error={formErrors.newPassword}
                size="lg"
                value={formValues.newPassword}
                onChange={handleChange}
              />
              <p className="text-sm ml-1 text-red-400">
                {formErrors.newPassword}
              </p>
            </div>
            <div className="flex flex-col">
              <Input
                type="password"
                name="confirm-password"
                label="Confirm Password"
                error={formErrors.confirmPassword}
                size="lg"
                value={formValues.confirmPassword}
                onChange={handleChange}
              />
              <p className="text-sm ml-1 text-red-400">
                {formErrors.confirmPassword}
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
                to="/admin"
                className="ml-1 mb-1 font-sans text-sm text-rose-800 underline"
              >
                Back to Login page
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </form>
  );
};

export default NewUserLogin;
