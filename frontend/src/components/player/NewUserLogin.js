import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/constant.js";
import axios from "axios";
import {
  validateCPassword,
  validateEmail,
  validatePassword,
} from "../../common/common.js";

const NewUserLogin = () => {
  const initialValues = { email: "", password: "", cpassword: "" };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formSubmitting, setformSubmitting] = useState(false);
  const [succLogin, setSuccLogin] = useState(true);

  //   useEffect(() => {
  //     if (sessionStorage.getItem("auth")) {
  //       navigate("/admin/dashboard");
  //     }
  //   });

  const handleChange = (e) => {
    setFormErrors(initialValues);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = validateEmail(formValues.email);
    if (emailError) {
      setFormErrors({ email: emailError });
      return;
    }

    const passError = validatePassword(formValues.password);
    if (passError) {
      setFormErrors({ password: passError });
      return;
    }

    const cpassError = validateCPassword(
      formValues.password,
      formValues.cpassword
    );
    if (cpassError) {
      setFormErrors({ cpassword: cpassError });
      return;
    }

    // setformSubmitting(true);

    // axios({
    //   url: BASE_URL + "auth/new-login",
    //   method: "POST",
    //   data: formValues
    // }).then((res) => {
    //   setformSubmitting(false);
    //   const data = res.data;
    //   if (data.status == 1) {
    //     setSuccLogin(true);
    //   } else {
    //     setFormErrors(data.response.error);
    //   }
    // }).catch((err) => {
    //   setformSubmitting(false);
    //   console.log(err)
    // })
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
                error={!!formErrors.email}
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
                error={!!formErrors.password}
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
                error={!!formErrors.cpassword}
                size="lg"
                value={formValues.cpassword}
                onChange={handleChange}
              />
              <p className="text-sm ml-1 text-red-400">
                {formErrors.cpassword}
              </p>
            </div>
            <Button
              className="bg-rose-800 w-full"
              disabled={formSubmitting}
              onClick={handleSubmit}
            >
              {formSubmitting ? (
                <i className="fa-solid fa-spinner animate-spin"></i>
              ) : (
                `Sign In`
              )}
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
