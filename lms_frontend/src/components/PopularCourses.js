import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const PopularCourses = () => {
  return (
    <div className='container mt-5'>
        <div className='row'>
                <div className='col-lg-4'>
                        <div class="card" >
                            <div className='card-header'>Latest Courses</div>
                            <img src="" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <Link to="/detail/1" class="btn btn-primary">Go somewhere</Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div class="card" >
                            <img src="" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <Link to="/detail/2" class="btn btn-primary">Go somewhere</Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div class="card" >
                            <img src="" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <Link to="/detail/3" class="btn btn-primary">Go somewhere</Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
    </div>
  )
}
