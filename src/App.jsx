import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from '../../blog/src/appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header } from './Components';
import { Outlet } from 'react-router-dom';
import { Footer } from './Components';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userdata : userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full flex flex-col justify-center items-center'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App;
