# Defining Methods


## What are methods (functions)? 

- Machines with inputs and outputs, sometimes they do things
    - EG, a vending machine
    - A robot that does tasks for you!
- Take repetitive work that may be hard to write or figure out, and make it easier in the future
- Making a little robot that does stuff for you

```ruby

    puts "Hello, Dave, welcome!"
    puts "Hello, Jessica, welcome!"
    puts "Hello, Michael, welcome!"
    puts "Hello, Jordan, welcome!"
    puts "Hello, Austin, welcome!"
    puts "Hello, Chad, welcome!"
    puts "Hello, John, welcome!"
    puts "Hello, Sarah, welcome!"

```

I ask myself, what information changes every time? This becomes my input argument.
What stays the same?

```ruby

def say_hi(name)
    puts "Hello, #{name}, welcome!"
end
```
Q: Do I HAVE to call the parameter "name"?


Lots of times, though, you want some outputted information:

You go to a lot of restaurants and are tired of calculating a tip. You want a robot to do it for you

Q: What information does the robot need to know to perform this task?
A: Total amount (and tip amount too, but if this is not said add it after)

Q: What information do you want back? 
A: The tip

Q: Do you want any action done? 
A: No

```ruby 

def calc_tip(amt, tip)
    (amt * (tip / 100.0)).round(2)
end

```

Q: Why is the correct value returned? What is telling it to be returned?
A: Describe implicit returns


Q: What is wrong with the following code?
A:

```ruby 

def calc_tip(x, y)
    (x * (y / 100.0)).round(2)
end

```

Q: What if we want to do a 20% tip MOST of the time?

```ruby 

def calc_tip(amt, tip=20)
    (amt * (tip / 100.0)).round(2)
end

```