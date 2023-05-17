export interface LeftTimeCounter {
    countTimeLeft(laborIntensity: number, actualTimeSpent: number): number;
}

export class FullTaskCounter implements LeftTimeCounter{

    public countTimeLeft(laborIntensity: number, actualTimeSpent: number): number {
        return laborIntensity;
    }
}

export class PartTaskCounter implements LeftTimeCounter {
    
    public countTimeLeft(laborIntensity: number, actualTimeSpent: number): number {
        return laborIntensity - actualTimeSpent;
    }
}

export abstract class Creator {
    public abstract factoryMethod(): LeftTimeCounter;
}

export class FullTaskCreator extends Creator{
    public factoryMethod(): LeftTimeCounter {
        return new FullTaskCounter();
    }
}

export class SimpleTaskCreator extends Creator{
    public factoryMethod(): LeftTimeCounter {
        return new PartTaskCounter();
    }
}


