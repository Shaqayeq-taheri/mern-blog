import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";

function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    console.log("the fetched comments:", comments);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }
        try {
            const res = await fetch("/api/comment/create-comment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setComment(""); //clear comment section
                setCommentError(null);
                setComments([data, ...comments]); //keep the previous comments and add the new ones
            }
        } catch (error) {
            console.log(error.message);
            setCommentError(error.message);
        }
    };
    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(
                    `/api/comment/getPostComments/${postId}`
                );
                const data = await res.json();
                if (res.ok) {
                    setComments(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getComments();
    }, [postId]);

    const handleLike = async (commentId) => {
        console.log("Liking comment with ID:", commentId);
        try {
            //check if the user is authenticated
            if (!currentUser) {
                navigate("/signin");
            }

            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: "PUT",
            });
            const data = await res.json();
            setComments(
                comments.map((comment) =>
                    comment._id === commentId
                        ? {
                              ...comment,
                              likes: data.likes,
                              numberOfLikes: data.likes.length,
                          }
                        : comment
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    //by editing the comment we should update the UI of the commnet section that's why we write it here
    const handleEdit = async (comment, editedContent) => {
       setComments((prev) =>
           prev.map((c) =>
               c._id === comment._id ? { ...c, content: editedContent } : c
           )
       );
    };


    return (
        <div className="max-w-2xl mx-auto w-full p-3">
            {/* the info of the user who left the comment */}
            {currentUser ? (
                <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                    <p>Signed in as: </p>
                    <img
                        className="h-7 w-7 object-cover rounded-full"
                        src={currentUser.profilePicture}
                        alt="current user profile picture"
                    />
                    <Link
                        to="/dashboard?tab=profile"
                        className="text-cyan-500 hover:underline"
                    >
                        @ {currentUser.userName} {currentUser.familyName}
                    </Link>
                </div>
            ) : (
                <div className="text-teal-500 my-5 flex gap-1">
                    Please sign in to comment
                    <Link
                        to="/signin"
                        className="text-blue-500 hover:underline"
                    >
                        Sign in
                    </Link>
                </div>
            )}
            {/* comment section */}
            {currentUser && (
                <form
                    onSubmit={handleSubmit}
                    className=" border border-teal-500 rounded-md p-3"
                >
                    <Textarea
                        placeholder="Add a comment..."
                        rows="3"
                        maxLength="200"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className="flex justify-center items-center mt-5">
                        <p className="text-gray-500 text-sm">
                            {200 - comment.length} characters remaining
                        </p>
                    </div>
                    <Button
                        outline
                        type="submit"
                        gradientDuoTone="purpleToBlue"
                    >
                        Submit
                    </Button>
                    {commentError && (
                        <Alert color="failure" className="mt-5">
                            {commentError}
                        </Alert>
                    )}
                </form>
            )}
            {comments.length === 0 ? (
                <p className="text-sm my-5">No comments yet!</p>
            ) : (
                <>
                    <div>
                        <p>{comments.length} Comments</p>
                    </div>
                    {comments.map((comment) => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            onLike={handleLike}
                            onEdit={handleEdit}
                        />
                    ))}
                </>
            )}
        </div>
    );
}

export default CommentSection;
