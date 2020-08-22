import React, {useState, useEffect} from 'react';
import * as yup from "yup";
import styled from 'styled-components'


const SignIn = () => {
  
const [formState, setFormState] = useState({
    email: "",
    password:"",
    
})

const [errors, setErrors] = useState({
    email: "", 
    password: ""
})


const formSubmit = (e) => {
    e.preventDefualt();
    console.log("form submitted")
}

const inputChange = (e) => {
    console.log("input changed", e.target.value);
    const newFormData = {
        ...formState,
        [e.target.name]:e.target.value
    }
    validateChange(e.target);
    setFormState(newFormData)
}


const formSchema = yup.object().shape({
    email: yup
    .string()
    .email("Must be a vaild email")
    .required("Must include an email"),
    password:yup
    .string()
    .required("Password is a required field")
    .password("Must be a vaild password")

});

 const validateChange = (e) => {
 console.log(e)
    yup  
       .reach(formSchema, e.name)
       .then((vaild) => {
      setErrors({
          ...errors,
          [e.name]:""      
        });
    })
   .catch((err) => {
       console.log(err);

       setErrors({
           ...errors,
           [e.name]: err.errors[0]
       });
   });

};










    return(<>
      <form onSubmit={formSubmit}>


<label htmlFor="email">
    Email
    <input
    id="email"
    type="text"
    name="email"
    value={formState.email}
    onChange={inputChange}
    />
    
</label>

<label htmlFor="password">
    Password (15 characters minimum):
    <input
    id="password"
    type="password"
    name="password"
    value={formState.password}
    minLength="6" required
    onChange={inputChange}
    />
   
</label>


<button  type="submit">Submit</button>
    </form>
    </>)
}

export default SignIn;