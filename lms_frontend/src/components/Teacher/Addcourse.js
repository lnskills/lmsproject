import React,{useEffect,useState} from 'react'
import { TeacherSidebar } from './TeacherSidebar'
import axios from 'axios'
const baseUrl = "http://127.0.0.1:8000/api"

export const Addcourse = () => {
  const [cats,setCats] = useState([]);
  const [courseData,setCourseData] = useState({
    category:'',
    title:'',
    description:'',
    f_img:'',
    techs:''
  })

  console.log(courseData);
  useEffect(()=>{
    try {
      axios.get(baseUrl+'/category').then((response)=>{
        setCats(response.data)
   
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
    const teacherId = localStorage.getItem("teacherId");
    const _formData = new FormData();
    _formData.append('category',courseData.category);
    _formData.append('teacher',teacherId);
    _formData.append('title',courseData.title);
    _formData.append('description',courseData.description);
    _formData.append('featured_img',courseData.f_img,courseData.f_img.name);
    _formData.append('techs',courseData.techs);
    try {
      axios.post(baseUrl+'/course/',_formData,{
        headers:{
          'Content-type':'multipart/form-data'
        }
      }).then((res)=>{
        console.log(res.data);
        window.location.href='/add-courses'
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
              <h6 className='card-header'>Add Courses</h6>
              <div class="mb-3 row">
            <label for='title' className='form-label'>Category</label>
            <select name='category' onChange={handleChange} className='form-control'>
              {cats.map((category,index)=>{return <option key={index} value={category.id}>{category.title}</option>})}

            </select>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name='title' id="title" onChange={handleChange}/>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Description</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control-plaintext" name='description' id="description" onChange={handleChange}/>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Featured Image</label>
                <div class="col-sm-10">
                  <input type="file" class="form-control-plaintext" name="f_img" id="video" onChange={handleFileChange}/>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Technologies</label>
                <div class="col-sm-10">
                  <textarea type="text" class="form-control-plaintext" name="techs" onChange={handleChange} id='techs'/>
                </div>
              </div>
             
              <div class="mb-3 row">
               <button className='btn btn-primary' onClick={formSubmit}>Submit</button>
              </div>
            </div>


          </section>
        </div>
      </div>
    </div>
  )
}
