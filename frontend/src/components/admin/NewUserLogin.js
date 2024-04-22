import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
// import { validateNewUserLogin } from "../../common/common.js";

const NewUserLogin = () => {
  const initialValues = { email: "", password: "", cpassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setFormErrors(validateNewUserLogin(formValues));
  };

  return (
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                error={formErrors.password}
                size="lg"
                value={formValues.password}
                onChange={handleChange}
              />
              <p className="text-sm ml-1 text-red-400">{formErrors.password}</p>
            </div>
            <div className="flex flex-col">
              <Input
                type="password"
                name="cpassword"
                label="Confirm Password"
                error={formErrors.cpassword}
                size="lg"
                value={formValues.cpassword}
                onChange={handleChange}
              />
              <p className="text-sm ml-1 text-red-400">
                {formErrors.cpassword}
              </p>
            </div>
            <Button className="bg-rose-800 w-full" onClick={handleSubmit}>
              Sign In
            </Button>
          </form>
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
  );
};

export default NewUserLogin;
