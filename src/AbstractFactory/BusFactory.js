class BusFactory {
    createBus(brand) {}
}

class ConcreteBusFactory extends BusFactory {
    createBus(brand) {
      if (brand === 'Greyhound') {
        return new GreyhoundBus();
      } else if (brand === 'Megabus') {
        return new MegabusBus();
      }
    }
  }

  
  class Bus {
    constructor(routeNumber, departureDate, departureTime, destination, departureStation, departurePlatform, arrivalStation, ticketPrice, busBrand, travelTime) {
      this.routeNumber = routeNumber;
      this.departureDate = departureDate;
      this.departureTime = departureTime;
      this.destination = destination;
      this.departureStation = departureStation;
      this.departurePlatform = departurePlatform;
      this.arrivalStation = arrivalStation;
      this.ticketPrice = ticketPrice;
      this.busBrand = busBrand;
      this.travelTime = travelTime;
    }
  }
  
  class GreyhoundBus extends Bus {
    constructor(routeNumber, departureDate, departureTime, destination, departureStation, departurePlatform, arrivalStation, ticketPrice, busBrand, travelTime) {
      super(routeNumber, departureDate, departureTime, destination, departureStation, departurePlatform, arrivalStation, ticketPrice, busBrand, travelTime);
    }
  }
  
  class MegabusBus extends Bus {
    constructor(routeNumber, departureDate, departureTime, destination, departureStation, departurePlatform, arrivalStation, ticketPrice, busBrand, travelTime) {
      super(routeNumber, departureDate, departureTime, destination, departureStation, departurePlatform, arrivalStation, ticketPrice * 0.8 /* discount */, busBrand + ' (double-decker)', travelTime);
    }
  }
  
//   // Client.js
//   import React from 'react';
//   import { ConcreteBusFactory } from './ConcreteFactory';
  
//   const busFactory = new ConcreteBusFactory();
  
//   const App = () => {
//     const greyhoundBus = busFactory.createBus('Greyhound');
//     const megabusBus = busFactory.createBus('Megabus');
  
//     // ...
//   };