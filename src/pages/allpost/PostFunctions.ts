import { DocumentReference, addDoc, getDoc, updateDoc, arrayUnion, getCountFromServer, arrayRemove, query, where, or, and, deleteDoc, orderBy} from "firebase/firestore";
import { petsFormFinal } from "../../yupModels/Form";
import { dataURIToBlob, resizeFile } from "../../reusableFunctions/covert";
import { DocumentData, QuerySnapshot, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../database/firebase";
import { Dispatch, SetStateAction, useState } from "react";
import { deleteObject, getDownloadURL, listAll,  ref } from "firebase/storage";




export const renderCorrectImageBasedOnName = (array: any[], refImageName: string,categories:any) =>{
  const result = array.find(({ name }) => name === refImageName);
  if (result) {
    return result.url;
  } else {
    return categories[0]?.url;
  }
}

export const deletingItemTotally = async (
  dataDirectory:any,filesDirectory:any,backToHome:() => void
) => {
 
 await deleteDoc(doc(db, dataDirectory));
 await listAll(ref(storage, filesDirectory)).then((response) => {
   response.items.forEach((item) => {
     getDownloadURL(item).then(() => {
         deleteObject(ref(storage, `${filesDirectory}/${item.name}`));
     });
   });
 });
 backToHome()
};


export const selectingFiles:any = async (event: React.ChangeEvent<HTMLInputElement>,setImageState:React.Dispatch<any>,imageState:any,toastMessageError: (param: string) => void,setLoader:React.Dispatch<React.SetStateAction<boolean>>,setCover:React.Dispatch<any>) => {
  
    if (event.target.files !== undefined) {
      setLoader(true)
      let isDone = true;
      const files: FileList | null = event.target.files;
      let countingExistingImages = imageState.length;
      let pickingOnlyTheFirstIndexOnFirtLoad = 0;
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
              countingExistingImages++;
          pickingOnlyTheFirstIndexOnFirtLoad++;
          if (countingExistingImages <= 6) {
                const resizedImage: any = await resizeFile(files![i]);
                const imageBlob: any = dataURIToBlob(resizedImage);
              setImageState((prevImages: any) => [
                ...prevImages,
                {
                  blob: imageBlob,
                  name: files![i].name,
                  url: URL.createObjectURL(files![i]),
                  age: "new"
                },
              ]);
              if (pickingOnlyTheFirstIndexOnFirtLoad == 1 && imageState.length == 0) {
                setCover(files![i].name);
                console.log(files![i].name);
              }
            }else {
              toastMessageError(
                `${
                  files![i].name
                } will not be included since you already have reached the upload limit`
              );
            }
          }
      }
      isDone = false
    }
    setLoader(isDone)
  }
}
export const deletingFiles = async (index: any, setImageState:React.Dispatch<any>) =>{
  setImageState((prevImages: any) =>
    prevImages.filter((_: any, i: any) => i !== index)
  );
  
}
export const addingDocument = async (targetDirectory:any, incomingData: petsFormFinal ) => {
  const addedData = await addDoc(targetDirectory, { ...incomingData});
  return addedData.id;
}

function subtractMonths(months: any) {
  let d = new Date();
  d.setMonth(d.getMonth() - months);
  return d;
}
const threeMonths = subtractMonths(3);
const twelveMonths = subtractMonths(12);
const twentyyears = subtractMonths(240);


  
let start:any;
let end:any
const convertDate = (date: Date) => {
  let d = new Date(date);
  const dmonth =
    d.getMonth() < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
  const ddate = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  const finaldate = `${d.getFullYear()}-${dmonth}-${ddate}`;
  return finaldate;
};

export const getAllDocsInACollection = async (targetDirectory:any,setState:Dispatch<SetStateAction<any[]>>,type:string,gender:string,age:any,searchStringMain:any,setLoader:React.Dispatch<React.SetStateAction<boolean>>) =>{
  let filterValues = query(collection(db, targetDirectory));

  if(age=="below3"){
    start = threeMonths;
    end = new Date();
    console.log(start,end)
  }else if(age=="between3to12"){
    start = twelveMonths ;
    end =  threeMonths;
    console.log(start,end)
  }else if(age=="above12"){
    start = twentyyears ;
    end = twelveMonths;
    console.log(start,end)
  }

  if(type !== "all" && gender !== "all" && age !== "all" ){
   filterValues  = query(collection(db, targetDirectory), where('type', '==', type), where('gender', '==', gender), where('birthdate', '>=', start),where('birthdate', '<=', end));
  }
  else if(type == "all" && gender !== "all" && age !== "all" ){
    filterValues  = query(collection(db, targetDirectory), where('gender', '==', gender), where('birthdate', '>=', start),where('birthdate', '<=', end));
  }
  else if(type !== "all" && gender == "all" && age !== "all" ){
    filterValues  = query(collection(db, targetDirectory), where('type', '==', type), where('birthdate', '>=', start),where('birthdate', '<=', end));
  }
  else if(type !== "all" && gender !== "all" && age == "all" ){
    filterValues  = query(collection(db, targetDirectory), where('type', '==', type), where('gender', '==', gender));
  }
  else if(type !== "all" && gender == "all" && age == "all" ){
    filterValues  = query(collection(db, targetDirectory),where('type', '==', type));
  }
  else if(type == "all" && gender !== "all" && age == "all" ){
    filterValues  = query(collection(db, targetDirectory),where('gender', '==', gender));
  }
  else if(type == "all" && gender == "all" && age !== "all" ){
    filterValues  = query(collection(db, targetDirectory),where('birthdate', '>=', start),where('birthdate', '<=', end));
  }

  
  const querySnapshot  = await getDocs(filterValues);
  const document:any =[];
  let finalResult:any =[];
  if (querySnapshot ) {
    querySnapshot .forEach((doc) => {
        document.push({
          ...doc.data(),
          id: doc.id
        });
      });
    }
    else{
      console.log("not connected")
    }
    if (searchStringMain == "" || searchStringMain == "all") {
      const sortedByDate = document.sort((a:any, b:any) => b.timestamp.valueOf() - a.timestamp.valueOf());
      setState(sortedByDate);
      setLoader(false)
    } else {
      const sortedByDate = document.sort((a:any, b:any) => b.timestamp.valueOf() - a.timestamp.valueOf());
      finalResult = sortedByDate.filter((param: any) =>
        param.pet.toLowerCase().includes(searchStringMain.toLowerCase()) || param.breed.toLowerCase().includes(searchStringMain.toLowerCase())
      );
      setState(finalResult);
      setLoader(false)
    }
}




export const getAllInfoInADocument = async (targetDirectory:any,setState:React.Dispatch<any>) => {
  const querySnapshot  = await getDoc(doc(db,targetDirectory));
  if (querySnapshot .exists()) {
    const fetchedData = {
      id: querySnapshot .id,
      ...querySnapshot .data(),
    };
    
    setState(fetchedData);
    
  } else {
    console.log("No such document");
   
  }
};

export const updatingData = async (targetDirectory:any,incomingData: any) => {
  await updateDoc(doc(db, targetDirectory), { ...incomingData }, { merge: true });
  console.log("The value has been written to the database");
  
};



let yearVal:any;
let monthVal:any;
let dateVal:any;

function calculateDate(date:Date){
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
    monthVal = monthAge;
    yearVal = yearAge
    dateVal = dateAge
}

export function ageCalculator(date:Date) {  

 calculateDate(date)
  //group the age in a single variable  
  const petAge = {
    years: Number(yearVal),  
    months: Number(monthVal),  
    days: Number(dateVal)  
  }      
  let ageString = "";  
  if ( (petAge.years > 0) && (petAge.months > 0) && (petAge.days > 0) )  
      ageString = petAge.years + ` year${petAge.years > 1 ? "s" : ""}, ` + petAge.months + ` month${petAge.months > 1 ? "s" : ""}, and ` + petAge.days + ` day${petAge.days > 1 ? "s" : ""} old.`;  
  else if ( (petAge.years == 0) && (petAge.months == 0) && (petAge.days > 0) )  
     ageString = petAge.days + ` day${petAge.days > 1 ? "s" : ""} old.`;  
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
  if(str){
    str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
  }
  else{
    return "";
  }
}


export function checkUserifLiked(array: any[], uid: string) {
  if(uid && array){
    const result = array.includes(uid);
    if (result) {
      return true;
    } else {
      return false;
    }
  }
  else{
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






