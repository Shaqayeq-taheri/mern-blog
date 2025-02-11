import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    Modal,
    Button,
} from "flowbite-react";

import { AiTwotoneExclamationCircle } from "react-icons/ai";
import {FaCheck, FaTimes} from 'react-icons/fa'

function DashUsers() {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState("");

    console.log("these are the users:", users);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(
                    "/api/users/getUsers"
                );
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    if (data.users.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (currentUser.isAdmin) {
            fetchUsers();
        }
    }, [currentUser._id]);




    const handleDeleteUser = async()=>{
        try {
            const res = await fetch(`/api/users/deleteUser/${userIdToDelete}`,{
                method:"DELETE"
            });
            const data= await res.json()
            if(res.ok){
                setUsers((prev)=>prev.filter((user)=>user._id !== userIdToDelete))
                setShowModal(false)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleShowMore = async () => {
        console.log(showMore);
        const startIndex = users.length;

        try {
            const res = await fetch(
                `/api/users/getUsers?startIndex=${startIndex}`
            );
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => [...prev, ...data.users]); //keep the previous data and add the new ones
                if (data.users.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

   

    return (
        <div
            className="mx-auto table-auto overflow-x-scroll mt-3 p-3 
            scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
             dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
        >
            {currentUser.isAdmin && users.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md w-full">
                        <TableHead>
                            <TableHeadCell>Date Created</TableHeadCell>
                            <TableHeadCell>User Image</TableHeadCell>
                            <TableHeadCell>User Name</TableHeadCell>
                            <TableHeadCell>Family Name</TableHeadCell>
                            <TableHeadCell>Admin</TableHeadCell>
                            <TableHeadCell>Email</TableHeadCell>
                            <TableHeadCell>Delete</TableHeadCell>
                        </TableHead>
                        <TableBody className="divide-y">
                            {users.map((user) => (
                                <TableRow
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={user._id}
                                >
                                    <TableCell>
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <img
                                            src={user.profilePicture}
                                            alt={user.userName}
                                            className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                                        />
                                    </TableCell>
                                    <TableCell>{user.userName}</TableCell>
                                    <TableCell>{user.familyName}</TableCell>
                                    <TableCell>{user.isAdmin ? (<FaCheck className="text-green-500"/>) : (<FaTimes className="text-red-500"/>)}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <span
                                            onClick={() => {
                                                setShowModal(true);
                                                setUserIdToDelete(user._id);
                                            }}
                                            className="font-medium text-red-500 hover:underline cursor-pointer"
                                        >
                                            Delete
                                        </span>
                                    </TableCell>
                               
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className="w-full text-teal-500 self-center text-sm py-7"
                        >
                            Show More
                        </button>
                    )}
                </>
            ) : (
                <p>There is no users yet!</p>
            )}

            {/* Modal for alerting the user to ask if he/she is sure about deleting the post */}
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
                            Are you sure you want delete this user?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeleteUser}>
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

export default DashUsers;
