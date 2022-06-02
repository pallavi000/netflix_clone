import React from 'react'

function Dashboard() {
  return (
    <div className='content-wrapper'>
        <div className="content-wrapper">
          
          <div class="dash-cards">
          <div class="dash-card-single">
            <div>
              <h1>54</h1>
              <span>Customers</span>
            </div>
            <div>
              <i class="fa fa-user"></i>
            </div>
          </div>
    
          <div class="dash-card-single">
            <div>
              <h1>55</h1>
              <span>Products</span>
            </div>
            <div>
              <i class="fa fa-product-hunt" aria-hidden="true"></i>
            </div>
          </div>
    
          <div class="dash-card-single">
            <div>
              <h1>54</h1>
              <span>Orders</span>
            </div>
            <div>
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            </div>
          </div>
    
          <div class="dash-card-single">
            <div>
              <h1>54</h1>
              <span>Income</span>
            </div>
            <div>
              <i class="fa fa-money" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Dashboard