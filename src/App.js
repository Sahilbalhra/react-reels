import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";
import { AuthContextProvider,AuthContext} from "./context/AuthContext";
import { useContext } from "react";

function App() {
  return (
    <AuthContextProvider>
    <BrowserRouter>
      <Switch>
        <RedirectToFeed path="/login" comp={Login} >
          {/* <Login/> */}
          </RedirectToFeed>
        <RedirectToFeed path="/signup" comp={Signup}>
          {/* <Signup/> */}
          </RedirectToFeed>
        <PrivateRoute path="/feed"
            comp={Feed}
          >
          </PrivateRoute>
          <PrivateRoute path="/profile"
            comp={Profile}
          >
          </PrivateRoute>
          <Redirect from="/" to="/feed"></Redirect>
          <Route>
            <PageNotFound></PageNotFound>
          </Route>
      </Switch>
     </BrowserRouter>
    </AuthContextProvider>
  );
}
function PrivateRoute(props) {
  console.log("private Route",props)
  let Component = props.comp;
  // check -> are you loggedIN
  let cUser = useContext(AuthContext);
  // cuser-> null ->logi page
  // cuser-> anything
  return (
    <Route
      {...props}
      render={
        (props) => {
          // logic
          return cUser != null ? <Component {...props}>
          </Component> : <Redirect
          {...props}
          to="/login"></Redirect>
        }
      }
    ></Route>
  )
}
function RedirectToFeed(props) {
  let Component = props.comp;
  // check -> are you loggedIN
  let cUser = useContext(AuthContext);
  // cuser-> null ->login page
  // cuser-> anything
  return (
    <Route
      {...props}
      render={(props) => {
        // logic
        return cUser != null ? (
          <Redirect {...props} to="/feed"></Redirect>
        ) : (
          <Component {...props}></Component>
        );
      }}
    ></Route>
  );
}

export default App;
