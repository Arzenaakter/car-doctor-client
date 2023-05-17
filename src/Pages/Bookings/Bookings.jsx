import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingRow from "./BookingRow";


const Bookings = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  const [bookings, setBookings] = useState([]);
   


  const url = `https://car-doctor-server-kappa-navy.vercel.app/booking?email=${user?.email}`
  useEffect(() => {
    fetch(url,{
      method:'GET',
      headers:{
        authorization: ` Bearer ${localStorage.getItem('car-access-token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if(!data.error){
          setBookings(data)
        }
        else{
          navigate('/')
        }
        })
  }, [url,navigate]);



  const handleDelete =(id)=>{
    const proceed = confirm('Are you sure you want to proceed');
    if(proceed){
        fetch(`https://car-doctor-server-kappa-navy.vercel.app/booking/${id}`, {
            method:'DELETE'
            
        })
        .then(res=> res.json())
        .then(data =>{
            console.log(data);
            if(data.deletedCount>0){
                alert('Deleted successful');
                const remaining = bookings.filter(booking => booking._id !== id)
                setBookings(remaining)
            }
        })
    }
}

const handleBookingConfirm =( id) =>{
    fetch(`https://car-doctor-server-kappa-navy.vercel.app/booking/${id}`, {
        method:'PATCH',
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify({status : 'confirm'})
        
    })
    .then(res=> res.json())
    .then(data =>{
        console.log(data);
        if(data.modifiedCount > 0){
           const remaining = bookings.filter(booking=> booking._id !== id)
           const updated = bookings.find(booking => booking._id === id)
           updated.status= 'confirm'
           const newUpdatedBooking = [updated,...remaining]
           setBookings(newUpdatedBooking)
        }
    })

}






  return (
    <div className="overflow-x-auto w-full my-20 border">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Image</th>
        <th>Service</th>
        <th>Date</th>
        <th>Price</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
     {
        bookings.map(booking =><BookingRow
        key={booking._id}
        booking={booking}
        handleDelete={handleDelete}
        handleBookingConfirm={handleBookingConfirm}
        ></BookingRow>)
     }
      
    </tbody>

    
  </table>
</div>
  );
};

export default Bookings;
