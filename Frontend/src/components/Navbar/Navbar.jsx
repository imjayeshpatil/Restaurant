


// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

//   // Function to update auth state
//   const updateAuthState = () => {
//     setIsAuthenticated(!!localStorage.getItem("token"));
//   };

//   useEffect(() => {
//     // Check auth status when component mounts
//     updateAuthState();

//     // Listen for custom auth events
//     window.addEventListener("authChange", updateAuthState);

//     return () => {
//       window.removeEventListener("authChange", updateAuthState);
//     };
//   }, []);

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");

//     // Dispatch custom event to update Navbar
//     window.dispatchEvent(new Event("authChange"));

//     navigate("/login");
//   };

//   return (
//     <nav style={styles.navbar}>
//       <ul style={styles.navList}>
//         <li style={styles.navItem}>
//           <Link to="/" style={styles.navLink}>
//             <i className="fas fa-home" style={styles.icon}></i> Home
//           </Link>
//         </li>
//         <li style={styles.navItem}>
//           <Link to="/about" style={styles.navLink}>
//             <i className="fas fa-info-circle" style={styles.icon}></i> About Us
//           </Link>
//         </li>
//         <li style={styles.navItem}>
//           <Link to="/contact" style={styles.navLink}>
//             <i className="fas fa-envelope" style={styles.icon}></i> Contact
//           </Link>
//         </li>

//         {isAuthenticated ? (
//           <li style={styles.navItem}>
//             <button onClick={handleLogout} style={styles.logoutButton}>
//               <i className="fas fa-sign-out-alt" style={styles.icon}></i> Logout
//             </button>
//           </li>
//         ) : (
//           <>
//             <li style={styles.navItem}>
//               <Link to="/login" style={styles.navLink}>
//                 <i className="fas fa-sign-in-alt" style={styles.icon}></i> Login
//               </Link>
//             </li>
//             <li style={styles.navItem}>
//               <Link to="/register" style={styles.navLink}>
//                 <i className="fas fa-user-plus" style={styles.icon}></i> Register
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// const styles = {
//   navbar: {
//     backgroundColor: "#222",
//     padding: "15px 20px",
//     display: "flex",
//     justifyContent: "center",
//     position: "sticky",
//     top: "0",
//     width: "100%",
//     zIndex: "1000",
//   },
//   navList: {
//     listStyle: "none",
//     display: "flex",
//     gap: "20px",
//     margin: "0",
//     padding: "0",
//   },
//   navItem: {
//     display: "inline-block",
//   },
//   navLink: {
//     color: "#fff",
//     textDecoration: "none",
//     fontSize: "16px",
//     fontWeight: "bold",
//     padding: "10px 15px",
//     borderRadius: "5px",
//     transition: "all 0.3s ease-in-out",
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//   },
//   logoutButton: {
//     backgroundColor: "transparent",
//     border: "none",
//     color: "#fff",
//     fontSize: "16px",
//     fontWeight: "bold",
//     padding: "10px 15px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     transition: "all 0.3s ease-in-out",
//   },
//   icon: {
//     fontSize: "18px",
//   },
// };

// export default Navbar;



// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

//   // Function to update auth state
//   const updateAuthState = () => {
//     setIsAuthenticated(!!localStorage.getItem("token"));
//   };

//   useEffect(() => {
//     // Check auth status when component mounts
//     updateAuthState();

//     // Listen for custom auth events
//     window.addEventListener("authChange", updateAuthState);

//     return () => {
//       window.removeEventListener("authChange", updateAuthState);
//     };
//   }, []);

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");

//     // Dispatch custom event to update Navbar
//     window.dispatchEvent(new Event("authChange"));

//     navigate("/login");
//   };

//   return (
//     <nav style={styles.navbar}>
//       <ul style={styles.navList}>
//         <li style={styles.navItem}>
//           <Link to="/" style={styles.navLink}>
//             <i className="fas fa-home" style={styles.icon}></i> Home
//           </Link>
//         </li>
//         <li style={styles.navItem}>
//           <Link to="/about" style={styles.navLink}>
//             <i className="fas fa-info-circle" style={styles.icon}></i> About Us
//           </Link>
//         </li>
//         <li style={styles.navItem}>
//           <Link to="/contact" style={styles.navLink}>
//             <i className="fas fa-envelope" style={styles.icon}></i> Contact
//           </Link>
//         </li>

//         {isAuthenticated ? (
//           <>
//             <li style={styles.navItem}>
//               <Link to="/booking" style={styles.navLink}>
//                 <i className="fas fa-utensils" style={styles.icon}></i> Book a Table
//               </Link>
//             </li>
//             <li style={styles.navItem}>
//               <button onClick={handleLogout} style={styles.logoutButton}>
//                 <i className="fas fa-sign-out-alt" style={styles.icon}></i> Logout
//               </button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li style={styles.navItem}>
//               <Link to="/login" style={styles.navLink}>
//                 <i className="fas fa-sign-in-alt" style={styles.icon}></i> Login
//               </Link>
//             </li>
//             <li style={styles.navItem}>
//               <Link to="/register" style={styles.navLink}>
//                 <i className="fas fa-user-plus" style={styles.icon}></i> Register
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// const styles = {
//   navbar: {
//     backgroundColor: "#222",
//     padding: "15px 20px",
//     display: "flex",
//     justifyContent: "center",
//     position: "sticky",
//     top: "0",
//     width: "100%",
//     zIndex: "1000",
//   },
//   navList: {
//     listStyle: "none",
//     display: "flex",
//     gap: "20px",
//     margin: "0",
//     padding: "0",
//   },
//   navItem: {
//     display: "inline-block",
//   },
//   navLink: {
//     color: "#fff",
//     textDecoration: "none",
//     fontSize: "16px",
//     fontWeight: "bold",
//     padding: "10px 15px",
//     borderRadius: "5px",
//     transition: "all 0.3s ease-in-out",
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//   },
//   logoutButton: {
//     backgroundColor: "transparent",
//     border: "none",
//     color: "#fff",
//     fontSize: "16px",
//     fontWeight: "bold",
//     padding: "10px 15px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     transition: "all 0.3s ease-in-out",
//   },
//   icon: {
//     fontSize: "18px",
//   },
// };

// export default Navbar;

















import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));

  // Function to update auth state
  const updateAuthState = () => {
    setIsAuthenticated(!!localStorage.getItem("token"));
    setUserRole(localStorage.getItem("role"));
  };

  useEffect(() => {
    // Check auth status when component mounts
    updateAuthState();

    // Listen for custom auth events
    window.addEventListener("authChange", updateAuthState);

    return () => {
      window.removeEventListener("authChange", updateAuthState);
    };
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Dispatch custom event to update Navbar
    window.dispatchEvent(new Event("authChange"));

    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        {/* Show "Home" link only if the user is not an admin */}
        {userRole !== "admin" && (
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink}>
              <i className="fas fa-home" style={styles.icon}></i> Home
            </Link>
          </li>
        )}
        <li style={styles.navItem}>
          <Link to="/about" style={styles.navLink}>
            <i className="fas fa-info-circle" style={styles.icon}></i> About Us
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/contact" style={styles.navLink}>
            <i className="fas fa-envelope" style={styles.icon}></i> Contact
          </Link>
        </li>

        {isAuthenticated ? (
          <>
            <li style={styles.navItem}>
              <Link to="/booking" style={styles.navLink}>
                <i className="fas fa-utensils" style={styles.icon}></i> Book a Table
              </Link>
            </li>
            <li style={styles.navItem}>
              <button onClick={handleLogout} style={styles.logoutButton}>
                <i className="fas fa-sign-out-alt" style={styles.icon}></i> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li style={styles.navItem}>
              <Link to="/login" style={styles.navLink}>
                <i className="fas fa-sign-in-alt" style={styles.icon}></i> Login
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/register" style={styles.navLink}>
                <i className="fas fa-user-plus" style={styles.icon}></i> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#222",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "center",
    position: "sticky",
    top: "0",
    width: "100%",
    zIndex: "1000",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: "0",
    padding: "0",
  },
  navItem: {
    display: "inline-block",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "10px 15px",
    borderRadius: "5px",
    transition: "all 0.3s ease-in-out",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoutButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease-in-out",
  },
  icon: {
    fontSize: "18px",
  },
};

export default Navbar;
