import { useState, useRef } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import { SearchContext} from './context/SearchContext'

function App() {
  let [message, setMessage] = useState('Search for music')
  let [data, setData] = useState([])
  let searchInput = useRef('')

const API_URL = `https://itunes.apple.com/search?term=`

  const handleSearch = (event, term) => {
    event.preventDefault()
    //Fetch data
    const fetchData = async () => {
        document.title = `${term} Music`
        const response = await fetch(API_URL + term)
        const resData = await response.json()
        if (resData.results.length > 0) {
          //do I add "return" here or is it implied?
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
      }
      fetchData()
    }
  

  return (
    <div className="App">
      <SearchContext.Provider value={{
        term: searchInput,
        handleSearch: handleSearch
      }}>
        <SearchBar />
      </SearchContext.Provider>  
      {message}
      {/* Because Gallery is within the 'DataContext.Provider' block,
      anything passed into the value object will be available as Context
      to the child components within! This process is known as "setting" context. */}
      <DataContext.Provider value={data}>
        <Gallery />
      </DataContext.Provider>
    </div>
  );
}

export default App;
