# React Lifecycle Methods


## Why do we need them?

Let students think about this and answer.

Looking for statements like: 

- When state and props change, the component needs to be re-rendered on the DOM

- There may be things you have to do that are more complicated than just updating the DOM when state and props change

- There may be initial setup or cleanup required when putting a new component on the screen and removing it, respectively.

## If you were in charge of setting times when these methods were called in a lifecycle, when would you have them be called?

Let students think about this and answer.

Looking for statements like: 


- Upon initial rendering of the component
- Upon a change of state and/or props
- When removing a component from the screen


http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/


## Common Lifecycle Methods

#### Go over the below methods using the link below to get students used to reading the docs
https://reactjs.org/docs/react-component.html

### render()

### constructor()

### componentDidMount()
Note: Subscriptions (events on the server pushed to the frontend)

### componentDidUpdate()

### componentWillUnmount()

## Rarely Used Lifecycle Methods

Use the same link as above

### shouldComponentUpdate()

### static getDerivedStateFromProps()

### getSnapshotBeforeUpdate()

### static getDerivedStateFromError()

### componentDidCatch()


## Review common lifecycle methods in code

## Hooks



## Review hooks in code

https://reactjs.org/docs/hooks-effect.html

return the cleanup function from useEffect

## Make a simple clock app if there is time


To only run useEffect on initial render, give it a second argument of an empty array