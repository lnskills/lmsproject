import React from 'react'
import { Link } from 'react-router-dom'

export const TeacherSidebar = () => {
  return (
    <div>
          <div className='card mt-5'>
            <div className='list-group list-group-flush'>
              <Link to='/teacher-dashboard' className='list-group-item list-group-item-action'>Dashboard</Link>
              <Link to='/teacher-courses' className='list-group-item list-group-item-action'>My Courses</Link>
              <Link to='/add-courses' className='list-group-item list-group-item-action'>Add Courses</Link>
              <Link to='/teacher-users' className='list-group-item list-group-item-action'>My Users</Link>
              <Link to='/teacher-profile-setting' className='list-group-item list-group-item-action'>Profile Setting</Link>
              <Link to='/teacher-logout' className='list-group-item list-group-item-action text-danger'>Logout</Link>


            </div>
            </div>
    </div>
  )
}
