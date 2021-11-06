export declare class PubSubBase<T> {
    private subscriptions;
    constructor();
    Subscribe(handler: (eventArgs: T) => void): void;
    Unsubscribe(handler: (eventArgs: T) => void): void;
    Publish(eventArgs: T): void;
}
export default class EventAggregator {
    private events;
    constructor();
    GetEvent<T extends PubSubBase<T>>(event: new () => T): PubSubBase<T>;
}
