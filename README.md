# Event-Ag
Typed event aggregator implementation for Typescript.

# Installation
Install via npm using `npm i --save-dev event-ag`

# Usage
## Creating an event
First create an event that extends `PubSubBase` as shown below; this event will be used as event arguments when publishing.
```typescript
export default class NewUserEvent extends PubSubBase<NewUserEvent> {
  private userId: number;
  
  public get UserId: number {
    return this.userId;
  }
  
  public set PackId(value: number) {
    this.userId = value;
  }
}
```
## The Event Aggregator
The `EventAggregator` is responsible for managing all of the available events, events are added to the `EventAggregator` the first time `GetEvent` is called with a new event.
To get started with using the `EventAggregator`, create an instance of `EventAggregator`, then get the newly created `PubSubBase` event from the `EventAggregator`.
```typescript
const eventAggregator = new EventAggregator();
const newUserEvent = eventAggregator.GetEvent(NewUserEvent);
```
## Subscribing to events
Events can be subscribed to using the following method.
```typescript
const eventAggregator = new EventAggregator();
const newUserEvent = eventAggregator.GetEvent(NewUserEvent);

newUserEvent.Subscribe((eventArgs: NewUserEvent) => console.log(`New user - UserId: ${eventArgs.UserId}`);
```
## Publishing events
To publish an event, an instance of the event must be passed as event arguments.
```typescript
const eventAggregator = new EventAggregator();
const newUserEvent = eventAggregator.GetEvent(NewUserEvent);

newUserEvent.Subscribe((eventArgs: NewUserEvent) => console.log(`New user - UserId: ${eventArgs.UserId}`);
newUserEvent.Publish({UserId: 0} as NewUserEvent);
```
