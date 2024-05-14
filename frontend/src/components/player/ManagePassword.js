import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { validatePassword, validateCPassword } from "../../common/common";

const ManagePassword = () => {
  const initialValues = { npassword: "", repassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);

  const handleChange = (e) => {
    setFormErrors(initialValues);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const npasswordError = validatePassword(formValues.npassword);
    if (npasswordError) {
      setFormErrors({ npassword: npasswordError });
      return;
    }

    const repasswordError = validateCPassword(
      formValues.npassword,
      formValues.repassword
    );
    if (repasswordError) {
      setFormErrors({ repassword: repasswordError });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-5 h-auto flex flex-col gap-5">
        <div>
          <Input name="empname" label="Employee Name" size="lg" disabled />
        </div>
        <div>
          <Input name="email" label="Email" size="lg" disabled />
        </div>
        <div>
          <Input
            type="password"
            name="npassword"
            label="New Password"
            size="lg"
            error={!!formErrors.npassword}
            value={formValues.npassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            type="password"
            name="repassword"
            label="Confirm Password"
            size="lg"
            error={!!formErrors.repassword}
            value={formValues.repassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button className="bg-rose-800 " onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ManagePassword;
