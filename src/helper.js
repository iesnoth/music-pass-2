const API_URL = `https://itunes.apple.com/search?term=`

const fetchSearch = async (searchTerm) => {
    const response = await fetch(API_URL + searchTerm)
    const resData = await response.json()
    return resData.results
}

//take the promise fetchSearch returns, and give it to wrapPromise as an argument
const wrapPromise = (promise) => {
    //default state of promise:
    let status = 'pending'
    //result will store the data we get from the promise
    let result = ''
    //suspender represents the resolution of the promise
    //ideal resolution: "success", catch should set to "error"
    let suspender = promise.then(response => {
        status = 'success'
        result = response
    }, err => {
        status = 'error'
        result = err
    })

    //return an object that emits a different response depending on status
    return {
        read() {
            if (status === 'pending') {
                throw suspender
            }
            else if (status === 'error') {
                throw result
            }
            else {
                return result
            }
        }
    }
}

export const createResource = (searchTerm) => {
    return {
        result: wrapPromise(fetchSearch(searchTerm))
    }
}