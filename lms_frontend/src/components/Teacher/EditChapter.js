import React,{useEffect,useState} from 'react'
import { TeacherSidebar } from './TeacherSidebar'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
const baseUrl = "http://127.0.0.1:8000/api"
export const EditChapter = () => {
    const [chapterData,setChapterData] = useState({
        course:'',
        title:'',
        description:'',
        prev_video:'',
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
      const {chapter_id} = useParams()
      const formSubmit = () =>{
        const _formData = new FormData();
        _formData.append('course',chapterData.course);
        _formData.append('title',chapterData.title);
        _formData.append('description',chapterData.description);
        if (chapterData.video !=='') {
            
        _formData.append('video',chapterData.video,chapterData.video.name);
        }
        _formData.append('remarks',chapterData.remarks);
        try {
          axios.put(baseUrl+'/chapter/'+chapter_id,_formData,{
            headers:{
              'content-type':'multipart/form-data'
            }
          }).then((res)=>{
            
            if (res.status == 200) {
                
                  Swal.fire({
                    title: 'Data has been updated',
                    icon: 'success',
                    toast:true,
                    timer:3000,
                    position:'top-right',
                    timerProgressBar:true,
                    showConfirmButton: false
                  })
                
            }
            // window.location.href='/edit-chapter/1'
          })
        } catch (error) {
          console.log(error);
        }
    
      }
      useEffect(() => {
        try {
          axios.get(baseUrl + '/chapter/' + chapter_id).then((res) => {
            setChapterData({
                course:res.data.course,
                title:res.data.title,
                description:res.data.description,
                prev_video:res.data.video,
                remarks:res.data.remarks,
                video:''
            })
    
    
          })
        } catch (error) {
          console.log(error);
    
        }
      }, [])
  return (
    <div>
           <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar></TeacherSidebar>
                </aside>
                <div className='col-9'>
                    <div className='card'>
                        <h5 className='card-header'>Update Chapter</h5>
                    </div>
                    <div className='card-body'>
                        {/* <form> */}
                            <div className='mb-3'>
                                <label for="title" className='form-label'>Title</label>
                                <input type='text' name='title' id='title' onChange={handleChange} value={chapterData.title} className='form-control'></input>
                            </div>
                            <div className='mb-3'>
                                <label for="description" className='form-label'>Description</label>
                                <textarea name='description'  id='description'  onChange={handleChange} value={chapterData.description}  className='form-control'></textarea>
                            </div>
                            <div className='mb-3'>
                                <label for="video" className='form-label'>Video</label>
                                <input type='file' id='video' name='video' onChange={handleFileChange} className='form-control'></input>
                                {chapterData.prev_video &&
                                <video controls width='100%' className='mt-2' >
                                    <source src={chapterData.prev_video} type='video/webm' />
                                    <source src={chapterData.prev_video} type='video/mp4' />
                                </video>
                                }
                                
                            </div>
                            <div className='mb-3'>
                                <label for="title" className='form-label'>Remarks</label>
                                <textarea className='form-control'  onChange={handleChange} value={chapterData.remarks}  name='remarks' id='remarks' placeholder='This is video is focused on basic introduction'></textarea>
                            </div>
                            <button type='button' onClick={formSubmit} className='btn btn-primary'>Submit</button>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
