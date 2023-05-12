
export abstract class BorderQueueComponent {
  abstract getPeopleNumber(): number;

  add(child: BorderQueueComponent): void {};
  remove(child: BorderQueueComponent): void {};

  isComposite(): boolean {
    return false;
  }
}

export class PeopleGroup extends BorderQueueComponent {
  private peopleNumber: number;

  constructor(peopleNumber: number) {
      super();
      this.peopleNumber = peopleNumber;
  }

  getPeopleNumber(): number {
    return this.peopleNumber;
  }
}

export class BusComposite extends BorderQueueComponent{

    protected children: BorderQueueComponent[];

    constructor() {
      super();
      this.children = [];
    }

    add(child: BorderQueueComponent): void {
        this.children.push(child);
    }

    remove(child: BorderQueueComponent): void {
        const index = this.children.indexOf(child);
        if (index >= 0) {
            this.children.splice(index, 1);
        }
    }

    isComposite(): boolean {
      return true;
    }

    getPeopleNumber(): number {
        return this.children.reduce((sum, child) => sum + child.getPeopleNumber(), 0);
    }
}

class Car extends BusComposite{
  constructor() {
    super();
  }

  add(child: BorderQueueComponent): void {
    if(this.children.length < 5){
      this.children.push(child);
    } else {
      console.log("Limited room in the car!");
    }
  }

}