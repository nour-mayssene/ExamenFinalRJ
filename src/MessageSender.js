import React, { useState,useRef } from 'react'
import { Avatar } from '@material-ui/core'
import './MessageSender.css'
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useStateValue } from './StateProvider';
import db from './firebase'
import {firebase} from "./firebase"
import Upload from './upload';
import { AlternateEmail } from '@material-ui/icons';

function MessageSender() {
    const [{ user }, dispatch] = useStateValue()
    const [input, setInput] = useState('')
    const [imageInput, setImageInput] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
 const inputFileRef = useRef( null );
  const onBtnClick = () => {
    inputFileRef.current.click();
  }
  const handleSubmit = (e) =>{
      e.preventDefault()
    if(imageInput!=null)
    {
  let file = imageInput;
  var storage = firebase.storage();
  var storageRef = storage.ref();
  var uploadTask = storageRef.child('folder/' + file.name).put(file);

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) =>{
      
    },(error) =>{
      throw error
    },() =>{
      // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{

      uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
         db.collection('posts').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            profilePic: user.photoURL,
            username: user.displayName,
            image: url,
            likes:[]
        })
        setInput('')
        setImageUrl('')
        setImageInput(null)
      })

   }
 ) 

    }
    else {
        e.preventDefault()

        db.collection('posts').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            profilePic: user.photoURL,
            username: user.displayName,
            image: "",
                        likes:[]

        })


        setInput('')
        setImageUrl('')
        setImageInput(null)
    }

}
   const handleChange = (e) =>{
    if(e.target.files[0]){
        
       let reader = new FileReader(); // HTML5 FileReader API
        let file = e.target.files[0];
        setImageInput(file);
        reader.readAsDataURL(file);

         reader.onload = () => {
        setImageUrl(reader.result );

  }
   }}
    const ll = (e) => {
        e.preventDefault()

        db.collection('posts').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            profilePic: user.photoURL,
            username: user.displayName,
            image: imageUrl
        })


        setInput('')
        setImageInput(null)
        setImageUrl('')
    }
   
    return (
        
        <div className="messageSender">
            <div class="messageSender__top">
                <Avatar src={user.photoURL} />
                <form>
                    <input ref={inputFileRef} id='upload' hidden={true} type='file'  onChange={handleChange}/>
                    <input value={input} onChange={(e) => setInput(e.target.value)}
                        placeholder={`What's on your mind, ${user.displayName}?`} style={{width:"100%"}} />
                 

                    <button type="submit" className='btn btn-outline-primary' onClick={handleSubmit}>Post Now</button>
                </form>
            
            </div>
            <div className='messageSender_image'style={{textAlign:"center"}} >
                    <img src={imageUrl} style={{width:"50%"}}/>
            </div>
            <div class="messageSender__bottom">
                <div class="messageSender__option">
                    <VideocamIcon style={{ color: "red" }} />
                    <h3>Live Video</h3>
                </div><div class="messageSender__option" onClick={onBtnClick} >
                    <PhotoLibraryIcon style={{ color: "green" }} />
                    <h3>Photo/Video</h3>
                </div><div class="messageSender__option">
                    <InsertEmoticonIcon style={{ color: "orange" }} />
                    <h3>Feeling/Activity</h3>
                </div>
            </div>
        </div>
    )
}

export default MessageSender
