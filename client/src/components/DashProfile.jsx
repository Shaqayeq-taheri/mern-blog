import { TextInput, Button } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
    const [image, setImage] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerRef = useRef()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageFileUrl(URL.createObjectURL(file))
        }
    };

    useEffect(()=>{
        if(image){
            uploadImage()
        }
    },[image])
    const uploadImage= async ()=>{
        console.log('the image is uploading')
    }
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
                <div className="w-24 h-24 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=>filePickerRef.current.click()}>
                    <img
                        src={imageFileUrl || currentUser.profilePicture}
                        alt="user profile picture"
                        className="p-1 rounded-full w-full h-full object-cover border-4 border-gray-300"
                    />
                </div>
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
