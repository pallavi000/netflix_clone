import React,{useState} from 'react'

function Accordion() {
    const[faq,setFaq] = useState([
        {
            q:'What is Netflix?',
            a:'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolfmoon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.'
        },
        {
            q:'How much does Netflix cost?',
            a:'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolfmoon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.' 
        },
        {
            q:'Where can I watch?',
            a:'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolfmoon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.' 
        },
        {
            q:'How do I cancel?',
            a:'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolfmoon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.' 
        },
        {
            q:'What can I watch on Netflix?',
            a:'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolfmoon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.' 
        },
        {
            q:'Is Netflix good for kids?',
            a:'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolfmoon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.' 
        },
    ])
  return (
    <div id="main">
    <div class="container">
    <div class="accordion" id="faq">
    {faq.map((faq,i)=>{
        return(
            <div class="card w-75 mx-auto mb-2">
                          <div class="card-header" id={`faqhead${i}`}>
                              <a href="#" class="btn btn-header-link" data-toggle="collapse" data-target={`#faq${i}`}
                              aria-expanded="true" aria-controls={`#faq${i}`}>{faq.q}</a>
                          </div>
  
                          <div id={`faq${i}`} class="collapse" aria-labelledby={`faqhead${i}`} data-parent="#faq">
                              <div class="card-body">
                                  {faq.a}
                              </div>
                          </div>
                      </div>
        )
    })}
                      
                  </div>
      </div>
    </div>
  )
}

export default Accordion