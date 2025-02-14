import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner,Button } from "flowbite-react";

function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        console.log(postSlug);
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/allPosts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setError(false);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error.message);
                setLoading(false);
                setError(false);
            }
        };
        fetchPost();
    }, [postSlug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="xl" />
            </div>
        );
    }

    return (
        <main className="p-3 flex-col max-w-6xl mx-auto min-h-screen">
            <h1 className="text-3xl mt-10 text-center font-serif max-w-2xl mx-auto lg:text-4xl ">
                {post && post.title}
            </h1>{" "}
            {/* if there is a post : && poat.title */}
            <Link to={`/search?category=${post && post.category}`}>
                <Button color="gray" pill size="xs" className="mx-auto mt-10">
                    {post && post.category}
                </Button>
            </Link>
            <img
                src={post && post.image}
                alt={post && post.image}
                className="mt-10 p-3 max-h-[600px] w-full object-cover"
            />
            <div className=" p-3 border-b border-slate-500  w-full max-w-2xl mx-auto text-xs ">
                <span>
                    Date Created:{" "}
                    {post && new Date(post.createdAt).toLocaleDateString()}
                </span>
            </div>
            <div
                dangerouslySetInnerHTML={{ __html: post && post.content }}
                className="max-w-2xl w-full p-3 mx-auto post-content"
            ></div>
        </main>
    );
}

export default PostPage;
