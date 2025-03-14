import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar';
import Account from './pages/Account/Account';

function App() {

  const routes = [
    {
      path: '/',
      element: <Navigate to="/login" replace />,
      title: ''
    },
    {
      path: '/login',
      element: <Login />,
      title: 'Login'
    },
    {
      path: '/register',
      element: <Register />,
      title: 'Register'
    },
    {
      path: '/home',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
      title: 'Home',
    },
    {
      path: '/akun',
      element: (
        <ProtectedRoute>
          <Account />
        </ProtectedRoute>
      ),
      title: 'Akun',
    },
  ];

  function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  }

  const location = useLocation();

  useEffect(() => {
    const currentRoute = routes.find(route => route.path === location.pathname);
    document.title = "SIMS PPOB-Fariz Hasabi | " +currentRoute?.title || 'HIS PPOB';
  }, [location.pathname, routes]);

  return (
    <>
      <Navbar />
      <Routes>
        {routes.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
