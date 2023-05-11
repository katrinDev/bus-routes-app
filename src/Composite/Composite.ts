
interface BorderQueueComponent {
  getPeopleNumber(): number;
}

class PeopleGroup implements BorderQueueComponent {
  private peopleNumber: number;

  constructor(peopleNumber: number) {
      this.peopleNumber = peopleNumber;
  }

  getPeopleNumber(): number {
    return this.peopleNumber;
  }
}

class BusComposite implements BorderQueueComponent{

    protected children: BorderQueueComponent[];

    constructor() {
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