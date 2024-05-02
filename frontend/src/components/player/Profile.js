import { Input, Button } from "@material-tailwind/react";
import React, { useState } from "react";

import {
  validateContact,
  validateDOB,
  validateEmpName,
  validateAddress,
} from "../../common/common.js";

const Profile = () => {
  const [img, setImg] = useState();

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  const initialValues = {
    empname: "",
    contact: "",
    dob: "",
    address: "",
    designation: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);

  const handleChange = (e) => {
    setFormErrors(initialValues);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const empnameError = validateEmpName(formValues.empname);
    if (empnameError) {
      setFormErrors({ empname: empnameError });
      return;
    }

    const dobError = validateDOB(formValues.dob);
    if (dobError) {
      setFormErrors({ dob: dobError });
      return;
    }

    const contactError = validateContact(formValues.contact);
    if (contactError) {
      setFormErrors({ contact: contactError });
      return;
    }

    const addressError = validateAddress(formValues.address);
    if (addressError) {
      setFormErrors({ address: addressError });
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row h-full">
      <div className="m-5 w-2/5 flex flex-col justify-top">
        <div className="h-64 w-64">
          <img
            src={img}
            alt=""
            className="rounded-full object-cover h-full w-full shadow-md"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium" for="file_input">
            Upload Picture
          </label>
          <input
            className="block w-full text-sm"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            onChange={onImageChange}
          ></input>
        </div>
      </div>
      <div className="m-5 h-auto flex flex-col gap-5 items-center justify-start">
        <div className="w-96">
          <Input
            name="empname"
            label="Employee Name"
            size="lg"
            error={!!formErrors.empname}
            value={formValues.empname}
            onChange={handleChange}
            className=""
            required
          />
        </div>
        <div className="w-96">
          <Input
            type="date"
            name="dob"
            label="Date Of Birth"
            size="lg"
            error={!!formErrors.dob}
            value={formValues.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-96">
          <Input
            name="contact"
            label="Contact"
            size="lg"
            error={!!formErrors.contact}
            value={formValues.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-96">
          <Input
            name="address"
            label="Address"
            size="lg"
            error={!!formErrors.address}
            value={formValues.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Button
            className="bg-rose-800 w-40"
            // disabled={formSubmitting}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Profile;
