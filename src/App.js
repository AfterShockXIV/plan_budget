import { Route, Switch, Redirect } from "react-router-dom";
import Login_index from 'layouts/login_index';
import AdminLayout from "./layouts/Admin";

function App() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    // eslint-disable-next-line react/jsx-pascal-case
    return <Login_index/>;
  }
  return (
    <div className="App">
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Redirect to="/admin/Home" />
      </Switch>
    </div>
  );
}
export default App;
