import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

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
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* sidebar */}
            <div className="md:w-56">
                <DashSidebar />
            </div>
            {/* profile */}
            <div className="w-full flex justify-center items-center">{tab === "profile" && <DashProfile />}</div>
        </div>
    );
}

export default Dashboard;
