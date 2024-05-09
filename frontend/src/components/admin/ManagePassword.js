import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { validateNpassword, validateRepassword } from "../../common/common";

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

    const npasswordError = validateNpassword(formValues.npassword);
    if (npasswordError) {
      setFormErrors({ npassword: npasswordError });
      return;
    }

    const repasswordError = validateRepassword(
      formValues.npassword,
      formValues.repassword
    );
    if (repasswordError) {
      setFormErrors({ repassword: repasswordError });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="password" name="npassword" className="w-full" label="New Password" error={!!formErrors.npassword} value={formValues.npassword} onChange={handleChange} />
      <div className="m-5 h-auto flex flex-col gap-5 items-center justify-start">
        <div>

        </div>
        <div>
          <Input type="password" name="repassword" label="Confirm Password" error={!!formErrors.repassword} value={formValues.repassword} onChange={handleChange} />
        </div>
        <div>
          <Button className="bg-rose-800" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ManagePassword;
