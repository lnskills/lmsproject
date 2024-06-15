import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios'
const baseUrl = "http://127.0.0.1:8000/api"


export const Allcourses = () => {
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
      try {
        axios.get(baseUrl + '/course/').then((res) => {
          setCourseData(res.data)
  
        })
      } catch (error) {
        console.log(error);
  
      }
    }, [])
  return (
    <div className='container mt-5'>
        <h3 className='pb-1 mb-4'>Latest Course</h3>
        <div className='row mb-4'>
            {courseData && courseData.map((course,index)=>
             <div className='col-md-3'>
             <div class="card" >                 
                     <Link to={`/detail/${course.id}`} class="btn btn-primary"><img src={course.featured_img} class="card-img-top" alt={course.title} /></Link>
                 <div class="card-body">
                     <h5 class="card-title"><Link to={`/detail/${course.id}`} >{course.title}</Link></h5>
                 </div>
             </div>
         </div>
            )}
               
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
