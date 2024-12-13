import {Footer} from "flowbite-react"
import {Link} from "react-router-dom"

function FooterComponent() {
  return (
      <Footer container className="border border-t-4 border-y-violet-800 ">
          <div className="w-full mx-auto">
              <div className="grid justify-between  md:grid-cols-2">
                  <div className="">
                      {/* logo */}
                      <Link
                          to="/"
                          className=" text-nowrap text-sm sm:text-xl font-semibold dark:text-white"
                      >
                          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 rounded-lg text-white">
                              Shaqayeq's
                          </span>
                          Blog
                      </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-x-8  mt-10">
                      <div>
                          <Footer.Title title="About" />
                          <Footer.LinkGroup col>
                              <Footer.Link
                                  href="#"
                                  target="_blank"
                                  rel="noopener noreferrer"
                              >
                                  the first link
                              </Footer.Link>
                              <Footer.Link
                                  href="#"
                                  target="_blank"
                                  rel="noopener noreferrer"
                              >
                                  the second link
                              </Footer.Link>
                          </Footer.LinkGroup>
                      </div>
                      <div>
                          <Footer.Title title="Follow Us" />
                          <Footer.LinkGroup col>
                              <Footer.Link
                                  href="#"
                                  target="_blank"
                                  rel="noopener noreferrer"
                              >
                                  the first link
                              </Footer.Link>
                              <Footer.Link
                                  href="#"
                                  target="_blank"
                                  rel="noopener noreferrer"
                              >
                                  the second link
                              </Footer.Link>
                          </Footer.LinkGroup>
                      </div>
                      <div>
                          <Footer.Title title="Legal" />
                          <Footer.LinkGroup col>
                              <Footer.Link
                                  href="#"
                                  target="_blank"
                                  rel="noopener noreferrer"
                              >
                               Privacy
                              </Footer.Link>
                              <Footer.Link
                                  href="#"
                                  target="_blank"
                                  rel="noopener noreferrer"
                              >
                                 Terms & Conditions
                              </Footer.Link>
                          </Footer.LinkGroup>
                      </div>
                  </div>
              </div>
                  <Footer.Divider/>
                  <div className="flex justify-start">
                    <Footer.Copyright href="#" by="Shaqayeq's Blog" year={new Date().getFullYear()} />
                  </div>
          </div>
      </Footer>
  );
}

export default FooterComponent
