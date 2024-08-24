import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[500px] bg-white shadow-xl rounded-xl px-10 py-5">
        <h1 className="text-center text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          VoteWars
        </h1>
        <h1 className="font-extrabold text-3xl">Login</h1>
        <p>Welcome</p>
        <form action="">
            <div className="mt-5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" placeholder="Enter your email.."></Input>
            </div>
            <div className="mt-5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" placeholder="Enter your password.."></Input>
            </div>
            <div className="font-bold text-right mt-2">
                <Link href={"forgot_password"}>
                    Forgot Password ?
                </Link>
            </div>
            <div className="mt-5">
                <Button className="w-full">
                    Submit
                </Button>
            </div>
        </form>
        <p className="text-center mt-5">
            Don't have an account? <strong>
                <Link href={"register"}>
                Register
                </Link></strong> 
        </p>
      </div>
    </div>
  );
}

export default page;
