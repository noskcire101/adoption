import { addDoc } from "firebase/firestore";
import { postFormSavingState } from "../../yupModels/Form";
import { dataURIToBlob, resizeFile } from "../../reusableFunctions/reusablefunctions";

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

  export const addingData = async (dataCollection:any, incomingData: postFormSavingState ) => {
    const addedData = await addDoc(dataCollection, { ...incomingData});
    return addedData.id;
  }

  export const deletingFiles = async (index: any, setImageState:React.Dispatch<any>) =>{
    setImageState((prevImages: any) =>
      prevImages.filter((_: any, i: any) => i !== index)
    );
  }