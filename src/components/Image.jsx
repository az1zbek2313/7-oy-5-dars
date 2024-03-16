import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Image({url}) {
    const [image, setimage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then(res => res.blob())
            .then(data => {
                console.log(data);
                setimage(URL.createObjectURL(data))
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

  return (
    <div>
        {
            loading && <Skeleton width={300} height={300} baseColor='blue'></Skeleton>
        }
        {
            !loading && <img src={image} alt="image" width={300} height={300} />
        }
    </div>
  )
}

export default Image