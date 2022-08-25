import React, { useEffect, useState } from "react";
import './Modal.css';

const Modal = ({active, setActive}) => {

    const[user, setUser] = useState('');
    const[userDirty, setUserDirty] = useState(false);
    const[userError, setUserError] = useState('this field for user name  must not be empty');

    const [email, setEmail] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [emailError, setEmailError] = useState('this field must not be empty');

    const [telephone, setTelephone] = useState('');
    const [telephoneDirty, setTelephoneDirty] = useState(false);
    const [telephoneError, setTelephoneError] = useState('this field for phone must not be empty');
    
    const [formValid, setFormValid] = useState(false);

    const [formSubmited, setFormSubmited] = useState(false);




    useEffect( () => {
        if(emailError || userError || telephoneError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [userError, emailError, telephoneError])

    const userHandler = (e) => {
        setUser(e.target.value)
        if(e.target.value.length < 2 ) {
            setUserError('Value must be more than 2 symbols')
        } else {
            setUserError('')
        }
    }

    const emailHandler = (e) => {
       setEmail(e.target.value)
       // eslint-disable-next-line
       const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
       if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Email not correct')
       } else {
        setEmailError('')
       }
    }

    const telephoneHandler = (e) => {
        setTelephone(e.target.value)
        if(e.target.value.length < 2) {
            setTelephoneError('Value must be more than 2 symbols')  
        } else if (e.target.value.length >= 13){
            setTelephoneError('Value must be not more than 13 symbols and equal this')
        } else {
            setTelephoneError('')
        }
    } 
     



    const blurHandler = (e) => {
  
        const fieldName = e.target.name
        if ( fieldName === 'email') {
            setEmailDirty(true);
            return
        } 
        if ( fieldName === 'telephone') {
            setTelephoneDirty(true);
            return
        }
        if ( fieldName === 'user') {
            setUserDirty(true);
            return
        }
    }

    
    const resetFields = () => {
        setUser('');
        setEmail('');
        setTelephone('');
    }
 
   const submitHandle = (e) => {
        resetFields();
         setFormSubmited(true);
         e.preventDefault(); 
        setTimeout(() => setFormSubmited(false), 3000)      
   }


    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)} method="post">
            <div className={active ? "modal__content" : "modal"} onClick={e => e.stopPropagation()}>
                <form onSubmit={e => submitHandle(e)} className="form">
                    <p className={!formSubmited ? "hidden" : "success-message"}>Form submitted successfully</p>

                    <input onChange={e => userHandler(e)} onBlur={e => blurHandler(e)} value={user} className="input" type='text'  placeholder='User Name' name="user"></input>
                    {(userDirty && userError) && <p style={{color: 'red'}}>{userError}</p>}

                    <input onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} className="input" type='text' name="email" placeholder='Email'></input>
                    {(emailDirty && emailError) && <p style={{color: 'red'}}>{emailError}</p>}

                    <input onBlur={e => blurHandler(e)}  onChange={e => telephoneHandler(e)} value={telephone} className="input tel" placeholder="Phone" name="telephone" maxLength={13}></input>
                    {(telephoneDirty && telephoneError) && <p style={{color: 'red'}}>{telephoneError}</p>}

                    
                    <button  disabled={!formValid} className="snd-btn">Send</button>
                </form>
            </div>
        </div>
    )
};

export default Modal;