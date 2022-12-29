import { createContext, useState } from "react";
import axios from 'axios';

export const CatContext = createContext();

export const CatContextProvider = ({ children }) => {
    const [catList, setCatList] = useState([])
    const [catImage, setCatImage] = useState('')
    const [hasMoreItems, setHasMoreItems] = useState(true)

    const getCatApi = async (page) => {
        let url;
        if( page !== null && page > 0){
            url = `https://api.thecatapi.com/v1/breeds?limit=10&page=${page}`
        } else {
            url = `https://api.thecatapi.com/v1/breeds?limit=10&page=0`
        }
        const result = await axios.get(url)
        const data = await result.data
        setCatList(data)
        return data;
    }

    // const getCatDetail = async (id) => {
    //     const response = await axios.get(`https://api.thecatapi.com/v1/breeds/${id}`)
    //     const data = response.data
    //     setCatDetail({
    //         id: data.id,
    //         name: data.name,
    //         description: data.description,
    //         origin: data.origin
    //     })
    // }

    const getCatImage = async (id) => {
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`)
        const data = await response.data
        setCatImage(data)
    }

    const toggleDetail = (e, id) => {
        if(e.target.textContent === "See Detail") {
            e.target.textContent = "Hide Detail"
            e.target.parentElement.style.borderRadius = '3rem 3rem 0 0'
        }
        else {
            e.target.textContent = "See Detail"
            e.target.parentElement.style.borderRadius = '3rem'
        }
        e.target.parentElement.nextElementSibling.classList.toggle('show')
        getCatImage(id)
    }

    const loadCatList = (page) => {
        setTimeout(() => {
            getCatApi(page)
                .then(res => {
                    const newList = catList.concat(res)
                    setCatList(newList)

                    if(res.length === 0) setHasMoreItems(false)
                    else setHasMoreItems(true)
                })
        }, 1500)
    }

    return (
        <CatContext.Provider value={{ 
            getCatApi, getCatImage, catList, toggleDetail, catImage, loadCatList, hasMoreItems
        }}>
            {children}
        </CatContext.Provider>
    )
}