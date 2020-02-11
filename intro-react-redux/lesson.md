# Redux 

## Objectives
- Gain intuition of Redux is
- Understand basic building blocks of redux
- See Redux in aciton

### Intuition

Instead of having a component high in the 'heirarchical chain' holding information as state, and potentially prop-drilling down that information over multiple generations, we are going to build an information warehouse, (or a `store`), where this info lives. (For those details-oriented people, this store is just a big JS object)

Since everyone has access to this store, there has to be a standardized way that information is changed so we don't have chaos. Think of it as if your apartment is the store. If a bunch of people are going to be coming and changing things in it, you want to have rules that they follow, even if its things you want done. For example, you want to add things to your apartment, you can buy it on amazon or any other online store. But you don't want the delivery guy to come into your house and unbox it and put it on a shelf somewhere. Instead, they follow the protocol of delivering a box to your door with the new thing inside the box. 

This is like them interacting with your `reducer` with an `action`, where the `action.type` is `DELIVER_PACKAGE` and the `action.payload` is whatever is inside the box. Then you yourself act as the logic inside the reducer, where you unpack the box, and add the item where you want it in your house.

For the delivery person to follow these laws correctly, they must be hired by a company that has their own process of obtaining the item you want, boxing it, and then dispatching this person to your door. However, the process of delivery has to follow your protocol. This is like the company's `component` determining how to get the data in their own context, but then in their props needing to call a method (eg `deliver`) which gives you the package in the correct way. We give them this standard function by `mapDispatchToProps`. 

The same type of logic would be true for a plummer coming into your home to perform a job. They will need to do things on your terms and be clear about what they are doing. Thus they will be calling your specific `reducers` - they'll be fixing your plumming not raiding your fridge. 

Maybe a security system has outside monitoring on your home. They `mapStateToProps` so they only get the information from your home they need (e.g. is your system alarming) - and not just anything they want (e.g. use your imagination - all the things you don't want them to know).


## Building Blocks

- Store: Where all my information lives
- Reducers: takes in an `action` object, whose `type` tells the reducer what to do, and the `payload` gives the information necessary to do it.
- Actions: takes in the raw data and create the `action` object formatted in the way the reducer expects it
- mapStateToProps: get specific information from the store and put it in the props of the connected component
- mapDispatchToProps: give the connected component a function in its props it can call to deliver properly formatted data to the reducer
- Provider: A wrapper component that allows wrapped components to have access to the `store` when connected
- connect: A HOC used to give a component the props defined by mapStateToProps and mapDispatchToProps (which requires access to the store)


## See in action

To further work on our intuition, our app will be about real-life information flow in the form of a legendary family: the Holmes'. 

In the story, the older brother Mycroft is a genius who pulls strings in the British government to help save the world.
His younger brother, Sherlock, is more boots-on-the-ground genius who gets his hands dirty and solves as a detective. 

We are going to focus on the perspective of Mycroft. He will be in charge of crafting plans to save the world, and will rely on data gathered by his many sources, including his younger brother Sherlock. Instead of saving all that information he gathers in his `state`, which he would then have to pass through many middle-men (as well as callbacks for when he is fed data) which could increase chances of leaks and spies, he is going to set up a goverment site where his informants can deposit and retrieve information, and in which he can access to get all the information he needs to have in order to make his spiderweb of plans. 

To organize the data and make it managable, he stadardizes the reports his informants submit to his drop site. The way of retreiving data is up to the informant, but when they deliver the data, it must be in an `action` object as he specifies. Also, each informant is operating on a need-to-know basis, so they should not just have access to the entire state. 

Let's see what we can do.