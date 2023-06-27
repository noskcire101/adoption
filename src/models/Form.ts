import * as yup from "yup";


export const authFormSchema = yup.object().shape({
    email:yup
    .string()
    .email("Please provide a valid email address")
    .required("email address is required"),
    password:yup
    .string()
    .min(6,"Password should be a minimum lenght of 6")
    .max(12,"Password should have a maximum length of 12")
    .required("Password is required"),
    confirmPassword:yup
    .string()
    .oneOf([yup.ref("password")],"Password don't match")
    .required("confirm password required"),
});

export interface AuthForm{
    email:string;
    password:string;
    confirmPassword:string;
}