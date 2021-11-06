export class PubSubBase<T> {
    private subscriptions: ((eventArgs: T) => void)[];

    constructor() {
        this.subscriptions = [];
    }

    public Subscribe(handler: (eventArgs: T) => void): void{
        this.subscriptions.push(handler);
    }

    public Unsubscribe(handler: (eventArgs: T) => void): void{
        this.subscriptions.forEach((element, index) => {
            if (element == handler){
                this.subscriptions.splice(index, 1);
            }
        });
    }

    public Publish(eventArgs: T): void{
        this.subscriptions.map(x => x(eventArgs));
    }
}

export default class EventAggregator {
    private events: {[key: string]: object};

    constructor() {
        this.events = {};
    }

    public GetEvent<T extends PubSubBase<T>>(event: new () => T): PubSubBase<T>{
        const instance: Object = new event();
        var result: PubSubBase<T> = this.events[instance.constructor.name] as PubSubBase<T>;
        if (result == null)
        {
            result = instance as PubSubBase<T>;
            this.events[instance.constructor.name] = result;
        }

        return result;
    }
}