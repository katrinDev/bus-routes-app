import { FC } from "react";
import { IBus } from "./BusTable";

const InlineBuses = ({ data }) => {
  return (
    <div
      style={{
        width: "60vw",
        minHeight: "600px"
      }}
    >
      {data.map((item) => (
        <div key={item.id}>
          {item.routeNumber}, {item.departureDate}, {item.departureTime},{" "}
          {item.destinationCity}, {item.departureStation},{" "}
          {item.departurePlatform}, {item.arrivalStation}, {item.ticketPrice},{" "}
          {item.busBrand}, {item.travelTime}
        </div>
      ))}
    </div>
  );
};

export default InlineBuses;
