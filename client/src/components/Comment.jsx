import { useState } from "react"


function Comment({comment}) {

    //we need the user data here too

    useState(()=>{
        const getUser = async ()=>{
            try {
                
            } catch (error) {
                console.log(error.message)
            }
        }
        getUser()
       
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Comment
