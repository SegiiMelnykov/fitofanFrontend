import React, {useEffect, useRef, useState} from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegistrationMutation } from 'store/auth/auth.api';
import { useAuthActions } from 'hooks/authActions'; 
import { pathConst } from 'utils/pathConst';
import { text } from 'stream/consumers';


const AuthComponent = () => {

    const location = useLocation();
    const isLoginpage:boolean = location.pathname === pathConst.LOGIN;
    const emailRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');
    const navigate = useNavigate();

    const [login, { isError, isLoading }] = useLoginMutation();
    const [registeration, { isError: isErrorReg, isLoading: isLoadingReg }] = useRegistrationMutation();
    const { setCredentials } = useAuthActions();
    const dispatch = useDispatch()

    useEffect(() => {
        emailRef.current?.focus();
    }, [])
    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const submit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if(isLoginpage) {
                const userData = await login({ email, password }).unwrap();
                dispatch(setCredentials({...userData}))
                setEmail('')
                setPassword('')
                navigate(pathConst.DASHBOARD)
            } else {
                const userData = await registeration({ email, password }).unwrap();
                dispatch(setCredentials({ ...userData}))
                setEmail('')
                setPassword('')
                navigate(pathConst.DASHBOARD)
            }

        }
        
         catch (error:any) {
            console.log(error)
            if (parseInt(error?.originalStatus) === 401) {
                setErrMsg('Unauthorized') 
            } else if (parseInt(error?.originalStatus) === 403) {
                setErrMsg('Missing email or password')
            } else if (parseInt(error?.originalStatus) === 404) {
                setErrMsg('Wrong email or password') 
            } else {
                setErrMsg('Login filed')
            }
            errRef.current?.focus()
        }
    }


    return (
        <Container 
        className="d-flex justify-content-center align-items-center"
            style={{ height: '80vh' }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className='m-auto'>{isLoginpage ? 'Sign in' : 'Sign up'}</h2>
                <p>{isLoading && 'Loading...'}</p>
                <p style={{ color: 'red', textAlign: 'center' }}>{isError && errMsg}</p>
                <Form className='d-flex flex-column'>
                    <Form.Control 
                        className='mt-2' 
                        placeholder='email'
                        ref={emailRef}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control 
                        className='mt-2' 
                        placeholder='password'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='mt-2 align-self-start'>
                        {isLoginpage ? 
                            <span>Don't have an account? click <NavLink to={pathConst.REGISTER}>here</NavLink></span> : 
                            <span>Already have an account? click <NavLink to={pathConst.LOGIN}>here</NavLink></span>
                        }
                    </div>
                    <Button
                        className='mt-2 align-self-end'
                        variant='outline-success'
                        type='submit'
                        onClick={submit}
                    >
                        Submit
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default AuthComponent;

