import { TextInput, Button, Alert, Modal } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
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
import {
    updateStart,
    updateSuccess,
    updateFailure,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signoutSuccess,
} from "../../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { AiTwotoneExclamationCircle } from "react-icons/ai";

function DashProfile() {
    const { currentUser, error, loading } = useSelector((state) => state.user);
    const [image, setImage] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] =
        useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
     const [imageFileUploading, setImageFileUploading] = useState(false);
    const [formData, setFormData] = useState({});
    const filePickerRef = useRef();
    const dispatch = useDispatch();
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(null);

    const navigate = useNavigate()

    console.log(imageFileUploadProgress, imageFileUploadError);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    const handleDelete = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const res = await fetch(
                `/api/users/deleteUser/${currentUser._id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await res.json();
            if (!res.ok) {
                dispatch(deleteUserFailure(data.message));
            } else {
                dispatch(deleteUserSuccess(data));
            }
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleSignout = async () => {
        try {
            const res = await fetch("/api/users/signout", {
                method: "POST",
            });
            const data = await res.json();

            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
            navigate('/')
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (image) {
            uploadImage();
        }
    }, [image]);
    const uploadImage = async () => {
         setImageFileUploading(true);
        setImageFileUploadError(null); // if there is an error from  before
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
                setImageFileUploadProgress(null);
                setImage(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                      setImageFileUploading(false);
                });
            }
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    console.log(formData);
    console.log(currentUser.profilePicture);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        //to check if an obj is empty
        if (Object.keys(formData).length === 0) {
            setUpdateUserError("No changes were made");
            return;
        }
        //if there is something
        console.log(`/api/users/update/${currentUser._id}`);
        console.log(currentUser);
        try {
            dispatch(updateStart());
            const response = await fetch(
                `/api/users/update/${currentUser._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            console.log(response);
            const data = await response.json();
            if (!response.ok) {
                dispatch(updateFailure(data.message));
                console.log("the update is not successfull");
                setUpdateUserError(data.message);
            } else {
                dispatch(updateSuccess(data));
                console.log("the user profile updated successfully");
                setUpdateUserSuccess("User's profile updated successfully");
            }
        } catch (error) {
            console.log(error.message);
            dispatch(updateFailure(error.message));
            setUpdateUserError(data.message);
        }
    };
    return (
        <div className="mx-auto mt-5 mb-20  p-5 overflow-y-auto">
            <h1 className="text-center mb-5 font-bold text-2xl">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
                            styles={{
                                root: {
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(62,152,199,${
                                        imageFileUploadProgress / 100
                                    })`, //opacity changes based on the uploading percentage
                                },
                            }}
                        />
                    )}
                    <img
                        src={imageFileUrl || currentUser.profilePicture}
                        alt="user profile picture"
                        className={`p-1 rounded-full w-full h-full object-cover border-4 border-gray-300 ${
                            imageFileUploadProgress &&
                            imageFileUploadProgress < 100 &&
                            "opacity-60"
                        }`}
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
                    onChange={handleChange}
                />
                <TextInput
                    type="text"
                    id="familyName"
                    placeholder="Familyname"
                    defaultValue={
                        currentUser.familyName.charAt(0).toUpperCase() +
                        currentUser.familyName.slice(1)
                    }
                    onChange={handleChange}
                />
                <TextInput
                    type="email"
                    id="email"
                    placeholder="email"
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                />
                <TextInput
                    type="password"
                    id="password"
                    placeholder="************"
                    onChange={handleChange}
                />
                <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={loading || imageFileUploading}>
                    {loading? 'Loading...' : 'Update'}
                </Button>
                {currentUser.isAdmin && (
                    <Link to={'/create-post'}>
                    <Button
                        type="button"
                        gradientDuoTone="purpleToPink"
                        className="w-full"
                    >
                        Create a new post
                    </Button>
                    </Link>
                )}
            </form>
            <div className="text-red-500 flex justify-between mt-4">
                <span
                    className="cursor-pointer"
                    onClick={() => setShowModal(true)}
                >
                    Delete Account
                </span>
                <span onClick={handleSignout} className="cursor-pointer">
                    Sign Out
                </span>
            </div>
            {updateUserSuccess && (
                <Alert color="success" className="mt-4">
                    {updateUserSuccess}
                </Alert>
            )}
            {updateUserError && (
                <Alert color="failure" className="mt-4">
                    {updateUserError}
                </Alert>
            )}
            {error && (
                <Alert color="failure" className="mt-4">
                    {error}
                </Alert>
            )}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size="md"
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <AiTwotoneExclamationCircle className=" h-14 w-14 mx-auto" />

                        <h3 className="mb-5 text-lg text-gray-600">
                            Are you sure you want delete your account?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDelete}>
                                Yes, I'm sure.
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => setShowModal(false)}
                            >
                                No, cancel it.
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DashProfile;
