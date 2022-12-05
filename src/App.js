import { useEffect, useState, Suspense } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import Spinner from './components/Spinner'
import { createResource as fetchData } from './helper'

function App() {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for music')
  let [data, setData] = useState(null)

  useEffect(() => {
    if (search) {
      document.title = `${search} Music`
      console.log(fetchData(search))
      setData(fetchData(search))
    }
  }, [search])

  // useEffect(() => {
  //   const API_URL = `https://itunes.apple.com/search?term=`

  //   if (search) {
  //     const fetchData = async () => {
  //       document.title = `${search} Music`
  //       const response = await fetch(API_URL + search)
  //       const resData = await response.json()
  //       if (resData.results.length > 0) {
  //         setData(resData.results)
  //       } else {
  //         setMessage('Not Found')
  //       }
  //     }
  //     fetchData()
  //   }
  // }, [search])

  const handleSearch = (event, term) => {
    event.preventDefault()
    setSearch(term)
  }

  //will tell app to wait for data before trying to render the Gallery component
  const renderGallery = () => {
    if (data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>
      )
    }
  }

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
      {message}
      {renderGallery()}
    </div>
  );
}

export default App;
