import logo from './logo.svg';
import './App.css';
import { Main } from './components/Main';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Home } from './components/Home';
import { Header } from './components/Header';
import { About } from './components/About';
import { CourseDetails } from './components/CourseDetails';
import { Login } from './components/Users/Login';
import { Register } from './components/Users/Register';
import { Dashboard } from './components/Users/Dashboard';
import { Mycourses } from './components/Users/Mycourses';
import { FavouriteCourses } from './components/Users/FavouriteCourses';
import { RecomendedCourses } from './components/Users/RecomendedCourses';
import { ProfileSetting } from './components/Users/ProfileSetting';

// teacher
import { TeacherLogin } from './components/Teacher/TeacherLogin';
import { TeacherRegister } from './components/Teacher/TeacherRegister';
import { TeacherDashboard } from './components/Teacher/TeacherDashboard';
import { Teachercourses } from './components/Teacher/Teachercourses';
import { Addcourse } from './components/Teacher/Addcourse';
import { Userlist } from './components/Teacher/Userlist';
import { TeacherProfileSetting } from './components/Teacher/TeacherProfileSetting';
import { TeacherDetail } from './components/TeacherDetail';
import { Allcourses } from './components/Allcourses';
import { PopularCourses } from './components/PopularCourses';
import { PopularTeacher } from './components/PopularTeacher';
import { CategoryCourses } from './components/CategoryCourses';
import { TeacherLogout } from './components/Teacher/TeacherLogout';
import { AddChapter } from './components/Teacher/AddChapter';
import { CourseChapters } from './components/Teacher/CourseChapters';
import { StudentLogout } from './components/Users/StudentLogout';
import { Editcourse } from './components/Teacher/Editcourse';
import { EditChapter } from './components/Teacher/EditChapter';
import { Teacherskillcourse } from './components/Teacherskillcourse';
import { EnrolledStudents } from './components/Teacher/EnrolledStudents';
 function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/detail/:course_id' element={<CourseDetails></CourseDetails>}></Route>
        <Route path='/user-login' element={<Login></Login>}></Route>
        <Route path='/user-register' element={<Register></Register>}></Route>
        <Route path='/user-dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/my-courses' element={<Mycourses></Mycourses>}></Route>
        <Route path='/favourite-courses' element={<FavouriteCourses></FavouriteCourses>}></Route>
        <Route path='/recomended-courses' element={<RecomendedCourses></RecomendedCourses>}></Route>
        <Route path='/profile-setting' element={<ProfileSetting></ProfileSetting>}></Route>

        {/* teacher */}
        <Route path='/teacher-login' element={<TeacherLogin></TeacherLogin>}></Route>
        <Route path='/teacher-logout' element={<TeacherLogout></TeacherLogout>}></Route>   
        <Route path='/teacher-register' element={<TeacherRegister></TeacherRegister>}></Route>   
        <Route path='/teacher-dashboard' element={<TeacherDashboard></TeacherDashboard>}></Route>
        <Route path='/teacher-courses' element={<Teachercourses></Teachercourses>}></Route>
        <Route path='/add-courses' element={<Addcourse></Addcourse>}></Route>
        <Route path='/add-chapter/:course_id' element={<AddChapter></AddChapter>}></Route>
        <Route path='/edit-chapter/:chapter_id' element={<EditChapter></EditChapter>}></Route>
        <Route path='/edit-course/:course_id' element={<Editcourse></Editcourse>}></Route>

        <Route path='/all-chapters/:course_id' element={<CourseChapters></CourseChapters>}></Route>

        <Route path='/teacher-users' element={<Userlist></Userlist>}></Route>
        <Route path='/teacher-profile-setting' element={<TeacherProfileSetting></TeacherProfileSetting>}></Route>

        <Route path='/teacher-detail/:teacher_id' element={<TeacherDetail></TeacherDetail>}></Route>
        <Route path='/all-courses' element={<Allcourses></Allcourses>}></Route>
        <Route path='/popular-courses' element={<PopularCourses></PopularCourses>}></Route>
        <Route path='/popular-teacher' element={<PopularTeacher></PopularTeacher>}></Route>
        <Route path='/category/:category_slug' element={<CategoryCourses></CategoryCourses>}></Route>
        <Route path='/teacher-skill-courses/:skill_name/:teacher_id' element={<Teacherskillcourse></Teacherskillcourse>}></Route>

        <Route path='/user-logout' element={<StudentLogout></StudentLogout>}></Route> 
        <Route path='/enrolled-students/:course_id' element={<EnrolledStudents></EnrolledStudents>}></Route>  
        
        

        
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
