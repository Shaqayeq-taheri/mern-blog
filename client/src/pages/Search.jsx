import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: "",
        sort: "desc",
        category: "uncategorized",
    });
    const [post, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showmore, setShowMore] = useState(false);

    const location = useLocation();

    console.log(sidebarData)

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
    }, [location.search]);

    return (
        <div>
            <div className="">
                <form>
                    <label>Search here...</label>
                    <TextInput
                        placeholder="search..."
                        id="searchTerm"
                        type="text"
                    />
                </form>
            </div>
        </div>
    );
}

export default Search;
