import { toHaveFormValues } from '@testing-library/jest-dom/dist/matchers';
import { typeImplementation } from '@testing-library/user-event/dist/type/typeImplementation';
import axios from 'axios';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from './component/admin/dashboard/Dashboard';
import CreateGenre from './component/admin/genre/CreateGenre';
import EditGenre from './component/admin/genre/EditGenre';
import GenreIndex from './component/admin/genre/GenreIndex';
import CreateMovie from './component/admin/movie/CreateMovie';
import MovieIndex from './component/admin/movie/MovieIndex';
import AdminProtected from './component/admin/protected/AdminProtected';
import Sidebar from './component/admin/Sidebar';
import SignIn from './component/auth/SignIn';
import SignUp from './component/auth/SignUp';
import Footer from './component/layouts/Footer';
import Header from './component/layouts/Header';
import Home from './component/layouts/Home';
import MovieDetail from './component/layouts/MovieDetail';
import Movies from './component/layouts/Movies';
import ShowDetail from './component/layouts/ShowDetail';
import Shows from './component/layouts/Shows';
import TV from './component/layouts/TV';

axios.defaults.baseURL="http://localhost:5000/api"

function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path="/sign-in" element={<SignIn/>}/>
          <Route exact path="/sign-up" element={<SignUp/>}/>
          <Route exact path="/show" element={<Shows/>}/>
          <Route exact path="/movies" element={<Movies/>}/>
          <Route exact path="/tv-show" element={<TV/>}/>
          <Route exact path="/movie-detail" element={<MovieDetail/>}/>
          <Route exact path="/show-detail" element={<ShowDetail/>}/>
            
            
            <Route exact path="/admin/movie/index" element={<AdminProtected/>} >
              <Route exact path="/admin/movie/index" element={<MovieIndex/>}/>
            </Route>
            <Route exact path="/admin/dashboard" element={<AdminProtected/>} >
              <Route exact path="/admin/dashboard" element={<Dashboard/>}/>
            </Route>
            <Route exact path="/admin/movie/add" element={<AdminProtected/>} >
              <Route exact path="/admin/movie/add" element={<CreateMovie/>}/>
            </Route>
            <Route exact path="/admin/genre/add" element={<AdminProtected/>} >
              <Route exact path="/admin/genre/add" element={<CreateGenre/>}/>
            </Route>
            <Route exact path="/admin/genre/index" element={<AdminProtected/>} >
              <Route exact path="/admin/genre/index" element={<GenreIndex/>}/>
            </Route>
            <Route exact path="/admin/genre/edit-genre" element={<AdminProtected/>} >
              <Route exact path="/admin/genre/edit-genre/:id" element={<EditGenre/>}/>
            </Route>
          
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
