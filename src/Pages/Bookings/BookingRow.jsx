

const BookingRow = ({booking,handleDelete,handleBookingConfirm}) => {

    const {_id,date,service,img,price,status} = booking;

    
    return (
       
      <tr>
      <th>
      <button className="btn btn-sm btn-circle" onClick={()=>handleDelete(_id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
      </th>
      <td>
        
          <div className="avatar">
            <div className="rounded w-24">
              <img src={img} alt="service img" />
            </div>
          </div>
          
      </td>
      <td>
       {service}
       </td>
      <td>{date}</td>
      <td>$ {price}</td>
      <th>
        {status? <span className="text-success">Confirmed</span>:
        <button className="text-warning" onClick={()=>handleBookingConfirm(_id)}>pending</button>}
      </th>
    </tr>
    );
};

export default BookingRow;