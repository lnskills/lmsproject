import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import axios from 'axios';
const baseUrl = "http://127.0.0.1:8000/api";
export const Teacherskillcourse = () => {
    const [courseData, setCourseData] = useState([]);
    const { skill_name,teacher_id } = useParams();
    useEffect(() => {
      try {
        axios.get(baseUrl+ '/course/?skill_name='+skill_name+'&teacher='+teacher_id).then((res) => {
          setCourseData(res.data)
  
        })
      } catch (error) {
        console.log(error);
  
      }
    }, [])
  return (
    <div className='container mt-5'>
        <h3 className='pb-1 mb-4'>{skill_name}</h3>
        <div className='row'>
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
        </div>
    </div>
  )
}
