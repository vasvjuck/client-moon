import React, { useState } from 'react';
import './Auth.scss';
import { useNavigate, Link } from 'react-router-dom'


const SignUp = () => {

    const navigate = useNavigate();

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('admin')
    const [valid, setValid] = useState(false)

    const addUser = async (e) => {
        e.preventDefault()

        if (username === '' || password === '') {
            alert('Please enter data...')
        } else {
            const response = await fetch('https://moonshinercoding.herokuapp.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                    role
                })
            })
            const data = await response.json()
            if (data.status === 'ok') {
                navigate('/login')
                setValid(true)
            } else {
                alert(data.error)

            }
        }
    }

    return (
        <form className='container'>
            <h2>Sign Up</h2>
            <div className='content'>
                <p>Username</p>
                <input
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder='Enter your username...'
                />
            </div>
            <div className='content'>
                <p>Password</p>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password...'
                />
            </div>
            <div className='content'>
                <p>Admin/User</p>
                <select
                    className='filter'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder='Enter your role...'
                >
                    <option value='admin'>Admin</option>
                    <option value='user'>User</option>
                </select>
            </div>
            <button onClick={addUser} disabled={valid} type='submit'>Sign Up</button>
            <p className='log'>Already have an account?<Link to="/login" className='btn'>Log In</Link></p>
        </form>
    )
}

export default SignUp