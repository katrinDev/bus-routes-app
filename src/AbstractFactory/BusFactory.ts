import { BorderQueueComponent, BusComposite } from "../Composite/Composite";

export interface DoubleDecker extends BorderQueueComponent{
  capacity: number;

  getTicketPrice(): number;
}

export interface SingleDecker extends BorderQueueComponent{
  getTicketPrice(): number;
}

class MegabusDoubleDecker extends BusComposite implements DoubleDecker {

  private _capacity: number;
  
  public get capacity() : number {
    return this.capacity;
  }

  getTicketPrice(): number {
    return this.ticketPrice;
  }

  constructor(public ticketPrice: number = 0, private routeNumber?: string, 
    private departureDate?: string, private departureTime?: string, private destination?: string, private departureStation?: string, 
    private departurePlatform?: string, private arrivalStation?: string, private busBrand?: string, private travelTime?: string) {
      super();
      this._capacity = 40;
  }
}

class ScaniaDoubleDecker extends BusComposite implements DoubleDecker {
  
  private ticketPrice: number;
  private _capacity: number;

  public get capacity() : number {
    return this._capacity;
  }

  getTicketPrice(): number {
    return this.ticketPrice;
  }

  constructor(ticketPrice: number = 0, private routeNumber?: string, 
    private departureDate?: string, private departureTime?: string, private destination?: string, private departureStation?: string, 
    private departurePlatform?: string, private arrivalStation?: string, private busBrand?: string, private travelTime?: string) {
      super();
      this.ticketPrice = ticketPrice * 0,9;
      this._capacity = 36;
  }

}

class MegabusSingleDecker extends BusComposite implements SingleDecker {
  
  getTicketPrice(): number {
    return this.ticketPrice;
  }

  constructor(private ticketPrice: number = 0, private routeNumber?: string, 
    private departureDate?: string, private departureTime?: string, private destination?: string, private departureStation?: string, 
    private departurePlatform?: string, private arrivalStation?: string, private busBrand?: string, private travelTime?: string) {
      super();
  }
}

class ScaniaSingleDecker extends BusComposite implements SingleDecker {
  
  private ticketPrice: number;

  getTicketPrice(): number {
    return this.ticketPrice;
  }

  constructor(ticketPrice: number = 0, private routeNumber?: string, 
    private departureDate?: string, private departureTime?: string, private destination?: string, private departureStation?: string, 
    private departurePlatform?: string, private arrivalStation?: string, private busBrand?: string, private travelTime?: string) {
      super();
      this.ticketPrice = ticketPrice * 0.9;
  }

}

export interface BusFactory{
  createDoubleDecker(): DoubleDecker;
  createSingleDecker(): SingleDecker;
}


export class MegabusFactory implements BusFactory {
  public createDoubleDecker(): DoubleDecker {
    return new MegabusDoubleDecker();
  }
  public createSingleDecker(): SingleDecker{
    return new MegabusSingleDecker();
  }
}

export class ScaniaFactory implements BusFactory {
  public createDoubleDecker(): DoubleDecker {
    return new ScaniaDoubleDecker();
  }
  public createSingleDecker(): SingleDecker{
    return new ScaniaSingleDecker;
  }
}

  