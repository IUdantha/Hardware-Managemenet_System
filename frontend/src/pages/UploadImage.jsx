import React from 'react'
//useEffect - when you want to run a function as soon as you open your app
import {useState, useEffect} from "react"
import { storage } from '../firebaseDel';
import { ref , uploadBytes, listAll , getDownloadURL} from 'firebaseDel/storage';
import { v4 } from 'uuid'; //randomize letters

function UploadImage() {

    //set the imageUpload state to file user is selecting
    const [imageUpload, setImageUpload] = useState(null);
    
    const [imageList, setImageList] = useState([]);

    //make a reference to all the files in the folder
    const imageListRef = ref(storage, "images/")


    //Call this function to upload the image to firebase
    const uploadImage = () =>
    {
        if(imageUpload == null) return;

        //use firebase function

        const imageRef = ref(storage, `images/${imageUpload.name +  v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) =>{
          
            getDownloadURL(snapshot.ref).then((url) =>{
                setImageList((prev) => [...prev, url])
            })
           
        })
    };

    useEffect(() => {

        //return all the images inside the path
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url])
                })
            })
        })

    },[imageListRef] );
    
return (
    <div>
        <h1>Upload Images</h1>

        <input type = "file" onChange={(event) => {setImageUpload(event.target.files[0])}} />
        <button onClick={uploadImage}>Upload Image</button>

        {imageList.map((url) => {
            return <img src = {url} alt = {'profileImage'} />
        })}

    </div>
  )
}

export default UploadImage

/*
 const imagesListRef = ref(storage, `images/${user.uid}`);

or

 const imagesListRef = ref(storage, `images/${auth.currentUser.uid}`);

but first you must do "Sıgn In" and "Sıgn Out" medhod in reactjs with firebase
and 

  useEffect(() => {
    if (user.uid) {
      const imagesListRef = ref(storage, `images/${user.uid}`);
      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev, url]);
          });
        });
      });
    } else {
      return;
    }
  }, [user]);

*/