import React, {useState, useEffect} from 'react';
import * as yup from "yup";
// import styled from 'styled-components'


const SignIn = () => {
  
const [formState, setFormState] = useState({
    username: "",
    password:"",
    
})

const [errors, setErrors] = useState({
    username: "", 
    password: ""
})


const formSubmit = (e) => {
    e.preventDefualt();
    console.log("form submitted")
}

useEffect(() => {
    console.log('Validating form')
    formSchema.isValid(formState)
}, [formState])

const formSchema = yup.object().shape({
    username: yup.string().required("Must include a username"),
    password: yup.string().required('Must Enter a password').min(5, 'Password must be at least 5 characters')

});

 const validateChange = (e) => {
    yup  
       .reach(formSchema, e.target.name).validate(e.target.value)
       .then(vaild => {
      setErrors({
          ...errors,
          [e.target.name]: ''    
        });
    })
   .catch((err) => {
       console.log(err);

       setErrors({
           ...errors,
           [e.target.name]: err.errors[0]
       });
   });

};



const inputChange = (e) => {
    e.persist();
    // console.log("input changed", e.target.value);
    const newFormData = {
        ...formState,
        [e.target.name]: e.target.value
    }
    validateChange(e);
    setFormState(newFormData)
}

    return(<>
                <form onSubmit={formSubmit}>

                    <label htmlFor="username">
                        Username
                        <input
                        id="username"
                        type="text"
                        name="username"
                        value={formState.email}
                        onChange={inputChange}
                        />
                        {errors.username.length > 0 ? <p className='error'>{errors.username}</p> : null}
                    </label>

                    <label htmlFor="password">
                        Password
                        <input
                        id="password"
                        type="password"
                        name="password"
                        value={formState.password}
                        minLength="6" required
                        onChange={inputChange}
                        />
                        {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null}
                    </label>

                    <button  type="submit">Submit</button>

                </form>
    </>)
}

export default SignIn;