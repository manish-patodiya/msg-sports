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

const Signup = () => {
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
            <Input name="email" label="Email" size="lg" error={false} placeholder="firtsname.lastname@msg-global.com" />
          </div>
          <div className="flex flex-col">
            <Input name="password" label="Password" size="lg" />
          </div>
          <div className="flex flex-col">
            <Input name="password" label="Confirm Password" size="lg" />
          </div>
          <Button variant="" className="bg-rose-800 w-full">
            Sign Up
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default Signup
