import React,{useEffect,useState} from 'react'
import { TeacherSidebar } from './TeacherSidebar'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
const baseUrl = "http://127.0.0.1:8000/api"

export const Editcourse = () => {
  const [cats,setCats] = useState([]);
  const [courseData,setCourseData] = useState({
    category:'',
    title:'',
    description:'',
    prev_fimg:'',
    f_img:'',
    techs:''
  })
  const {course_id} = useParams()
  useEffect(()=>{
    try {
      axios.get(baseUrl+'/category').then((response)=>{
        setCats(response.data)
   
      })
    } catch (error) {
      console.log(error);
      
    }

    try {
      axios.get(baseUrl + '/teacher-course-detail/' + course_id).then((res) => {
        setCourseData({
            category:res.data.category,
            title:res.data.title,
            description:res.data.description,
            prev_fimg:res.data.featured_img,
            f_img:'',
            techs:res.data.techs
        })


      })
    } catch (error) {
      console.log(error);

    }
  },[])

  const handleChange = (event) =>{
    setCourseData({
      ...courseData,[event.target.name]:event.target.value
    })
  }

  const handleFileChange = (event) =>{
    setCourseData({
      ...courseData,[event.target.name]:event.target.files[0]
    })
  }

  const formSubmit = () =>{
    const _formData = new FormData();
    _formData.append('category',courseData.category);
    _formData.append('teacher',1);
    _formData.append('title',courseData.title);
    _formData.append('description',courseData.description);
    if (courseData.f_img !== '') {      
      _formData.append('featured_img',courseData.f_img,courseData.f_img.name);
    }
    _formData.append('techs',courseData.techs);
    try {
      axios.put(baseUrl+'/teacher-course-detail/'+course_id,_formData,{
        headers:{
          'Content-type':'multipart/form-data'
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
      })
    } catch (error) {
      console.log(error);
    }

  }
  
  return (
    <div>
      <div className='container mt-5'>
        <div className='row'>
          <aside className='col-lg-3'>
            <TeacherSidebar></TeacherSidebar>

          </aside>
          <section className='col-lg-9'>
            <div className='card'>
              <h6 className='card-header'>Edit Course</h6>
              <div class="mb-3 row">
            <label for='title' className='form-label'>Category</label>
            <select name='category' value={courseData.category} onChange={handleChange} className='form-control'>
              {cats.map((category,index)=>{return <option key={index} value={category.id}>{category.title}</option>})}

            </select>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" value={courseData.title} name='title' id="title" onChange={handleChange}/>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Description</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control-plaintext" value={courseData.description} name='description' id="description" onChange={handleChange}/>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Featured Image</label>
                <div class="col-sm-10">
                  <input type="file" class="form-control-plaintext" name="f_img" id="video" onChange={handleFileChange}/>
                  {
                    courseData.prev_fimg && 
                    <img src={courseData.prev_fimg} width='300px'></img>
                  }
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Technologies</label>
                <div class="col-sm-10">
                  <textarea type="text" class="form-control-plaintext" name="techs" value={courseData.techs} onChange={handleChange} id='techs'/>
                </div>
              </div>
             
              <div class="mb-3 row">
               <button className='btn btn-primary' type='button' onClick={formSubmit}>Submit</button>
              </div>
            </div>


          </section>
        </div>
      </div>
    </div>
  )
}
