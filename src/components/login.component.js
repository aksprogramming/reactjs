import React, { Component } from "react";
import {  Link } from "react-router-dom";
import LoadingScreen from 'react-loading-screen';
export default class Login extends Component {
    constructor(props) {
        super(props);
        const domain=process.env.REACT_APP_NOT_SECRET_CODE;
        this.state = {
                domain:domain,
                loading:true,
                formValid:false,
                email: "",
                password:"",
                errors: {
                password: '',
                email:'',
                common:'',
            }
        };
        this.handleLogin = this.handleLogin.bind(this);
    }
       onTodoChange(event){
        let target = event.target;
        const value=target.value;
        const name=target.name;
// eslint-disable-next-line        
        switch(name) { 

            case 'email':
// eslint-disable-next-line
                this.state.email=value;
                if(value===''){
// eslint-disable-next-line
                    this.state.errors.email = 'Email is required';
                }else{
                     let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                     if(emailValid){
// eslint-disable-next-line
                        this.state.errors.email = '';
                     }else{
// eslint-disable-next-line
                        this.state.errors.email = 'Email is invalid';
                     }
                     
                }        
               
            break;
            case 'password':
// eslint-disable-next-line
                this.state.password=value;
                if(value===''){
// eslint-disable-next-line
                    this.state.errors.password = 'Password is required';
                }else{
                    // eslint-disable-next-line
                     let password = value.match('^[a-zA-Z0-9!@#\$%\^&]{8,}$');
                     if(password){
// eslint-disable-next-line
                        this.state.errors.password = '';
//                         password = value.match('^(?=.*[0-9])(?=.{8,})');
//                            if(password){
// // eslint-disable-next-line
//                                 this.state.errors.password = '';
//                             }else{
// // eslint-disable-next-line
//                                 this.state.errors.password = 'Contains a number';
//                             }
                     }else{
// eslint-disable-next-line
                        this.state.errors.password = 'At least 8 characters';
                     }
                     
                }        
               
            break;

        }

// eslint-disable-next-line
        if(this.state.errors.email!=''||this.state.errors.password!='') {this.flag=1;}
        else{this.flag=0;}
        if(this.flag===1){
// eslint-disable-next-line
            this.state.formValid=false;
        }else{
// eslint-disable-next-line
            this.state.formValid=true;
        }
// eslint-disable-next-line
        this.forceUpdate();
    }
      handleLogin(event){
// eslint-disable-next-line
        this.state.loading=true;
        this.forceUpdate();
        event.preventDefault();
        let email=event.target.email.value;
        let password=event.target.password.value;
        var formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        event.preventDefault();
        fetch(this.state.domain+"api/v1/login",{method:"POST",header: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            },body:formData})
        .then(res=>res.json())
        .then(
            (result)=>{
               // console.log(result);

                if(result.error){  
                   
               
                        // eslint-disable-next-line
                        this.state.errors.common="Invalid email or password.";
                 
                    
                   
                    
                }
                if(result.success) {
                    localStorage.setItem('token', result.success.token);
                    this.props.history.push("/Dashboard");  
                }
                // eslint-disable-next-line         
                 this.state.loading=false;
                 this.forceUpdate();
            },
            (error)=>{
               
            }
        )
    }
    componentDidMount(){
                // eslint-disable-next-line   
                this.state.loading=false;
                this.forceUpdate();   
    }
    render() {
        return (
            <div>
             <LoadingScreen
                loading={this.state.loading}
                bgColor='#f1f1f1'
                spinnerColor='#9ee5f8'
                textColor='#676767'
                text=''
              > 
              </LoadingScreen>
                 <form onSubmit={this.handleLogin} method="post" hidden={this.state.loading}>
          
                    <h3>Login to your account</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" name="email" className="form-control" placeholder="Enter email" onBlur={e => this.onTodoChange(e)}  />
                          <span className="errors">{this.state.errors.email}</span>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" placeholder="Enter password" onBlur={e => this.onTodoChange(e)} onChange={e => this.onTodoChange(e)} />
                        <span className="errors">{this.state.errors.password}</span>
                    </div>

                    <div className="errors alert alert-danger" hidden={this.state.errors.common==''}  role="alert">{this.state.errors.common}</div>

                    <button type="submit" className="btn btn-primary btn-block" disabled={!this.state.formValid}>Login</button>
                    <p className="forgot-password text-right">
                       
                    </p>

                    <p className="forgot-password">
                    Don’t have an account? <Link  to={"/sign-up"}>Register your business</Link>
                    </p>
                </form>
            </div>
        );
    }
}