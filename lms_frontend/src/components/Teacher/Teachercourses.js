import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TeacherSidebar } from './TeacherSidebar'
import axios from 'axios'
const baseUrl = "http://127.0.0.1:8000/api"

export const Teachercourses = () => {
  const [courseData, setCourseData] = useState([]);
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    try {
      axios.get(baseUrl + '/teacher-courses/' + teacherId).then((res) => {
        setCourseData(res.data)

      })
    } catch (error) {
      console.log(error);

    }
  }, [])

  return (
    <div>
      <div className='container mt-4'>
        <div className='row'>
          <aside className='col-lg-3'>
            <TeacherSidebar></TeacherSidebar>
          </aside>
          <section className='col-lg-9'>
            <div className='card'>
              <div className='card-header'>My Courses</div>
              <div className='card-body'>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Total Enrolled</th>
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      courseData.map((course, index) =>
                        <tr>
                          <td><Link to={'/all-chapters/' + course.id}>{course.title}</Link></td>
                          <td> <img src={course.featured_img} width='80px' className='rounded' alt={course.title}></img></td>
                          
                          <td><Link to={'/enrolled-students/' + course.id}>{course.total_enrolled_students}</Link></td>
                          <td>
                            <Link className='btn btn-info bt-sm' to={'/edit-course/' + course.id}>Edit</Link>
                            <Link className='btn btn-success bt-sm ms-2' to={'/add-chapter/' + course.id}>Add Chapter</Link>
                            <button className='btn btn-danger btn-sm  ms-2'>Delete</button>
                          </td>
                        </tr>
                      )
                    }


                  </tbody>

                </table>

              </div>
            </div>
          </section>

        </div>

      </div>

    </div>
  )
}
