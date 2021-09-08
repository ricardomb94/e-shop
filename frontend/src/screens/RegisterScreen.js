import { Button, Col, Form, Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {register} from '../actions/usersActions'

const RegisterScreen = ({location, history}) => {

    const [name, setName] = useState('')
    const[email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1]: '/'
    useEffect(() => {
        if (userInfo){
            history.push( redirect )
        }

    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Le mot de passe ne correspond pas')
        }else{
            dispatch(register(name, email, password))
        }

    }
    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label>Your name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email adress</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter your email adress'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                 <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        plaholder='Enter your email password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm your password</Form.Label>
                    <Form.Control
                        type='password'
                        plaholder='Confirm your passeword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already have an account?{''}
                    <Link to={redirect ? `/login?redirect=${redirect}`: '/login'}>
                        Sign in
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
