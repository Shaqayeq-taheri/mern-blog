import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    HiArrowNarrowUp,
    HiOutlineUserGroup,
    HiDocumentText,
    HiAnnotation,
} from "react-icons/hi";

function DashboardComponent() {
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);

    const { currentUser } = useSelector((state) => state.user);

    console.log(lastMonthPosts)
    console.log('totalposts are ',totalPosts);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/users/getUsers?limit=5");
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                    setLastMonthUsers(data.lastMonthUsers);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/post/allPosts?limit=5");
                const data = await res.json();
                if (res.ok) {
                    setPosts(data.posts);
                    setTotalPosts(data.totalPosts);
                    setLastMonthPosts(data.lastMonthsPosts);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        const fetchComments = async () => {
            try {
                const res = await fetch("/api/comment/getComments?limit=5");
                const data = await res.json();
                if (res.ok) {
                    setComments(data.comments);
                    setTotalComments(data.totalComments);
                    setLastMonthComments(data.lastMonthsComments);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        //call them if the user is admin
        if (currentUser.isAdmin) {
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    }, [currentUser]);

    return (
        <div className="p-3 mt-5">
            <div className="flex flex-wrap  gap-2 justify-center">
                {/* total users container */}
                <div className="p-3 bg-slate-100 dark:bg-slate-200  md:w-72 w-full  rounde shadow-lg">
                    <div className=" p-3">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <h3 className="text-gray-500 text-md uppercase">
                                    Total Users
                                </h3>
                                <p className="text-2xl">{totalUsers}</p>
                            </div>

                            <div className="">
                                <HiOutlineUserGroup className="bg-green-400 text-white rounded-full text-5xl shadow-lg p-2" />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 flex gap-2 text-sm">
                        <span className="text-green-500 flex items-center">
                            <HiArrowNarrowUp /> {lastMonthUsers}
                        </span>
                        <div className="">Last Month</div>
                    </div>
                </div>
                {/* total comments container */}
                <div className="p-3 bg-slate-100 dark:bg-slate-200  md:w-72 w-full rounde shadow-lg">
                    <div className=" p-3">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <h3 className="text-gray-500 text-md uppercase">
                                    Total Comments
                                </h3>
                                <p className="text-2xl">{totalComments}</p>
                            </div>

                            <div className="">
                                <HiAnnotation className="bg-red-400 text-white rounded-full text-5xl shadow-lg p-2" />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 flex gap-2 text-sm">
                        <span className="text-green-500 flex items-center">
                            <HiArrowNarrowUp /> {lastMonthComments}
                        </span>
                        <div className="">Last Month</div>
                    </div>
                </div>
                {/* total posts container */}
                <div className="p-3 bg-slate-100 dark:bg-slate-200  md:w-72 w-full rounde shadow-lg">
                    <div className=" p-3">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <h3 className="text-gray-500 text-md uppercase">
                                    Total Posts
                                </h3>
                                <p className="text-2xl">{totalPosts}</p>
                            </div>

                            <div className="">
                                <HiDocumentText className="bg-blue-400 text-white rounded-full text-5xl shadow-lg p-2" />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 flex gap-2 text-sm">
                        <span className="text-green-500 flex items-center">
                            <HiArrowNarrowUp /> {lastMonthPosts}
                        </span>
                        <div className="">Last Month</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardComponent;
