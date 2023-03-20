import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import LoadingSpinner from '../LoadingSpinner';
import Modal from '../Modal';

const SignIn = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);

    const onSubmitSignIn = (data) => {
        setIsLoading(true);
        fetch(process.env.REACT_APP_API_URL+'/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Something went wrong');
        })
        .then(
            (user) => {
            if (user.id) {
                setIsLoading(false)
                props.loadUser(user)
                props.onRouteChange('home')
                }
            })
        .catch(err => {
            setIsLoading(false)
            setIsShowModal(true)
            console.log('error sign in', err);
        })   
    }

    const handleCloseModal = () => {
        setIsShowModal(false)
    }

  return (
    <>
        {isLoading ? <LoadingSpinner /> : 
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                { isShowModal ? <Modal handleClose={handleCloseModal}>
                    <span>Please check your email and password</span>
                </Modal> : null }
                <main className="pa4 black-80 tc">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" name="email-address"  id="email-address"
                            {...register('email', { required: true, pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format"}})
                            }
                            />
                            {errors.email && (
                                <small className='red' role="alert">
                                {errors.email.message}
                                </small>
                            )}
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" name="password"  id="password"
                            {...register('password', { required: true })}
                            />
                            {errors.password && (
                                <small className='red' role="alert">
                                This field is required
                                </small>
                            )}
                        </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                onClick={handleSubmit(onSubmitSignIn)} disabled={isLoading}
                                type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                        <p href="#0" onClick={() => props.onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        }
    </>
  )
}

export default SignIn