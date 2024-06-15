import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Mycourses } from './Mycourses'
import { Sidebar } from './Sidebar'

export const Dashboard = () => {
  return (
    <div>
      <div className='container mt-5'>
        <div className='row'>
          <aside className='col-lg-3'>
            <Sidebar></Sidebar>

          </aside>
          <section className='col-lg-9'>
          Dashboard
     
          </section>
        </div>
      </div>
    </div>
  )
}
