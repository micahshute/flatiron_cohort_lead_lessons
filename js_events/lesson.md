[Video](https://youtu.be/8WFLaRzxYtw)

# Intro to Events


- Why?
    - user interacts with a webpage and expects instant updates to the DOM
- examples in websites you can think of?
- we call the method `addEventListener` on a DOM element
- `addEventListner` is a HOF, which means it takes another function as an argument
- 2 arguments :
    - string specifying type of event
    - function to perform when that event occurs

- Common even types:
    - click
    - keydown (keyup)
    - submit
    - DOMContentLoaded

- When an event listener is called, the listener attempts to pass the event object to provided callback, therefore the event object is only available if we declare it as an argument.
    - Different events have different properties
    - Mouse events have mouse coordinates
    - Key events have information about pressed key

- event.target
    - Returns the DOM element upon which the event was triggered
    - event.target.children gives array of all children of that target
- this inside an event listener callback is `currentTarget`

- Iterate through p tags and change color to blue

- Add an event listener to document which removes the element (DELEGATION)

```js
  document.addEventListener("click", (event)=>{
    event.preventDefault()
    event.target.remove()
  })
```

# Events and Forms

- In order to obtain user input, we use input tags and use their value attribute to access their contents
- Input types
    - text (default)
    - number
    - submit
    - radio/checkbox
    - …many more
- There are two typical ways to handle a submission: using a form with a submit event or a button with a click event
    - Gotchas to using form submit event
        - submit events can only be triggered by form elements
        - preventDefault to prevent the default action of a submit event: a page reload
        - Can grab the relevant inputs using the event object only if theinputs are children of the form; otherwise the inputs must be found manually
    - Gotchas to using click event submission
        - Pressing the return key will not submit
        - You will not be able to use the event object to locate the target inputs and instead must be found manually
- Typical flow for a form:
    - User enters input
    - An event triggers (form submission or click)
    - In the event, relevant input elements are found
    - Values are pulled from input elements
    - Those values are used for whatever purpose (storing, sent out in a fetch for storage in a database)
    - Usually ends in some sort of DOM manipulation (creation or edition of elements)

    