import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
const baseUrl = "http://127.0.0.1:8000/api/student/"

export const Register = () => {
  const [studentData,setStudentData] = useState({
    'full_name':'',
    'email':'',
    'password':'',
    'username':'',
    'mobile_device':'',
    'address':'',
    "interested_categories":''
  })
  useEffect(()=>{
    document.title="Lnskills | Student Register"
  })
  const handleChange =(event)=>{
    setStudentData({...studentData,[event.target.name]:event.target.value})
  }
  const submitForm = () =>{
    const studentFormData = new FormData();
    studentFormData.append("full_name",studentData.full_name)
    studentFormData.append("email",studentData.email)
    studentFormData.append("password",studentData.password)
    studentFormData.append("username",studentData.username)
    studentFormData.append("mobile_device",studentData.mobile_device)
    studentFormData.append("address",studentData.address)
    studentFormData.append("interested_categories",studentData.interested_categories)
    try {
      
      axios.post(baseUrl,studentFormData).then((response)=>{
        console.log(response.data);
        setStudentData({
          'full_name':'',
          'email':'',
          'password':'',
          'username':'',
          'mobile_device':'',
          'address':'',
          'interested_categories':'',
          'status':'success'
        })
      })
    } catch (error) {
      console.log(error);
      setStudentData({'status':'error'})
    }

  }
  return (
    <div>
       <div className='container mt-5'> 
      <div className='row mt-5'>
        <div className='col-lg-6 offset-3'>
        {studentData.status == '' && <p className='text-danger'>All fields are required</p>}
          {studentData.status == 'success' && <p className='text-success'>Thankyou for the registration</p>}
          {!studentData.status == 'error' &&  <p className='text-success'>Something went wrong</p>} 

          <div className='card'>
            <h5 className='card-header'>Student Register</h5>
            <div className='card-body'>
              {/* <form> */}
                <div className='mb-3'>
                  <label className='form-label' for="exampleInputEmail">Full Name</label>
                  <input type='text' value={studentData.full_name} onChange={handleChange} name="full_name" id='full_name' className='form-control'></input>
                </div>
                <div className='mb-3'>
                  <label className='form-label' for="exampleInputEmail">Email</label>
                  <input type='email' value={studentData.email} onChange={handleChange} className='form-control' name="email" id='email'></input>
                </div>
                <div className='mb-3'>
                  <label className='form-label' for="exampleInputEmail">Password</label>
                  <input type='password' value={studentData.password} onChange={handleChange} className='form-control' name='password' id='password'></input>
                </div>
                <div className='mb-3'>
                  <label className='form-label' for="exampleInputEmail">Username</label>
                  <input type='text' value={studentData.username} onChange={handleChange} className='form-control' name='username' id='username'></input>
                </div>
                <div className='mb-3'>
                  <label className='form-label' for="exampleInputEmail">Mobile Device</label>
                  <input type='text' value={studentData.mobile_device} onChange={handleChange} className='form-control' name='mobile_device' id='mobile_device'></input>
                </div>
                <div className='mb-3'>
                  <label className='form-label' for="exampleInputEmail">Addresss</label>
                  <input type='text' value={studentData.address} onChange={handleChange} className='form-control' name='address' id='address'></input>
                </div>
                <div className='mb-3'>
                  <label className='form-label' for="exampleInputEmail">Interested Categories</label>
                  <textarea type='text' value={studentData.interested_categories} onChange={handleChange} className='form-control' name='interested_categories' id='interested_categories'></textarea>
                  <div id='emailHelp' className='form-text'>Php, Python, Javascript, etc</div>
                </div>
                <button type='submit' onClick={submitForm} className='btn btn-primary'>Register</button>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
