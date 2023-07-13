import { DocumentReference, addDoc, getDoc, updateDoc, arrayUnion, getCountFromServer, arrayRemove } from "firebase/firestore";
import { petsFormFinal } from "../../yupModels/Form";
import { dataURIToBlob, resizeFile } from "../../reusableFunctions/reusablefunctions";
import { DocumentData, QuerySnapshot, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../database/firebase";
import { Dispatch, SetStateAction } from "react";



export const selectingFiles = async (event: React.ChangeEvent<HTMLInputElement>,setImageState:React.Dispatch<any>,imageState:any,toastMessageError: (param: string) => void) => {
    if (event.target.files !== undefined) {
      const files: FileList | null = event.target.files;
   
      if (files?.length === 0)return;
      for (let i = 0; i < files!.length; i++) {
        if (files![i].type.split("/")[0] !== "image") {
          toastMessageError(
            `${
              files![i].name
            } will not be included in the upload since this is not an image`
          );
        } else {
            if (!imageState.some((event: any) => event.name === files![i].name)) {
              if (imageState.length <= 5) {
                const resizedImage: any = await resizeFile(files![i]);
                const imageBlob: any = dataURIToBlob(resizedImage);
              setImageState((prevImages: any) => [
                ...prevImages,
                {
                  blob: imageBlob,
                  name: files![i].name,
                  url: URL.createObjectURL(files![i]),
                },
              ]);
            }else {
              toastMessageError(
                `${
                  files![i].name
                } will not be included since you already have reached the upload limit`
              );
            }
          }
      }
    }
  }
}

  export const addingData = async (dataCollection:any, incomingData: petsFormFinal ) => {
    const addedData = await addDoc(dataCollection, { ...incomingData});
    return addedData.id;
  }

  export const deletingFiles = async (index: any, setImageState:React.Dispatch<any>) =>{
    setImageState((prevImages: any) =>
      prevImages.filter((_: any, i: any) => i !== index)
    );
  }






export const getAllDocsInACollection = async (collectionName:any,setDataFromDB:Dispatch<SetStateAction<any[]>>,) =>{
  const querySnapshot = await getDocs(collection(db, collectionName));
  
  const document:any =[];
  if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        document.push({
          ...doc.data(),
          id: doc.id
        });
      });
      setDataFromDB(document);
    }
    else{
      console.log("not connected")
    }
}


export function ageCalculator(date:Date) {  

  const dob = new Date(date);  
    
  //extract the year, month, and date from user date input  
  const dobdobYear = dob.getFullYear();  
  const dobdobMonth = dob.getMonth();  
  const dobdobDate = dob.getDate();  
    
  //get the current date from the system  
  const now = new Date();  
  //extract the year, month, and date from current date  
  const currentYear = now.getFullYear();  
  const currentMonth = now.getMonth();  
  const currentDate = now.getDate();  
    
  //declare a variable to collect the age in year, month, and days  

  
  //get years  
  let yearAge = currentYear - dobdobYear;  
    
  //get months  
  if (currentMonth >= dobdobMonth)  
    //get months when current month is greater  
    var monthAge = currentMonth - dobdobMonth;  
  else {  
    yearAge--;  
    var monthAge = 12 + currentMonth - dobdobMonth;  
  }  

  //get days  
  if (currentDate >= dobdobDate)  
    //get days when the current date is greater  
    var dateAge = currentDate - dobdobDate;  
  else {  
    monthAge--;  
    var dateAge = 31 + currentDate - dobdobDate;  

    if (monthAge < 0) {  
      monthAge = 11;  
      yearAge--;  
    }  
  }  
  //group the age in a single variable  
  const petAge = {
  years: yearAge,  
  months: monthAge,  
  days: dateAge  
}  
      
let ageString = "";  
  if ( (petAge.years > 0) && (petAge.months > 0) && (petAge.days > 0) )  
      ageString = petAge.years + ` year${petAge.years > 1 ? "s" : ""}, ` + petAge.months + ` month${petAge.months > 1 ? "s" : ""}, and ` + petAge.days + ` day${petAge.days > 1 ? "s" : ""} old.`;  
  else if ( (petAge.years == 0) && (petAge.months == 0) && (petAge.days > 0) )  
     ageString = "Only " + petAge.days + ` day${petAge.days > 1 ? "s" : ""} old.`;  
  //when current month and date is same as birth date and month  
  else if ( (petAge.years > 0) && (petAge.months == 0) && (petAge.days == 0) )  
     ageString = petAge.years +  ` year${petAge.years > 1 ? "s" : ""} old.`;  
  else if ( (petAge.years > 0) && (petAge.months > 0) && (petAge.days == 0) )  
     ageString = petAge.years + ` year${petAge.years > 1 ? "s" : ""} and ` + petAge.months + ` month${petAge.months > 1 ? "s" : ""} old.`;  
  else if ( (petAge.years == 0) && (petAge.months > 0) && (petAge.days > 0) )  
     ageString = petAge.months + ` month${petAge.months > 1 ? "s" : ""} and ` + petAge.days + ` day${petAge.days > 1 ? "s" : ""} old.`;  
  else if ( (petAge.years > 0) && (petAge.months == 0) && (petAge.days > 0) )  
     ageString = petAge.years + ` year${petAge.years > 1 ? "s" : ""} and ` + petAge.days + ` day${petAge.days > 1 ? "s" : ""} old.`;  
  else if ( (petAge.years == 0) && (petAge.months > 0) && (petAge.days == 0) )  
     ageString = petAge.months + ` month${petAge.months > 1 ? "s" : ""} old `;  
  //when current date is same as dob(date of birth)  
  else ageString = "1 day Old";   

  //display the calculated age  
  return ageString;   
             

}  

export function titleCase(str:any) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}


export const fetchingMatchedData = async (dataDirectory:any,setState:React.Dispatch<any>) => {
  const docSnap = await getDoc(doc(db,dataDirectory));
  if (docSnap.exists()) {
    const fetchedData = {
      id: docSnap.id,
      ...docSnap.data(),
    };
    setState(fetchedData);
  } else {
    console.log("No such document");
  }
};

export const updatingData = async (dataDirectory:any,incomingData: any) => {
  await updateDoc(doc(db, dataDirectory), { ...incomingData }, { merge: true });
  console.log("The value has been written to the database");
};


export function checkUserifLiked(array: any[], uid: string) {
  const result = array.includes(uid);
  if (result) {
    return true;
  } else {
    return false;
  }
}

export async function handleClickLiked(uid:any,itemId:any,liked:boolean,setLiked:React.Dispatch<React.SetStateAction<boolean>>,likedcount:number,setLikedCount:React.Dispatch<React.SetStateAction<number>>) {
  setLiked(!liked);
  if (liked == true) {
    setLikedCount(likedcount - 1);
  } else {
    setLikedCount(likedcount + 1);
  }
  
  const petsDataDirectory = doc(db, "pets", itemId);
  if(liked){
    await updateDoc(petsDataDirectory, {
      heart: arrayRemove(uid)
    });
  }
  else{
    await updateDoc(petsDataDirectory, {
      heart: arrayUnion(uid)
    });
  }
  
}


export const fetchingSingleData = async (dataDirectory:any,setState:React.Dispatch<any>) => {
  const docSnap = await getDoc(doc(db,dataDirectory));
  if (docSnap.exists()) {
    const fetchedData = {
      id: docSnap.id,
      ...docSnap.data(),
    };
    setState(fetchedData);
  } else {
    console.log("No such document");
  }
};



