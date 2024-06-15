import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios';
const baseUrl = "http://127.0.0.1:8000/api";
export const TeacherDetail = () => {
    const [courseData, setcourseData] = useState([]);
    const [teachereData, setteachereData] = useState([]);
    const [skillList,setSkillList] = useState([])
    let {teacher_id } = useParams();
    useEffect(() => {
        try {
          axios.get(baseUrl + '/teacher/'+teacher_id).then((res) => {
            setteachereData(res.data)
            setcourseData(res.data.teacher_courses)
            setSkillList(res.data.skill_list)


    
    
          })
        } catch (error) {
          console.log(error);
    
        }
      }, [])

  return (
    <div>
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-lg-4'>
                    <h1>image link</h1>
                </div>
                <div className='col-lg-8'>
                    <h3>{teachereData.full_name}</h3>
                    <p>{teachereData.detail}</p>
                    <p className='fw-bold'>Skills: 
                    {
                            skillList.map((skill,index)=>
                            <Link className='badge bg-warning ml-1' to={`/teacher-skill-courses/${skill.trim()}/${teachereData.id}`}>{skill.trim()}</Link>
                            )
                            }   
                    </p>
                    <p className='fw-bold'>Recent Courses: <Link to='/category/php'>Reactjs</Link></p>
                    {/* <p className='fw-bold'>Total Enrolled: 456 Students</p> */}

                </div>
            </div>
            <div className='card'>
                <div className='card-header'>
                    Course List

                </div>
                <div className='list-group list-group-flush'>
                    {
                        courseData.map((course,index)=>
                            <Link to={`/detail/${course.id}`} className='list-group-item list-group-item-action'>{course.title}</Link>
                        )
                    }

    
                </div>

            </div>
          
        </div>
    </div>
  )
}
