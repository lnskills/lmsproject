import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <div>
          <div className='card mt-5'>
            <div className='list-group list-group-flush'>
              <Link to='/user-dashboard' className='list-group-item list-group-item-action'>Dashboard</Link>
              <Link to='/my-courses' className='list-group-item list-group-item-action'>My Courses</Link>
              <Link to='/favourite-courses' className='list-group-item list-group-item-action'>Favourite Course</Link>
              <Link to='/recomended-courses' className='list-group-item list-group-item-action'>Recorded Courses</Link>
              <Link to='/profile-setting' className='list-group-item list-group-item-action'>Profile Setting</Link>
              <Link to='/user-login' className='list-group-item list-group-item-action text-danger'>Logout</Link>


            </div>
            </div>
    </div>
  )
}
