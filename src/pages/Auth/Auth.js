import React, { useState } from 'react';
import './Auth.scss';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { UserAction } from '../../store/reducer/addUserReducer'
import { Link } from 'react-router-dom'


const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async (e) => {
        e.preventDefault()
        if (username === '' || password === '') {
            alert('Enter data')
        } else {
            const response = await fetch('https://moonshinercoding.herokuapp.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                })
            })
            const data = await response.json()

            if (password === data.password) {
                dispatch({ type: UserAction.type, payload: data });
                navigate('/home')
            } else {
                alert('Please enter correct data...')
            }
        }
    }

    return (
        <form className='container'>
            <h2>Login</h2>
            <div className='content'>
                <p>Username</p>
                <input
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder='Enter your username...' />
            </div>
            <div className='content'>
                <p>Password</p>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password...' />
            </div>
            <button onClick={loginUser} type='submit'>Login</button>
            <p className='log'>Want to SignUp?<Link to="/" className='btn'>Sign Up</Link></p>
        </form>
    )
}

export default Auth