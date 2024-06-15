import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TeacherSidebar } from './TeacherSidebar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const baseUrl = "http://127.0.0.1:8000/api"

export const CourseChapters = () => {
  const [chaptereData, setChapterData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);


  const { course_id } = useParams()

  useEffect(() => {
    try {
      axios.get(baseUrl + '/course-chapters/' + course_id).then((res) => {
        setChapterData(res.data)
        setTotalResult(res.data.length)


      })
    } catch (error) {
      console.log(error);

    }
  }, [])
  const Swal = require('sweetalert2')
  const handleDeleteClick = (chapter_id) => {
    Swal.fire({
      title: 'Confirm',
      text: 'Are you sure you want to delete this data?',
      icon: 'info',
      confirmButtonText: 'Continue',
      showCancelButton: true
    }).then((result)=>{
      if(result.isConfirmed){
        try {
          axios.delete(baseUrl+'/chapter/'+chapter_id)
          .then((res)=>{
            Swal.fire('success','Data has been deleted.')
            try {
              axios.get(baseUrl+'/course-chapters/'+course_id)
              .then((res)=>{
                setTotalResult(res.data.length)
                setChapterData(res.data)
              })
              
            } catch (error) {
              console.log(error)
            }
         
          });
        
        } catch (error) {
          Swal.fire('error','Data has not been deleted!')
        }
      }
      else{
        Swal.fire('error','Data has not been deleted!')
      }
    })
  }
  return (
    <div>
      <div className='container mt-4'>
        <div className='row'>
          <aside className='col-lg-3'>
            <TeacherSidebar></TeacherSidebar>
          </aside>
          <section className='col-lg-9'>
            <div className='card'>
              <div className='card-header'>All Chapters ({totalResult}) <Link to={"/add-chapter/" + course_id} className='btn btn-success float-end'>Add Chapter</Link></div>
              <div className='card-body'>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Video</th>
                      <th>Remarks</th>
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      chaptereData.map((chapter, index) =>
                        <tr>
                          <td><Link to={"/edit-chapter/" + chapter.id}>{chapter.title}</Link></td>
                          <td>
                            <video controls width='250' >
                              <source src={chapter.video} type='video/webm' />
                              <source src={chapter.video} type='video/mp4' />

                            </video>
                          </td>
                          {/* <td> <img src={course.featured_img} width='80px' className='rounded' alt={course.title}></img></td> */}

                          <td><Link to="/">{chapter.remarks}</Link></td>
                          <td>
                            <button className='btn btn-danger' onClick={()=>handleDeleteClick(chapter.id)}>Delete</button>
                            <Link to={"/edit-chapter/" + chapter.id} className='btn btn-info ms-1'>Edit</Link>
                            </td>
                        </tr>
                      )
                    }


                  </tbody>

                </table>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  )
}
