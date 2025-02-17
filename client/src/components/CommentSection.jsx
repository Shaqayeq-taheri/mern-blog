import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'




function CommentSection({postId}) {
    const {currentUser}= useSelector(state=>state.user)
  return (
      <div className='max-w-2xl mx-auto w-full p-3'>
          {currentUser ? (
              <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                  <p>Signed in as: </p>
                  <img className='h-8 w-8 object-cover rounded-full'
                      src={currentUser.profilePicture}
                      alt="current user profile picture"
                  />
                  <Link to="/dashboard?tab=profile" className='text-cyan-500 hover:underline'>
                      @ {currentUser.userName} {currentUser.familyName}
                  </Link>
              </div>
          ) : (
              <div className="">
                  Please sign in to comment
                  <Link to="/signin">Sign in</Link>
              </div>
          )}
      </div>
  );
}

export default CommentSection
