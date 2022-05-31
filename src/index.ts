export class PubSubBase<T> {
    private subscriptions: ((eventArgs: T) => void)[];

    constructor() {
        this.subscriptions = [];
    }

    public Subscribe(handler: (eventArgs: T) => void): void {
        this.subscriptions.push(handler);
    }

    public Unsubscribe(handler: (eventArgs: T) => void): void {
        this.subscriptions.forEach((element, index) => {
            if (element == handler) {
                this.subscriptions.splice(index, 1);
            }
        });
    }

    public Publish(eventArgs: T): void {
        this.subscriptions.map(x => x(eventArgs));
    }
}

export interface QueryArgs<T> { }

export class Query<T> {
    private handler: ((query?: QueryArgs<T>) => T) | null = null;

    public Handle(handler: (query?: QueryArgs<T>) => T): void {
        this.handler = handler;
    }

    public Execute(query?: QueryArgs<T>): T | null {
        if (this.handler) {
            return this.handler(query);
        }

        return null;
    }
}

export default class EventAggregator {
    private events: { [key: string]: object };
    private queries: { [key: string]: object };;

    constructor() {
        this.events = {};
        this.queries = {};
    }

    public GetEvent<T extends PubSubBase<T>>(event: new () => T): PubSubBase<T> {
        const instance: Object = new event();
        var result: PubSubBase<T> = this.events[instance.constructor.name] as PubSubBase<T>;
        if (result == null) {
            result = instance as PubSubBase<T>;
            this.events[instance.constructor.name] = result;
        }

        return result;
    }

    public GetQuery<T extends Query<T>>(query: new () => T): Query<T> {
        const instance: Object = new query();
        var result: Query<T> = this.queries[instance.constructor.name] as Query<T>;
        if (result == null) {
            result = instance as Query<T>;
            this.queries[instance.constructor.name] = result;
        }

        return result;
    }
}