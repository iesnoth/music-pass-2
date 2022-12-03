import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

function AlbumView() {
    const { id } = useParams()
    const [albumView, setAlbumView] = useState([])

    return(
        <div>
            <h2>The album id passed was: {id}</h2>
            <p>Album Data Goes Here!</p>
        </div>
    )
}

export default AlbumView