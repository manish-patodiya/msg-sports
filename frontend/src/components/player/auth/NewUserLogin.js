import React, { useEffect, useState } from 'react'
import SignUp from './SignUp'
import SuccessfulRegistration from './SuccessfulRegistration'
import { checkAuth } from '../../../common/common';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../constants/constant';
import { Typography } from '@material-tailwind/react';

const NewUserLogin = () => {
  const [succLogin, setSuccLogin] = useState(false);
  const [contactInfo, setContactInfo] = useState({ contact: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (checkAuth("player")) {
      navigate("/player/dashboard");
    }
    axios.get(API_BASE_URL + "site_settings").then(res => {
      if (res.data.status) {
        setContactInfo({ contact: res.data.response.contact, email: res.data.response.email });
      }
    }).catch(err => {
      console.log(err)
    })
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center px-10 py-10">
      {succLogin ? <SuccessfulRegistration /> : <SignUp setSuccLogin={setSuccLogin} />}
      {
        contactInfo.contact || contactInfo.email ?
          <div className="p-2 fixed right-10 bottom-10 text-gray-500" >
            <Typography variant="small">
              {contactInfo.contact ? "Contact: " + contactInfo.contact : ""}
            </Typography>
            <Typography variant="small">
              {contactInfo.email ? "Email: " + contactInfo.email : ""}
            </Typography>
          </div>
          : ""
      }
    </div>
  )
}

export default NewUserLogin