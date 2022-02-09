import React from "react";

import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import Form_update_plan from "views/view/form-update-plan"
import Form_check_plan from "views/view/form-check-plan"
import Check_job from "views/view/form-check-job";
import Home from "./Home";
var ps;

function Dashboard(props) {
  const [backgroundColor] = React.useState("black");
  const [activeColor] = React.useState("danger");
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  
  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div 
      // style={{backgroundImage:`url(${Bg})`}} 
      className="main-panel" ref={mainPanel} >
        <DemoNavbar {...props} />
       
        <Switch>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          })}
          <Route path="/admin/report_sap/:id" component={Form_check_plan}></Route>
          <Route path="/admin/edit_planbudget/:id" component={Form_update_plan}></Route>
          <Route path="/admin/check_job/:id" component={Check_job}></Route>
          <Route path="/admin/Home" component={Home}></Route>
        </Switch>
      
      </div>
    </div>
  );
}

export default Dashboard;
