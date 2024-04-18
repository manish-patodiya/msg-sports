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

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center px-10 py-10">
      <Card className="w-96 h-96">
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
        </CardBody>
        <CardFooter className="pt-0 ">
          <Button variant="" className="bg-rose-800 w-full">
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
