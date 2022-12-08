import React from "react";
import "./Home.css";
import { useState, useEffect,useCallback  } from "react";
import {setFiles ,deleteFile} from "../Redux/reducers/usersAuth"
import Navbar from "../Navbar/Navbar";
import Dropzone from "../Dropzone/Dropzone";
import image from "./image.svg"
import {
  storage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  query,
  where,
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  db,
  getDocs,
  getDoc,
  deleteDoc
} from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";





function Home() {
  const { userId,files,isLoggedIn } = useSelector((state) => {
    return {
      userId: state.usersAuth.userId,
      files: state.usersAuth.files,
    isLoggedIn: state.usersAuth.isLoggedIn,

    };
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [file, setFile] = useState("");

  
  const [refresh, setRefresh] = useState(false);

  const [data, setData] = useState([]);

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "files"), where("uid", "==", userId));
    getDocs(q)
      .then((result) => {
      //  console.log(result.docs)

     const map1=   result.docs.map((elem,i)=>{
     
            return elem.data()
        })
        console.log(map1)
         setData(map1)
        dispatch(setFiles(map1))
   
        result.forEach((doc) => {
           
       
       //  console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
      return
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent(percent);
       

      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            try {
                const  docRef = addDoc (collection (db , "files"),{
                  uid: userId,
                    url
                }) 
               
              } catch (e) {
                console.error("Error adding document: ", e);
              }
         console.log(url);
        });
      }
    );
  };

  
  const handleDelete = (url) => {
    const q = query(collection(db, "files"), where("url", "==", url));
    getDocs(q).then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    deleteDoc(doc.ref)
    dispatch(deleteFile(url))

  });
});


  };








  return (
    <>
  <Navbar setRefresh={setRefresh}/>


{/*     
    <div>
      <input type="file" onChange={handleChange} accept="/image/*" />
      <button onClick={handleUpload}>Upload to Firebase</button>
      <p>{percent} "% done"</p>
    </div> */}


<div className="bigContainer"> 

{ files.length==0 && <div className="noImages"> 
   <img src={image}/>
  <button onClick={()=>{navigate("/drop")}}>Add new File </button>
  </div>}
  
    <div className="container"> 
 
    {userId? files&&files.map((elem,i)=>{
      
      console.log(elem)
        return (
          <div className="bigDiv"> 
            <div className="imagesDiv" key={i} >
           { elem.type.includes("image") && <img className="image"  src={elem.url} ></img>}
                {elem.type.includes("video") && <iframe type="mp4" className="image"  src={elem.url} title={elem.caption}></iframe> }
                <h1>{elem.caption} </h1>
            <button className="deleteButton" onClick={()=>{
              handleDelete(elem.url)
            }}> Delete</button>
            </div>
            </div>
        )
    }) : navigate("/login")}
    </div>

    <div>



    </div>
    </div>
    </>
  );
}

export default Home;
