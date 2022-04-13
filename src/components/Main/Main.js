import React, { useState, useEffect } from 'react';
import './Main.scss';
import SquareIcon from '@mui/icons-material/Square';
import SearchIcon from '@mui/icons-material/Search';
import { MenuItems } from '../../Data.js'
import MenuItem from '../MenuItem';
import ItemList from '../ItemList';
import { useSelector, useDispatch } from 'react-redux';
import { GoodsAction } from '../../store/reducer/allGoods'



const Main = () => {
    const userData = useSelector(state => state.user.userData)
    const goods = useSelector(state => state.goods.goods)
    const dispatch = useDispatch()

    const [menu] = useState(MenuItems)
    const [items, setItems] = useState(goods.filter((element) => element.itemId === 'bed01'))
    const [inputValue, setInputValue] = useState('')
    const [filterValue, setFilterValue] = useState('')
    const [currentMenu, setCurrentMenu] = useState('bed01')

    const setData = (itemId) => {
        setItems(goods.filter((element) => element.itemId === itemId));
        setCurrentMenu(itemId)
    };

    const sortData = (e) => {
        setFilterValue(e.target.value)

        if (e.target.value === 'expensive') {
            setItems(items.sort((l, r) => r.price - l.price))
        } else {
            if (e.target.value === 'cheaper') {
                setItems(items.sort((l, r) => l.price - r.price))
            } else {
                if (e.target.value === 'quality') {
                    setItems(items.sort((l, r) => r.ratings - l.ratings))
                }
            }
        }
    }

    const fetchGoods = async () => {
        try {
            const response = await fetch('https://moonshinercoding.herokuapp.com/api/allGoods', {
                method: 'GET',
            })

            const data = await response.json()
            dispatch({ type: GoodsAction.type, payload: data });
            setItems(data.filter((element) => element.itemId === 'bed01'))
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    useEffect(() => {
        fetchGoods()
    }, [])

    useEffect(() => {
        const element = items.filter(el => el.name.toLowerCase().includes(inputValue.trim().toLowerCase()))
        setItems(element)
        if (inputValue === '') {
            setData(currentMenu)
        }
    }, [inputValue])

    useEffect(() => {
        const menuCard = document
            .querySelector(".list")
            .querySelectorAll(".list__item");

        function setMenuCardActive() {
            menuCard.forEach((n) => n.classList.remove("active"));
            this.classList.add("active");
        }

        menuCard.forEach((n) => n.addEventListener("click", setMenuCardActive));
    }, [items])

    return (
        <main>
            <div className='main__title'>
                <SquareIcon />
                <div className='content'>
                    <h2>Welcome {userData.username}!</h2>
                    <p>Your role: {userData.role}</p>
                </div>
                <SquareIcon />
            </div>
            <div className='form'>
                <div className='search'>
                    <div className='inputBar'>
                        <SearchIcon />
                        <input
                            value={inputValue}
                            onChange={(e) => { setInputValue(e.target.value) }}
                            placeholder='Search furniture'
                        />
                    </div>
                    {/* <button className='btn'>Apply</button> */}
                </div>
                <div className='filterBar'>
                    <select
                        className='filter'
                        value={filterValue}
                        onChange={sortData}
                    >
                        <option >Filter by:</option>
                        <option value="expensive">From expensive to cheaper</option>
                        <option value="cheaper">From cheap to expensive</option>
                        <option value="quality">By quality</option>
                    </select>
                </div>
            </div>
            <div className='list'>
                {
                    menu && menu.map((data) => (
                        <div className='list__content' onClick={() => setData(data.itemId)} key={data.id}>
                            <MenuItem
                                data={data}
                                key={data.id}
                                isActive={data.itemId === "bed01" ? true : false}
                            />
                        </div>))
                }
            </div>
            <div className='mainList'>
                {
                    items && items.map((data) => (
                        <ItemList userData={userData} data={data} key={data.id} />
                    ))
                }
            </div>
        </main>
    )
}

export default Main