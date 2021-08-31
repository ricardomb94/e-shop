import {Button, Col, Form, Row} from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import FormContainer from '../components/FormContainer'
import {Link} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {login} from '../actions/usersActions'

const LoginScreen = ({location, history}) => {

    const[email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1]: '/'
    useEffect(() => {
        if (userInfo){
           history.push(redirect)
        }

    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1>Connexion</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                <Form.Label>Adresse E-mail</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Renseignez votre e-mail'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                 <Form.Group controlId='password'>
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control

                    type='password'
                    plaholder='Renseignez votre mot de passe'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Connexion
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Nouveau?{''}
                    <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>
                        Créer un compte
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
