import React, { useEffect, useState } from "react";
import { Navbar, TextInput, Button, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import {FaMoon, FaSun} from "react-icons/fa"
import {useSelector, useDispatch} from "react-redux"
import { toggleTheme } from "../../redux/theme/themeSlice";
import { signoutSuccess } from "../../redux/user/userSlice";

 

function Header() {
    const path= useLocation().pathname
    const dispatch = useDispatch()

    const {currentUser} = useSelector(state=>state.user)
    console.log(currentUser)

    const {theme}= useSelector(state => state.theme)
    
    const[searchTerm, setSearchTerm]= useState('')
    const location = useLocation()
    const navigate = useNavigate()
      console.log(searchTerm);

    useEffect(()=>{

        const urlParams = new URLSearchParams(location.search) //to get all the url params
        const searchTermFromUrl = urlParams.get('searchTerm')
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl) //the way that we access to the term that is written in url /search?searchTerm=react
      
        }
    },[location.search])



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
            navigate('/')
        } catch (error) {
            console.log(error.message);
        }
    }; 

    const handleSubmit =(e)=>{
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', searchTerm)
        const searchQuery = urlParams.toString()
        navigate(`/search${searchQuery}`) //by pressing enter we are changing the url
    }

    
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
            <form onSubmit={handleSubmit} className="flex items-center gap-1">
                <TextInput
                    className="hidden md:inline"
                    type="text"
                    placeholder="Search..."
                    rightIcon={AiOutlineSearch}
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
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
                    onClick={()=>dispatch(toggleTheme())}
                >
             {theme ==='light' ? <FaMoon/> : <FaSun/>}
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
                    <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
                    
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
