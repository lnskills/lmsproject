import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { TeacherSidebar } from './TeacherSidebar'
import axios from 'axios'
const baseUrl = "http://127.0.0.1:8000/api"
export const TeacherDashboard = () => {
  const [dashboardData, setdashboardData] = useState([]);
  let teacherId = localStorage.getItem('teacherId')

  useEffect(() => {
    try {
      axios.get(baseUrl + '/teacher/dashboard/' + teacherId).then((res) => {
        setdashboardData(res.data)

      })
    } catch (error) {
      console.log(error);

    }
  }, [])
  return (
    <div>
      <div className='container mt-5'>
        <div className='row'>
          <aside className='col-lg-3'>
            <TeacherSidebar></TeacherSidebar>

          </aside>
          <section className='col-lg-9'>
            <div className='row'>
              <div className='col-md-4 col-lg-4'>
                <div className='card border-primary'>
                  <h5 className='card-header bg-primary text-white'>Total Course</h5>
                  <div className='card-body'>
                    <h5><Link to='/teacher-courses'>{dashboardData.total_teacher_courses}</Link></h5>

                  </div>
                </div>
             
             
              </div>
              <div className='col-md-4 col-lg-4'>
              <div className='card border-success'>
                  <h5 className='card-header bg-success text-white'>Total Student</h5>
                  <div className='card-body'>
                    <h5><Link to='/teacher-users'>{dashboardData.total_teacher_students}</Link></h5>

                  </div>
                </div>
              </div>
              <div className='col-md-4 col-lg-4'>
              <div className='card border-info'>
                  <h5 className='card-header bg-info text-white'>Total Chapter</h5>
                  <div className='card-body'>
                    <h5><Link to='/teacher-courses'>{dashboardData.total_teacher_chapters}</Link></h5>

                  </div>
                </div>
              </div>
            </div>

          </section>
        </div>
      </div>
    </div>
  )
}
