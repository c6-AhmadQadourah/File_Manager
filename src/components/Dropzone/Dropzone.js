import React, { useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import img from "./image.webp"
import { setFiles, deleteFile } from "../Redux/reducers/usersAuth";
import Navbar from "../Navbar/Navbar";
import "./Dropzone.css"
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
  deleteDoc,
  uploadBytes,
} from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { serverTimestamp } from "firebase/firestore";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";

// function Dropzone() {
//   const { userId, files } = useSelector((state) => {
//     return {
//       userId: state.usersAuth.userId,
//       files: state.usersAuth.files,
//     };
//   });
//   const [selectedImages, setSelectedImages] = useState([]);
// const captionRef = useRef(null)

//   const uploadPost=async () =>{
//     const  docRef = addDoc (collection (db , "files"),{
//         uid: userId,
//           caption : captionRef.current.value,
//           timestamp : serverTimestamp()
//       })
//       await Promise.all(
//         selectedImages.map(image=>{
//             const imageRef = ref(storage,`files/${docRef.id}/${image.path}`);
//             uploadBytes(imageRef ,image ,"data_url").then(async()=>{
//                 const downloadURL = await getDownloadURL(imageRef)
//                 console.log(downloadURL)
//                 await updateDoc (doc(db,"files",docRef.id) , {
//                     images :arrayUnion(downloadURL)
//                 })
//             })
//         })
//       )
//       captionRef.current.value=''
//       setSelectedImages([])
//   }

//   const onDrop = useCallback((acceptedFiles) => {
//     setSelectedImages(
//       acceptedFiles.map((file) =>
//         Object.assign(file, {
//           preview: URL.createObjectURL(file),
//         })
//       )
//     );
//   }, []);
//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   const selected_Images = selectedImages?.map((file) => (
//     <div>
//       <img src={file.preview} style={{ width: "200px" }} />
//     </div>
//   ));

//   return (
//     <div>
//       <div {...getRootProps()}>
//         <input {...getInputProps()}  />
//         {<p>Drop the files here ...</p>}
//       </div>
//       <input ref={captionRef} type="text"  placeholder=" Enter a Caption"/>
//       <button onClick={uploadPost}> Post</button>
//       {selected_Images}
//     </div>
//   );
// }

function Dropzone() {
  const { userId, files } = useSelector((state) => {
    return {
      userId: state.usersAuth.userId,
      files: state.usersAuth.files,
    };
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const captionRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const [caption, setCaption] = useState(null);

const navigate =useNavigate()

  const uploadPost = async () => {
    const storageRef = ref(storage, `/files/${selectedImages.name}`);

    //   const  docRef = addDoc (collection (db , "files"),{
    //       uid: userId,
    //         caption : captionRef.current.value,
    //         timestamp : serverTimestamp()
    //     })

    await Promise.all(
      selectedImages.map((image) => {
        const uploadTask = uploadBytesResumable(storageRef, selectedImages);

        uploadBytes(storageRef, image, "data_url").then(async () => {
         

          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            try {
             
              const docRef = addDoc(collection(db, "files"), {
                caption,
                uid: userId,
                url,
                timestamp: serverTimestamp(),
                type :image.type
              });
            } catch (e) {
              console.error("Error adding document: ", e);
            }
            console.log(url);
          })
        })
        
      })
    ).then(result=>{ 
         setCaption("");
    setSelectedImages([]);
  })
   .catch(error=>{console.log(error)})
  };

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const selected_Images = selectedImages?.map((file) => {
    // console.log(file)
   return (
    
    <div>
      <img src={file.preview} style={{ width: "200px" }} />
    </div>
  )});

  return (
<>
<Navbar/>
    <div>
      <div className="dropZone" {...getRootProps()}>
        <input {...getInputProps()} />
        <img src={img}/>
      </div>
      <input onChange={(e)=>{ setCaption(e.target.value)}} type="text" placeholder=" Enter a Caption" />
      <button onClick={uploadPost}> Post</button>
      {selected_Images}
    </div>
    </>
  );
}

export default Dropzone;
