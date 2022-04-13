import React from 'react'

const MenuItem = ({ data, isActive }) => {
    return (
        <li className={`list__item ${isActive ? `active` : ``}`}>
            <img src={data.imgSrc} alt={data.name} />
            <p>{data.name}</p>
        </li>
    )
}

export default MenuItem