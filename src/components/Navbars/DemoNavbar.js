import React from "react";
// import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  Container,

} from "reactstrap";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

function Header(props) {
  const [isOpen, ] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  // const server = "http://localhost:3010";
  // const [data_sql, setData_sql] = useState([]);
  // const [, setError] = useState();
  // const [, setLoading] = useState(true);

  const sidebarToggle = React.useRef();
  const location = useLocation();

 
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);

 
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const department = localStorage.getItem('department');
  const name_n = localStorage.getItem('name_n');
   
  // const member_id = localStorage.getItem('member_id');
  // useEffect(() => {
  //   fetch(server + "/member_select/"+member_id)
  //     .then((response) => response.json())
  //     .then((result) => setData_sql(result))
  //     .then(() => setLoading(false))
  //     .catch(setError);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  
  // const member_name = data_sql.name ;  

  return (

    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "dark"
          : color
      }
      expand="lg"
      className={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
          (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
        </div>
        <div style={{  flex: 1}}>
        <span class="badge badge-pill badge-warning" style={{fontSize:'13px'}} >

          <b >Username : {name_n.slice(1,-1)}  || ฝ่าย : {department.slice(1,-1)}</b>
          
          </span>
        </div>
      
       
        <IconButton
          title="LOGOUT"
          aria-label="LOGOUT"
          size="small"
          color="error"
          style={{position: 'absolute', right: 10}}
          onClick={handleLogout}
        >
          < LogoutIcon fontSize="inherit" />LOGOUT
        </IconButton>

    
        <Collapse isOpen={isOpen} navbar className="justify-content-end">

        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
