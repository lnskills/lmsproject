import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
const siteUrl = "http://127.0.0.1:8000/";

const baseUrl = "http://127.0.0.1:8000/api";

export const CourseDetails = () => {
  const [courseData, setcourseData] = useState([]);
  const [chaptereData, setChapterData] = useState([]);
  const [teachereData, setteachereData] = useState([]);
  const [relatedcourseData, setrelatedcourseData] = useState([]);
  const [techListData,settechListData] = useState([]);
  const [userLoginStatus,setuserLoginStatus]= useState('');
  const [enrollStatus,setenrollStatus]= useState('');

  const studentId = localStorage.getItem("studentId");
    let { course_id } = useParams();

    useEffect(() => {
        try {
          axios.get(baseUrl + '/course/'+course_id).then((res) => {
            setcourseData(res.data)
            setteachereData(res.data.teacher)
            setChapterData(res.data.course_chapters)
            setrelatedcourseData(JSON.parse(res.data.related_videos))
            settechListData(res.data.tech_list)


    
    
          })
        } catch (error) {
          console.log(error);
    
        }

        try {
            axios.get(baseUrl + '/fetch-enroll-status/'+studentId+'/'+course_id).then((res) => {
              if (res.data.bool == true) {
                
                  setenrollStatus('success')
              }

  
  
      
      
            })
          } catch (error) {
            console.log(error);
      
          }
        const studentLoginStatus = localStorage.getItem("studentLoginStatus")
        if(studentLoginStatus === 'true'){
            setuserLoginStatus('success')
        }
      }, [])    
      
      const enrollCourse = ()=>{
        // const studentId = localStorage.getItem("studentId");
        const _formData = new FormData();
        _formData.append('course',course_id);
        _formData.append('student',studentId);

        try {
          axios.post(baseUrl+'/student-enroll-course/',_formData,{
            headers:{
              'Content-type':'multipart/form-data'
            }
          }).then((res)=>{
            console.log(res.data);
            if(res.status == 200 || res.status == 201){
                Swal.fire({
                    title:'You have successfully enrolled in this course',
                    icon:'success',
                    toast:true,
                    timer:10000,
                    position:'top-right',
                    timerProgressBar:true,
                    showConfirmButton:false 
                });
                setenrollStatus('success')
                // window.location.reload()
            }
            // window.location.href='/add-courses'
          })
        } catch (error) {
          console.log(error);
        }
      }

    return (
        <div>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-lg-4'>
                       <img className='img-thumbnail' src={courseData.featured_img} alt={courseData.title}></img>
                    </div>
                    <div className='col-lg-8'>
                        <h3>{courseData.title}</h3>
                        <p>{courseData.description}</p>
                        <p className='fw-bold'>Course By: <Link to={`/teacher-detail/${teachereData.id}`}>{teachereData.full_name}</Link></p>
                        <p>Techs: {
                            techListData.map((tech,index)=>
                            <Link className='badge bg-warning ml-1' to={`/category/${tech.trim()}`}>{tech.trim()}</Link>
                            )
                            }</p>
                        <p className='fw-bold'>Duration: 1 Hour</p>
                        <p className='fw-bold'>Total Enrolled: {courseData.total_enrolled_students} Students</p>
                        {
                            userLoginStatus == 'success' &&  enrollStatus !== 'success' &&
                        <p><button className='btn btn-success' type='button' onClick={enrollCourse}>Enroll in this course</button></p>
                        }
                           {
                            enrollStatus == 'success' && userLoginStatus == 'success' &&
                        <p><span>You are already enrolled in this course</span></p>
                        }
                     {userLoginStatus !== 'success' &&
                        <p><Link to='/user-login'>Please login to enroll in this course</Link></p>
                        }

                    </div>
                </div>
                {
                            enrollStatus == 'success' && userLoginStatus == 'success' &&
                <div className='card'>
                    <div className='card-header'>
                       In this Course Videos

                    </div>
                    <ul className='list-group list-group-flush'>
                        {
                            chaptereData.map((chapter,index)=>
                                <li className='list-group-item'>{chapter.title} <span className='me-5'>
                            <button className="btn btn-sm float-end btn-danger" data-bs-toggle="modal" data-bs-target="#videomodal"><i className='bi-youtube'></i></button>
                        </span>
                        
                            <div class="modal fade" id="videomodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Video 1</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div className='ratio ratio-16x9'>
                                                <iframe allowFullScreen title={chapter.title} src={chapter.video}></iframe>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                            )
                        }
                       


                    </ul>

                </div>
        }
                <div className='container mt-4'>
                    <h3 className='my-5 pb-1'>Related Course</h3>
                    <div className='row'>
                        {
                            relatedcourseData.map((rcourse,index)=>
                                <div className='col-md-3'>
                            <div class="card" >
                                
                                    <Link to={`/detail/${rcourse.pk}`} target='_blank' class="btn btn-primary"><img src={`${siteUrl}media/${rcourse.fields.featured_img}`} class="card-img-top" alt={rcourse.fields.title} /></Link>
                                <div class="card-body">
                                    <h5 class="card-title"><Link to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}</Link></h5>
                                </div>
                            </div>
                        </div>
                            )
                        }
                      
                    </div>
                </div>
            </div>
        </div>
    )
}
