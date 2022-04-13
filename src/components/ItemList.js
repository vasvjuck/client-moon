import React from 'react';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { OneGoodsAction } from '../store/reducer/oneGoods'
import { useDispatch } from 'react-redux';

const ItemList = ({ userData, data }) => {

    const dispatch = useDispatch()


    const edit = async (id) => {
        try {
            const response = await fetch('https://moonshinercoding.herokuapp.com/api/oneGoods', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            })

            const data = await response.json()
            dispatch({ type: OneGoodsAction.type, payload: data });
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    return (
        <div className='mainList__item'>
            <img src={data.imgSrc} />
            <p>{data.name}</p>
            <div className='quality'>
                <StarIcon /><span>{data.ratings}</span>
                <MonetizationOnIcon /><span>{data.price}</span>
                {
                    userData.role === 'admin' ? (<Link to='/edit' className='edit' onClick={() => edit(data.id)}>Edit</Link>) : ('')
                }
            </div>
        </div>
    )
}

export default ItemList