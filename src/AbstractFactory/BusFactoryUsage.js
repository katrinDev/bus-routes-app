import { useContext } from "react";
import { DataContext } from "../context/context";
import {
  ScaniaFactory,
  MegabusFactory,
} from "./BusFactory";
import { PeopleGroup } from "../Composite/Composite";

function BusFactoryUsage() {
  const { data } = useContext(DataContext);

  const routesWithOrders = data.filter((obj) => obj.hasOwnProperty("orders"));

  const [ordersData, setOrdersData] = useState([]);
  const [singleDeckerOrdersInfo, setSingleDeckerOrdersInfo] = useState({
    peopleAmount: 0,
    profit: 0,
  });
  const [doubleDeckerOrdersInfo, setDoubleDeckerOrdersInfo] = useState({
    peopleAmount: 0,
    profit: 0,
  });

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
        console.log("Empty bus brand field");
        break;
      }
    }

    const doubleDecker = factory?.createDoubleDecker();
    const singleDecker = factory?.createSingleDecker();

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
    setDoubleDeckerOrdersInfo({ peopleAmont: doubleAmount, profit: doubleProfit});
    
    const singleAmount = singleDecker.getPeopleNumber();
    const singleProfit = singleAmount * singleDecker.getTicketPrice();
    setSingleDeckerOrdersInfo({ peopleAmont: singleAmount, profit: singleProfit});


    setOrdersData([
      ...ordersData,
      {
        routeId: route.id,
        routeNumber: route.routeNumber,
        totalOrders: {
          doubleDecker: doubleDeckerOrdersInfo,
          singleDecker: singleDeckerOrdersInfo,
        },
      },
    ]);
  }

  return [ordersData];
}
