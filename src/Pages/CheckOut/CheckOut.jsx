import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckOut = () => {


  const services = useLoaderData();
  const {  title, price ,_id,img} = services;
  // console.log(services);
  const {user} = useContext(AuthContext)

  const handleBookService = event =>{
    event.preventDefault()

    const form = event.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;
    const order = {
        customerName : name,
        email,
        date,
        img,
        service: title,
        service_id: _id,
       price:price

    }
 console.log(order);

    // useEffect(() => {  
        fetch('http://localhost:5000/booking',{
            method:'POST',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify(order)


        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.insertedId){
              alert('service book successful')
            }
        })

    // }, [])

  }


  return (
    <div className="my-20">
      <h1 className="text-3xl font-bold text-center mb-10">Book Service: {title}</h1>
      <form onSubmit={handleBookService} >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="form-control">
        <label className="label">
            <span className="label-text">Name</span>
          </label>
         
          <input
            type="text"
            name="name"
             required
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
        <label className="label">
            <span className="label-text">Date</span>
          </label>
         
          <input
            type="date"
            name="date"
             required
            className="input input-bordered"
          />
        
        </div>
        <div className="form-control">
        <label className="label">
            <span className="label-text">Email</span>
          </label>
         
          <input
            type="email"
            name="email"
            defaultValue={user?.email}
            required
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
        <label className="label">
            <span className="label-text">Due Amount</span>
          </label>
        
          <input
            type="text"
            name="amount"
           defaultValue={`$`+ price} required
            className="input input-bordered"
          />
        
        </div>

        </div>
       
    

        <div className="form-control mt-6">
          
          <input className="btn btn-block bg-red-400 border-none" type="submit" value="Order Confirm" />
        </div>

      </form>




      <div className="card-body">
        
      </div>
    </div>
  );
};

export default CheckOut;
