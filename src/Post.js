import { Avatar } from '@material-ui/core'
import React,{useEffect,useState} from 'react'
import './Post.css'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NearMeIcon from '@material-ui/icons/NearMe';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import db from './firebase'
import AddComment from './AddComment'
import Comments from './Comments';
import {firebase} from "./firebase"
import { useStateValue } from './StateProvider';

function Post({ id,profilePic, image, username, timestamp, message,likes }) {
     const [comments, setComments] = useState([])
    const [{ user }, dispatch] = useStateValue()
    console.log(likes)

    useEffect(() => {
        db.collection('posts').doc(id).collection('comments').onSnapshot((snapshot) =>
            setComments(snapshot.docs.map((doc) => {
                console.log(doc.data())
                return { id: doc.id, data: doc.data() }
            }))
        )
   
    }, [])
    const handleClickLike = (e)=>{
              e.preventDefault()
              db.collection('posts').doc(id).update({
                  likes:firebase.firestore.FieldValue.arrayUnion(user.displayName)
              })
    }
    const handleClickDislike = (e)=>{
              e.preventDefault()
              db.collection('posts').doc(id).update({
                  likes:firebase.firestore.FieldValue.arrayRemove(user.displayName)
              })
    }
    return (
        
        <div className='post'>
            <div class="post__top">
                <Avatar src={profilePic} className='post__avatar' />
                <div class="post__topInfo">
                    <h3>{username}</h3>
                    <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                </div>
            </div>

            <div class="post__bottom">
                <p>{message}</p>
            </div>

            <div class="post__image">
                <img src={image} alt="" />
            </div>

            <div class="post__options">
                
                    {
                        likes.includes(user.displayName)?  <><div class="post__option" onClick={handleClickDislike}><ThumbUpIcon />
                    <p>{likes.length} Dislike</p></div></> :  <><div class="post__option" onClick={handleClickLike} ><ThumbUpIcon />
                    <p>{likes.length} Like</p></div></>
                    } 
                
                <div class="post__option">
                    <ChatBubbleOutlineOutlinedIcon />
                    <p>Comment</p>
                </div>
                <div class="post__option">
                    <NearMeIcon />
                    <p>Share</p>
                </div>
                <div class="post__option">
                    <AccountCircleIcon />
                    <ExpandMoreIcon />
                </div>
            </div>
            <div class="post__comments">
              <AddComment 
              key={id}
              id={id}
              />  
             {comments.map((comment) => (
                <Comments
                    key={comment.id}
                    id={comment.id}
                    profilePic={comment.data.profilePic}
                    comment={comment.data.comment}
                    timestamp={comment.data.timestamp}
                    username={comment.data.username}
                />
            ))}
            </div>
        </div>
        
    )
}

export default Post
