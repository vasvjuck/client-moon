import React, { useState } from 'react'
import './Edit.scss';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Edit = () => {
    const navigate = useNavigate()

    const product = useSelector(state => state.oneGoods.oneGoods)

    const [name, setName] = useState('')
    const [ratings, setRatings] = useState('5')
    const [price, setPrice] = useState('')

    const editProduct = async (e, id) => {
        e.preventDefault()
        if (name === '' || price === '') {
            alert('Please enter data...')
        } else {
            try {
                const response = await fetch('https://moonshinercoding.herokuapp.com/api/edit', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id,
                        name,
                        ratings,
                        price
                    })
                })

                const data = await response.json()

                if (data.status === 'ok') {
                    navigate('/home')
                }
            } catch (error) {
                console.log('Error: ', error)
            }
        }
    }

    const deleteProduct = async (e, id) => {
        e.preventDefault()
        try {
            const response = await fetch('https://moonshinercoding.herokuapp.com/api/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                })
            })

            const data = await response.json()

            if (data.status === 'ok') {
                navigate('/home')
            }
        } catch (error) {
            console.log('Error: ', error)
        }
    }
    return (
        <div className='edit'>
            <div className='edit__right'>
                <img src={product.imgSrc} />
                <div className='right__content'>
                    <h3>{product.name}</h3>
                    <div className='rating'>
                        <p>Rating: </p> <span>{product.ratings}</span>
                        <p>Price: </p> <span>{product.price}$</span>
                    </div>

                </div>
            </div>
            <div className='edit__left'>
                <form>
                    <h2>Edit your product</h2>
                    <div className='inputs'>
                        <div className='content'>
                            <p>Change name</p>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Enter your new name...'
                            />
                        </div>
                        <div className='content'>
                            <p>Change rating</p>
                            <select
                                className='filter'
                                value={ratings}
                                onChange={(e) => setRatings(e.target.value)}
                            >
                                <option value='5'>5</option>
                                <option value='4'>4</option>
                                <option value='3'>3</option>
                                <option value='2'>2</option>
                                <option value='1'>1</option>
                            </select>
                        </div>
                        <div className='content'>
                            <p>Change price</p>
                            <input
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder='Enter your new price...'
                            />
                        </div>
                        <div className='btn_block'>
                            <button className='btn' onClick={(e) => editProduct(e, product.id)}>Edit</button>
                            <button className='btn delete' onClick={(e) => deleteProduct(e, product.id)}>Delete</button>


                        </div>
                        <Link to="/home" className='btn one'>Go back</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit