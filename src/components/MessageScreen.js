import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'

function MessageScreen({ setMessageScreen, postMessage, setPostMessage }) {
    const inputRef = useRef(null)
    const [gifsScreen, setGifsScreen] = useState(false)
    const [message, setMessage] = useState('')
    const [color, setColor] = useState('#FFFFFF')
    const [font, setFont] = useState('#000000')
    const [search, setSearch] = useState('')
    const [giphy, setGiphy] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [selectGiphy, setSelectGiphy] = useState([])
    const [messageGiphy, setMessageGiphy] = useState(false)

    const White = () => {
        setColor('#FFFFFF')
        setFont('#999999')
        inputRef.current.style.background = '#FFFFFF'
        inputRef.current.style.color = '#999999'
    }

    const Grey = () => {
        setColor('#999999')
        setFont('#FFFFFF')
        inputRef.current.style.background = '#999999'
        inputRef.current.style.color = '#FFFFFF'
    }

    const Red1 = () => {
        setColor('#C70039')
        setFont('#FFFFFF')
        inputRef.current.style.background = '#C70039'
        inputRef.current.style.color = '#FFFFFF'
    }

    const Blue1 = () => {
        setColor('#1A5276')
        setFont('#FFFFFF')
        inputRef.current.style.background = '#1A5276'
        inputRef.current.style.color = '#FFFFFF'
    }

    const Post = (e) => {
        e.preventDefault()
        if (!message && gifsScreen === false) {
            alert('Enter your post. *This code gives error when you directly click on post button. Enter a post, search and select gif and then click on post button. *Updated code will share shortly.')
        }
        else {
            setPostMessage([...postMessage, { id: Math.random(), message: message, color: color, font: font, selectGiphy: selectGiphy }])
            console.log(postMessage)
            setMessageScreen(false)
        }
    }

    useEffect(() => {
        async function GetGiphy() {
            setError(false)
            setLoading(true)
            try {
                const response = await axios('https://api.giphy.com/v1/gifs/trending', { params: { api_key: 'Dst7UyI10lCaZeA9seXlAWA2qaXf0uGY', limit: 5 } })
                console.log(response)
                setGiphy(response.data.data)
                setLoading(false)
            }
            catch (error) {
                setError(true)
                console.log(error)
            }
        }
        GetGiphy()
    }, [])

    const Search = async (e) => {
        e.preventDefault()
        setSearch(e.target.value)
        setError(false)
        setLoading(true)
        try {
            const response = await axios('https://api.giphy.com/v1/gifs/search', { params: { api_key: 'Dst7UyI10lCaZeA9seXlAWA2qaXf0uGY', q: search } })
            setGiphy(response.data.data)
            setLoading(false)
        }
        catch (error) {
            setError(true)
            console.log(error)
        }
    }

    const SelectGiphy = async (id) => {
        let gif_id = id
        const response = await axios(`https://api.giphy.com/v1/gifs/${gif_id}`, { params: { api_key: 'Dst7UyI10lCaZeA9seXlAWA2qaXf0uGY' } })
        setSelectGiphy(response.data.data)
        console.log(selectGiphy)
        setMessageGiphy(true)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'></div>
                <div className='Col'>
                    <div className='Modal' tabindex="-1">
                        <p>
                            <button className='btn btn-light btn-sm'>Compose Post</button>&nbsp;
                            <button className='btn btn-light btn-sm'>Photo/Video Album</button>&nbsp;
                            <button className='btn btn-light btn-sm'>Live Video</button>&nbsp;
                            <button className='btn btn-light btn-sm' onClick={() => setMessageScreen(false)}>X</button>
                            <br />
                            <br />
                            <div>
                                <div className='mb-3'>
                                    <textarea className='form-control' rows='2' type='text' placeholder='Write something here...' value={message} ref={inputRef} onChange={(e) => setMessage(e.target.value)} />
                                </div>
                                {
                                    messageGiphy ?
                                        <img src={selectGiphy.images.fixed_height.url} />
                                        :
                                        null
                                }
                                <p className='Buttons'>
                                    &nbsp;
                                    <button className='btn btn-light btn-sm' onClick={White}>&nbsp;&nbsp;&nbsp;</button>&nbsp;
                                    <button className='btn btn-secondary btn-sm' onClick={Grey}>&nbsp;&nbsp;&nbsp;</button>&nbsp;
                                    <button className='btn btn-danger btn-sm' onClick={Red1}>&nbsp;&nbsp;&nbsp;</button>&nbsp;
                                    <button className='btn btn-primary btn-sm' style={{ background: '#4267B2', color: 'white' }} onClick={Blue1}>&nbsp;&nbsp;&nbsp;</button>&nbsp;
                                    &nbsp;
                                </p>
                                <p>
                                    <button className='btn btn-light btn-sm'>Tag friends</button>&nbsp;&nbsp;
                                    <button className='btn btn-light btn-sm'>Check in</button>&nbsp;&nbsp;
                                    <button className='btn btn-primary btn-sm' style={{ background: '#4267B2', color: 'white' }} onClick={() => setGifsScreen(true)}>GIF</button>&nbsp;&nbsp;
                                    <button className='btn btn-light btn-sm'>Tag Event</button>&nbsp;&nbsp;
                                </p>
                            </div>
                        </p>
                    </div>
                    <p className='Buttonsright'>
                        <button className='btn btn-light btn-sm'>Only me</button>
                        <button className='btn btn-primary btn-sm' style={{ background: '#4267B2', color: 'white' }} onClick={Post}>Post</button>
                    </p>
                    {gifsScreen ? <div>
                        <div className='mb-3'>
                            <input type='text' className='form-control' value={search} onChange={Search} />
                        </div>
                        {
                            loading ? <p>Loading</p> : error ? <p>Error</p> :
                                <div>
                                    {
                                        giphy.map(Data => {
                                            return (
                                                <div key={Data.id}>
                                                    <img src={Data.images.fixed_height.url} />
                                                    <br />
                                                    <button className='btn btn-light btn-sm' onClick={() => SelectGiphy(Data.id)}>Select</button>
                                                    <br />
                                                    <br />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                        }
                    </div> : null}
                    <div className='col'></div>
                </div>
            </div>
        </div>
    )
}

export default MessageScreen
