import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center px-10 py-10 bg-red-50">
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
            <Input name="email" label="Email" size="lg" error={false} />
          </div>
          <div className="flex flex-col">
            <Input name="password" label="Password" size="lg" />
          </div>
          <Button variant="" className="bg-rose-800 w-full">
            Sign In
          </Button>

          <div
            variant="small"
            className="mt-3 flex flex-col items-end justify-center"
          >
            <Link to='/forgot-password'
              className="ml-1 mb-1 font-sans text-sm text-rose-800 underline"
            >
              Forgot Password?
            </Link>
            <Link
              to="new-login"
              className="ml-1 mb-1 font-sans text-sm text-rose-800 underline"
            >
              New user?
            </Link>
          </div>
        </CardBody>
      </Card>
    </div >
  );
};

export default Login;
