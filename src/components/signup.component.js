import React, { Component } from "react";
import {  Link } from "react-router-dom";
import LoadingScreen from 'react-loading-screen';
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        const domain=process.env.REACT_APP_NOT_SECRET_CODE;
        this.state = {
                domain:domain,
                loading:true,
                signup:false,
                formValid:false,
                firstname: "",
                lasname:"",
                comapny_name:"",
                business_type:"",
                lastname: null,
                password: null,
                c_name:"United Kingdom",
                email:null,
                country:"GB",
                zone:"Pacific/Pago_Pago",
                c_zone:"(GMT -11:00) Pago Pago",
                currrency:"AFN",
                errors: {
                company_name:'',
                firstname: '',
                lastname: '',
                password: '',
                c_password: '',
                email:'',
            }
        };
        this.handleRegister = this.handleRegister.bind(this);
    }
   onTodoChange(event){
        let target = event.target;
        const value=target.value;
        const name=target.name;
// eslint-disable-next-line        
        switch(name) { 
            case 'firstname':
// eslint-disable-next-line
                this.state.firstname=value;
                if(value===''){
// eslint-disable-next-line
                    this.state.errors.firstname = 'First name is required';

                }else{
// eslint-disable-next-line
                   this.state.errors.firstname = '';
                }                
            break;
            case 'company_name':
// eslint-disable-next-line
                this.state.company_name=value;
                if(value===''){
// eslint-disable-next-line
                    this.state.errors.company_name = 'Company name is required';

                }else{
// eslint-disable-next-line
                   this.state.errors.company_name = '';
                }                
            break;
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
                        password = value.match('^(?=.*[0-9])(?=.{8,})');
                           if(password){
// eslint-disable-next-line
                                this.state.errors.password = '';
                            }else{
// eslint-disable-next-line
                                this.state.errors.password = 'Contains a number';
                            }
                     }else{
// eslint-disable-next-line
                        this.state.errors.password = 'At least 8 characters';
                     }
                     
                }        
               
            break;
// eslint-disable-next-line
            case 'country':this.state.country=value;
            break;
            // eslint-disable-next-line
            case 'business_type':this.state.business_type=value;
            break;
// eslint-disable-next-line
            case 'currency':this.state.currency=value;
            break;
// eslint-disable-next-line
            case 'zone':this.state.zone=value;this.state.c_zone=value;

            break;
        }

// eslint-disable-next-line
        if(this.state.errors.firstname!=''||this.state.errors.email!=''||this.state.errors.password!='') {this.flag=1;}
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
    handleRegister(event){
// eslint-disable-next-line
        this.state.loading=true;
        this.forceUpdate();
        event.preventDefault();
        let email=event.target.email.value;
        let password=event.target.password.value;
        let name=event.target.firstname.value;
        let lastname=event.target.lastname.value;
        let company_name=event.target.company_name.value;
        let business_type=event.target.business_type.value;
        let zone=event.target.zone.value;
        let country=event.target.country.value;
        let currency=event.target.currency.value;     
        var formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("c_password", password);    
        formData.append("country", country);    
        formData.append("zone", zone);    
        formData.append("business_type", business_type);    
        formData.append("currency", currency);    
        formData.append("company_name", company_name);    
        formData.append("lastname", lastname);       
        event.preventDefault();
        fetch(this.state.domain+"api/v1/register",{method:"POST",header: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            },body:formData})
        .then(res=>res.json())
        .then(
            (result)=>{
               // console.log(result);

                if(result.error){  
                    if(result.error.name){
                        // eslint-disable-next-line
                        this.state.errors.firstname=result.error.name;
                    }  
                    if(result.error.password){
                        // eslint-disable-next-line
                        this.state.errors.password=result.error.password;
                    }  
                    if(result.error.c_password){
                        // eslint-disable-next-line
                        this.state.errors.c_password=result.error.c_password;
                    }  
                    if(result.error.email){
                        // eslint-disable-next-line
                        this.state.errors.email=result.error.email;
                    } 
                    if(result.error.company_name){
                        // eslint-disable-next-line
                        this.state.errors.company_name=result.error.company_name;
                    }
                }
                if(result.success) {
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
      
         fetch("https://meemcnc.com/c.php",{method:"GET",header: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            }})
        .then(res=>res.json())
        .then(
            (result)=>{
               // console.log(result);
               if(result.country){
                // eslint-disable-next-line
                    this.state.country=result.country;
                    // eslint-disable-next-line
                    this.state.c_name=result.c_name;
                }
                if(result.zone){
                    // eslint-disable-next-line
                    this.state.zone=result.zone;
                } 
                if(result.c_zone){
                    // eslint-disable-next-line
                    this.state.c_zone=result.c_zone;
                }    
                if(result.currency){
                    // eslint-disable-next-line
                    this.state.currency=result.currency;
                } 
                // eslint-disable-next-line   
                this.state.loading=false;
                this.forceUpdate();

               
            },
            (error)=>{
               
            }
        )
    }
    changeLocation(event){
        // eslint-disable-next-line
        this.state.loading=true;
        // eslint-disable-next-line
        this.forceUpdate();
        event.preventDefault();
        this.signup=true;
        // eslint-disable-next-line
        this.state.loading=false;
        // eslint-disable-next-line
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
           <form action="" onSubmit={this.handleRegister} method="post" hidden={this.state.loading}>
                <h3>Register your business</h3>

                <div className="form-row">
                    <div className="col form-group">
                        <label>First name </label>   
                        <input type="text"  name="firstname" className="form-control" placeholder="First name" onBlur={e => this.onTodoChange(e)} />
                        <span className="errors">{this.state.errors.firstname}</span>
                    </div> 
                    <div className="col form-group">
                        <label>Last name</label>
                        <input type="text" name="lastname" className="form-control" placeholder="Last name" onBlur={e => this.onTodoChange(e)} onChange={e => this.onTodoChange(e)} />
                    </div> 
                </div>

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
                <div className="form-row">
                    <div className="col form-group">
                        <label>Company name </label>   
                        <input type="text" name="company_name" className="form-control" placeholder="Company name" onBlur={e => this.onTodoChange(e)} onChange={e => this.onTodoChange(e)} />
                         <span className="errors">{this.state.errors.company_name}</span>
                    </div> 
                    <div className="col form-group">
                        <label>Business type</label>
                        <select  className="form-control" name="business_type" onChange={e => this.onTodoChange(e)} onChange={e => this.onTodoChange(e)}>
                            <option disabled="" value=""></option>
                            <option value="1">Hair Salon</option>
                            <option value="2">Nail Salon</option>
                            <option value="3">Waxing Salon</option>
                            <option value="4">Beauty Salon</option>
                            <option value="5">Barbershop</option>
                            <option value="6">Eyebrows &amp; Lashes</option>
                            <option value="7">Massage</option>
                            <option value="8">Spa</option>
                            <option value="9">Gym &amp; Fitness</option>
                            <option value="10">Personal Trainer</option>
                            <option value="11">Therapy Center</option>
                            <option value="12">Tattoo &amp; Piercing</option>
                            <option value="13">Tanning Studio</option>
                            <option value="14">Other</option>
                        </select>
                    </div> 
                </div>
                <div class="alert alert-secondary" role="alert" hidden={this.signup}>
                  Signing up in {this.state.c_name} {this.state.c_zone} / {this.state.currency}. 
                  <a href="#" onClick={e => this.changeLocation(e)}>Change details</a>
                </div>
                <div className="form-group' " hidden={!this.signup} >
                    <label>Country</label>
                    <select  className="form-control" name="country" value={this.state.country} onChange={e => this.onTodoChange(e)}>
                            <option value="GB">United Kingdom</option>
                                <option value="US">United States</option>
                                <option value="separator" disabled="">------------</option>
                                <option value="AF">Afghanistan</option>
                                <option value="AX">Åland Islands</option>
                                <option value="AL">Albania</option>
                                <option value="DZ">Algeria</option>
                                <option value="AS">American Samoa</option>
                                <option value="AD">Andorra</option>
                                <option value="AO">Angola</option>
                                <option value="AI">Anguilla</option>
                                <option value="AQ">Antarctica</option>
                                <option value="AG">Antigua and Barbuda</option>
                                <option value="AR">Argentina</option>
                                <option value="AM">Armenia</option>
                                <option value="AW">Aruba</option>
                                <option value="AU">Australia</option>
                                <option value="AT">Austria</option>
                                <option value="AZ">Azerbaijan</option>
                                <option value="BS">Bahamas</option>
                                <option value="BH">Bahrain</option>
                                <option value="BD">Bangladesh</option>
                                <option value="BB">Barbados</option>
                                <option value="BY">Belarus</option>
                                <option value="BE">Belgium</option>
                                <option value="BZ">Belize</option>
                                <option value="BJ">Benin</option>
                                <option value="BM">Bermuda</option>
                                <option value="BT">Bhutan</option>
                                <option value="BO">Bolivia, Plurinational State of</option>
                                <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                <option value="BA">Bosnia and Herzegovina</option>
                                <option value="BW">Botswana</option>
                                <option value="BR">Brazil</option>
                                <option value="IO">British Indian Ocean Territory</option>
                                <option value="BN">Brunei Darussalam</option>
                                <option value="BG">Bulgaria</option>
                                <option value="BF">Burkina Faso</option>
                                <option value="BI">Burundi</option>
                                <option value="CV">Cabo Verde</option>
                                <option value="KH">Cambodia</option>
                                <option value="CM">Cameroon</option>
                                <option value="CA">Canada</option>
                                <option value="KY">Cayman Islands</option>
                                <option value="CF">Central African Republic</option>
                                <option value="TD">Chad</option>
                                <option value="CL">Chile</option>
                                <option value="CN">China</option>
                                <option value="CX">Christmas Island</option>
                                <option value="CC">Cocos (Keeling) Islands</option>
                                <option value="CO">Colombia</option>
                                <option value="KM">Comoros</option>
                                <option value="CG">Congo</option>
                                <option value="CD">Congo, the Democratic Republic of the</option>
                                <option value="CK">Cook Islands</option>
                                <option value="CR">Costa Rica</option>
                                <option value="CI">Côte d'Ivoire</option>
                                <option value="HR">Croatia</option>
                                <option value="CU">Cuba</option>
                                <option value="CW">Curaçao</option>
                                <option value="CY">Cyprus</option>
                                <option value="CZ">Czech Republic</option>
                                <option value="DK">Denmark</option>
                                <option value="DJ">Djibouti</option>
                                <option value="DM">Dominica</option>
                                <option value="DO">Dominican Republic</option>
                                <option value="EC">Ecuador</option>
                                <option value="EG">Egypt</option>
                                <option value="SV">El Salvador</option>
                                <option value="GQ">Equatorial Guinea</option>
                                <option value="ER">Eritrea</option>
                                <option value="EE">Estonia</option>
                                <option value="ET">Ethiopia</option>
                                <option value="FK">Falkland Islands (Malvinas)</option>
                                <option value="FO">Faroe Islands</option>
                                <option value="FJ">Fiji</option>
                                <option value="FI">Finland</option>
                                <option value="FR">France</option>
                                <option value="GF">French Guiana</option>
                                <option value="PF">French Polynesia</option>
                                <option value="TF">French Southern Territories</option>
                                <option value="GA">Gabon</option>
                                <option value="GM">Gambia</option>
                                <option value="GE">Georgia</option>
                                <option value="DE">Germany</option>
                                <option value="GH">Ghana</option>
                                <option value="GI">Gibraltar</option>
                                <option value="GR">Greece</option>
                                <option value="GL">Greenland</option>
                                <option value="GD">Grenada</option>
                                <option value="GP">Guadeloupe</option>
                                <option value="GU">Guam</option>
                                <option value="GT">Guatemala</option>
                                <option value="GG">Guernsey</option>
                                <option value="GN">Guinea</option>
                                <option value="GW">Guinea-Bissau</option>
                                <option value="GY">Guyana</option>
                                <option value="HT">Haiti</option>
                                <option value="VA">Holy See (Vatican City State)</option>
                                <option value="HN">Honduras</option>
                                <option value="HK">Hong Kong</option>
                                <option value="HU">Hungary</option>
                                <option value="IS">Iceland</option>
                                <option value="IN">India</option>
                                <option value="ID">Indonesia</option>
                                <option value="IR">Iran, Islamic Republic of</option>
                                <option value="IQ">Iraq</option>
                                <option value="IE">Ireland</option>
                                <option value="IM">Isle of Man</option>
                                <option value="IL">Israel</option>
                                <option value="IT">Italy</option>
                                <option value="JM">Jamaica</option>
                                <option value="JP">Japan</option>
                                <option value="JE">Jersey</option>
                                <option value="JO">Jordan</option>
                                <option value="KZ">Kazakhstan</option>
                                <option value="KE">Kenya</option>
                                <option value="KI">Kiribati</option>
                                <option value="KP">Korea, Democratic People's Republic of</option>
                                <option value="KR">Korea, Republic of</option>
                                <option value="KW">Kuwait</option>
                                <option value="KG">Kyrgyzstan</option>
                                <option value="LA">Lao People's Democratic Republic</option>
                                <option value="LV">Latvia</option>
                                <option value="LB">Lebanon</option>
                                <option value="LS">Lesotho</option>
                                <option value="LR">Liberia</option>
                                <option value="LY">Libya</option>
                                <option value="LI">Liechtenstein</option>
                                <option value="LT">Lithuania</option>
                                <option value="LU">Luxembourg</option>
                                <option value="MO">Macao</option>
                                <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                                <option value="MG">Madagascar</option>
                                <option value="MW">Malawi</option>
                                <option value="MY">Malaysia</option>
                                <option value="MV">Maldives</option>
                                <option value="ML">Mali</option>
                                <option value="MT">Malta</option>
                                <option value="MH">Marshall Islands</option>
                                <option value="MQ">Martinique</option>
                                <option value="MR">Mauritania</option>
                                <option value="MU">Mauritius</option>
                                <option value="YT">Mayotte</option>
                                <option value="MX">Mexico</option>
                                <option value="FM">Micronesia, Federated States of</option>
                                <option value="MD">Moldova, Republic of</option>
                                <option value="MC">Monaco</option>
                                <option value="MN">Mongolia</option>
                                <option value="ME">Montenegro</option>
                                <option value="MS">Montserrat</option>
                                <option value="MA">Morocco</option>
                                <option value="MZ">Mozambique</option>
                                <option value="MM">Myanmar</option>
                                <option value="NA">Namibia</option>
                                <option value="NR">Nauru</option>
                                <option value="NP">Nepal</option>
                                <option value="NL">Netherlands</option>
                                <option value="NC">New Caledonia</option>
                                <option value="NZ">New Zealand</option>
                                <option value="NI">Nicaragua</option>
                                <option value="NE">Niger</option>
                                <option value="NG">Nigeria</option>
                                <option value="NU">Niue</option>
                                <option value="NF">Norfolk Island</option>
                                <option value="MP">Northern Mariana Islands</option>
                                <option value="NO">Norway</option>
                                <option value="OM">Oman</option>
                                <option value="PK">Pakistan</option>
                                <option value="PW">Palau</option>
                                <option value="PS">Palestine, State of</option>
                                <option value="PA">Panama</option>
                                <option value="PG">Papua New Guinea</option>
                                <option value="PY">Paraguay</option>
                                <option value="PE">Peru</option>
                                <option value="PH">Philippines</option>
                                <option value="PN">Pitcairn</option>
                                <option value="PL">Poland</option>
                                <option value="PT">Portugal</option>
                                <option value="PR">Puerto Rico</option>
                                <option value="QA">Qatar</option>
                                <option value="RE">Réunion</option>
                                <option value="RO">Romania</option>
                                <option value="RU">Russian Federation</option>
                                <option value="RW">Rwanda</option>
                                <option value="BL">Saint Barthélemy</option>
                                <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                                <option value="KN">Saint Kitts and Nevis</option>
                                <option value="LC">Saint Lucia</option>
                                <option value="MF">Saint Martin (French part)</option>
                                <option value="PM">Saint Pierre and Miquelon</option>
                                <option value="VC">Saint Vincent and the Grenadines</option>
                                <option value="WS">Samoa</option>
                                <option value="SM">San Marino</option>
                                <option value="ST">Sao Tome and Principe</option>
                                <option value="SA">Saudi Arabia</option>
                                <option value="SN">Senegal</option>
                                <option value="RS">Serbia</option>
                                <option value="SC">Seychelles</option>
                                <option value="SL">Sierra Leone</option>
                                <option value="SG">Singapore</option>
                                <option value="SX">Sint Maarten (Dutch part)</option>
                                <option value="SK">Slovakia</option>
                                <option value="SI">Slovenia</option>
                                <option value="SB">Solomon Islands</option>
                                <option value="SO">Somalia</option>
                                <option value="ZA">South Africa</option>
                                <option value="GS">South Georgia and the South Sandwich Islands</option>
                                <option value="SS">South Sudan</option>
                                <option value="ES">Spain</option>
                                <option value="LK">Sri Lanka</option>
                                <option value="SD">Sudan</option>
                                <option value="SR">Suriname</option>
                                <option value="SJ">Svalbard and Jan Mayen</option>
                                <option value="SZ">Swaziland</option>
                                <option value="SE">Sweden</option>
                                <option value="CH">Switzerland</option>
                                <option value="SY">Syrian Arab Republic</option>
                                <option value="TW">Taiwan, Province of China</option>
                                <option value="TJ">Tajikistan</option>
                                <option value="TZ">Tanzania, United Republic of</option>
                                <option value="TH">Thailand</option>
                                <option value="TL">Timor-Leste</option>
                                <option value="TG">Togo</option>
                                <option value="TK">Tokelau</option>
                                <option value="TO">Tonga</option>
                                <option value="TT">Trinidad and Tobago</option>
                                <option value="TN">Tunisia</option>
                                <option value="TR">Turkey</option>
                                <option value="TM">Turkmenistan</option>
                                <option value="TC">Turks and Caicos Islands</option>
                                <option value="TV">Tuvalu</option>
                                <option value="UG">Uganda</option>
                                <option value="UA">Ukraine</option>
                                <option value="AE">United Arab Emirates</option>
                                <option value="UM">United States Minor Outlying Islands</option>
                                <option value="UY">Uruguay</option>
                                <option value="UZ">Uzbekistan</option>
                                <option value="VU">Vanuatu</option>
                                <option value="VE">Venezuela, Bolivarian Republic of</option>
                                <option value="VN">Vietnam</option>
                                <option value="VG">Virgin Islands, British</option>
                                <option value="VI">Virgin Islands, U.S.</option>
                                <option value="WF">Wallis and Futuna</option>
                                <option value="EH">Western Sahara</option>
                                <option value="YE">Yemen</option>
                                <option value="ZM">Zambia</option>
                                <option value="ZW">Zimbabwe</option>
                     </select>
                </div>
                <div className="form-row" hidden={!this.signup}>
                    <div className="col form-group" >
                        <label>Time zone</label>   
                          <select  className="form-control" name="zone" value={this.state.zone} onChange={e => this.onTodoChange(e)}>
                            <option value="Pacific/Pago_Pago">(GMT -11:00) Pago Pago</option>
                            <option value="Pacific/Niue">(GMT -11:00) Niue</option>
                            <option value="Pacific/Midway">(GMT -11:00) Midway</option>
                            <option value="Pacific/Rarotonga">(GMT -10:00) Rarotonga</option>
                            <option value="Pacific/Tahiti">(GMT -10:00) Tahiti</option>
                            <option value="America/Adak">(GMT -10:00) Adak</option>
                            <option value="Pacific/Honolulu">(GMT -10:00) Honolulu</option>
                            <option value="Pacific/Marquesas">(GMT -09:30) Marquesas</option>
                            <option value="Pacific/Gambier">(GMT -09:00) Gambier</option>
                            <option value="America/Anchorage">(GMT -09:00) Anchorage</option>
                            <option value="America/Juneau">(GMT -09:00) Juneau</option>
                            <option value="America/Sitka">(GMT -09:00) Sitka</option>
                            <option value="America/Metlakatla">(GMT -09:00) Metlakatla</option>
                            <option value="America/Yakutat">(GMT -09:00) Yakutat</option>
                            <option value="America/Nome">(GMT -09:00) Nome</option>
                            <option value="America/Vancouver">(GMT -08:00) Vancouver</option>
                            <option value="America/Whitehorse">(GMT -08:00) Whitehorse</option>
                            <option value="America/Dawson">(GMT -08:00) Dawson</option>
                            <option value="America/Tijuana">(GMT -08:00) Tijuana</option>
                            <option value="Pacific/Pitcairn">(GMT -08:00) Pitcairn</option>
                            <option value="America/Los_Angeles">(GMT -08:00) Los Angeles</option>
                            <option value="America/Edmonton">(GMT -07:00) Edmonton</option>
                            <option value="America/Cambridge_Bay">(GMT -07:00) Cambridge Bay</option>
                            <option value="America/Yellowknife">(GMT -07:00) Yellowknife</option>
                            <option value="America/Inuvik">(GMT -07:00) Inuvik</option>
                            <option value="America/Creston">(GMT -07:00) Creston</option>
                            <option value="America/Dawson_Creek">(GMT -07:00) Dawson Creek</option>
                            <option value="America/Fort_Nelson">(GMT -07:00) Fort Nelson</option>
                            <option value="America/Mazatlan">(GMT -07:00) Mazatlan</option>
                            <option value="America/Chihuahua">(GMT -07:00) Chihuahua</option>
                            <option value="America/Ojinaga">(GMT -07:00) Ojinaga</option>
                            <option value="America/Hermosillo">(GMT -07:00) Hermosillo</option>
                            <option value="America/Bahia_Banderas">(GMT -07:00) Bahia Banderas</option>
                            <option value="America/Denver">(GMT -07:00) Denver</option>
                            <option value="America/Boise">(GMT -07:00) Boise</option>
                            <option value="America/Phoenix">(GMT -07:00) Phoenix</option>
                            <option value="America/Belize">(GMT -06:00) Belize</option>
                            <option value="America/Winnipeg">(GMT -06:00) Winnipeg</option>
                            <option value="America/Rainy_River">(GMT -06:00) Rainy River</option>
                            <option value="America/Resolute">(GMT -06:00) Resolute</option>
                            <option value="America/Rankin_Inlet">(GMT -06:00) Rankin Inlet</option>
                            <option value="America/Regina">(GMT -06:00) Regina</option>
                            <option value="America/Swift_Current">(GMT -06:00) Swift Current</option>
                            <option value="Pacific/Easter">(GMT -06:00) Easter</option>
                            <option value="America/Costa_Rica">(GMT -06:00) Costa Rica</option>
                            <option value="Pacific/Galapagos">(GMT -06:00) Galapagos</option>
                            <option value="America/Guatemala">(GMT -06:00) Guatemala</option>
                            <option value="America/Tegucigalpa">(GMT -06:00) Tegucigalpa</option>
                            <option value="America/Mexico_City">(GMT -06:00) Mexico City</option>
                            <option value="America/Merida">(GMT -06:00) Merida</option>
                            <option value="America/Monterrey">(GMT -06:00) Monterrey</option>
                            <option value="America/Matamoros">(GMT -06:00) Matamoros</option>
                            <option value="America/Managua">(GMT -06:00) Managua</option>
                            <option value="America/El_Salvador">(GMT -06:00) El Salvador</option>
                            <option value="America/Chicago">(GMT -06:00) Chicago</option>
                            <option value="America/Indiana/Tell_City">(GMT -06:00) Tell City, Indiana</option>
                            <option value="America/Indiana/Knox">(GMT -06:00) Knox, Indiana</option>
                            <option value="America/Menominee">(GMT -06:00) Menominee</option>
                            <option value="America/North_Dakota/Center">(GMT -06:00) Center, North Dakota</option>
                            <option value="America/North_Dakota/New_Salem">(GMT -06:00) New Salem, North Dakota</option>
                            <option value="America/North_Dakota/Beulah">(GMT -06:00) Beulah, North Dakota</option>
                            <option value="America/Eirunepe">(GMT -05:00) Eirunepe</option>
                            <option value="America/Rio_Branco">(GMT -05:00) Rio Branco</option>
                            <option value="America/Nassau">(GMT -05:00) Nassau</option>
                            <option value="America/Toronto">(GMT -05:00) Toronto</option>
                            <option value="America/Nipigon">(GMT -05:00) Nipigon</option>
                            <option value="America/Thunder_Bay">(GMT -05:00) Thunder Bay</option>
                            <option value="America/Iqaluit">(GMT -05:00) Iqaluit</option>
                            <option value="America/Pangnirtung">(GMT -05:00) Pangnirtung</option>
                            <option value="America/Atikokan">(GMT -05:00) Atikokan</option>
                            <option value="America/Bogota">(GMT -05:00) Bogota</option>
                            <option value="America/Havana">(GMT -05:00) Havana</option>
                            <option value="America/Guayaquil">(GMT -05:00) Guayaquil</option>
                            <option value="America/Port-au-Prince">(GMT -05:00) Port-au-Prince</option>
                            <option value="America/Jamaica">(GMT -05:00) Jamaica</option>
                            <option value="America/Cayman">(GMT -05:00) Cayman</option>
                            <option value="America/Cancun">(GMT -05:00) Cancun</option>
                            <option value="America/Panama">(GMT -05:00) Panama</option>
                            <option value="America/Lima">(GMT -05:00) Lima</option>
                            <option value="America/Grand_Turk">(GMT -05:00) Grand Turk</option>
                            <option value="America/New_York">(GMT -05:00) New York</option>
                            <option value="America/Detroit">(GMT -05:00) Detroit</option>
                            <option value="America/Kentucky/Louisville">(GMT -05:00) Louisville, Kentucky</option>
                            <option value="America/Kentucky/Monticello">(GMT -05:00) Monticello, Kentucky</option>
                            <option value="America/Indiana/Indianapolis">(GMT -05:00) Indianapolis, Indiana</option>
                            <option value="America/Indiana/Vincennes">(GMT -05:00) Vincennes, Indiana</option>
                            <option value="America/Indiana/Winamac">(GMT -05:00) Winamac, Indiana</option>
                            <option value="America/Indiana/Marengo">(GMT -05:00) Marengo, Indiana</option>
                            <option value="America/Indiana/Petersburg">(GMT -05:00) Petersburg, Indiana</option>
                            <option value="America/Indiana/Vevay">(GMT -05:00) Vevay, Indiana</option>
                            <option value="America/Antigua">(GMT -04:00) Antigua</option>
                            <option value="America/Anguilla">(GMT -04:00) Anguilla</option>
                            <option value="America/Aruba">(GMT -04:00) Aruba</option>
                            <option value="America/Barbados">(GMT -04:00) Barbados</option>
                            <option value="America/St_Barthelemy">(GMT -04:00) St Barthelemy</option>
                            <option value="Atlantic/Bermuda">(GMT -04:00) Bermuda</option>
                            <option value="America/La_Paz">(GMT -04:00) La Paz</option>
                            <option value="America/Kralendijk">(GMT -04:00) Kralendijk</option>
                            <option value="America/Campo_Grande">(GMT -04:00) Campo Grande</option>
                            <option value="America/Cuiaba">(GMT -04:00) Cuiaba</option>
                            <option value="America/Porto_Velho">(GMT -04:00) Porto Velho</option>
                            <option value="America/Boa_Vista">(GMT -04:00) Boa Vista</option>
                            <option value="America/Manaus">(GMT -04:00) Manaus</option>
                            <option value="America/Halifax">(GMT -04:00) Halifax</option>
                            <option value="America/Glace_Bay">(GMT -04:00) Glace Bay</option>
                            <option value="America/Moncton">(GMT -04:00) Moncton</option>
                            <option value="America/Goose_Bay">(GMT -04:00) Goose Bay</option>
                            <option value="America/Blanc-Sablon">(GMT -04:00) Blanc-Sablon</option>
                            <option value="America/Santiago">(GMT -04:00) Santiago</option>
                            <option value="America/Curacao">(GMT -04:00) Curacao</option>
                            <option value="America/Dominica">(GMT -04:00) Dominica</option>
                            <option value="America/Santo_Domingo">(GMT -04:00) Santo Domingo</option>
                            <option value="America/Grenada">(GMT -04:00) Grenada</option>
                            <option value="America/Thule">(GMT -04:00) Thule</option>
                            <option value="America/Guadeloupe">(GMT -04:00) Guadeloupe</option>
                            <option value="America/Guyana">(GMT -04:00) Guyana</option>
                            <option value="America/St_Kitts">(GMT -04:00) St Kitts</option>
                            <option value="America/St_Lucia">(GMT -04:00) St Lucia</option>
                            <option value="America/Marigot">(GMT -04:00) Marigot</option>
                            <option value="America/Martinique">(GMT -04:00) Martinique</option>
                            <option value="America/Montserrat">(GMT -04:00) Montserrat</option>
                            <option value="America/Puerto_Rico">(GMT -04:00) Puerto Rico</option>
                            <option value="America/Asuncion">(GMT -04:00) Asuncion</option>
                            <option value="America/Lower_Princes">(GMT -04:00) Lower Princes</option>
                            <option value="America/Port_of_Spain">(GMT -04:00) Port of Spain</option>
                            <option value="America/St_Vincent">(GMT -04:00) St Vincent</option>
                            <option value="America/Caracas">(GMT -04:00) Caracas</option>
                            <option value="America/Tortola">(GMT -04:00) Tortola</option>
                            <option value="America/St_Thomas">(GMT -04:00) St Thomas</option>
                            <option value="America/St_Johns">(GMT -03:30) St Johns</option>
                            <option value="Antarctica/Palmer">(GMT -03:00) Palmer</option>
                            <option value="Antarctica/Rothera">(GMT -03:00) Rothera</option>
                            <option value="America/Argentina/Buenos_Aires">(GMT -03:00) Buenos Aires, Argentina</option>
                            <option value="America/Argentina/Cordoba">(GMT -03:00) Cordoba, Argentina</option>
                            <option value="America/Argentina/Salta">(GMT -03:00) Salta, Argentina</option>
                            <option value="America/Argentina/Jujuy">(GMT -03:00) Jujuy, Argentina</option>
                            <option value="America/Argentina/Tucuman">(GMT -03:00) Tucuman, Argentina</option>
                            <option value="America/Argentina/Catamarca">(GMT -03:00) Catamarca, Argentina</option>
                            <option value="America/Argentina/La_Rioja">(GMT -03:00) La Rioja, Argentina</option>
                            <option value="America/Argentina/San_Juan">(GMT -03:00) San Juan, Argentina</option>
                            <option value="America/Argentina/Mendoza">(GMT -03:00) Mendoza, Argentina</option>
                            <option value="America/Argentina/San_Luis">(GMT -03:00) San Luis, Argentina</option>
                            <option value="America/Argentina/Rio_Gallegos">(GMT -03:00) Rio Gallegos, Argentina</option>
                            <option value="America/Argentina/Ushuaia">(GMT -03:00) Ushuaia, Argentina</option>
                            <option value="America/Belem">(GMT -03:00) Belem</option>
                            <option value="America/Fortaleza">(GMT -03:00) Fortaleza</option>
                            <option value="America/Recife">(GMT -03:00) Recife</option>
                            <option value="America/Araguaina">(GMT -03:00) Araguaina</option>
                            <option value="America/Maceio">(GMT -03:00) Maceio</option>
                            <option value="America/Bahia">(GMT -03:00) Bahia</option>
                            <option value="America/Sao_Paulo">(GMT -03:00) Sao Paulo</option>
                            <option value="America/Santarem">(GMT -03:00) Santarem</option>
                            <option value="America/Punta_Arenas">(GMT -03:00) Punta Arenas</option>
                            <option value="Atlantic/Stanley">(GMT -03:00) Stanley</option>
                            <option value="America/Cayenne">(GMT -03:00) Cayenne</option>
                            <option value="America/Godthab">(GMT -03:00) Godthab</option>
                            <option value="America/Miquelon">(GMT -03:00) Miquelon</option>
                            <option value="America/Paramaribo">(GMT -03:00) Paramaribo</option>
                            <option value="America/Montevideo">(GMT -03:00) Montevideo</option>
                            <option value="America/Noronha">(GMT -02:00) Noronha</option>
                            <option value="Atlantic/South_Georgia">(GMT -02:00) South Georgia</option>
                            <option value="Atlantic/Cape_Verde">(GMT -01:00) Cape Verde</option>
                            <option value="America/Scoresbysund">(GMT -01:00) Scoresbysund</option>
                            <option value="Atlantic/Azores">(GMT -01:00) Azores</option>
                            <option value="Antarctica/Troll">(GMT +00:00) Troll</option>
                            <option value="Africa/Ouagadougou">(GMT +00:00) Ouagadougou</option>
                            <option value="Africa/Abidjan">(GMT +00:00) Abidjan</option>
                            <option value="Africa/El_Aaiun">(GMT +00:00) El Aaiun</option>
                            <option value="Atlantic/Canary">(GMT +00:00) Canary</option>
                            <option value="Atlantic/Faroe">(GMT +00:00) Faroe</option>
                            <option value="Europe/London">(GMT +00:00) London</option>
                            <option value="Europe/Guernsey">(GMT +00:00) Guernsey</option>
                            <option value="Africa/Accra">(GMT +00:00) Accra</option>
                            <option value="America/Danmarkshavn">(GMT +00:00) Danmarkshavn</option>
                            <option value="Africa/Banjul">(GMT +00:00) Banjul</option>
                            <option value="Africa/Conakry">(GMT +00:00) Conakry</option>
                            <option value="Africa/Bissau">(GMT +00:00) Bissau</option>
                            <option value="Europe/Dublin">(GMT +00:00) Dublin</option>
                            <option value="Europe/Isle_of_Man">(GMT +00:00) Isle of Man</option>
                            <option value="Atlantic/Reykjavik">(GMT +00:00) Reykjavik</option>
                            <option value="Europe/Jersey">(GMT +00:00) Jersey</option>
                            <option value="Africa/Monrovia">(GMT +00:00) Monrovia</option>
                            <option value="Africa/Casablanca">(GMT +00:00) Casablanca</option>
                            <option value="Africa/Bamako">(GMT +00:00) Bamako</option>
                            <option value="Africa/Nouakchott">(GMT +00:00) Nouakchott</option>
                            <option value="Europe/Lisbon">(GMT +00:00) Lisbon</option>
                            <option value="Atlantic/Madeira">(GMT +00:00) Madeira</option>
                            <option value="Atlantic/St_Helena">(GMT +00:00) St Helena</option>
                            <option value="Africa/Freetown">(GMT +00:00) Freetown</option>
                            <option value="Africa/Dakar">(GMT +00:00) Dakar</option>
                            <option value="Africa/Sao_Tome">(GMT +00:00) Sao Tome</option>
                            <option value="Africa/Lome">(GMT +00:00) Lome</option>
                            <option value="Europe/Andorra">(GMT +01:00) Andorra</option>
                            <option value="Europe/Tirane">(GMT +01:00) Tirane</option>
                            <option value="Africa/Luanda">(GMT +01:00) Luanda</option>
                            <option value="Europe/Vienna">(GMT +01:00) Vienna</option>
                            <option value="Europe/Sarajevo">(GMT +01:00) Sarajevo</option>
                            <option value="Europe/Brussels">(GMT +01:00) Brussels</option>
                            <option value="Africa/Porto-Novo">(GMT +01:00) Porto-Novo</option>
                            <option value="Africa/Kinshasa">(GMT +01:00) Kinshasa</option>
                            <option value="Africa/Bangui">(GMT +01:00) Bangui</option>
                            <option value="Africa/Brazzaville">(GMT +01:00) Brazzaville</option>
                            <option value="Europe/Zurich">(GMT +01:00) Zurich</option>
                            <option value="Africa/Douala">(GMT +01:00) Douala</option>
                            <option value="Europe/Prague">(GMT +01:00) Prague</option>
                            <option value="Europe/Berlin">(GMT +01:00) Berlin</option>
                            <option value="Europe/Busingen">(GMT +01:00) Busingen</option>
                            <option value="Europe/Copenhagen">(GMT +01:00) Copenhagen</option>
                            <option value="Africa/Algiers">(GMT +01:00) Algiers</option>
                            <option value="Europe/Madrid">(GMT +01:00) Madrid</option>
                            <option value="Africa/Ceuta">(GMT +01:00) Ceuta</option>
                            <option value="Europe/Paris">(GMT +01:00) Paris</option>
                            <option value="Africa/Libreville">(GMT +01:00) Libreville</option>
                            <option value="Europe/Gibraltar">(GMT +01:00) Gibraltar</option>
                            <option value="Africa/Malabo">(GMT +01:00) Malabo</option>
                            <option value="Europe/Zagreb">(GMT +01:00) Zagreb</option>
                            <option value="Europe/Budapest">(GMT +01:00) Budapest</option>
                            <option value="Europe/Rome">(GMT +01:00) Rome</option>
                            <option value="Europe/Vaduz">(GMT +01:00) Vaduz</option>
                            <option value="Europe/Luxembourg">(GMT +01:00) Luxembourg</option>
                            <option value="Europe/Monaco">(GMT +01:00) Monaco</option>
                            <option value="Europe/Podgorica">(GMT +01:00) Podgorica</option>
                            <option value="Europe/Skopje">(GMT +01:00) Skopje</option>
                            <option value="Europe/Malta">(GMT +01:00) Malta</option>
                            <option value="Africa/Niamey">(GMT +01:00) Niamey</option>
                            <option value="Africa/Lagos">(GMT +01:00) Lagos</option>
                            <option value="Europe/Amsterdam">(GMT +01:00) Amsterdam</option>
                            <option value="Europe/Oslo">(GMT +01:00) Oslo</option>
                            <option value="Europe/Warsaw">(GMT +01:00) Warsaw</option>
                            <option value="Europe/Belgrade">(GMT +01:00) Belgrade</option>
                            <option value="Europe/Stockholm">(GMT +01:00) Stockholm</option>
                            <option value="Europe/Ljubljana">(GMT +01:00) Ljubljana</option>
                            <option value="Arctic/Longyearbyen">(GMT +01:00) Longyearbyen</option>
                            <option value="Europe/Bratislava">(GMT +01:00) Bratislava</option>
                            <option value="Europe/San_Marino">(GMT +01:00) San Marino</option>
                            <option value="Africa/Ndjamena">(GMT +01:00) Ndjamena</option>
                            <option value="Africa/Tunis">(GMT +01:00) Tunis</option>
                            <option value="Europe/Vatican">(GMT +01:00) Vatican</option>
                            <option value="Europe/Mariehamn">(GMT +02:00) Mariehamn</option>
                            <option value="Europe/Sofia">(GMT +02:00) Sofia</option>
                            <option value="Africa/Bujumbura">(GMT +02:00) Bujumbura</option>
                            <option value="Africa/Gaborone">(GMT +02:00) Gaborone</option>
                            <option value="Africa/Lubumbashi">(GMT +02:00) Lubumbashi</option>
                            <option value="Asia/Nicosia">(GMT +02:00) Nicosia</option>
                            <option value="Asia/Famagusta">(GMT +02:00) Famagusta</option>
                            <option value="Europe/Tallinn">(GMT +02:00) Tallinn</option>
                            <option value="Africa/Cairo">(GMT +02:00) Cairo</option>
                            <option value="Europe/Helsinki">(GMT +02:00) Helsinki</option>
                            <option value="Europe/Athens">(GMT +02:00) Athens</option>
                            <option value="Asia/Jerusalem">(GMT +02:00) Jerusalem</option>
                            <option value="Asia/Amman">(GMT +02:00) Amman</option>
                            <option value="Asia/Beirut">(GMT +02:00) Beirut</option>
                            <option value="Africa/Maseru">(GMT +02:00) Maseru</option>
                            <option value="Europe/Vilnius">(GMT +02:00) Vilnius</option>
                            <option value="Europe/Riga">(GMT +02:00) Riga</option>
                            <option value="Africa/Tripoli">(GMT +02:00) Tripoli</option>
                            <option value="Europe/Chisinau">(GMT +02:00) Chisinau</option>
                            <option value="Africa/Blantyre">(GMT +02:00) Blantyre</option>
                            <option value="Africa/Maputo">(GMT +02:00) Maputo</option>
                            <option value="Africa/Windhoek">(GMT +02:00) Windhoek</option>
                            <option value="Asia/Gaza">(GMT +02:00) Gaza</option>
                            <option value="Asia/Hebron">(GMT +02:00) Hebron</option>
                            <option value="Europe/Bucharest">(GMT +02:00) Bucharest</option>
                            <option value="Europe/Kaliningrad">(GMT +02:00) Kaliningrad</option>
                            <option value="Africa/Kigali">(GMT +02:00) Kigali</option>
                            <option value="Africa/Khartoum">(GMT +02:00) Khartoum</option>
                            <option value="Asia/Damascus">(GMT +02:00) Damascus</option>
                            <option value="Africa/Mbabane">(GMT +02:00) Mbabane</option>
                            <option value="Europe/Kiev">(GMT +02:00) Kiev</option>
                            <option value="Europe/Uzhgorod">(GMT +02:00) Uzhgorod</option>
                            <option value="Europe/Zaporozhye">(GMT +02:00) Zaporozhye</option>
                            <option value="Africa/Johannesburg">(GMT +02:00) Johannesburg</option>
                            <option value="Africa/Lusaka">(GMT +02:00) Lusaka</option>
                            <option value="Africa/Harare">(GMT +02:00) Harare</option>
                            <option value="Antarctica/Syowa">(GMT +03:00) Syowa</option>
                            <option value="Asia/Bahrain">(GMT +03:00) Bahrain</option>
                            <option value="Europe/Minsk">(GMT +03:00) Minsk</option>
                            <option value="Africa/Djibouti">(GMT +03:00) Djibouti</option>
                            <option value="Africa/Asmara">(GMT +03:00) Asmara</option>
                            <option value="Africa/Addis_Ababa">(GMT +03:00) Addis Ababa</option>
                            <option value="Asia/Baghdad">(GMT +03:00) Baghdad</option>
                            <option value="Africa/Nairobi">(GMT +03:00) Nairobi</option>
                            <option value="Indian/Comoro">(GMT +03:00) Comoro</option>
                            <option value="Asia/Kuwait">(GMT +03:00) Kuwait</option>
                            <option value="Indian/Antananarivo">(GMT +03:00) Antananarivo</option>
                            <option value="Asia/Qatar">(GMT +03:00) Qatar</option>
                            <option value="Europe/Moscow">(GMT +03:00) Moscow</option>
                            <option value="Europe/Simferopol">(GMT +03:00) Simferopol</option>
                            <option value="Europe/Volgograd">(GMT +03:00) Volgograd</option>
                            <option value="Europe/Kirov">(GMT +03:00) Kirov</option>
                            <option value="Asia/Riyadh">(GMT +03:00) Riyadh</option>
                            <option value="Africa/Mogadishu">(GMT +03:00) Mogadishu</option>
                            <option value="Africa/Juba">(GMT +03:00) Juba</option>
                            <option value="Europe/Istanbul">(GMT +03:00) Istanbul</option>
                            <option value="Africa/Dar_es_Salaam">(GMT +03:00) Dar es Salaam</option>
                            <option value="Africa/Kampala">(GMT +03:00) Kampala</option>
                            <option value="Asia/Aden">(GMT +03:00) Aden</option>
                            <option value="Indian/Mayotte">(GMT +03:00) Mayotte</option>
                            <option value="Asia/Tehran">(GMT +03:30) Tehran</option>
                            <option value="Asia/Dubai">(GMT +04:00) Dubai</option>
                            <option value="Asia/Yerevan">(GMT +04:00) Yerevan</option>
                            <option value="Asia/Baku">(GMT +04:00) Baku</option>
                            <option value="Asia/Tbilisi">(GMT +04:00) Tbilisi</option>
                            <option value="Indian/Mauritius">(GMT +04:00) Mauritius</option>
                            <option value="Asia/Muscat">(GMT +04:00) Muscat</option>
                            <option value="Indian/Reunion">(GMT +04:00) Reunion</option>
                            <option value="Europe/Astrakhan">(GMT +04:00) Astrakhan</option>
                            <option value="Europe/Saratov">(GMT +04:00) Saratov</option>
                            <option value="Europe/Ulyanovsk">(GMT +04:00) Ulyanovsk</option>
                            <option value="Europe/Samara">(GMT +04:00) Samara</option>
                            <option value="Indian/Mahe">(GMT +04:00) Mahe</option>
                            <option value="Asia/Kabul">(GMT +04:30) Kabul</option>
                            <option value="Antarctica/Mawson">(GMT +05:00) Mawson</option>
                            <option value="Asia/Aqtobe">(GMT +05:00) Aqtobe</option>
                            <option value="Asia/Aqtau">(GMT +05:00) Aqtau</option>
                            <option value="Asia/Atyrau">(GMT +05:00) Atyrau</option>
                            <option value="Asia/Oral">(GMT +05:00) Oral</option>
                            <option value="Indian/Maldives">(GMT +05:00) Maldives</option>
                            <option value="Asia/Karachi">(GMT +05:00) Karachi</option>
                            <option value="Asia/Yekaterinburg">(GMT +05:00) Yekaterinburg</option>
                            <option value="Indian/Kerguelen">(GMT +05:00) Kerguelen</option>
                            <option value="Asia/Dushanbe">(GMT +05:00) Dushanbe</option>
                            <option value="Asia/Ashgabat">(GMT +05:00) Ashgabat</option>
                            <option value="Asia/Samarkand">(GMT +05:00) Samarkand</option>
                            <option value="Asia/Tashkent">(GMT +05:00) Tashkent</option>
                            <option value="Asia/Kolkata">(GMT +05:30) Kolkata</option>
                            <option value="Asia/Colombo">(GMT +05:30) Colombo</option>
                            <option value="Asia/Kathmandu">(GMT +05:45) Kathmandu</option>
                            <option value="Antarctica/Vostok">(GMT +06:00) Vostok</option>
                            <option value="Asia/Dhaka">(GMT +06:00) Dhaka</option>
                            <option value="Asia/Thimphu">(GMT +06:00) Thimphu</option>
                            <option value="Asia/Urumqi">(GMT +06:00) Urumqi</option>
                            <option value="Indian/Chagos">(GMT +06:00) Chagos</option>
                            <option value="Asia/Bishkek">(GMT +06:00) Bishkek</option>
                            <option value="Asia/Almaty">(GMT +06:00) Almaty</option>
                            <option value="Asia/Qyzylorda">(GMT +06:00) Qyzylorda</option>
                            <option value="Asia/Omsk">(GMT +06:00) Omsk</option>
                            <option value="Indian/Cocos">(GMT +06:30) Cocos</option>
                            <option value="Asia/Yangon">(GMT +06:30) Yangon</option>
                            <option value="Antarctica/Davis">(GMT +07:00) Davis</option>
                            <option value="Indian/Christmas">(GMT +07:00) Christmas</option>
                            <option value="Asia/Jakarta">(GMT +07:00) Jakarta</option>
                            <option value="Asia/Pontianak">(GMT +07:00) Pontianak</option>
                            <option value="Asia/Phnom_Penh">(GMT +07:00) Phnom Penh</option>
                            <option value="Asia/Vientiane">(GMT +07:00) Vientiane</option>
                            <option value="Asia/Hovd">(GMT +07:00) Hovd</option>
                            <option value="Asia/Novosibirsk">(GMT +07:00) Novosibirsk</option>
                            <option value="Asia/Barnaul">(GMT +07:00) Barnaul</option>
                            <option value="Asia/Tomsk">(GMT +07:00) Tomsk</option>
                            <option value="Asia/Novokuznetsk">(GMT +07:00) Novokuznetsk</option>
                            <option value="Asia/Krasnoyarsk">(GMT +07:00) Krasnoyarsk</option>
                            <option value="Asia/Bangkok">(GMT +07:00) Bangkok</option>
                            <option value="Asia/Ho_Chi_Minh">(GMT +07:00) Ho Chi Minh</option>
                            <option value="Australia/Perth">(GMT +08:00) Perth</option>
                            <option value="Asia/Brunei">(GMT +08:00) Brunei</option>
                            <option value="Asia/Shanghai">(GMT +08:00) Shanghai</option>
                            <option value="Asia/Hong_Kong">(GMT +08:00) Hong Kong</option>
                            <option value="Asia/Makassar">(GMT +08:00) Makassar</option>
                            <option value="Asia/Ulaanbaatar">(GMT +08:00) Ulaanbaatar</option>
                            <option value="Asia/Choibalsan">(GMT +08:00) Choibalsan</option>
                            <option value="Asia/Macau">(GMT +08:00) Macau</option>
                            <option value="Asia/Kuala_Lumpur">(GMT +08:00) Kuala Lumpur</option>
                            <option value="Asia/Kuching">(GMT +08:00) Kuching</option>
                            <option value="Asia/Manila">(GMT +08:00) Manila</option>
                            <option value="Asia/Irkutsk">(GMT +08:00) Irkutsk</option>
                            <option value="Asia/Singapore">(GMT +08:00) Singapore</option>
                            <option value="Asia/Taipei">(GMT +08:00) Taipei</option>
                            <option value="Asia/Pyongyang">(GMT +08:30) Pyongyang</option>
                            <option value="Australia/Eucla">(GMT +08:45) Eucla</option>
                            <option value="Asia/Jayapura">(GMT +09:00) Jayapura</option>
                            <option value="Asia/Tokyo">(GMT +09:00) Tokyo</option>
                            <option value="Asia/Seoul">(GMT +09:00) Seoul</option>
                            <option value="Pacific/Palau">(GMT +09:00) Palau</option>
                            <option value="Asia/Chita">(GMT +09:00) Chita</option>
                            <option value="Asia/Yakutsk">(GMT +09:00) Yakutsk</option>
                            <option value="Asia/Khandyga">(GMT +09:00) Khandyga</option>
                            <option value="Asia/Dili">(GMT +09:00) Dili</option>
                            <option value="Australia/Broken_Hill">(GMT +09:30) Broken Hill</option>
                            <option value="Australia/Adelaide">(GMT +09:30) Adelaide</option>
                            <option value="Australia/Darwin">(GMT +09:30) Darwin</option>
                            <option value="Antarctica/DumontDUrville">(GMT +10:00) Dumont D'Urville</option>
                            <option value="Australia/Hobart">(GMT +10:00) Hobart</option>
                            <option value="Australia/Currie">(GMT +10:00) Currie</option>
                            <option value="Australia/Melbourne">(GMT +10:00) Melbourne</option>
                            <option value="Australia/Sydney">(GMT +10:00) Sydney</option>
                            <option value="Australia/Brisbane">(GMT +10:00) Brisbane</option>
                            <option value="Australia/Lindeman">(GMT +10:00) Lindeman</option>
                            <option value="Pacific/Chuuk">(GMT +10:00) Chuuk</option>
                            <option value="Pacific/Guam">(GMT +10:00) Guam</option>
                            <option value="Pacific/Saipan">(GMT +10:00) Saipan</option>
                            <option value="Pacific/Port_Moresby">(GMT +10:00) Port Moresby</option>
                            <option value="Asia/Vladivostok">(GMT +10:00) Vladivostok</option>
                            <option value="Asia/Ust-Nera">(GMT +10:00) Ust-Nera</option>
                            <option value="Australia/Lord_Howe">(GMT +10:30) Lord Howe</option>
                            <option value="Antarctica/Casey">(GMT +11:00) Casey</option>
                            <option value="Antarctica/Macquarie">(GMT +11:00) Macquarie</option>
                            <option value="Pacific/Pohnpei">(GMT +11:00) Pohnpei</option>
                            <option value="Pacific/Kosrae">(GMT +11:00) Kosrae</option>
                            <option value="Pacific/Noumea">(GMT +11:00) Noumea</option>
                            <option value="Pacific/Norfolk">(GMT +11:00) Norfolk</option>
                            <option value="Pacific/Bougainville">(GMT +11:00) Bougainville</option>
                            <option value="Asia/Magadan">(GMT +11:00) Magadan</option>
                            <option value="Asia/Sakhalin">(GMT +11:00) Sakhalin</option>
                            <option value="Asia/Srednekolymsk">(GMT +11:00) Srednekolymsk</option>
                            <option value="Pacific/Guadalcanal">(GMT +11:00) Guadalcanal</option>
                            <option value="Pacific/Efate">(GMT +11:00) Efate</option>
                            <option value="Antarctica/McMurdo">(GMT +12:00) McMurdo</option>
                            <option value="Pacific/Fiji">(GMT +12:00) Fiji</option>
                            <option value="Pacific/Tarawa">(GMT +12:00) Tarawa</option>
                            <option value="Pacific/Majuro">(GMT +12:00) Majuro</option>
                            <option value="Pacific/Kwajalein">(GMT +12:00) Kwajalein</option>
                            <option value="Pacific/Nauru">(GMT +12:00) Nauru</option>
                            <option value="Pacific/Auckland">(GMT +12:00) Auckland</option>
                            <option value="Asia/Kamchatka">(GMT +12:00) Kamchatka</option>
                            <option value="Asia/Anadyr">(GMT +12:00) Anadyr</option>
                            <option value="Pacific/Funafuti">(GMT +12:00) Funafuti</option>
                            <option value="Pacific/Wake">(GMT +12:00) Wake</option>
                            <option value="Pacific/Wallis">(GMT +12:00) Wallis</option>
                            <option value="Pacific/Chatham">(GMT +12:45) Chatham</option>
                            <option value="Pacific/Enderbury">(GMT +13:00) Enderbury</option>
                            <option value="Pacific/Fakaofo">(GMT +13:00) Fakaofo</option>
                            <option value="Pacific/Tongatapu">(GMT +13:00) Tongatapu</option>
                            <option value="Pacific/Apia">(GMT +13:00) Apia</option>
                            <option value="Pacific/Kiritimati">(GMT +14:00) Kiritimati</option>
                        </select>
                    </div> 
                    <div className="col form-group" hidden={!this.signup}>
                        <label>Currency</label>
                        <select  className="form-control" name="currency" value={this.state.currency} onChange={e => this.onTodoChange(e)} >
                            <option value="AFN">Afghan Afghani - AFN</option>
                            <option value="ALL">Albanian Lek - ALL</option>
                            <option value="DZD">Algerian Dinar - DZD</option>
                            <option value="AOA">Angolan Kwanza - AOA</option>
                            <option value="ARS">Argentine Peso - ARS</option>
                            <option value="AMD">Armenian Dram - AMD</option>
                            <option value="AWG">Aruban Florin - AWG</option>
                            <option value="AUD">Australian Dollar - AUD</option>
                            <option value="AZN">Azerbaijani Manat - AZN</option>
                            <option value="BSD">Bahamian Dollar - BSD</option>
                            <option value="BHD">Bahraini Dinar - BHD</option>
                            <option value="BDT">Bangladeshi Taka - BDT</option>
                            <option value="BBD">Barbadian Dollar - BBD</option>
                            <option value="BYR">Belarusian Ruble - BYR</option>
                            <option value="BZD">Belize Dollar - BZD</option>
                            <option value="BMD">Bermudian Dollar - BMD</option>
                            <option value="BTN">Bhutanese Ngultrum - BTN</option>
                            <option value="BOB">Bolivian Boliviano - BOB</option>
                            <option value="BAM">Bosnia and Herzegovina Convertible Mark - BAM</option>
                            <option value="BWP">Botswana Pula - BWP</option>
                            <option value="BRL">Brazilian Real - BRL</option>
                            <option value="GBP">British Pound - GBP</option>
                            <option value="BND">Brunei Dollar - BND</option>
                            <option value="BGN">Bulgarian Lev - BGN</option>
                            <option value="BIF">Burundian Franc - BIF</option>
                            <option value="KHR">Cambodian Riel - KHR</option>
                            <option value="CAD">Canadian Dollar - CAD</option>
                            <option value="CVE">Cape Verdean Escudo - CVE</option>
                            <option value="KYD">Cayman Islands Dollar - KYD</option>
                            <option value="XAF">Central African Cfa Franc - XAF</option>
                            <option value="XPF">Cfp Franc - XPF</option>
                            <option value="CLP">Chilean Peso - CLP</option>
                            <option value="CNY">Chinese Renminbi Yuan - CNY</option>
                            <option value="COP">Colombian Peso - COP</option>
                            <option value="KMF">Comorian Franc - KMF</option>
                            <option value="CDF">Congolese Franc - CDF</option>
                            <option value="CRC">Costa Rican Colón - CRC</option>
                            <option value="HRK">Croatian Kuna - HRK</option>
                            <option value="CUC">Cuban Convertible Peso - CUC</option>
                            <option value="CUP">Cuban Peso - CUP</option>
                            <option value="CZK">Czech Koruna - CZK</option>
                            <option value="DKK">Danish Krone - DKK</option>
                            <option value="DJF">Djiboutian Franc - DJF</option>
                            <option value="DOP">Dominican Peso - DOP</option>
                            <option value="XCD">East Caribbean Dollar - XCD</option>
                            <option value="EGP">Egyptian Pound - EGP</option>
                            <option value="ERN">Eritrean Nakfa - ERN</option>
                            <option value="EEK">Estonian Kroon - EEK</option>
                            <option value="ETB">Ethiopian Birr - ETB</option>
                            <option value="EUR">Euro - EUR</option>
                            <option value="FKP">Falkland Pound - FKP</option>
                            <option value="FJD">Fijian Dollar - FJD</option>
                            <option value="GMD">Gambian Dalasi - GMD</option>
                            <option value="GEL">Georgian Lari - GEL</option>
                            <option value="GHS">Ghanaian Cedi - GHS</option>
                            <option value="GIP">Gibraltar Pound - GIP</option>
                            <option value="GTQ">Guatemalan Quetzal - GTQ</option>
                            <option value="GNF">Guinean Franc - GNF</option>
                            <option value="GYD">Guyanese Dollar - GYD</option>
                            <option value="HTG">Haitian Gourde - HTG</option>
                            <option value="HNL">Honduran Lempira - HNL</option>
                            <option value="HKD">Hong Kong Dollar - HKD</option>
                            <option value="HUF">Hungarian Forint - HUF</option>
                            <option value="ISK">Icelandic Króna - ISK</option>
                            <option value="INR">Indian Rupee - INR</option>
                            <option value="IDR">Indonesian Rupiah - IDR</option>
                            <option value="IRR">Iranian Rial - IRR</option>
                            <option value="IQD">Iraqi Dinar - IQD</option>
                            <option value="ILS">Israeli New Sheqel - ILS</option>
                            <option value="JMD">Jamaican Dollar - JMD</option>
                            <option value="JPY">Japanese Yen - JPY</option>
                            <option value="JOD">Jordanian Dinar - JOD</option>
                            <option value="KZT">Kazakhstani Tenge - KZT</option>
                            <option value="KES">Kenyan Shilling - KES</option>
                            <option value="KWD">Kuwaiti Dinar - KWD</option>
                            <option value="KGS">Kyrgyzstani Som - KGS</option>
                            <option value="LAK">Lao Kip - LAK</option>
                            <option value="LVL">Latvian Lats - LVL</option>
                            <option value="LBP">Lebanese Pound - LBP</option>
                            <option value="LSL">Lesotho Loti - LSL</option>
                            <option value="LRD">Liberian Dollar - LRD</option>
                            <option value="LYD">Libyan Dinar - LYD</option>
                            <option value="MOP">Macanese Pataca - MOP</option>
                            <option value="MKD">Macedonian Denar - MKD</option>
                            <option value="MGA">Malagasy Ariary - MGA</option>
                            <option value="MWK">Malawian Kwacha - MWK</option>
                            <option value="MYR">Malaysian Ringgit - MYR</option>
                            <option value="MVR">Maldivian Rufiyaa - MVR</option>
                            <option value="MRO">Mauritanian Ouguiya - MRO</option>
                            <option value="MUR">Mauritian Rupee - MUR</option>
                            <option value="MXN">Mexican Peso - MXN</option>
                            <option value="MDL">Moldovan Leu - MDL</option>
                            <option value="MNT">Mongolian Tögrög - MNT</option>
                            <option value="MAD">Moroccan Dirham - MAD</option>
                            <option value="MZN">Mozambican Metical - MZN</option>
                            <option value="MMK">Myanmar Kyat - MMK</option>
                            <option value="NAD">Namibian Dollar - NAD</option>
                            <option value="NPR">Nepalese Rupee - NPR</option>
                            <option value="ANG">Netherlands Antillean Gulden - ANG</option>
                            <option value="TWD">New Taiwan Dollar - TWD</option>
                            <option value="NZD">New Zealand Dollar - NZD</option>
                            <option value="NIO">Nicaraguan Córdoba - NIO</option>
                            <option value="NGN">Nigerian Naira - NGN</option>
                            <option value="KPW">North Korean Won - KPW</option>
                            <option value="NOK">Norwegian Krone - NOK</option>
                            <option value="OMR">Omani Rial - OMR</option>
                            <option value="PKR">Pakistani Rupee - PKR</option>
                            <option value="PAB">Panamanian Balboa - PAB</option>
                            <option value="PGK">Papua New Guinean Kina - PGK</option>
                            <option value="PYG">Paraguayan Guaraní - PYG</option>
                            <option value="PEN">Peruvian Nuevo Sol - PEN</option>
                            <option value="PHP">Philippine Peso - PHP</option>
                            <option value="PLN">Polish Złoty - PLN</option>
                            <option value="QAR">Qatari Riyal - QAR</option>
                            <option value="RON">Romanian Leu - RON</option>
                            <option value="RUB">Russian Ruble - RUB</option>
                            <option value="RWF">Rwandan Franc - RWF</option>
                            <option value="SHP">Saint Helenian Pound - SHP</option>
                            <option value="SVC">Salvadoran Colón - SVC</option>
                            <option value="WST">Samoan Tala - WST</option>
                            <option value="STD">São Tomé and Príncipe Dobra - STD</option>
                            <option value="SAR">Saudi Riyal - SAR</option>
                            <option value="RSD">Serbian Dinar - RSD</option>
                            <option value="SCR">Seychellois Rupee - SCR</option>
                            <option value="SLL">Sierra Leonean Leone - SLL</option>
                            <option value="SGD">Singapore Dollar - SGD</option>
                            <option value="SKK">Slovak Koruna - SKK</option>
                            <option value="SBD">Solomon Islands Dollar - SBD</option>
                            <option value="SOS">Somali Shilling - SOS</option>
                            <option value="ZAR">South African Rand - ZAR</option>
                            <option value="KRW">South Korean Won - KRW</option>
                            <option value="LKR">Sri Lankan Rupee - LKR</option>
                            <option value="SDG">Sudanese Pound - SDG</option>
                            <option value="SRD">Surinamese Dollar - SRD</option>
                            <option value="SZL">Swazi Lilangeni - SZL</option>
                            <option value="SEK">Swedish Krona - SEK</option>
                            <option value="CHF">Swiss Franc - CHF</option>
                            <option value="SYP">Syrian Pound - SYP</option>
                            <option value="TJS">Tajikistani Somoni - TJS</option>
                            <option value="TZS">Tanzanian Shilling - TZS</option>
                            <option value="THB">Thai Baht - THB</option>
                            <option value="TOP">Tongan Paʻanga - TOP</option>
                            <option value="TTD">Trinidad and Tobago Dollar - TTD</option>
                            <option value="TND">Tunisian Dinar - TND</option>
                            <option value="TRY">Turkish Lira - TRY</option>
                            <option value="TMM">Turkmenistani Manat - TMM</option>
                            <option value="UGX">Ugandan Shilling - UGX</option>
                            <option value="UAH">Ukrainian Hryvnia - UAH</option>
                            <option value="AED">United Arab Emirates Dirham - AED</option>
                            <option value="USD">United States Dollar - USD</option>
                            <option value="UYU">Uruguayan Peso - UYU</option>
                            <option value="UZS">Uzbekistani Som - UZS</option>
                            <option value="VUV">Vanuatu Vatu - VUV</option>
                            <option value="VEF">Venezuelan Bolívar - VEF</option>
                            <option value="VND">Vietnamese Đồng - VND</option>
                            <option value="XOF">West African Cfa Franc - XOF</option>
                            <option value="YER">Yemeni Rial - YER</option>
                            <option value="ZMK">Zambian Kwacha - ZMK</option>
                            <option value="ZWD">Zimbabwean Dollar - ZWD</option>
                        </select>
                    </div> 
                </div>
                  <div className="form-row">
                        <div className="form-group">
                            <div className="form-group">
                                <div className="form-check">
                                  <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required />
                                  <label className="form-check-label">
                                    <small>I agree to the Website Terms, Privacy Policy and Partner Terms of Business</small>
                                  </label>
                                </div>
                              </div>
                    
                          </div>
                    </div>


                <button type="submit" className="btn btn-primary btn-block" disabled={!this.state.formValid}>REGISTER MY BUSINESS</button>
                <p className="forgot-password text-right">
                    Already registered? <Link  to={"/sign-in"}>sign in</Link>
                </p>
            </form>
        </div>
        );
    }
}