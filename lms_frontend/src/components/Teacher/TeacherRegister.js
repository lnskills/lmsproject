import React, { useEffect, useState } from 'react'
import axios from 'axios'
const baseUrl = "http://127.0.0.1:8000/api/teacher/"
export const TeacherRegister = () => {
  const [teacherData,setTeacherData] = useState({
    'full_name':'',
    'email':'',
    'password':'',
    'qualification':'',
    'mobile_device':'',
  })
  useEffect(()=>{
    document.title="Lnskills | Teacher Register"
  })

  const handleChange =(event)=>{
    setTeacherData({...teacherData,[event.target.name]:event.target.value})
  }
  const submitForm = () =>{
    const teacherFormData = new FormData();
    teacherFormData.append("full_name",teacherData.full_name)
    teacherFormData.append("email",teacherData.email)
    teacherFormData.append("password",teacherData.password)
    teacherFormData.append("qualification",teacherData.qualification)
    teacherFormData.append("mobile_device",teacherData.mobile_no)
    try {
      
      axios.post(baseUrl,teacherFormData).then((response)=>{
        console.log(response.data);
        setTeacherData({
          'full_name':'',
          'email':'',
          'password':'',
          'qualification':'',
          'mobile_device':'',
          'status':'success'
        })
      })
    } catch (error) {
      console.log(error);
      setTeacherData({'status':'error'})
    }

  }
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus")
  if(teacherLoginStatus == true){
    window.location.href='/teacher-dashboard'
  }
  return (
    <div>
      <div className='container mt-5'> 
      <div className='row mt-5'>
        <div className='col-lg-6 offset-3'>
          {teacherData.status == 'success' && <p className='text-success'>Thankyou for the registration</p>}
          {!teacherData.status == 'error' &&  <p className='text-success'>Something went wrong</p>}

          <div className='card'>
            <h5 className='card-header'>Teacher Register</h5>
            <div className='card-body'>
              {/* <form> */}
                <div className='mb-3'>
                  <label className='form-label' for="exampleInputEmail">Full Name</label>
                  <input type='text' onChange={handleChange} name="full_name" className='form-control'></input>
                </div>
                <div className='mb-3'>
                  <label className='form-label' for="exampleInputEmail">Email</label>
                  <input type='email' onChange={handleChange} className='form-control' name="email"></input>
                </div>
                <div className='mb-3'>
                  <label className='form-label' for="exampleInputEmail">Password</label>
                  <input type='password' onChange={handleChange} className='form-control' name='password'></input>
                </div>
                <div className='mb-3'>
                  <label className='form-label' for="exampleInputEmail">Qualification</label>
                  <input type='text' onChange={handleChange} className='form-control' name='qualification'></input>
                </div>
                <div className='mb-3'>
                  <label className='form-label' for="exampleInputEmail">Mobile Device</label>
                  <input type='text' onChange={handleChange} className='form-control' name='mobile_device'></input>
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
