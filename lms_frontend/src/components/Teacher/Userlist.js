import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TeacherSidebar } from './TeacherSidebar'
import axios from 'axios'
const baseUrl = "http://127.0.0.1:8000/api"

export const Userlist = () => {
  const [StudentData, setStudentData] = useState([]);

  const teacherId = localStorage.getItem('teacherId')

  useEffect(() => {
    try {
      axios.get(baseUrl + '/fetch-all-enrolled-students/' + teacherId).then((res) => {
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
              <div className='card-header'>All Student List</div>
              <div className='card-body'>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Inrested Categories</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      StudentData.map((row, index) =>
                        <tr>
                          <td>{row.student.full_name}</td>

                          <td>{row.student.email}</td>
                          <td>{row.student.username}</td>
                          <td>{row.student.interested_categories}                          </td>
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
