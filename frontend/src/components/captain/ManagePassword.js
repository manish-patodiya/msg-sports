import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { validatePassword, validateCPassword, getLoginInfo } from "../../common/common";
import { API_BASE_URL, BASE_URL } from "../../constants/constant";
import axios from "axios";
import { toast } from 'react-toastify'

const ManagePassword = () => {
  const initialValues = { opassword: "", npassword: "", cpassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormErrors(initialValues);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = (e) => {
    const opasswordError = validatePassword(formValues.opassword);
    if (opasswordError) {
      setFormErrors({ opassword: opasswordError });
      return;
    }

    const npasswordError = validatePassword(formValues.npassword);
    if (npasswordError) {
      setFormErrors({ npassword: npasswordError });
      return;
    }

    const cpasswordError = validateCPassword(formValues.npassword, formValues.cpassword);
    if (cpasswordError) {
      setFormErrors({ cpassword: cpasswordError });
      return;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    formValues.email = getLoginInfo("captain", "email");
    setIsSubmitting(true);
    axios.post(API_BASE_URL + "auth/updatePassword", formValues, {}).
      then((res) => {
        setIsSubmitting(false);
        if (res.data.status) {
          toast.success(res.data.message)
        } else {
          toast.error(res.data.message)
        }
      }).catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-5 flex flex-row">
        <div>
          <img src="https://www.msg-global.com/images/2023/08/11/hi_msg-global_about-us_800x800.webp" className="w-6/7" alt="" />
        </div>
        <div className="m-3 w-full flex flex-col gap-5 items-end justify-center ">
          <Input type="password" name="opassword" label="Old Password" error={!!formErrors.opassword} value={formValues.opassword} onChange={handleChange} autoComplete="new-password" />

          <Input type="password" name="npassword" label="New Password" error={!!formErrors.npassword} value={formValues.npassword} onChange={handleChange} autoComplete="new-password" />

          <Input type="password" name="cpassword" label="Confirm Password" error={!!formErrors.cpassword} value={formValues.cpassword} onChange={handleChange} autoComplete="new-password" />

          <div>
            <Button type='submit' className="bg-rose-800" disabled={isSubmitting}>{isSubmitting ? <i className='fas fa-spinner animate-spin'></i> : "Save"}</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ManagePassword;
