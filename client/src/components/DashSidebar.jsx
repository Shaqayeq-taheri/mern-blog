import {Sidebar, SidebarItem} from 'flowbite-react'
import {HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi'
import { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FaRegComment } from "react-icons/fa";


function DashSidebar() {



    const dispatch= useDispatch()

     const location = useLocation();
     const [tab, setTab] = useState("");
     const {currentUser} = useSelector((state)=>state.user)
     useEffect(() => {
         const urlParams = new URLSearchParams(location.search);
         const tabFromUrl = urlParams.get("tab");
         if (tabFromUrl) {
             setTab(tabFromUrl);
         }
     }, [location.search]);



         const handleSignout = async () => {
             try {
                 const res = await fetch("/api/users/signout", {
                     method: "POST",
                 });
                 const data = await res.json();

                 if (!res.ok) {
                     console.log(data.message);
                 } else {
                     dispatch(signoutSuccess());
                 }
             } catch (error) {
                 console.log(error.message);
             }
         }; 

  return (
      <Sidebar className="w-full md:w-56">
          <Sidebar.Items>
              <Sidebar.ItemGroup className="flex flex-col gap-1">
                {currentUser && currentUser.isAdmin && (
                    <Link to="/dashboard?tab=dash">
                        <SidebarItem icon={HiChartPie} active={tab==='dash'|| !tab} as='div'>
Dashboard
                        </SidebarItem>
                    </Link>
                )}
                  <Link to="/dashboard?tab=profile">
                      <Sidebar.Item
                          active={tab === "profile"}
                          icon={HiUser}
                          label={currentUser.isAdmin ? "Admin" : "User"}
                          labelColor="dark"
                          as="div"
                      >
                          Profile
                      </Sidebar.Item>
                  </Link>
                  {currentUser.isAdmin && (
                      <>
                          <Link to="/dashboard?tab=posts">
                              <Sidebar.Item
                                  active={tab === "posts"}
                                  icon={HiDocumentText}
                                  as="div"
                              >
                                  Posts
                              </Sidebar.Item>
                          </Link>
                          <Link to="/dashboard?tab=comments">
                              <Sidebar.Item
                                  active={tab === "comments"}
                                  icon={FaRegComment}
                                  as="div"
                              >
                                  Comments
                              </Sidebar.Item>
                          </Link>
                      </>
                  )}
                  {currentUser.isAdmin && (
                      <Link to="/dashboard?tab=users">
                          <Sidebar.Item
                              active={tab === "users"}
                              icon={HiOutlineUserGroup}
                              as="div"
                          >
                              Users
                          </Sidebar.Item>
                      </Link>
                  )}
                  <Sidebar.Item
                      icon={HiArrowSmRight}
                      className="cursor-pointer"
                      onClick={handleSignout}
                  >
                      Sign out
                  </Sidebar.Item>
              </Sidebar.ItemGroup>
          </Sidebar.Items>
      </Sidebar>
  );
}

export default DashSidebar
