import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth"
import {app} from "../firebase.js"
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

function OAuth() {

    const auth= getAuth(app)
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const handleGoogleClick = async()=>{

        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt:'select_account'})
        try {
            const resultsFromGoogle = await signInWithPopup(auth,provider)
            //console.log(resultsFromGoogle) send the info of the user which logged in using his/her google account to backend and save it
            const res = await fetch('/api/auth/google', {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({ 
                    //the info that from frontend is sent to backend
                    name:resultsFromGoogle.user.displayName,
                    email:resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL
                }),
            })
            const data = res.json()
            if(res.status===200){
          dispatch(signInSuccess(data));
          navigate('/')
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Button type="button" gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className="mr-1" size={"20px"} />
            Continue with Google
        </Button>
    );
}

export default OAuth;
