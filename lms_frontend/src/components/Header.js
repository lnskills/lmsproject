import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Header = () => {
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus")
  const studentLoginStatus = localStorage.getItem("studentLoginStatus")


  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <Link class="navbar-brand" to="#">Learn New Skills Technologies</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
     <div class="collapse navbar-collapse" id="navbarSupportedContent">
     <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to="#">Home</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to="/all-courses">Courses</Link>
          </li>
          <li class="nav-item dropdown">
            <Link class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Teacher
            </Link>
            <ul class="dropdown-menu dropdown-menu-dark">
              {teacherLoginStatus != 'true' && <>
              <li><Link class="dropdown-item" to="/teacher-login">Login</Link></li>
              <li><Link class="dropdown-item" to="/teacher-register">Register</Link></li>
              </> }
              {
              teacherLoginStatus == 'true' && <>
               <li><Link class="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
              <li><Link class="dropdown-item" to="teacher-logout">Logout</Link></li>
              </>
              }
             

              <li>
                <hr class="dropdown-divider"/>
              </li>
              <li><Link class="dropdown-item" to="#">Something else here</Link></li>
            </ul>
          </li>
          
          <li class="nav-item dropdown">
            <Link class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              User
            </Link>
            <ul class="dropdown-menu dropdown-menu-dark">
              {
                studentLoginStatus != 'true' && <>
                
              <li><Link class="dropdown-item" to="/user-login">Login</Link></li>
              <li><Link class="dropdown-item" to="/user-register">Register</Link></li>
                </>
              }
              {
                studentLoginStatus == 'true' && <>
                 <li><Link class="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
              <li><Link class="dropdown-item" to="/user-logout">Logout</Link></li>
                </>
              }
             

              <li>
                <hr class="dropdown-divider"/>
              </li>
              <li><Link class="dropdown-item" to="#">Something else here</Link></li>
            </ul>
          </li>
        </ul>

    </div>


  </div>
</nav>
<Outlet></Outlet>
    </div>
  )
}
