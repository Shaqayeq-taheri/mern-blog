import { Link } from "react-router-dom";
import { Label, TextInput,Button } from "flowbite-react";
import { useState } from "react";

function SignUp() {
  const [formData, setFormData]= useState({})
  const handleChange=(e)=> {
      /* [e.target.id]: e.target.value:
Adds a new key-value pair to the object. */
      setFormData({ ...formData, [e.target.id]: e.target.value });
      console.log(formData)
  }

  const handleSubmit= async (e)=>{
    e.preventDefault() /* the default behaviour of refreshing the page after submitting */

    try {
      const res = await fetch("/api/auth/signup",{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      });
      const data = await res.json()
    } catch (error) {
      
    }
  }
    return (
        <div className="min-h-screen ">
            <div className="flex gap-5 p-5 max-w-3xl mx-auto flex-col md:flex-row ">
                {/* the logo and the left side of the page */}
                <div className="flex-1 mt-5 md:mt-36">
                    <Link
                        to="/signup"
                        className=" text-nowrap text-4xl font-bold dark:text-white"
                    >
                        <span className=" px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 rounded-lg text-white">
                            Sign Up Now!
                        </span>
                    </Link>
                    <p className="mt-5 text-sm">
                        This is a demo project, you can make an account or
                        easily sign up using your google account.{" "}
                    </p>
                </div>
                {/*the right side: the form */}
                <div className="flex-1 mt-16">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <div>
                            <Label value="Enter your name:" />
                            <TextInput
                                type="text"
                                placeholder="Name"
                                id="userName"
                            onChange={handleChange}/>
                        </div>
                        <div>
                            <Label value="Enter your family name:" />
                            <TextInput
                                type="text"
                                placeholder="Family Name"
                                id="familyName"
                            onChange={handleChange}/>
                        </div>
                        <div>
                            <Label value="Enter your Email:" />
                            <TextInput
                                type="email"
                                placeholder="Email"
                                id="email"
                            onChange={handleChange}/>
                        </div>
                        <div>
                            <Label value="Choose a Password:" />
                            <TextInput
                                type="password"
                                placeholder="Password"
                                id="password"
                            onChange={handleChange}/>
                        </div>
                        <Button
                            gradientDuoTone="purpleToPink"
                            outline
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </form>
                    <div className="flex gap-2 mt-4 text-sm">
                        <span>Already have an account?</span>
                        <Link to="/signin" className="text-blue-500">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
