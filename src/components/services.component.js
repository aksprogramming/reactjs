import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default class Services extends Component {

    componentDidMount(){
         let token=localStorage.getItem('token');
    }

    render() {
        return (
          <div>Haiia</div>
        );
    }
}