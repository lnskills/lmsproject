import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Mycourses } from './Mycourses'
import { Sidebar } from './Sidebar'

export const ProfileSetting = () => {
  return (
    <div>
      <div className='container mt-5'>
        <div className='row'>
          <aside className='col-lg-3'>
            <Sidebar></Sidebar>

          </aside>
          <section className='col-lg-9'>
            <div className='card'>
              <h6 className='card-header'>Profile Setting</h6>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Full Name</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="inputPassword" />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                  <input type="text" readonly class="form-control-plaintext" id="staticEmail" />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                  <input type="password" class="form-control" id="inputPassword" />
                </div>
              </div>
              <div class="mb-3 row">
               <button className='btn btn-primary'>Update</button>
              </div>
            </div>


          </section>
        </div>
      </div>
    </div>
  )
}
