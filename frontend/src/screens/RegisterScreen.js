import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
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
           history.push(redirect) 
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
            <h1>Enregistrement</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Votre Nom</Form.Label>
                <Form.Control 
                    type='name' 
                    placeholder='Renseignez votre nom'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control> 
                </Form.Group>

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
                <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirmez votre mot de passe</Form.Label>
                <Form.Control 
                    type='password' 
                    plaholder='Confirmez votre mot de passe'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control> 
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Enregistrement
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Vous avez déja un compte?{''}
                    <Link to={redirect ? `/login?redirect=${redirect}`: '/login'}>
                        Connectez-vous
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
