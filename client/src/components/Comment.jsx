import { useState, useEffect } from "react";
import moment from "moment";
import { AiFillLike } from "react-icons/ai";
import { useSelector } from "react-redux";


function Comment({ comment , onLike}) {

    const [user, setUser] = useState({});
    const {currentUser}=useSelector(state=>state.user)

    console.log("user data who left the comments ", user);

    //we need the user data here too

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/users/getUser/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getUser();
    }, [comment]);
    return (
        <div className="flex p-4 gap-2 border-b dark:border-gray-600 text-sm">
            <div className="flex items-center mb-1">
                <img
                    className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"
                    src={user.profilePicture}
                    alt={user.userName}
                />
            </div>
            <div className="flex-1">
                <div>
                    <span className="font-bold mr-1 text-xs truncate">
                        {user ? `@${user.userName}` : "anonymous user"}
                    </span>
                    <span className="text-gray-500 text-xs">
                        {moment(comment.createdAt).fromNow()}
                    </span>
                    <p className="text-gray-500 mb-2 pl-1">{comment.content}</p>
                    <div className=" flex items-center gap-3 pt-2 ">
                        <button
                            onClick={() => onLike(comment._id)}
                            type="button"
                            className={` text-gray-400 hover:text-blue-500 ${
                                currentUser &&
                                comment.likes.includes(currentUser._id) &&
                                `!text-blue-500`
                            }`}
                        >
                            {/* which comment is being like */}
                            <AiFillLike size={"16px"} />
                        </button>
                        <p className="text-gray-400">
                            {comment.numberOfLikes + " " + (comment.numberOfLikes===1 ? "like" : "likes")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
