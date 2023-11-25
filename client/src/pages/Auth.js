import React, { useEffect } from 'react'
import background_image from '../assets/bg_img.jpg'
import * as api from '../api/index.js';
import CustomInput from '../components/CustomInput.js';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import secureLocalStorage from 'react-secure-storage';
import { useState } from 'react';
import { getUserFromJWT } from '../utils/User.js';
function Login() {
    const user = getUserFromJWT()

    const [ isLogin , setIsLogin] = useState(true) // change to mode login or register based on this state
    useEffect(() => {
        if (user) navigate('/')
    }, [])

    const navigate = useNavigate()
    const defaultState = {
        username: '',
        password: ''
    };

    const defaultStateError = {  // validate form client side 
        usernameErr: false,
        passwordErr: false
    };

    const [formData, setFormData] = useState(defaultState);
    const [formError, setFormError] = useState(defaultStateError);
    const handleFormChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value });
    }


    const handleLogin = async () => {
        console.log(formData)
        console.log(formError)

        if (!formData.username )  setFormError({ ...formError, usernameErr: true });
        else if (!formData.password ) setFormError({ ...formError, passwordErr: true });
        
        else {

            try {
                if(isLogin){
                    const { data } = await api.signIn(formData);  
                    secureLocalStorage.setItem('token' , data)
                }
                else {
                    const { data } = await api.signUp(formData);  
                    secureLocalStorage.setItem('token' , data)
                }
    
                navigate('/')
                setFormError(defaultStateError);
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: "une erreur s'est produit...",
                    text: error.response.data.message,
                  })
                  
            }
        }
        
       
    }

    
    return (
        <div
            style={{ backgroundImage: `url(${background_image})` }}
            className={`w-full bg-cover bg-center min-h-screen items-center flex z-0 md:justify-center justify-center`}
        >
            <div className='z-10 p-8 w-[500px] max-sm:w-[450px] space-y-4 rounded-2xl md:mr-10 bg-white bg-opacity-30 backdrop-blur-sm text-black'>
                <p className='text-center text-4xl bold' style={{ fontFamily: "Montserrat" }}>{isLogin ?  'Login' : 'Register'}</p>
                <CustomInput isError={formError.usernameErr} messageError="username required" name="username" labelName="Username" value={formData.username} onChange={handleFormChange} />
                <CustomInput isError={formError.passwordErr} messageError="password required" name="password" type='password' labelName="Mot de Passe" value={formData.password} onChange={handleFormChange} />
               
               
                <p className='text-xs ' style={{ fontFamily: "Montserrat" }}>{isLogin ?  
                 <span>Dont Have an Account? <a className='cursor-pointer font-bold' onClick={()=> setIsLogin(false)}>Register Now</a>  </span>
                :  <span>Already Have an Account? <a className='cursor-pointer font-bold'  onClick={()=> setIsLogin(true)} >Login here</a>  </span>}
                </p>
                <button className='rounded-md text-white px-6 py-2  bg-blue-600' onClick={handleLogin}> {isLogin ?  'Connexion' : 'Register'} </button>
            </div>

        </div>
    );
}


export default Login;