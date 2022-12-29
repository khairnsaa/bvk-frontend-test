import { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './App.css';
import { CatContext } from './context/CatContext';

function App() {
    const { 
        getCatApi, toggleDetail, 
        catList, catImage, 
        loadCatList, hasMoreItems 
    } = useContext(CatContext)

    const [search, setSearch] = useState('')

    useEffect(() => {
        getCatApi(0)
    }, [])

    return (
        <div className="App">
            <h1 className='headline'>Cute Cat 😸</h1>
            <form>
                <input 
                    type="text" placeholder='Find A Cat 🐈' 
                    name='search' onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            {
                catList.length == 0 ? <p className="text-center">Loading ...</p>
                :
                <InfiniteScroll
                    threshold={0}
                    pageStart={0}
                    loadMore={loadCatList}
                    hasMore={hasMoreItems}
                    loader={<p className="text-center">loading data ...</p>}
                >
                    {
                        catList.filter(cat => {
                            return cat.name.toLowerCase() === '' ? cat.name : cat.name.toLowerCase().includes(search.toLowerCase())
                        }).map((cat) => (
                            <section className='content-list' key={cat.id}>
                                <div className="cat-list">
                                    <p>{cat.name}</p>
                                    <button 
                                        className='btn cat-detail' 
                                        onClick={(e) => toggleDetail(e, cat.id)}
                                    >See Detail</button>
                                </div>
                                <div className="cat-content">
                                    <p><strong>Alternavite Name:</strong> {cat.alt_names === '' ? '-': cat.alt_names}</p>
                                    <p><strong>Temprament:</strong> {cat.temperament}</p>
                                    <p><strong>Origin:</strong> {cat.origin}</p>
                                    <p><strong>Country Code:</strong> {cat.country_codes}</p>
                                    <strong>Description: </strong>
                                    <p>{cat.description}</p>
                                    <div className="image-wrapper">
                                        {
                                            catImage === '' ? <p>Loading...</p> :
                                            <img src={catImage[0].url} alt={cat.name} />
                                        }
                                    </div>
                                </div>
                            </section>
                        ))
                    }
                </InfiniteScroll>
            }
            {hasMoreItems ? "" : <div className="text-center">no data anymore ...</div> }
        </div>
    );
}

export default App;
