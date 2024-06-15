import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TeacherSidebar } from './TeacherSidebar'
import axios from 'axios'
const baseUrl = "http://127.0.0.1:8000/api"

export const EnrolledStudents = () => {
  const [StudentData, setStudentData] = useState([]);
 let {course_id} = useParams()

  useEffect(() => {
    try {
      axios.get(baseUrl + '/fetch-enrolled-students/' + course_id).then((res) => {
        setStudentData(res.data)

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
              <div className='card-header'>Enrolled Student List</div>
              <div className='card-body'>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      StudentData.map((row, index) =>
                        <tr>
                          <td><Link to={'/view-student/' + row.student.id}>{row.student.full_name}</Link></td>

                          <td>{row.student.email}</td>
                          <td>{row.student.username}</td>
                          <td>
                            <Link className='btn btn-info bt-sm' to={'/view-student/' + row.student.id}>View</Link>
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
