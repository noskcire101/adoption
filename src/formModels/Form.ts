import * as yup from "yup";


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

export const convertToTitleCase = (str:any) => {
  const titleCase = str.toLowerCase().split(' ').map(function (s:any) {
    return s.charAt(0).toUpperCase() + s.substring(1);
}).join(' ');
return titleCase;
}
