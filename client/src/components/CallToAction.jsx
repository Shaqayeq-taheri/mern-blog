import { Button } from "flowbite-react";

function CallToAction() {
    return (
        <div className="flex flex-col sm:flex-row justify-center items-center border p-3 border-teal-500 rounded-tl-3xl rounded-br-3xl text-center">
            <div className="flex-1 justify-center flex flex-col">
                <h2 className="text-2xl">Want to learn more about JavaScript?</h2>
                <p className="text-gray-500 my-2">Check out these resources with 100 JS projects</p>
                <Button
                    className="rounded-tl-xl rounded-bl-none"
                    gradientDuoTone="purpleToPink"
                >
                    <a
                        href="https://www.100jsprojects.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        100 JavaScript Projects
                    </a>
                </Button>
            </div>
            <div className="p-7 flex-1">
                <img src="https://www.datocms-assets.com/48401/1628644950-javascript.png?auto=format&fit=max&w=1200" />
            </div>
        </div>
    );
}

export default CallToAction;
