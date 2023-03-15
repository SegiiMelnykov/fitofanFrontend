import React, {useEffect, useRef, useState} from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegistrationMutation } from 'store/auth/auth.api';
import { useAuthActions } from 'hooks/authActions';
import { pathConst } from 'utils/pathConst';



const AuthComponent = () => {

    const location = useLocation();
    const isLoginpage:boolean = location.pathname === pathConst.LOGIN;
    const emailRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
    const [registeration, { isLoading: isLoadingReg }] = useRegistrationMutation();
    const { setCredentials } = useAuthActions();
    const dispatch = useDispatch()

    useEffect(() => {
        emailRef.current?.focus();
        setErr('')
    }, [isLoginpage])


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
            setErr(error.data.message)
        }
        
    }



    return (
        <Container 
        className="d-flex justify-content-center align-items-center"
            style={{ height: '80vh' }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className='m-auto'>{isLoginpage ? 'Sign in' : 'Sign up'}</h2>
                <p>{(isLoadingLogin || isLoadingReg) && 'Loading...'}</p>
                <p style={{ color: 'red', textAlign: 'center' }}> {err}</p>
                <Form className='d-flex flex-column'>
                    <Form.Control 
                        className='mt-2'
                        type='email'
                        placeholder='email'
                        ref={emailRef}
                        onChange={(e) => { setErr(''); setEmail(e.target.value)}}
                    />
                    <Form.Control 
                        className='mt-2' 
                        placeholder='password'
                        type='password'
                        onChange={(e) => { setErr(''); setPassword(e.target.value)}}
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

