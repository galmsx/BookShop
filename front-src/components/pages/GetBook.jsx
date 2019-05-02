import React from 'react';
import {Redirect} from 'react-router-dom';

function GetBook(){
    if(localStorage.getItem('token')) {return (<Redirect to="/profile/login" push />);}
    return <div></div>;
}
export default GetBook;