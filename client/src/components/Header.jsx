import React from "react";
import { Navbar, TextInput, Button, NavbarLink, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import {FaMoon} from "react-icons/fa"
import {useSelector} from "react-redux"

function Header() {
    const path= useLocation().pathname
    const {currentUser} = useSelector(state=>state.user)
    return (
        <Navbar className=" border-b-2 bg-slate-100">
            <Link
                to="/"
                className=" text-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 rounded-lg text-white">
                    Shaqayeq's
                </span>
                Blog
            </Link>
            <form className="flex items-center gap-1">
                <TextInput
                    className="hidden md:inline"
                    type="text"
                    placeholder="Search..."
                    rightIcon={AiOutlineSearch}
                />
            </form>
            {/* search icon in small screen */}
            <Button
                className=" bg-gray-300  w-12 h-10 md:hidden  "
                color="gray"
                pill
            >
                <AiOutlineSearch size={"20px"} />
            </Button>

            {/* night mode and sign up button */}
            <div className="flex gap-2 md:order-2">
                <Button
                    className="w-12 h-10 bg-gray-200 hidden sm:inline "
                    color="gray"
                    pill
                >
                    <FaMoon />
                </Button>
                {currentUser ? (<Dropdown
                arrowIcon={false}
                inline
                label={<Avatar alt="user" img={currentUser.profilePicture} rounded/>}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Hi {currentUser.userName.charAt(0).toUpperCase() + currentUser.userName.slice(1)} </span>
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile'}>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    
                    </Link>
                    <Dropdown.Divider/>
                    <Dropdown.Item>Sign out</Dropdown.Item>
                    
                </Dropdown>): ( <Link to="/signin">
                    <Button gradientDuoTone="purpleToBlue" outline >
                        Sign In
                    </Button>
                </Link>)}
               
                {/* Mobile Menu Toggle */}
                <Navbar.Toggle />
            </div>
            {/* Navbar Links */}
            <Navbar.Collapse>
                {/* Link as div because the links changes to <a> and two <a> inside each other is not possible */}
                <Navbar.Link active={path === "/"} as={"div"}>
                    <Link to="/">Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={"div"}>
                    <Link to="/about">About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={"div"}>
                    <Link to="/projects">Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
