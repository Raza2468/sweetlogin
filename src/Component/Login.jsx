import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Alert } from 'react-bootstrap'
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useGlobalState, useGlobalStateUpdate } from '../Context/globaleContext'



axios.defaults.withCredentials = true;

function Login() {
    const url = "http://localhost:3001";
    const globalState = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();

   
    function hanldlogin(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: url + '/auth/Login',
            data: {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            }, withCredentials: true
        }).then((response) => {
            console.log("response.data: ", response.data);
            if (response.data.status === 200) {
                // alert(response.data.message)
                // history.push('/AdminDashboard')
                setGlobalState(prev => {
                    return { ...prev, user: response.data.user, role: response.data.user.role }
                })
            } else {
                // alert(response.data.message);
                alert(response.data.message);
            }
        }).catch((error) => {
            console.log(error);
        });

    }
    return (

        <MDBContainer className="singup_boader">
            <MDBRow>
                <MDBCol md="6">
                    <form onSubmit={hanldlogin} className="formcenter">
                        <p className="h4 text-center mb-4">Sign in</p>
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Your email
                            </label>
                        <input type="email" id="email" className="form-control" placeholder="Enter Your Email" />
                        <br />
                        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                            Your password
                            </label>
                        <input type="password" id="password" className="form-control" placeholder="Enter Your Password" />
                        <div className="text-center mt-4">
                            <MDBBtn color="unique" type="submit">Login</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer >

    )

}
export default Login