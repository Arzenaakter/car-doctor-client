import { useEffect } from "react";
import { useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const handleShowAll =()=>{
    setShowAll(true)
  }

  useEffect(() => {
    fetch("https://car-doctor-server-kappa-navy.vercel.app/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="mt-28 ">
      <div className="text-center space-y-5 my-10">
        <h3 className="text-3xl font-bold text-red-500">Services</h3>
        <h1 className="text-5xl font-bold">Our Services Area</h1>
        <p className="w-1/2 text-center mx-auto">
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which do not look even slightly
          believable.{" "}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
        {showAll ?
           services.map((service) => (
              <ServiceCard key={service._id} service={service}></ServiceCard>
            ))
          : services.slice(0, 6).map((service) => (<ServiceCard key={service._id} service={service}></ServiceCard>
              ))}
      </div>
      <div className="text-center pb-10 my-10">
        {
            showAll || services.length <=6 ? " " : <button className="btn btn-error text-white" onClick={handleShowAll}>Show All</button>
        }

      </div>
    </div>
  );
};

export default Services;
