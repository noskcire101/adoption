
import Resizer from "react-image-file-resizer";


export const convertToTitleCase = (str:any) => {
    const titleCase = str.toLowerCase().split(' ').map(function (s:any) {
      return s.charAt(0).toUpperCase() + s.substring(1);
  }).join(' ');
  return titleCase;
  }


  export function formatDate(date:Date){
    const d = new Date(date);
    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  return(`${day}-${month}-${year}`);
  }


  export const resizeFile = (file: any) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

  export const dataURIToBlob = (dataURI: any) => {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  };