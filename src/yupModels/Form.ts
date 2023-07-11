import * as yup from "yup";
import { formatDate } from "../reusableFunctions/reusablefunctions";


export const authFormSchemaLogin = yup.object().shape({
    email:yup
    .string()
    .email("Please provide a valid email address")
    .required("email address is required"),
    password:yup
    .string()
    .required("Password is required"),
});
export interface AuthFormLogin{
  email:string;
  password:string;
}


export const authFormSchemaSignUp = yup.object().shape({
    fullName: yup
      .string()
      .max(40)
      .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/, 'Please enter valid name')
      .required(),
    email:yup
    .string()
    .email("Please provide a valid email address")
    .required("email address is required"),
    password:yup
    .string()
    .min(8,"Password should be a minimum lenght of 8")
    .max(12,"Password should have a maximum length of 12")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain atleast One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
    .required("Password is required"),
    confirmPassword:yup
    .string()
    .oneOf([yup.ref("password")],"Password don't match")
    .required("confirm password required"),
});

export interface AuthFormSignUp{
    fullName:string;
    email:string;
    password:string;
    confirmPassword:string;
    photoUrl?:string;
}

function subtractMonths(date:Date, months:number) {
  date.setMonth(date.getMonth() - months);
  return date;
}



  // let years10 = d.setFullYear(d.getFullYear() - 10);
  // var input = '01/01/1997';

  // var pattern =/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
  


// const d = new Date();
// let year = d.getFullYear();
// let day = d.getDate();
// let month = d.getMonth();
// let years10 = d.setFullYear(d.getFullYear() - 10);
  





const currentDate = new Date();
const fifthteenYearsEarlier = subtractMonths(currentDate, 180);

export const postFormSchemaCreate = yup.object().shape({
  street: yup
    .string()
    .min(8,"Street should be a minimum lenght of 8")
    .max(30,"Street should have a maximum length of 30")
    .required("Address required"),
  city: yup
    .string()
    .min(4,"City should be a minimum lenght of 4")
    .max(20,"City should have a maximum length of 12")
    .required("City name required"),
  state: yup
    .string()
    .min(4,"State should be a minimum lenght of 4")
    .max(20,"State should have a maximum length of 12")
    .required("State or Province name required"),
  contact: yup
    .string()
    .max(12,"Cellphone should have a maximum length of 12")
    .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Phone number is not valid')
    .required("Contact number required"),
  pet:yup
  .string()
  .min(3,"Pet's Name should be a minimum lenght of 3")
  .max(12,"Pet's Name should have a maximum length of 12")
  .required("Pet's name required"),
  type:yup
  .string()
  .matches(/Cat|Dog|Rabit|Guinea Pig|Bird|Others/g , "Please Select")
  .required("Please select type"),
  gender:yup
  .string()
  .matches(/Male|Female/g , "Please Select")
  .required("Please select gender"),
  breed:yup
  .string()
  .min(2,"Pet's breed should be a minimum lenght of 2")
  .max(12,"Pet's breed should have a maximum length of 12")
  .required("Pet's breed required"),
  birthdate:yup
  .date()
  .default(new Date())
  .min(fifthteenYearsEarlier, `start date should be beyond ${formatDate(fifthteenYearsEarlier)}`)
  .max(new Date(), "Set Date must not future date")
  .required("Please select birthdate"),
  dewormed:yup
  .string()
  .matches(/Yes|No/g , "Please Select")
  .required("Please select yes or no"),
  vaccinated:yup
  .string()
  .matches(/Yes|No/g , "Please Select")
  .required("Please select yes or no"),
  reason:yup
  .string()
  .min(8,"explanation should be a minimum lenght of 12")
  .max(120,"City should have a maximum length of 120")
  .required("Please add reason"),
});

export interface postForm {
  street: string
  city: string
  state: string
  contact: string
  fbaccount?: string
  pet:string
  type:string
  gender:string
  breed:string
  birthdate:Date
  dewormed:string
  vaccinated:string
  reason:string
}
export interface postFormSavingState {
  street: string
  city: string
  state: string
  contact: string
  fbaccount?: string
  pet:string
  type:string
  gender:string
  breed:string
  birthdate:Date
  dewormed:string
  vaccinated:string
  reason:string
  coverImage:string
}