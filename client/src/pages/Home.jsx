import homePagePhoto from "/images/homePage.svg";
import{Link} from 'react-router-dom'

function Home() {
    return (
        <div className="bg-[#F2F2F2] dark:bg-[#1F2937] md:p-16 pb-20 ">
            <div className="flex gap-5 md:gap-20 justify-center md:p-5 p-2 ">
                <div className="md:w-80 md:h-80  w-40 h-40 ">
                    <img src={homePagePhoto} alt="home page image" />
                </div>
                <div className=" flex flex-col justify-center gap-5">
                    <h1 className="md:text-6xl font-bold text-2xl pb-10">
                        Welcome to my Blog
                    </h1>
                    <p className="pl-2">This is my personal blog</p>
                    <Link
                        to="/search"
                        className="pl-2 text-xs sm:text-sm font-bold text-teal-400 hover:underline"
                    >
                        View all the posts
                    </Link>
                </div>
            </div>

            {/* here calltoaction component can be added */}
        </div>
    );
}

export default Home;
