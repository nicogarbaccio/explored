import { Routes, Route } from 'react-router-dom';
import Announcement from './Components/Announcement';
import AnnouncementList from './Components/AnnouncementList';
import Assignment from './Components/Assignment';
import AssignmentList from './Components/AssignmentList';
import CourseDetails from './Components/CourseDetails';
import CourseForm from './Components/CourseForm';
import CourseList from './Components/CourseList';
import StudentList from './Components/StudentList';
import CourseListStudent from './Components/CourseListStudent';
import Discussion from './Components/Discussion';
import DiscussionList from './Components/DiscussionList';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Syllabus from './Components/Syllabus';
import StudentDetails from './Components/StudentDetails';
import StudentGrades from './Components/StudentGrades';
import CourseDocumentList from './Components/CourseDocumentList';
import Login from './Components/Login';
import UserProfile from './Components/UserProfile';
import PasswordChange from './Components/PasswordChange';
import EmailChange from './Components/EmailChange';
import SignupInstructor from './Components/SignupInstructor';
import SignupStudent from './Components/SignupStudent';
import './App.css';

function App() {

  return (
      <div className='App'>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/SignupInstructor' element={<SignupInstructor />}></Route>
          <Route exact path='/SignupStudent' element={<SignupStudent />}></Route>
          <Route exact path='/assignment/:id' element={<Assignment />}></Route>
          <Route exact path='/announcement/:id' element={<Announcement />}></Route>
          <Route exact path='/course/:id/discussion_board' element={<DiscussionList />}></Route>
          <Route exact path='/discussion/:id' element={<Discussion />}></Route>
          <Route exact path='/instructor/:id/courses' element={<CourseList />}></Route>
          <Route exact path='/student/:id/courses' element={<CourseListStudent />}></Route>
          <Route exact path='/courses/add' element={<CourseForm />}></Route>
          <Route exact path='/courses/:id' element={<CourseDetails />}></Route>
          <Route exact path='/syllabus/:id' element={<Syllabus />}></Route>
          <Route exact path='/course/:id/assignments' element={<AssignmentList />}></Route>
          <Route exact path='/course/:id/announcements' element={<AnnouncementList />}></Route>
          <Route exact path='/course/:id/students' element={<StudentList />}></Route>
          <Route exact path='/course/:id/students/:id' element={<StudentDetails />}></Route>
          <Route exact path='/course/:id/grades' element={<StudentGrades />}></Route>
          <Route exact path='/course/:id/documents' element={<CourseDocumentList />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/profile/:id' element={<UserProfile />}></Route>
          <Route exact path='/password_change' element={<PasswordChange />}></Route>
          <Route exact path='/email_change' element={<EmailChange />}></Route>
        </Routes>
      </div>
  );
}

export default App;