import React, { useState } from "react";
import { Card, CardBody, Typography, Input, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../constants/constant.js";
import axios from "axios";
import { validateCPassword, validateContact, validateEmail, validateName, validatePassword } from "../../../common/common.js";

const NewUserLogin = ({ setSuccLogin }) => {
    const initialValues = { name: "", contact: "", email: "", password: "", cpassword: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialValues);
    const [formSubmitting, setformSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormErrors(initialValues);
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const nameError = validateName(formValues.name);
        if (nameError) {
            setFormErrors({ name: nameError });
            return;
        }

        const contactError = validateContact(formValues.contact);
        if (contactError) {
            setFormErrors({ contact: contactError });
            return;
        }

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

        setformSubmitting(true);
        axios({
            url: API_BASE_URL + "auth/new-login",
            method: "POST",
            data: formValues
        }).then((res) => {
            setformSubmitting(false);
            const data = res.data;
            if (data.status) {
                setSuccLogin(true);
            } else {
                setFormErrors(data.response.error);
            }
        }).catch((err) => {
            setformSubmitting(false);
            console.log(err)
        })
    };

    return (
        <Card className="w-96">
            <CardBody className="flex flex-col gap-4">
                <div className="flex justify-center mb-5">
                    <Typography variant="h3" className="flex text-gray-600">
                        <span className="font-serif text-rose-900 font-bold">.</span>
                        msg-<span className="text-rose-900"> Sports</span>
                    </Typography>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <Input
                            name="name"
                            label="Full Name"
                            size="lg"
                            error={!!formErrors.name}
                            value={formValues.name}
                            onChange={handleChange}
                        />
                        <p className="text-sm ml-1 text-red-400">{formErrors.name}</p>
                    </div>
                    <div >
                        <div className="flex">
                            <Button
                                ripple={false}
                                variant="text"
                                color="blue-gray"
                                className={`flex items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 px-4`}
                            >+91</Button>
                            <input
                                type="number"
                                name="contact"
                                className={`w-full text-blue-gray-700 font-sans font-normal border  text-sm px-3 py-3 rounded-md rounded-l-none ${formErrors.contact ? "border-red-500 outline-red-500" : "border-blue-gray-200 "}`}

                                placeholder="Contact no."
                                value={formValues.contact}
                                onChange={handleChange}
                            />
                        </div>
                        <p className="text-sm ml-1 text-red-400">{formErrors.contact}</p>
                    </div>
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
                            autoComplete="new-password webauthn"
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
                    <Button className="bg-rose-800 w-full" disabled={formSubmitting} onClick={handleSubmit}>
                        {formSubmitting ? <i className="fa-solid fa-spinner animate-spin"></i> : `Sign In`}
                    </Button>
                </form>
                <div className="mt-3 flex flex-col items-end justify-center">
                    <Link to="/player" className="ml-1 mb-1 font-sans text-sm text-rose-800 underline">
                        Back to Login page
                    </Link>
                </div>
            </CardBody>
        </Card>
    );
};

export default NewUserLogin;
