const API_URL= `https://itunes.apple.com/search?term=`
const fetchSearch = async (searchTerm) => {
    const response = await fetch(API_URL + searchTerm)
    const resData = response.json()
    return resData.results
}