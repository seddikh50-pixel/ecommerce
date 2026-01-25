import Image from 'next/image'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui/button'
import { Spinner } from "@/components/ui/spinner"


interface infos {
  handleGoogleSignIn: () => void,
  spinner: boolean

}

const SignUp = ({ handleGoogleSignIn, spinner }: infos) => {
  return (
    <div>
      <div className="w-screen   flex justify-center items-center ">
        <div className="w-120 rounded-2xl border overflow-hidden flex flex-col  pb-7   ">
          <div className="bg-gray-900  flex gap-4 justify-center items-center flex-col p-4">
            <div className="flex justify-center items-center">
              <h1 className="text-store font-bold text-2xl">SED-SHOP</h1>
              <Image src={"/storelogo.png"} width={30} height={20} alt="/" />
            </div>
            <div className="flex justify-center items-center space-y-2 flex-col">
              <h1 className="text-white text-3xl font-bold ">Welcome Back</h1>
              <h1 className="text-white ">Sign in to access your account</h1>
            </div>
          </div>
          <div className="flex justify-center items-center mt-8">
            <div className="border w-[90%] shadow-2xl rounded-t-xl space-y-5 px-6  py-10">
              {/* register div */}
              <div className="flex justify-evenly items-center gap-2 ">
                <button className="flex flex-1 justify-center items-center gap-2 border rounded-md py-1 px-5 hoverEffect hover:bg-gray-100">
                  <FaGithub size={20} />
                  <h1>Github</h1>
                </button>

                <button onClick={handleGoogleSignIn} className="flex flex-1 justify-center items-center gap-2 border rounded-md py-1 px-5 hoverEffect hover:bg-gray-100">
                  {spinner ? <Spinner className="text-blue-600" /> :  <FcGoogle size={20} /> }
                 
                  <h1>Google</h1>
                  

                </button>
              </div>
              {/* lines div */}
              <div className="flex justify-center items-center gap-3">
                <div className="flex-1 h-[1px] bg-gray-300"></div>
                <div>or</div>
                <div className="flex-1 h-[1px] bg-gray-300"></div>
              </div>

              {/* input field */}
              <div className=" flex  flex-col gap-1  w-full">
                <p className="text-start">Email Adress</p>
                <input className="border rounded-sm px-2 py-[5px] w-4/5 text-md" placeholder="Enter you email address" type="text" />
              </div>
              {/* button */}
              <Button className="bg-gray-900 text-white w-full py-1 rounded-sm text-sm">Continue</Button>

              <div className=" h-20 flex justify-center items-center gap-2">
                <p className="text-sm">Don’t have an account?</p>
                <button className="text-sm">Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SignUp
