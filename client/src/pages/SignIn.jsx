import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    sinInStart,
    signInSuccess,
    signInFailur,
    clearMessage
} from "../../redux/user/userSlice";
import OAuth from "../components/OAuth";

function SignIn() {
    const [formData, setFormData] = useState({});
    const {
        loading,
        error: errorMessage,
        success: successMessage,
    } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch(); // for dispatching the logics signinstart, ...
    const handleChange = (e) => {
        /* [e.target.id]: e.target.value:
Adds a new key-value pair to the object. */
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); /* the default behaviour of refreshing the page after submitting */
        if (!formData.email || !formData.password) {
            /*           return setErrorMessage("Please fill out all the fields!"); */
          return dispatch(signInFailur("Please fill out all the fields!"));
        }
        try {
            /*  setLoading(true);
            setErrorMessage(null) */ //better to clean it before sending req, maybe we had an error from previous attempt
            dispatch(sinInStart());
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.status === 200) {
                /* setSuccessMessage("You are successfully signed in!");
                setLoading(false); */
                dispatch(signInSuccess(data));
                setTimeout(() => {
                 dispatch(clearMessage())
                    navigate("/");
                }, 1000);

                // Optionally redirect or reset the form
            } else if (res.status === 409) {
                // Duplicate email error
                /*    setErrorMessage(data.message); */
                dispatch(signInFailur(data.message));

            } else {
                // Other errors
                dispatch(signInFailur(data.message || "An unexpected error occurred"));
            }
        } catch (error) {
            /* setErrorMessage(
                error.message
            ); // error of the client side, for example the client has internet issue 
            setSuccessMessage(null);
            setLoading(false); */
            dispatch(signInFailur());
        }
    };
    return (
        <div className="min-h-screen ">
            <div className="flex p-5 gap-10 max-w-3xl mx-auto flex-col md:flex-row ">
                {/* the logo and the left side of the page */}
                <div className="flex-1 mt-5 md:mt-20">
                    <Link
                        to="/signin"
                        className=" text-nowrap text-4xl font-bold dark:text-white"
                    >
                        <span className=" px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 rounded-lg text-white">
                            Sign In Now!
                        </span>
                    </Link>
                    <p className="mt-5 text-sm">
                        This is a demo project, you can easily sign in using
                        your email and password or your google account.{" "}
                    </p>
                </div>
                {/*the right side: the form */}
                <div className="flex-1 mt-8 md:mt-16">
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <Label value="Enter your Email:" />
                            <TextInput
                                type="email"
                                placeholder="Email"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value="Enter your Password:" />
                            <TextInput
                                type="password"
                                placeholder="Password"
                                id="password"
                                onChange={handleChange}
                            />
                        </div>
                        <Button
                            gradientDuoTone="purpleToPink"
                            outline
                            type="submit"
                        >
                            {loading ? (
                                <>
                                    <Spinner size="sm" />
                                    <span> Loading ...</span>{" "}
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                        <OAuth/>
                    </form>
                    <div className="flex gap-2 mt-4 text-sm">
                        <span>Don"t have an account?</span>
                        <Link to="/signup" className="text-blue-500">
                            Sign Up
                        </Link>
                    </div>
                    {/* success Alert */}
                    {successMessage && (
                        <Alert className="mt-3" color="success">
                            {successMessage}
                        </Alert>
                    )}
                    {/* error alert */}
                    {errorMessage && (
                        <Alert className="mt-3" color="failure">
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SignIn;
