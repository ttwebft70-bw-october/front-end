import React,{useState,useEffect} from 'react';
import {axiosWithAuth} from '../modules/axiosWithAuth';
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import DeleteItem from "./DeleteItem";
import UpdateItem from './UpdateItem';

export default function Listings(){
    const [listings,setListings] = useState([])
    useEffect(() => {
        axiosWithAuth()
        .get('https://marketplace-backend-webft-70.herokuapp.com/api/listings ')
        .then((res)=>{
            console.log(res)
            setListings(res.data.listings)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])
    
    return(
        <>
        <h1> Listings </h1>
        <CardColumns>
			{listings.map((listing) => (
				<Card>
					<Card.Body>
						<Card.Title>{listing.item}</Card.Title>
						<Card.Subtitle>{listing.price}</Card.Subtitle>
						<Card.Text>{listing.location}</Card.Text>
						<Card.Text>{listing.description}</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small>Quantity available: {listing.amount}</small>
					</Card.Footer>
					<button onClick={UpdateItem}>Edit Listing</button>
					<button onClick={DeleteItem}>Delete Listing</button>
				</Card>
			))}
		</CardColumns>
        </>
    )
}
