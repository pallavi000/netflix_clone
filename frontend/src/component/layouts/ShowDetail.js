
import React, { useEffect, useState } from 'react'
import detail1 from '../../images/showdetail1.png'
import detail2 from '../../images/showdetail2.png'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'

function ShowDetail() {
    const [is_loader,setIs_loader] = useState(false)


    useEffect(()=>{
        getData()
        setIs_loader(true)
    },[])

    function getData(){
       

    }

  return (
    <></>
  )
}

export default ShowDetail