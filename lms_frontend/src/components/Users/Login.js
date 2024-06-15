import axios from 'axios'
import React, { useEffect, useState } from 'react'

const baseUrl = "http://127.0.0.1:8000/api"

export const Login = () => {
  const [studentLoginData,setstudentLoginData] = useState({
    email:'',
    password:''
  })

  const [errMsg,seterrMsg] = useState('');
  const handleChange = (event) =>{
    setstudentLoginData({
      ...studentLoginData,[event.target.name]:event.target.value
    })
  }
  useEffect(()=>{
    document.title="Lnskills | Student Login"
  })
  const submitForm = () => {
    console.log("teacherlog",studentLoginData);
    const studentFormData = new FormData;
    studentFormData.append('email',studentLoginData.email)
    studentFormData.append('password',studentLoginData.password)
    try {
      axios.post(baseUrl+'/student-login',studentFormData).then((response)=>{
        console.log(response.data);
        if (response.data.bool == true) {
          localStorage.setItem("studentLoginStatus",true)
          localStorage.setItem("studentId",response.data.student_id)
          window.location.href='/user-dashboard'
        }else{
          seterrMsg('Invalid Email or Password')
        }
      })
    } catch (error) {
      console.log(error);
      
    }

  }
  const studentLoginStatus = localStorage.getItem("studentLoginStatus")
  if(studentLoginStatus === 'true'){
    window.location.href='/user-dashboard'
  }
  return (
    <div>
       <div className='card'>
              <h6 className='card-header'>User Login</h6>
              <div className='card-body'>
                {errMsg && <p className='text-danger'>{errMsg}</p>}
                {/* <form> */}
                  
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">User Name</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="inputPassword" name='email' onChange={handleChange} value={studentLoginData.email} />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                  <input type="password" class="form-control" id="inputPassword" name='password' onChange={handleChange} value={studentLoginData.password} />
                </div>
              </div>
              <div class="mb-3 row">
               <button className='btn btn-primary' onClick={submitForm}>Login</button>
              </div>
                {/* </form> */}

              </div>
            </div>
    </div>
  )
}
