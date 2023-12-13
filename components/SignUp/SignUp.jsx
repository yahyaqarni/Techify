import React, { useState } from 'react'
import TextField from '../TextField/TextField'
import styles from './signup.module.css'
import Lottie from 'react-lottie'
import  animationData from '../../lotties/signup-lottie.json'
import validator from 'email-validator' 
import passwordValidator from 'password-validator'
import { withSwal } from 'react-sweetalert2';
import { signIn } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/router'


//var passwordValidator = require('password-validator');

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

var schema  = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(50)                                  // Maximum length 50
.has().uppercase(1)                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().symbols(1)
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values



function SignUp({swal}) {

    const [state, setState] = useState({
        fName : "",
        lName: "",
        Email: "",
        Password: "",
        rePass: "",
        street: "",
        city: "",
        province: "",
        country: "Pakistan",
        zipcode: "",
        phone: ""
    });

    const router = useRouter();
    const [buttonState, setButtonState] = useState(false);
    const [msgState, setMsgState] = useState({
        emailMsg: "",
        passMsg: "",
        rePassMsg: ""
    });


    function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
        if(evt.target.name === 'Email')
        {
            if(!validator.validate(value))
            {
                setMsgState({
                    emailMsg: "Email must be correct!"
                })
                setButtonState(true)
            }
            else {
                setMsgState({
                    emailMsg: ""
                })
                setButtonState(false)
                }
        }

        if(evt.target.name === 'Password')
        {
            console.log(value)
            console.log(schema.validate(value))
            if(!schema.validate(value))
            {
                setMsgState({
                    passMsg: "Password must contain at least 8 characters and must include atleast 2 digits, 1 Uppercase and a special character."
                })
                setButtonState(true)
            }
            else
            setMsgState({
                passMsg: ""
            })
                setButtonState(false)
        }
        if(evt.target.name === 'rePass')
        {
            console.log(value)
            console.log(state.Password)
            if(value !== state.Password)
            {
                setMsgState({
                    rePassMsg: "Passwords must match"
                })
                setButtonState(true)
            }
            else
            setMsgState({
                rePassMsg: ""
            })
                setButtonState(false)
        }

      }
    
    async function onSubmit(e){
        e.preventDefault();
        await axios.post("/api/signup", state).then(async (response)=> {
            if(response.data === true)
            {
                const res = await signIn("Credentials", {
                redirect: false})
                if (res?.error) {
                    console.log(res.error);
                } 

                //If user signed successfully we redirect to the dashboard page
                if (res.url && res.ok === true) {
                router.push("/");
                }
            }
            else if (response.data.error === 1062)
            {
            swal.fire({
              title: 'Failed',
              text: 'User already registered please log in.',
              icon: 'error',
              confirmButtonColor: 'red',
              confirmButtonText: 'Ok'
          })
            }
        }).catch((err)=> {console.log(err)})
    }

  return (
    <div className={styles.swrapper}>
        <div className={styles.signupwrapper}>
            <div className={styles.sleft}>
                <h1 className={styles.h1}>Techify Store</h1>
                <h2 className={styles.h2}>SIGN UP</h2>
                <Lottie options={defaultOptions}
                    height={400}
                    width={400}
                />
            </div>
            <div className={styles.sright}>
                
                <form onSubmit={onSubmit} className={styles.signup} method='POST' onChange={handleChange}>
                    <TextField onChange={handleChange} type='text' name='fName' label='First Name *' placeholder= 'e.g Yahya' value={state.fName} />
                    <TextField onChange={handleChange} type='text' name='lName' label='Last Name *' placeholder= 'e.g Qarni' value={state.lName} />
                    <div className={styles.emailwrapper}>
                        <TextField onChange={handleChange} type='email' label='Email *' placeholder= 'e.g abc@example.com' value={state.Email} name='Email' />
                        <div><p> {msgState.emailMsg} </p></div>
                    </div>
                    <div className={styles.passwrap}>
                        <TextField onChange={handleChange} type='password' name='Password' label='Password *' placeholder= 'Password' value={state.Password} />
                        <div><p> {msgState.passMsg} </p></div>
                    </div>
                    <div className={styles.rePasswrap}>
                        <TextField onChange={handleChange} type='password' name='rePass' label='Retype Password *' placeholder= 'Retype' value={state.rePass} />
                        <div><p> {msgState.rePassMsg} </p></div>
                    </div>
                    
                    <TextField onChange={handleChange} type='text' name='street' label='Street *' placeholder= 'e.g 19 A steet' value={state.street} />
                    <TextField onChange={handleChange} type='text' name='city' label='City *' placeholder= 'e.g Lahore' value={state.city} />
                    <TextField onChange={handleChange} type='text' name='province' label='Province *' placeholder= 'e.g Punjab' value={state.province} />
                    <TextField onChange={handleChange} type='text' name='country' label='Country *' placeholder= 'e.g Pakistan' value={state.country} />
                    <TextField onChange={handleChange} type='text' name='zipcode' label='Zipcode *' placeholder= 'e.g 54000' value={state.zipcode} />
                    <TextField onChange={handleChange} type='text' name='phone' label='Phone *' placeholder= 'e.g 0300-0000123' value={state.phone} />

                    <button type='Submit' className={[styles.loginButton, styles.signupButton]} disabled={buttonState}>REGISTER</button>
                    
                </form>
            </div>
        </div>
    </div>
    )
}


export default withSwal(({swal}, ref) => (
  <SignUp swal={swal} />
));