import React from 'react'
import "./Comment.css"
export default function Comments({comment,
            timestamp,
            profilePic,
            username,id}) {
    return (
        <>
            <div className="d-flex justify-content-center py-2" style={{width:"100%"}}>
        <div className="second py-2 px-2"> <span class="text1">{comment}</span>
            <div className="d-flex justify-content-between py-1 pt-2">
                <div><img src={profilePic} width="18"/><span class="text2">{username}</span></div>
            </div>
        </div>
    </div>
        </>
    )
}
