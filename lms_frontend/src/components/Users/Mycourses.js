import React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export const Mycourses = () => {
  return (
    <div>
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-lg-3'>
                    <Sidebar></Sidebar>
                </aside>
                <section className='col-lg-9'>
                <div className='card'>
              <div className='card-header'>My Courses</div>
              <div className='card-body'>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Created By</th>
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    <td>Php Development</td>
                    <td><Link to="/">Suraj Kumar</Link></td>
                    <td><button className='btn btn-danger active'>Delete</button></td>
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
