import { ScaniaFactory, MegabusFactory } from "./BusFactory.ts";
import { PeopleGroup } from "../Composite/Composite.ts";

export function busFactoryUsage(data) {

  const routesWithOrders = data.filter((obj) => obj.hasOwnProperty("orders"));

  let ordersData = [];
  let singleDeckerOrdersInfo = {
    peopleAmount: 0,
    profit: 0,
  };

  let doubleDeckerOrdersInfo = {
    peopleAmount: 0,
    profit: 0,
  };

  for (let route of routesWithOrders) {
    let factory;
    switch (route.busBrand) {
      case "Scania": {
        factory = new ScaniaFactory();
        break;
      }
      case "Megabus": {
        factory = new MegabusFactory();
        break;
      }
      default: {
        factory = null;
        return null;
      }
    }

    console.log(route.ticketPrice);
    const doubleDecker = factory.createDoubleDecker(route.ticketPrice);
    const singleDecker = factory.createSingleDecker(route.ticketPrice);

    route.orders.forEach((order) => {
      if (order.hasOwnProperty("doubleDecker")) {
        doubleDecker.add(new PeopleGroup(order.doubleDecker));
      }
      if (order.hasOwnProperty("singleDecker")) {
        singleDecker.add(new PeopleGroup(order.singleDecker));
      }
    });

    const doubleAmount = doubleDecker.getPeopleNumber();
    const doubleProfit = doubleAmount * doubleDecker.getTicketPrice();
    doubleDeckerOrdersInfo = {
      peopleAmount: doubleAmount,
      profit: doubleProfit,
    };


    const singleAmount = singleDecker.getPeopleNumber();
    const singleProfit = singleAmount * singleDecker.getTicketPrice();
    singleDeckerOrdersInfo = {
      peopleAmount: singleAmount,
      profit: singleProfit,
    };


    ordersData = [
      ...ordersData,
      {
        id: route.id,
        routeNumber: route.routeNumber,
        doubleDeckerPeopleAmount: doubleDeckerOrdersInfo.peopleAmount,
        doubleDeckerProfitAmount: doubleDeckerOrdersInfo.profit, 
        singleDeckerPeopleAmount: singleDeckerOrdersInfo.peopleAmount, 
        singleDeckerProfitAmount: singleDeckerOrdersInfo.profit,
      },
    ];
  }

  return ordersData;
}
