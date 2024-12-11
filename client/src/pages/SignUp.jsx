import { Link } from "react-router-dom";
import { Label, TextInput,Button } from "flowbite-react";

function SignUp() {
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
                    <form className="flex flex-col gap-3">
                        <div>
                            <Label value="Enter your name:" />
                            <TextInput
                                type="text"
                                placeholder="Name"
                                id="userName"
                            />
                        </div>
                        <div>
                            <Label value="Enter your family name:" />
                            <TextInput
                                type="text"
                                placeholder="Family Name"
                                id="familyName"
                            />
                        </div>
                        <div>
                            <Label value="Enter your Email:" />
                            <TextInput
                                type="text"
                                placeholder="Email"
                                id="email"
                            />
                        </div>
                        <div>
                            <Label value="Choose a Password:" />
                            <TextInput
                                type="password"
                                placeholder="Password"
                                id="password"
                            />
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
