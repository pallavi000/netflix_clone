import { toHaveFormValues } from '@testing-library/jest-dom/dist/matchers';
import { typeImplementation } from '@testing-library/user-event/dist/type/typeImplementation';
import axios from 'axios';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from './component/admin/dashboard/Dashboard';
import CreateGenre from './component/admin/genre/CreateGenre';
import EditGenre from './component/admin/genre/EditGenre';
import GenreIndex from './component/admin/genre/GenreIndex';
import CreateMovie from './component/admin/movie/CreateMovie';
import EditMovie from './component/admin/movie/EditMovie';
import MovieIndex from './component/admin/movie/MovieIndex';
import AdminProtected from './component/admin/protected/AdminProtected';
import UserProtected from './component/admin/protected/UserProtected';
import Sidebar from './component/admin/Sidebar';
import CreateSubscription from './component/admin/subscription/CreateSubscription';
import EditSubscription from './component/admin/subscription/EditSubscription';
import SuscriptionIndex from './component/admin/subscription/SuscriptionIndex';
import Table from './component/admin/Table';
import EditUser from './component/admin/user/EditUser';
import IndexUser from './component/admin/user/IndexUser';
import ChnagePassword from './component/auth/ChnagePassword';
import ForgotPassword from './component/auth/ForgotPassword';
import ResetPassword from './component/auth/ResetPassword';
import SignIn from './component/auth/SignIn';
import SignUp from './component/auth/SignUp';
import Account from './component/layouts/Account';
import Footer from './component/layouts/Footer';
import Header from './component/layouts/Header';
import History from './component/layouts/History';
import Home from './component/layouts/Home';
import List from './component/layouts/List';
import MovieDetail from './component/layouts/MovieDetail';
import Movies from './component/layouts/Movies';
import New from './component/layouts/New';
import ShowDetail from './component/layouts/ShowDetail';
import Shows from './component/layouts/Shows';
import Subscription from './component/layouts/Subscription';
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
          <Route exact path="/account" element={<Account/>}/>
          <Route exact path="/change-password" element={<ChnagePassword/>}/>
          <Route exact path="/forgot-password" element={<ForgotPassword/>}/>
          <Route exact path="/reset-password" element={<ResetPassword/>}/>
          <Route exact path="/show" element={<UserProtected/>}>
          <Route exact path="/show" element={<Shows/>}/>
          </Route>
          <Route exact path="/movies" element={<UserProtected/>} >
          <Route exact path="/movies" element={<Movies/>}/>
          </Route>
          <Route exact path="/history" element={<UserProtected/>} >
          <Route exact path="/history" element={<History/>}/>
          </Route>
          <Route exact path="/tv-show" element={<UserProtected/>} >
          <Route exact path="/tv-show" element={<TV/>}/>
          </Route>
          <Route exact path="/movie-detail/:id" element={<UserProtected/>} >
          <Route exact path="/movie-detail/:id" element={<MovieDetail/>}/>
          </Route>
          <Route exact path="/show-detail/:id" element={<UserProtected/>} >
          <Route exact path="/show-detail/:id" element={<ShowDetail/>}/>
          </Route>
          <Route exact path="/my-list" element={<UserProtected/>} >
          <Route exact path="/my-list" element={<List/>}/>
          </Route>
          <Route exact path="/new" element={<UserProtected/>} >
          <Route exact path="/new" element={<New/>}/>
          </Route>
          <Route exact path="/subscription" element={<UserProtected/>} >
          <Route exact path="/subscription" element={<Subscription/>}/>
          </Route>
        

            <Route exact path="/admin/movie/index" element={<AdminProtected/>} >
              <Route exact path="/admin/movie/index" element={<MovieIndex/>}/>
            </Route>
            <Route exact path="/admin/dashboard" element={<AdminProtected/>} >
              <Route exact path="/admin/dashboard" element={<Dashboard/>}/>
            </Route>
            <Route exact path="/admin/movie/add" element={<AdminProtected/>} >
              <Route exact path="/admin/movie/add" element={<CreateMovie/>}/>
            </Route>
            <Route exact path="/admin/movie/edit/:id" element={<AdminProtected/>} >
              <Route exact path="/admin/movie/edit/:id" element={<EditMovie/>}/>
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
            <Route exact path="/admin/user/index" element={<AdminProtected/>} >
              <Route exact path="/admin/user/index" element={<IndexUser/>}/>
            </Route>
            <Route exact path="/admin/user/edit/:id" element={<AdminProtected/>} >
              <Route exact path="/admin/user/edit/:id" element={<EditUser/>}/>
            </Route>
            <Route exact path="/admin/subscription/edit/:id" element={<AdminProtected/>} >
              <Route exact path="/admin/subscription/edit/:id" element={<EditSubscription/>}/>
            </Route>
            <Route exact path="/admin/subscription/index" element={<AdminProtected/>} >
              <Route exact path="/admin/subscription/index" element={<SuscriptionIndex/>}/>
            </Route>
            <Route exact path="/admin/subscription/create" element={<AdminProtected/>} >
              <Route exact path="/admin/subscription/create" element={<CreateSubscription/>}/>
            </Route>

        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
