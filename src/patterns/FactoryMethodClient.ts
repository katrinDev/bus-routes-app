import {LeftTimeCounter, FullTaskCounter, PartTaskCounter, Creator, FullTaskCreator, SimpleTaskCreator} from "./FactoryMethod.ts";

class Task {
    constructor(public id: number, private taskName: number, 
        private projectName: string, private laborIntensity_: number, 
        private plannedResource: number, private actualTimeSpent_: number,) {};
    
    public get actualTimeSpent() : number {
        return this.actualTimeSpent_;
    }
    
    public get laborIntensity() : number {
        return this.laborIntensity_;
    }
}

export function factoryMethodClient (tasks: Task[]): Object[] {
    return tasks.map(task => {
        let concreteCreator: Creator;
        if(task.actualTimeSpent === 0){
            concreteCreator = new FullTaskCreator();
        } else {
            concreteCreator = new SimpleTaskCreator();
        }

        let counter: LeftTimeCounter = concreteCreator.factoryMethod();

        return {...task, actualTimeLeft: counter.countTimeLeft(task.laborIntensity, task.actualTimeSpent), key: task.id};
    });
}