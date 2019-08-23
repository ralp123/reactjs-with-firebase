import React, {Component, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const axios = require('axios');

const base_url = 'https://jsonplaceholder.typicode.com';

function getUSers() {
	return axios.get(base_url + '/users')
}

const getPosts = () => {
	return axios.get(base_url + '/posts')
}


export const getUSers1 = getPosts();
