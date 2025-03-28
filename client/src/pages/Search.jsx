import { TextInput, Select, Button,Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: "",
        sort: "desc",
        category: "uncategorized",
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showmore, setShowMore] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    console.log(sidebarData);
    console.log("these are the posts", posts);

    useEffect(() => {
        //the things that we want to get from url:
        const urlParams = new URLSearchParams(location.search);
        const searchTermFormUrl = urlParams.get("searchTerm");
        const sortFormUrl = urlParams.get("sort");
        const categoryFormUrl = urlParams.get("category");

        if (searchTermFormUrl || sortFormUrl || categoryFormUrl) {
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFormUrl,
                sort: sortFormUrl,
                category: categoryFormUrl,
            });
        }

        const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/allPosts?${searchQuery}`);
            const data = await res.json();
            if (!res.ok) {
                setLoading(false);
                return;
            }
            if (res.ok) {
                setPosts(data.posts);
                setLoading(false);
            }
            if (data.posts.length === 3) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
        };
        fetchPosts();
    }, [location.search]);

    const handleChange = (e) => {
        if (e.target.id === "searchTerm") {
            setSidebarData({ ...sidebarData, searchTerm: e.target.value });
        }
        if (e.target.id === "sort") {
            const order = e.target.value || "desc";
            setSidebarData({ ...sidebarData, sort: order });
        }
        if (e.target.id === "category") {
            const category = e.target.value || "uncategorized";
            setSidebarData({ ...sidebarData, category });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set("searchTerm", sidebarData.searchTerm);
        urlParams.set("sort", sidebarData.sort);
        urlParams.set("category", sidebarData.category);
        const searchQuery = urlParams.toString(); //the url would be this url params but needed to change to string before navigating
        navigate(`/search?${searchQuery}`);
    };
    return (
        <div className="flex">
            <div className=" md:max-w-96 p-7 border-b md:border-r md:min-h-screen border-gray-500 ">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-8 p-1"
                >
                    <div className=" flex items-center gap-3  ">
                        <label className="whitespace-nowrap font-semibold">
                            Search:
                        </label>
                        <TextInput
                            placeholder="search..."
                            id="searchTerm"
                            type="text"
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>
                    {/* select the sort mode */}
                    <div className="flex items-center gap-3">
                        <label className="font-semibold">Sort by:</label>
                        <Select
                            onChange={handleChange}
                            id="sort"
                            defaultValue={sidebarData.sort}
                            className="w-full"
                        >
                            <option value="desc">Newest</option>
                            <option value="asc">Oldest</option>
                        </Select>
                    </div>
                    {/* select the category */}
                    <div className="flex items-center gap-3">
                        <label className="font-semibold">Category:</label>
                        <Select
                            onChange={handleChange}
                            id="category"
                            defaultValue={sidebarData.category}
                            className="w-full"
                        >
                            <option value="uncategorized">Uncategorized</option>
                            <option value="movies">Movies</option>
                            <option value="series">Series</option>
                        </Select>
                    </div>
                    <Button
                        type="submit"
                        outline
                        gradientDuoTone="purpleToPink"
                    >
                        Apply Filters
                    </Button>
                </form>
            </div>
            <div className="w-full">
                <h1 className="p-3 mt-5 text-3xl font-semibold sm:border-b border-gray-500">
                    Posts Results
                </h1>
                <div className="p-7">
                    {!loading && posts.length === 0 && (
                        <p className="text-gray-500 text-xl">No posts found</p>
                    )}
                    {loading && (
                        <p className="text-xl text-gray-500">Loading...</p>
                    )}
                    {!loading && posts && posts.map(
                      (post)=> <Card key={post._id} post={post} />)} 
                </div>
            </div>
        </div>
    );
}

export default Search;
