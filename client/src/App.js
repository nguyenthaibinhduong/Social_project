import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import './App.css';
import Header from "./components/header/header";
import Leftbar from "./components/leftbar/leftbar";
import Rightbar from "./components/rightbar/rightbar";
import Search from "./pages/search/search";
import Chat from "./pages/chat/chat";
import { UserContextProvider } from "./context/userContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
        <div className="App">
          <header className="header">
            <Header />
          </header>
          <div className="leftbar p-3">
              <Leftbar />
            </div>
          <div className="content">
            
            <div className="main-content">
              <Outlet />
            </div>
            <div className="rightbar">
              <div className="p-3"><Rightbar /></div>
            </div>
          </div>
          </div>
        </UserContextProvider>
      </QueryClientProvider>
    );
  };

  const ChatLayout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
        <div className="App">
          <header className="header">
            <Header />
          </header>
          <div className="container-fluid">
             <Outlet />
          </div>
         
          </div>
          </UserContextProvider>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/search/:key",
          element: <Search />,
        },
      ],
    },
    {
      path: "/chat",
      element: (
        <ProtectedRoute>
          <ChatLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/chat/:id",
          element: <Chat />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
