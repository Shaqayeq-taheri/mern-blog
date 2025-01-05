import { TextInput, Button } from "flowbite-react";
import { useSelector } from "react-redux";

function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div
            className="max-w-md w-full mt-5 mb-20 border border-gray-100 rounded-lg shadow-md p-5 overflow-y-auto"
            style={{ maxHeight: "90vh" }}
        >
            <h1 className="text-center mb-5 font-bold text-2xl">Profile</h1>
            <form className="flex flex-col gap-3">
                <div className="w-24 h-24 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
                    <img
                        src={currentUser.profilePicture}
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
