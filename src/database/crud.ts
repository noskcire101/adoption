import { DocumentData, QuerySnapshot, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { Dispatch, SetStateAction } from "react";



export const getAllDocsInACollection = async (collectionName:any,setDataFromDB:Dispatch<SetStateAction<any[]>>,) =>{
  const querySnapshot = await getDocs(collection(db, collectionName));
  const document:any =[];
      querySnapshot.forEach((doc) => {
        document.push({
          ...doc.data(),
          id: doc.id
        });
      });
      setDataFromDB(document);
}



