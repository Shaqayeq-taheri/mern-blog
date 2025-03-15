import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                
                const res = await fetch("/api/users/getUsers?limit=5");
                const data= await res.json()
                if(res.ok){
                    setUsers(data.users)
                    setTotalUsers(data.totalUsers)
                    setLastMonthUsers(data.lastMonthUsers)
                }
            } catch (error) {
            console.log(error.message)
                
            }
        };
        const fetchPosts = async () => {
            try {
                
                const res = await fetch("/api/post/allPosts?limit=5");
                const data= await res.json()
                if(data.ok){
                    setPosts(data.posts)
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
                const data = await res.json()
                if(res.ok){
                    setComments(data.comments)
                    setTotalComments(data.totalComments)
                    setLastMonthComments(data.lastMonthsComments);

                }
            } catch (error) {
                console.log(error.message)
                
            }
        };

        //call them if the user is admin
        if (currentUser.isAdmin) {
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    }, []);

    return <div>dashcomp</div>;
}

export default DashboardComponent;
