# Object Self and Class Variables/Methods

## Overview

- The goal is to:
    - Properly use self in different contexts 
    - Correctly write and utilize class variables and methods when appropriate.

## Associated Curriculum

- Self
    - https://learn.co/tracks/online-software-engineering-structured/object-oriented-ruby/object-s-self/self
    - https://learn.co/tracks/online-software-engineering-structured/object-oriented-ruby/object-s-self/oo-counting-sentences

- Class Variables and Methods
    - https://learn.co/tracks/online-software-engineering-structured/object-oriented-ruby/object-s-self/oo-counting-sentences
    - https://learn.co/tracks/online-software-engineering-structured/object-oriented-ruby/class-variables-and-methods/class-variables-and-methods
    - https://learn.co/tracks/online-software-engineering-structured/object-oriented-ruby/class-variables-and-methods/class-variables-and-methods-lab


## Learning Objectives

1. Students will be able to look at code and identify `self` in a particular scope

2. Students will be able to identify the purpose of `self` in code, as well as identify when `self` is implicitly called in code.

3. Demonstrate ability to write class methods and variables with the proper syntax

4. Students will be able to evaluate a problem and understand when it is appropriate to use class methonds or class variables

## Understandings

Self can be used to specifically reference properties and methods of a class or object.

Class methods and variables are useful in solving class-level problems.

## Misconceptions

Class methods and variables can reference individual objects

Self does not change based on the context

Self is never implicitly called by ruby

## Key knowledge and vocabulary

**Self**: A reference to the object of the current context. In a class method, `self` is a reference to the entire class, and in an instance method, `self` is a reference to the instance. This is used to access other methods that belong to the same context from within the current context.

**Class**: A `blueprint` describing the actions and properties of instances. Individual houses made from the same blueprint 


**Instance**: An individual, unique object created from a class of a specific type, sharing the structure of its properties and methods with other instances created from the same class.


**Method**: Behavior of an object defined by an input and output.

**Variable**: A property of an object

**Class Method**: A method which belongs to entire class instead of an individual object. Syntatically, class methods are defined `def self.method_name`. They are also identifiable because they are called on classes instead of instances. 

**Class Variable**: A property of an entire class rather than a single object. Class variables are identified with a `@@` before the variable name, e.g. `@@all = []`

## Assessment

**Learning Objective (LO) 1:**

```ruby
# Identify self in different scopes

class Human

    ###### SELF REFERENCE 1 (LO 1) #######
    puts self  # Human
    # Outside of any method within a class, self is a reference to the entire class
    # Note that this will be run before I call any methods in my code -> this will run when ruby evaluates the class; the same time my attr_accessor writes my readers and writers for me
    ################################

    ####### SELF REFERENCE 2 (LO 1, 3)########
    def self.new_from_hash(hash)
    # self within the definition of a method specifies that this method is to be a class method, not an instance method. 
    #################################

        ###### SELF REFERENCE 2 (LO 1)#######
        puts self  # Human
        # Inide of a class method, self is 
        ################################

        ##### SELF REFERENCE 3 (LO 1)##########
        self.new(hash[:name], hash[:age])
        # We have already identified that self is a reference to the class (Human) here. So, if I say `self.new` here, it is as if I said Human.new outside of the class. I could also here say Human.new instead. They will be exactly the same
        ##################################
    end

    
    attr_accessor :name, :age

    def initialize(name, age)
        @name, @age = name, age
        ##### SELF REFERENCE 4 (LO 1)##########
        puts self # An individaul human object
        # Initialize is an instance method, therefore here self is a reference to a particular instnace. 
        #########################################
    end

    def introduce
        ##### SELF REFERENCE 5 (LO 1, 2)##########
        puts "Hello, my name is #{self.name}, and I am #{self.age} years old"

        # Here, self is a reference to the objects. So, by calling self.name, I am calling the reader method #name for this specific object written by my attr_accessor. This will return the value of the instance variable @name I set in my intiailize method. This return will be unique for every instance.
        #############################################
    end

end

```

**Learning Objective 2:**

- Use `self` to access other methods in the same context. This could be calling other instance methods from within an instance method, or other class methods within a class method.

```ruby

class Dog

    def bark
        puts "Bark! Bark!"
    end

    def bark_a_lot

        ############## Calling instance methods with SELF #############
        self.bark
        self.bark
        self.bark
        # Here, I am calling self to reference another instance method I have written
        ###############################################################
    end
end

```

- When you see things being referenced that are NOT local variables, ruby is putting an implicit `self.` call in front of it to see if it exists within the `self` context. Let's identify some examples of this.


```ruby

class Human

    ####### IMPLICIT SELF CATCH 1 ############
    attr_accessor :name
    # What is this? There is no variable called attr_accessor. That can only mean that it is a method which is successfully running when self. is added in front of it. We have previously learned that self outside of any method in a class is a reference to the entire class, so we must come to the conclusion that attr_accessor is a class method available to all Classes in ruby. You can test this by writing self.attr_accessor :name and see if it works!
    ##########################################


    def initialize(name)
        @name = name
    end


    def introduce
        ####### IMPLICIT SELF CATCH 2 ############
        puts "Hello, I am #{name}"
        # Here, I see I am referencing name but have no local variable associated with it. 
        # When ruby can't find the local variable, it implicitly puts a self. in front of name. 
        # Now, ruby can find my #name reader method written by my attr_accessor.
        # If I had not defined a reader, this would return a NoMethodError.
        ###########################################
    end


    def introduce_and_ask_for_introduction
        ####### IMPLICIT SELF CATCH 2 ############
        introduce
        # Just like in the above example, introduce is not a local variable, so ruby instead looks to see if self.introduce is a method. 
        # Sine that is a method I defined, that is what is called here.
        # If I wanted to be more explicit, I could replace this line of code with self.introduce
        ##########################################
        puts "And you are...?"
    end


    def you_cant_confuse_me
        introduce = 3
        introduce 
        # There is NO implicit self put on the line above, because introduce IS a local variable
        # Therefore, the above line returns 3 and has no purpose. If I wanted to call the instance method #introduce, I would have to do it like the line below:
        self.introduce
        
    end

end

```


**Learning Objective 3:**

```ruby

class Human

    ######### DEFINE A CLASS VARIABLE ############
    @@count = 0
    # I define my class variables with @@ before the name AND I do so outside of any methods
    ##############################################

    ######### DEFINE A CLASS METHOD ############
    def self.count
    # I define a class method by prepending self. in front of the method name
    ##############################################
        @@count
    end

    def initialize
        ############ Reference a class method #############
        @@count += 1
        # As you can see, I can reference class variables from inside of instance methods
        ###################################################
    end

end


Human.new # Identify .new as a class method because it is called on the class Human
Human.count # identify .count as a class method because it is called on the class Human. Ouptuts 1
Human.new
Human.count # Ouptus 2

```


**Learning Objective 4:**

Is the thing I want to do specific to a single instance or ALL of the instances? 
If you have a problem to solve, who would you delegate it to if you were in charge of the universe? 

For example, if you wanted to keep track of all humans that exist, would you tell Zeus to do it (the Class) or your friend Johnny Hopkins from highschool (the instance)?
If you wanted someone to tell you their name, would you want to just be able to ask that specific person (the instance) or would you want to bring that person to Zeus (the class) to look up that one person in their list of all people then tell you their name?

The first problem supercedes the responsibility of an individual instance and should be delegated to the Class. The second problem is one that the instance should solve, because it is specific to them and Zeus doesn't have time that.

Class or instance method for Human?

- Creating a new person? (Class, eg .new)
- Walk a mile? (Instance)
- Keep track of the average height of all people (Class)
- Tell you their hopes and dreams (Instance)

## Learning Activities

Activity 1 (5 mins)
---
Use a class variable to allow a class to keep track of how many instances exist. Use any class you want. Make sure you make the proper methods to be able to access that variable. 
The class variable should be updated every time a new object is instantiated

Solution:

```ruby

class Human

    @@count = 0

    def self.count
        @@count
    end 

    def initialize(name)
        @name = name
        @@count += 1
    end

end

```


Activity 2 (5 mins)
---

Use a class method to customize the instantiation of a new object. Let's say the standard creation of a human accepts a name and age. Make a new method which allows you to create a baby, whose age should always be 0.

Solution:

```ruby

class Human


    def self.new_baby(name)
        self.new(name, 0)
    end


    def initialize(name, age)
        @name = name
        @age = age
    end

end

```

Activity 3 (10 mins)
---

Use class methods and variables to save all instances of objects instantiated by a class, and to make them findable by a certain instance variable.

Solution:

```ruby
    
class Human

    @@all = []

    def self.all
        @@all
    end

    def self.find_by_name(name)
        @@all.select{ |h| h.name == name }
    end

    def initialize(name, age)
        @name, @age = name, age
        @@all << self
    end



end



```



Activity 4 (20 mins) - Note: Unsure about this one. Maybe a better example is needed.
----

Return self from instance methods in an object so you can chain instance methods of that object.

Make a Traveller class which has a property of @travel_log. This should start as an empty string.

Make methods #travel_to(location) and #eat(food), both of which append a line of text to @travel_log.

If you did not return self from these methods, you would have to call the methods one at a time on their own lines.
If you do return self, you can chain these methods since that instance is returned from that method call.


Solution:

```ruby

class Traveller

    attr_accessor :name, :travel_log

    def initialize(name)
        @name = name
        @travel_log = ''
    end

    def travel(loc)
        @travel_log += "I travelled to #{loc}."
        self
    end

    def eat(food)
        @travel_log += "I ate #{food}."
        self
    end

end

# USE:

t = Traveller.new('Mr. Explorer')

t.travel('London').eat('Fish and Chips').travel('France').eat('cheese')
puts t.travel_log # I travelled to London.I ate Fish and Chips.I travelled to France.I ate cheese.

```



### Additional Resources:



https://docs.google.com/presentation/d/1q8aHtZuveTKJLZql6V4YRxbIwBreEcO6Ep-A5oK1UOA/edit?usp=sharing


https://github.com/micahshute/flatiron_cohort_lead_lessons/tree/master/intro_oop