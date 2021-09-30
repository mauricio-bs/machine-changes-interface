import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

//Login
import Login from './pages'

//ADMIN
import Dashboard from './pages/admin/dashboard'
//USERS
import UserList from './pages/admin/users'
import NewUser from './pages/admin/users/newUser'
import EditUser from './pages/admin/users/editUser'

//SHIFT
import Shift from './pages/admin/manage/shift'

//ROLE
import Roles from './pages/admin/manage/role'
import NewRole from './pages/admin/manage/role/newRole'

//BUILDS
import Building from './pages/admin/build/building';
import NewBuilding from './pages/admin/build/building/newBuilding';

//LINES
import Line from './pages/admin/build/line'
import NewLine from './pages/admin/build/line/newLine'
/*-----------------------------------------------------------------*/
//USERS
import Home from './pages/client/home'

//MACHINES
import Machines from './pages/client/machines'
import NewMachine from './pages/admin/machines/newMachine'
import UpdtMachine from './pages/admin/machines/editMachine'

//MANUFACTURERS
import Manufacturers from './pages/admin/manage/manufacturer';

//Components 
//CNC
import NC from './pages/client/machines/components/cnc'
import NewNC from './pages/admin/machines/components/cnc/newComponent'
import EditNC from './pages/admin/machines/components/cnc/editComponent'
import NCDetails from './pages/client/machines/components/cnc/details'


//------------------------------------------------
export default function routes(){
    return(
        <BrowserRouter>
            <Switch>
                {/* Login Page */}
                <Route path='/' exact component={Login}/>

                {/* Admin / Supervisor */}
                <Route path='/admin' exact component={Dashboard}/>
                <Route path='/admin/users' exact component={UserList}/>
                <Route path='/admin/users/register' exact component={NewUser}/>
                {/* <Route path='/admin/users/details/:_id' exact component={UserDetail}/> */}
                <Route path='/admin/users/edit/:_id' exact component={EditUser}/>

                {/* Management */}
                    {/* Shift */}
                    <Route path='/admin/manage/shift' exact component={Shift}/>
                    {/* <Route path='/admin/manage/shift/new' exact component={}/>
                    <Route path='/admin/manage/shift/edit/:_id' exact component={}/> 
                    <Route path='/admin/manage/shift/details/:_id' exact component={}/> */}
                    
                    {/* Role */}
                    <Route path='/admin/manage/role' exact component={Roles}/>
                    <Route path='/admin/manage/role/new' exact component={NewRole}/>
                    {/* <Route path='/admin/manage/roles/new' exact component={NewRole}/> */}
                    
                    {/* Manufacturer */}
                    <Route path='/admin/manage/manufacturers' exact component={Manufacturers}/>
                {/* Builds*/}
                <Route path='/admin/build/buildings' exact component={Building}/>
                <Route path='/admin/build/buildings/new' exact component={NewBuilding}/>

                {/* Production Line */}
                <Route path='/admin/build/buildings/line' exact component={Line}/>
                <Route path='/admin/build/buildings/line/new' exact component={NewLine}/>
                
                {/* Manufacturer */}

                {/* Machines */}
                <Route path='/machines' exact component={Machines}/>
                <Route path='/admin/machines/new' exact component={NewMachine}/>
                <Route path='/admin/machines/edit/:_id' exact component={UpdtMachine}/>
                {/* Components */}
                    {/* CNC */}
                    <Route path='/machines/cnc' exact component={NC}/>
                    <Route path='/machines/cnc/details/:_id' exact component={EditNC}/>
                    <Route path='/admin/machines/cnc/new' exact component={NewNC}/>
                    <Route path='/admin/machines/cnc/edit/:_id' exact component={NCDetails}/>
                    {/* PLC */}
                    <Route path='/machines/plc' exact component={Machines}/>
                    <Route path='/machines/plc/details/:_id' exact component={Machines}/>
                    <Route path='/admin/machines/plc/new' exact component={Machines}/>
                    <Route path='/admin/machines/plc/edit/:_id' exact component={Machines}/>

                    {/* IHM */}
                    <Route path='/machines/ihm' exact component={Machines}/>
                    <Route path='/machines/ihm/details/:_id' exact component={Machines}/>
                    <Route path='/admin/machines/ihm/new' exact component={Machines}/>
                    <Route path='/admin/machines/ihm/edit/:_id' exact component={Machines}/>

                    {/* Driver */}
                    <Route path='/machines/driver' exact component={Machines}/>
                    <Route path='/machines/driver/details/:_id' exact component={Machines}/>
                    <Route path='/admin/machines/driver/new' exact component={Machines}/>
                    <Route path='/admin/machines/driver/edit/:_id' exact component={Machines}/>
                    
                    {/* Software */}
                    <Route path='/machines/software' exact component={Machines}/>
                    <Route path='/machines/software/details/:_id' exact component={Machines}/>
                    <Route path='/admin/machines/software/new' exact component={Machines}/>
                    <Route path='/admin/machines/software/edit/:_id' exact component={Machines}/>
                
                {/* User */}
                <Route path='/home' exact component={Home}/>


            </Switch>
        </BrowserRouter>
    )
}