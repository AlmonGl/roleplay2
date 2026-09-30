import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlayerPage from './views/PlayerPage.jsx';

import LoginPage from './views/LoginPage.jsx';
import GlobalPage from './views/GlobalPage.jsx';
import GlobalPageDemo from './views/GlobalPageDemo.jsx';
import EventsPage from './views/EventsPage.jsx';
import { selectCurrentUserLogin, checkAdmin, checkDemo } from './store/usersSlice.js';
import { useDispatch,useSelector   } from 'react-redux';

import AdminPage from './views/AdminPage.jsx';
function App() {
    const userLogin = useSelector(selectCurrentUserLogin);
    const userAdmin = checkAdmin(userLogin);
    const userDemo = checkDemo(userLogin);
     
    return (
    <>   
      {
      userLogin ? 
      <BrowserRouter>
        <Routes>
          <Route index element={userAdmin ? <AdminPage /> : userDemo ? <GlobalPageDemo /> : <PlayerPage />  } /> 
        
          <Route path="events" element={<EventsPage />} />
          
          <Route path="global" element={<GlobalPage />} />
          <Route path="demo" element={<GlobalPageDemo />} />
        </Routes>
      </BrowserRouter> 
      : 
      <LoginPage /> 
      }
      
        
    </>
  )
      }
    


export default App
 /* {userAdmin ?
          <Route path="44" element={<BooksPage />} />
          :
          <Route path="44" element={<AdminPage />} />
          }*/