import axios from 'axios'
import React, { useEffect, useState } from 'react'

const baseUrl = "http://127.0.0.1:8000/api"
export const TeacherLogin = () => {
  const [teacherLoginData,setTeacherLoginData] = useState({
    email:'',
    password:''
  })
  const handleChange = (event) =>{
    setTeacherLoginData({
      ...teacherLoginData,[event.target.name]:event.target.value
    })
  }
  useEffect(()=>{
    document.title="Lnskills | Teacher Login"
  })
  const submitForm = () => {
    console.log("teacherlog",teacherLoginData);
    const teacherFormData = new FormData;
    teacherFormData.append('email',teacherLoginData.email)
    teacherFormData.append('password',teacherLoginData.password)
    try {
      axios.post(baseUrl+'/teacher-login',teacherFormData).then((response)=>{
        console.log(response.data);
        if (response.data.bool == true) {
          localStorage.setItem("teacherLoginStatus",true)
          localStorage.setItem("teacherId",response.data.teacher_id)
          window.location.href='/teacher-dashboard'
        }
      })
    } catch (error) {
      console.log(error);
      
    }

  }
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus")
  if(teacherLoginStatus == 'true'){
    window.location.href='/teacher-dashboard'
  }
  return (
    <div className='mt-5'>
       <div className='card'>
              <h6 className='card-header mt-5'>Teacher Login</h6>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control"  onChange={handleChange} value={teacherLoginData.email} name='email'/>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                  <input type="password" class="form-control" name='password' value={teacherLoginData.password} onChange={handleChange}/>
                </div>
              </div>
              <div class="mb-3 row">
               <button className='btn btn-primary' onClick={submitForm}>Login</button>
              </div>
            </div>
    </div>
  )
}
