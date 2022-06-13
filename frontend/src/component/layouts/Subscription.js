import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'

function Subscription() {
  const[plans,setPlans] = useState([])
  const[subscription,setSubscription]= useState('')
  const [is_loader,setIs_loader] = useState(false)

  const navigate =useNavigate()

  useEffect(()=>{
    setIs_loader(true)
    getSubscription()
  },[])

  const config = {
    headers:{
        'access-token':localStorage.getItem('token')
    }
}

  async function getSubscription(){
    try {
      const response = await axios.get('/frontend/subscription',config)
      setPlans(response.data)
      setIs_loader(false)
      
    } catch (error) {
      
    }
  }

  async function submitPlan(e){
  
    e.preventDefault()
    try {
      const data={
        'subscription_id':subscription
      }
      const response = await axios.post('/frontend/subscription/update',data,config)
      console.log(response.data)
      localStorage.setItem('user',JSON.stringify(response.data))
      navigate('/show')
    } catch (error) {
      console.log(error.request.response)
    }
    
  }
  
  return (
    is_loader?(
      <Oval
      height="100"
      width="100"
      color='#94142C'
      ariaLabel='loading'
      secondaryColor="#ddd"
    />
    ):(
   <div className='subscription-section'>
   <div className='subscription'>
     <div className='subscription-header'>Choose the plan that’s right for you</div>
     <div className='subscription-recommend row'>
       <i className='fa fa-check'></i><div className='subscription-subtitle'>Watch all you want.</div></div>
       <div className='subscription-recommend row'>
       <i className='fa fa-check'></i><div className='subscription-subtitle'>Recommendations just for you.</div></div>
       <div className='subscription-recommend row'>
       <i className='fa fa-check'></i><div className='subscription-subtitle'>Watch all you want.</div></div>
       <div className='subscription-recommend'>
       <div className='subscription-selection form-group'>
        <form className='subscription-form row ' onSubmit={(e)=>submitPlan(e)}>
       <select className='form-control subscription-select form-control-lg mr-3 mt-0 ' required onChange={(e)=>setSubscription(e.target.value)}>
         <option className=''> select your preference</option>
         {plans.map(plan=>{
           return(
            <option className='' value={plan._id}>{plan.name}-${plan.price}-{plan.period}</option>
           )
         })}
       </select>
       <button className='subscription-btn btn-start'>Submit</button>
       </form>
       </div>
     </div>
     </div>
   </div>
    )
  
  )
}

export default Subscription