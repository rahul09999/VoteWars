import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

function HeroSection() {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div>
        <Image src="banner.svg" width={700} height={700} alt="banner_img" />
      </div>

      <div className="text-center mt-5">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          VoteWars
        </h1>
        <p className="mt-1 text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          Your Vote, Your Power, Your Game!!
        </p>
        <Link href={"/login"}>
          <Button className="mt-4">Click here to Login</Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
