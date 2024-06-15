import React,{useEffect,useState} from 'react'
import { TeacherSidebar } from './TeacherSidebar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const baseUrl = "http://127.0.0.1:8000/api"

export const AddChapter = () => {
    const [chapterData,setChapterData] = useState({

      title:'',
      description:'',
      video:'',
      remarks:''
    })
    
  
    const handleChange = (event) =>{
      setChapterData({
        ...chapterData,[event.target.name]:event.target.value
      })
    }
  
    const handleFileChange = (event) =>{
      setChapterData({
        ...chapterData,[event.target.name]:event.target.files[0]
      })
    }
  
    const {course_id} = useParams()
    const formSubmit = () =>{
      const _formData = new FormData();
      _formData.append('course',course_id);
      _formData.append('title',chapterData.title);
      _formData.append('description',chapterData.description);
      _formData.append('video',chapterData.video,chapterData.video.name);
      _formData.append('remarks',chapterData.remarks);
      try {
        axios.post(baseUrl+'/chapter/',_formData,{
          headers:{
            'content-type':'multipart/form-data'
          }
        }).then((res)=>{
          console.log(res.data);
          window.location.href='/add-chapter/1'
        })
      } catch (error) {
        console.log(error);
      }
  
    }
  return (
    <div>
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar></TeacherSidebar>
                </aside>
                <div className='col-9'>
                    <div className='card'>
                        <h5 className='card-header'>Add Chapter</h5>
                    </div>
                    <div className='card-body'>
                        <form>
                            <div className='mb-3'>
                                <label for="title" className='form-label'>Title</label>
                                <input type='text' name='title' id='title' onChange={handleChange} className='form-control'></input>
                            </div>
                            <div className='mb-3'>
                                <label for="description" className='form-label'>Description</label>
                                <textarea name='description'  id='description'  onChange={handleChange} className='form-control'></textarea>
                            </div>
                            <div className='mb-3'>
                                <label for="video" className='form-label'>Video</label>
                                <input type='file' id='video' name='video' onChange={handleFileChange} className='form-control'></input>
                            </div>
                            <div className='mb-3'>
                                <label for="title" className='form-label'>Remarks</label>
                                <textarea className='form-control'  onChange={handleChange} name='remarks' id='remarks' placeholder='This is video is focused on basic introduction'></textarea>
                            </div>
                            <button type='button' onClick={formSubmit} className='btn btn-primary'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
