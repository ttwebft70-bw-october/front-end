import React,{useState} from 'react';
import { axiosWithAuth } from '../modules/axiosWithAuth';

function DeleteItem(e){
		// const profile = JSON.parse(window.localStorage.getItem('profile'))
		// setId(profile)
		// e.preventDefault();
		axiosWithAuth()
		.delete(`https://marketplace-backend-webft-70.herokuapp.com/api/profile/6/listings/1 `)
		.then((res)=>{
			console.log(res)
		})
		.catch((err)=>{
			console.log(err)
        })
    }

export default DeleteItem