import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from '../components/DashUsers'
import DashComponents from "../components/DashComponents";
import DashboardComponent from "../components/DashboardComponent";

function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return (
        <div className="flex md:flex-row flex-col min-h-screen">
            {/* Sidebar */}
            <div className="md:w-56">
                <DashSidebar />
            </div>

            {/* Main Content */}
            <div className="flex flex-1 justify-center">
                <div
                    className={`w-full ${
                        tab === "posts" || tab === "users" || tab === "comments"
                            ? "max-w-5xl"
                            : "max-w-lg"
                    }`}
                >
                    {tab === "profile" && <DashProfile />}
                    {tab === "posts" && <DashPosts />}
                    {tab === "users" && <DashUsers />}
                    {tab === "comments" && <DashComponents />}
                    {tab === "dash" && <DashboardComponent />}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
