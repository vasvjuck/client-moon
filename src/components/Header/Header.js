import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserAction } from '../../store/reducer/addUserReducer'
import './Header.scss'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const removeUser = (e) => {
        e.preventDefault();
        dispatch({ type: UserAction.type, payload: [] });
        navigate('/login')
    }

    return (
        <header>
            <div className='logo'>
                <h2>LieSitPut</h2>
            </div>
            {
                location.pathname === ('/login') || location.pathname === ('/') ? ('') : (<button onClick={(e) => removeUser(e)} className='btn'>Log Out</button>)
            }
        </header>
    )
}

export default Header