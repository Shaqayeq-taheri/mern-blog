import { TextInput, Button, Alert } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
    getDownloadURL,
    getStorage,
    uploadBytesResumable,
    ref,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
    const [image, setImage] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] =
        useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef();
    console.log(imageFileUploadProgress, imageFileUploadError);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (image) {
            uploadImage();
        }
    }, [image]);
    const uploadImage = async () => {
        setImageFileUploadError(null) // if there is an error from  before
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image); // upload the image that is saved in image state
        //to get the info of the image file like bites, error...
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // snapshot is piece of info that you get while uploading byte by byte
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // how many percentage is uploaded
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError(
                    "could not upload the image(file must be less that 2MB)"
                );
                setImageFileUploadProgress(null)
                setImage(null)
                setImageFileUrl(null)

            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                });
            }
        );
    };
    return (
        <div className="max-w-md w-full mt-5 mb-20  p-5 overflow-y-auto">
            <h1 className="text-center mb-5 font-bold text-2xl">Profile</h1>
            <form className="flex flex-col gap-3">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={filePickerRef}
                    hidden
                />{" "}
                {/* save the image in a state */}
                <div
                    className="relative w-24 h-24 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
                    onClick={() => filePickerRef.current.click()}
                >
                    {imageFileUploadProgress && (
                        <CircularProgressbar
                            value={imageFileUploadProgress || 0}
                            text={`${imageFileUploadProgress}%`}
                            strokeWidth={5}
                            styles={{root:{
                                width:'100%',
                                height:'100%',
                                position:'absolute',
                                top:0,
                                left:0
                            },
                        path:{
                            stroke: `rgba(62,152,199,${imageFileUploadProgress/100})` //opacity changes based on the uploading percentage
                        }}}
                        />
                    )}
                    <img
                        src={imageFileUrl || currentUser.profilePicture}
                        alt="user profile picture"
                        className={`p-1 rounded-full w-full h-full object-cover border-4 border-gray-300 ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`}
                    />
                </div>
                {imageFileUploadError && (
                    <Alert color="failur">{imageFileUploadError}</Alert>
                )}
                <TextInput
                    type="text"
                    id="userName"
                    placeholder="Username"
                    defaultValue={
                        currentUser.userName.charAt(0).toUpperCase() +
                        currentUser.userName.slice(1)
                    }
                />
                <TextInput
                    type="text"
                    id="familyName"
                    placeholder="Familyname"
                    defaultValue={
                        currentUser.familyName.charAt(0).toUpperCase() +
                        currentUser.familyName.slice(1)
                    }
                />
                <TextInput
                    type="email"
                    id="email"
                    placeholder="email"
                    defaultValue={currentUser.email}
                />
                <TextInput
                    type="password"
                    id="password"
                    placeholder="************"
                />
                <Button type="submit" gradientDuoTone="purpleToBlue" outline>
                    Update
                </Button>
            </form>
            <div className="text-red-500 flex justify-between mt-4">
                <span className="cursor-pointer">Delete Account</span>
                <span className="cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}

export default DashProfile;
