import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
export default class Dashboard extends Component {

    componentDidMount(){
    	 NotificationManager.success('Successfully', 'Login');
         let token=localStorage.getItem('token');
    }

    render() {
        return (

            <div>
           <SideNav
    onSelect={(selected) => {
        // Add your code here
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
            <NavIcon>
                <i className="fa fa-fw fa-building-o" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Services
            </NavText>
        </NavItem>
       
    </SideNav.Nav>

</SideNav>
 <main>
   Hai
   </main>
</div>

        );
    }
}