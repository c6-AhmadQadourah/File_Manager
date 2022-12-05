import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
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
  getDoc
} from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import {setFiles} from "../Redux/reducers/usersAuth"
function Home() {
  const { userId,files } = useSelector((state) => {
    return {
      userId: state.usersAuth.userId,
    };
  });
  const dispatch = useDispatch()

  const [file, setFile] = useState("");

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
  }, []);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
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



 console.log(data)
  return (
    <>
    <div>
      <input type="file" onChange={handleChange} accept="/image/*" />
      <button onClick={handleUpload}>Upload to Firebase</button>
      <p>{percent} "% done"</p>
    </div>




    {data&&data.map((elem,i)=>{
      
        return (
            <div key={i}>
                <img  src={elem.url} ></img>

            </div>
        )
    })}
    <div>



    </div>
    </>
  );
}

export default Home;
