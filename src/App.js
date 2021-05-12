import './App.css';
import Home from './pages/home';
import Grid from './pages/grid';
import UserListController from './pages/UserListController';
import AddUserController from './pages/AddUserController';
import UserLoginController from './pages/UserLoginController';
import MarerialUIDrawer from './components/drawer';
import { BrowserRouter, Route, Switch }	from 'react-router-dom';

function App() {
return (
	<div className="App">	
  {/* Drawer*/}
  <MarerialUIDrawer/>

    <Switch>
        <Route path="/" exact >
            <Home/>
        </Route>
        <Route exact path='/grid'>
            <Grid/>
        </Route>
        <Route exact path='/UserListController'>
            <UserListController/>
        </Route>
        <Route exact path='/AddUserController'>
            <AddUserController/>
        </Route>
        <Route exact path='/UserLoginController'>
            <UserLoginController/>
        </Route>
    </Switch>
	</div>
);
}
export default App ;