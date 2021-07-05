import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { userContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    useEffect(()=>{
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email,{
            method:'GET',
            headers:{
                "constent-type":'application/json',
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res =>res.json())
        .then(data => setBookings(data))
    },[])
    return (
        <div>
           <h2>you have: {bookings.length} bookings</h2> 
           {
               bookings.map(booking =><li>{booking.name} from:{booking.checkIn} to: {booking.checkOut}</li>)
           }
        </div>
    );
};

export default Bookings;