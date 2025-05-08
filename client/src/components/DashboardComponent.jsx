import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    HiArrowNarrowUp,
    HiOutlineUserGroup,
    HiDocumentText,
    HiAnnotation,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { Button, Table } from "flowbite-react";

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
            {/* first part of dashboard the quick overview */}
            <div className="flex flex-wrap  gap-2 justify-center">
                {/* total users container */}
                <div className="rounded-md p-3 bg-slate-100 dark:bg-slate-500  md:w-72 w-full  rounde shadow-lg">
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
                <div className="rounded-md p-3 bg-slate-100 dark:bg-slate-500  md:w-72 w-full rounde shadow-lg">
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
                <div className="rounded-md p-3 bg-slate-100 dark:bg-slate-500  md:w-72 w-full rounde shadow-lg">
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
                        <div>Last Month</div>
                    </div>
                </div>
            </div>

            {/* second part of dashboard , see all the users,comments,posts */}
            <div className="flex flex-wrap gap-3 mt-4 mx-auto justify-center">
                {/* users table */}
                <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-slate-100 dark:bg-slate-500">
                    <div className="flex justify-between p-3 text-sm">
                        <h2 className="text-center p-2">Recent Users</h2>
                        <Button outline gradientDuoTone="purpleToBlue">
                            <Link to={"/dashboard?tab=users"}>See More</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>User Image</Table.HeadCell>
                            <Table.HeadCell>User Name</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="bg-white">
                            {users &&
                                users.map((user) => (
                                    <Table.Row
                                        key={user._id}
                                        className="bg-white dark:bg-gray-800"
                                    >
                                        <Table.Cell>
                                            <img
                                                src={
                                                    user?.profilePicture ||
                                                    "/default-user.png"
                                                }
                                                alt={user?.userName || "user"}
                                                className="w-10 h-10 rounded-full bg-gray-500"
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                            {user?.userName || "Unknown"}{" "}
                                            {user?.familyName || ""}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                        </Table.Body>
                    </Table>
                </div>
                {/* comments table */}
                <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-slate-100 dark:bg-slate-500">
                    <div className="flex justify-between p-3 text-sm">
                        <h2 className="text-center p-2">Recent Comments</h2>
                        <Button outline gradientDuoTone="purpleToBlue">
                            <Link to={"/dashboard?tab=comments"}>See More</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Comment Content</Table.HeadCell>
                            <Table.HeadCell>Likes</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="bg-white">
                            {comments &&
                                comments.map((comment) => (
                                    <Table.Row
                                        key={comment._id}
                                        className="bg-white dark:bg-gray-800"
                                    >
                                        <Table.Cell className="w-96">
                                            <p className="line-clamp-2">
                                                {comment.content}
                                            </p>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {comment.numberOfLikes}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                        </Table.Body>
                    </Table>
                </div>
                {/* posts table */}
                <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-slate-100 dark:bg-slate-500">
                    <div className="flex justify-between p-3 text-sm">
                        <h2 className="text-center p-2 text-semibold">
                            Recent Posts
                        </h2>
                        <Button outline gradientDuoTone="purpleToBlue">
                            <Link to={"/dashboard?tab=posts"}>See More</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Post Image</Table.HeadCell>
                            <Table.HeadCell>Post Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="bg-white">
                            {posts &&
                                posts.map((post) => (
                                    <Table.Row
                                        key={post._id}
                                        className="bg-white dark:bg-gray-800"
                                    >
                                        <Table.Cell>
                                            <img
                                                src={post.image}
                                                alt="post"
                                                className="w-14 h-14 rounded-md bg-gray-500"
                                            />
                                        </Table.Cell>
                                        <Table.Cell className="w-96">
                                            {post.title}
                                        </Table.Cell>
                                        <Table.Cell className="w-5">
                                            {post.category}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default DashboardComponent;
