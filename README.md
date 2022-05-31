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
## Creating a Query
A query should be used when a return value is required, queries should not edit the state of the application i.e. be free of side effects.

To create a query, create a class that extends `Query` as shown below; this query class will represent return type of the query.
```typescript
export default class UserQuery extends Query<UsernameQuery> {
  private user: IUser;

  public get User: IUser {
    return this.user;
  }

  public set User(value: IUser){
    this.user = value;
  }
}
```
Args can be passed when making a query, to do this, create an interface that extends the `QueryArgs` interface.
```typescript
export interface UserQueryArgs implements QueryArgs<TestQuery> {
  Username: string;
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

## Handling Queries
Unlike events, a query can only have one handler. A function can be registered as a handler of a query with the following code.
```typescript
  const eventAggregator = new EventAggregator();
  eventAggregator.GetQuery(UserQuery).Handle((query: QueryArgs<UserQuery> | undefined) => {
    const userQueryArgs = query as UserQueryArgs;
    const user = // Code to find user with **userQuery.Username** goes here.
    return {
      User: user
    } as UserQuery;
  });
```
`NOTE: parameter of handler must inlude Query<T> | undefined as query args may not always be passed.`
## Executing Queries
Executing a query is similar to publishing an event.
```typescript
  const userQuery = eventAggregator.GetQuery(UserQuery);

  const user = userQuery.Execute({
    Username: 'test_username'
  } as UserQueryArgs);
```

