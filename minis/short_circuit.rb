## Setup 

class Dog

    def initialize(name)
        @name = name
    end

    def name
        return @name
    end

end


r = Random.new()

## Code snippet 1: What errors are you getting? Why? What is it telling you?

        # my_dog = nil
        # name = my_dog.name
        # puts name

## Code snippet 2: How do you stop getting this error? (Basic)
## Let's say we don't know if my_dog will be nil or an object. 
## If it is an object, we want to print its name, if not, we don't want
## to get an error


        # my_dog = r.rand(2) == 0 ? nil : Dog.new("fluffy") # this just gives a 50/50 chance of getting  an instanc or nil
        # if my_dog 
        #     puts my_dog.name
        # else
        #     puts "my_dog was nil"
        # end

## Why does this work? See if you can come up with other ways to do the same thing




## Code snippet 3: Let's take a short sidetrack and look at short circuiting. What is that?
## First let's look at what the return values are from these operators

## An && requires both sides to be truthy for it to return a truthy value
## Example:

        # def test_and_op(first, second)
        #     if first && second
        #         puts "evaluated to true"
        #         return first && second
        #     else
        #         puts "evaluated to false"
        #         return first && second
        #     end
        # end

        # def test_or_op(first, second)
        #     if first || second
        #         puts "evaluated to true"
        #         return first || second
        #     else
        #         puts "evaluated to false"
        #         return first || second
        #     end
        # end


## These methods above tell us if the operation evaluates to truthy or falsey
## in an if, but also return the operators return value. Let's test:

        # truthy = "hello world"
        # falsey = nil

        # puts test_and_op(falsey, truthy)
        # puts test_and_op(truthy, "i like turtles")
        # puts test_or_op(truthy, falsey)
        # puts test_or_op(truthy, "i like turtles")
        # puts test_or_op(falsey, falsey)

## So, you can see that the boolean operators not only can be used in if statements, but they also
## return one of the original inputs, NOT as a boolean. For 2 truthy inputs, the && operator
## returned the SECOND truthy value ('i like turtles'), while the || operator for 2 truthy inputs
## returned the first truthy input ('hello world'). Why is this? Let's investigate something called 
## "short circuiting" now


## Since an && operator only returns a truthy value if both the lefthand side and the righthandside are 
## truthy, if the first item (the lefthand side) is false, Ruby knows for a fact it is impossible for the &&
## to return true, so it doesn't even bother looking at the righthand side. 

## In the same way, an || operator only returns FALSEY if BOTH the lefthand side and the righthand side are
## falsey. So, if the lefthand side is truthy, it knows that the overall return cannot be falsey and must be
## truthy, and therefore it does not even check the righthand side expression. This is called SHORT CIRCUITING 

## This also explains why we saw different returns when both items were truthy. For the &&, the righthand side
## ('i like turtles') was the overall return value because since the lefthand side was true, the righthand side had 
## to be evaluated to see what the final return would be. Conversely, the || operator saw that the lefthand side ('hello world') was 
## truthy, and didn't even bother checking the righthand side because at that point the || operator had its truthiness satisfied and knew
## it couldn't return a falsey value. So, it "short circuited", didn't even check the righthand side, and just returned the
## lefthand side truthy value "hello world".

## We can take advantage of the 2 facts: 
## 1) Short circuiting causes some things not to be evaluated based off of the truthiness or falsiness of another expression
## 2) These boolean expressions do not just return true or false, they return the LAST truthy value OR the LAST falsey value they
## evalutate, and the last truthy/falsey value they evaluate is governed by their specific laws of short circuiting. 
## (Read that a few times to let it sink in, mess around with some code in repl to figure it out)

## So, how can we practically use these facts? Let's say we want to call #.name on a local variable that MAY be an object but
## also MAY be nil. Let's look below to see how we can use short circuting via the && operator to set the local variable 
## `name` equal to either `nil` or the name of the object WITHOUT causing an error. 
## Note that although our my_dog variable is randomly set to a new object or to nil, this code runs without error every time

my_dog = r.rand(2) == 0 ? nil : Dog.new("fluffy")
name = my_dog && my_dog.name
puts my_dog && my_dog.name

## So, if my_dog is nil, the && operator short-circuits and never evaluates my_dog.name, thereby never causing an error 
## (which would be the error we saw in code snippet 1)
## If my_dog is not nil, the && operator will evaluate the righthand side and return the dog's name (the last truthy value evaluated), which
## will be set to our local variable `name`. 

## Try it out on your own! Try to make use of short circuiting with ||, which also has some cool uses!