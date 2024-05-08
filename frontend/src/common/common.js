import { EMAIL_REGEX, NAME_REGEX, PASS_REGEX, PHONE_REGEX } from "../constants/constant";

export const validateName = (name) => {
  if (!name) {
    return "Full name is required";
  } else if (name.length < 4) {
    return "Full name should be of atleast 4 characters";
  } else if (!name.match(NAME_REGEX)) {
    return "Invalid name";
  }
};

export const validateContact = (contact) => {
  if (!contact) {
    return "Contact no. is required";
  } else if (!contact.match(PHONE_REGEX)) {
    return "Phone No is not Valid";
  }
};

export const validateEmail = (email) => {
  if (!email) {
    return "Email is required";
  } else if (!email.match(EMAIL_REGEX)) {
    return "Invalid email";
  }
};

export const validatePassword = (pass) => {
  if (!pass) {
    return "Password is required";
  } else if (!pass.match(PASS_REGEX)) {
    return "Password should have one uppercase, one lowercase, one Special character and one Number";
  }
};

export const validateCPassword = (pass, cpass) => {
  if (!cpass) {
    return "Password is required";
  } else if (pass !== cpass) {
    return "Password not matching";
  }
};

export const validateEmpName = (empName) => {
  if (!empName) {
    return "Employee's Name must consist 6 minimum characters";
  }
};

export const validateDOB = (dateOfBirth) => {
  if (!dateOfBirth) {
    return "Date of Birth required";
  }
};

export const validateAddress = (address) => {
  if (!address) {
    return "Address required";
  }
};

export const validateNpassword = (npassword) => {
  if (!npassword) {
    return "Password required";
  } else if (!npassword.match(PASS_REGEX)) {
    return "Password should have one uppercase, one lowercase, one Special character and one Number";
  }
};

export const validateRepassword = (npassword, repassword) => {
  if (!repassword) {
    return "Re-Enter Password";
  } else if (repassword !== npassword) {
    return "Password not matching";
  }
};

export const checkAdminAuth = () => {
  return !!sessionStorage.getItem("admin_auth");
}

export const checkCaptainAuth = () => {
  return !!sessionStorage.getItem("captain_auth");
}

export const checkPlayerAuth = () => {
  return !!sessionStorage.getItem("player_auth");
}

export const formatDateTime = (date_time) => {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(date_time))
}

