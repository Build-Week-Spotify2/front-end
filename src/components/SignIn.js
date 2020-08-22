import React, {useState, useEffect} from 'react';
import * as yup from "yup";
import {axiosWithAuth} from '../utils/axiosWithAuth';




const SignIn = (props) => {

//form visibility
function showLogin() {
    document.getElementById('login-form').style.display='flex';
    document.getElementById('signup-form').style.display='none';
}

function showSignUp() {
    document.getElementById('signup-form').style.display='flex';
    document.getElementById('login-form').style.display='none';
}

//form state 
const [formState, setFormState] = useState({
    username: "",
    password:"",   
})

const [errors, setErrors] = useState({
    username: "", 
    password: ""
})


//posting functionality
const loginUser = (e) => {
    e.preventDefault();

    axiosWithAuth()
    .post('/auth/login', formState)
    .then((res) => {
        console.log('succesful login', res)
        localStorage.setItem('auth-token', res.data.token)
        // window.location.href='/dashboard';
        props.history.push('/dashboard')
    })
    .catch((res) => {
        console.log('login failed', res)
    })
}

const registerUser = (e) => {
    e.preventDefault();
    
    axiosWithAuth()
    .post('/auth/register', formState)
    .then((res) => {
        console.log('succesful registration', res)
        localStorage.setItem('auth-token', res.data.token)
        props.history.push('/dashboard')
    })
    .catch((res) => {
        console.log('registration failed', res)
        
    })
}

//form validation
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

//change handlers
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
                <form id='login-form' onSubmit={loginUser}>

                    <label htmlFor="username">
                        Username
                        <input
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
                        type="password"
                        name="password"
                        value={formState.password}
                        minLength="6" required
                        onChange={inputChange}
                        />
                        {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null}
                    </label>

                    <button type="submit">Login</button>
                    <div onClick={showSignUp} className='new-user-toggle'>New User? Register Here</div>

                </form>

                <form id='signup-form' onSubmit={registerUser}>

                    <label htmlFor="username">
                        Username
                        <input
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
                        type="password"
                        name="password"
                        value={formState.password}
                        minLength="6" required
                        onChange={inputChange}
                        />
                        {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null}
                    </label>

                    <button type="submit">Sign Up</button>
                    <div onClick={showLogin} className='new-user-toggle'>Already Registered? Login Here</div>

                </form>
    </>)
}

export default SignIn;