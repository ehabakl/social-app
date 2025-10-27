import React, { useContext } from "react";
import { NavLink, Link , useNavigate} from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
export default function Navbar() {
  let { token, setToken } = useContext(TokenContext);
let navigate = useNavigate();


  function logOut (){
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <div className="navbar bg-base-100 shadow-sm w-[80%] mx-auto">
      <div className="flex-1">
        <Link className="text-blue-600 font-bold text-2xl" to="/">
          Linked Posts
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {
            token ? <>    <li>
              <NavLink to="/UserPosts">UserPosts</NavLink>
            </li>
          
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
              <li>
              <a onClick={() => logOut()}>Logout</a>
            </li>
            
            </> 
            
            :<>    <li>
              <NavLink className="justify-between" to="/register">
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            </>
             }
        
         
          </ul>
        </div>
      </div>
    </div>
  );
}
