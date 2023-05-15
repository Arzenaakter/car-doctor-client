
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const ServiceCard = ({service}) => {
    const {title,img,price,_id } = service;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={img} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body ">
          <h2 className="card-title">{title}</h2>
         
          <div className="card-actions flex  text-red-500 items-center">
          <p className="text-xl  ">Price: ${price}</p>
            <Link className="" to={ `/checkout/${_id}` }>
               <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    );
};

export default ServiceCard;