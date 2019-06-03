##### Arrays

### Essentials
## Arrays store multiple piece of data (usually of the same data type) 
## in an ordered list. This allows you to access elements by the order they are in 
## as well as iterate or loop over every item and perform a task on all of them.

## Uses
## It is good to use arrays when you want to keep a list of similar items, 
# and you especially want to make sure you are using an array if you care about their order


## Access an array by index

shopping_list = ["steak", "potatoes", "cereal", "milk", "beer"]

# get first item in your list
shopping_list[0] # => "steak"
# OR
shopping_list.first #=> "steak"

# Get last item in your list
shopping_list[shopping_list.length - 1] # => "beer"
#OR 
shopping_list[-1] # => "beer"
## OR 
shopping_list.last # => "beer"


# get the 3rd item in the list (which is index 2 b/c indices start at 0!!)
shopping_list[2] # => "cereal"

## Push items onto the end of the list

# we can use the shovel operator OR the `#push` method to do this. Let's say 
# our significant other always adds `"broccoli"` to the shopping list to try to 
# get us to eat our vegetables. 

shopping_list << "broccoli"

# OR 
# shopping_list.push("broccoli")


## Access all array items via index using a loop
## Here, we are making variable `i` whcih starts at 0 and
## will increment by one each loop. Once i is greater than the last index (ie equal to shopping_list.length)
## the while loop will terminante

i = 0
while i < shopping_list.length
    puts shopping_list[i]
    i += 1
end

# OR we can use a for loop which does the incrementation for us by giving us
## each number in the range and setting it equal to i at the top of each iteration through the loop.

for i in 0...shopping_list.length
    puts shopping_list[i]
end

## Access array items via iterators

# We can also use ruby iterators to access each item one at a time.
# Each is used when we don't want to change anything about the array, but 
# instead want to perform an action on it. For example, `puts`ing it out

shopping_list.each do |item|
    puts item
end

## Map (or collect, which is the same thing) will return a new array of the same
## lenght of our original array, whose elements are defined by whatever the return of 
## our block is (determined by the last line in the block). We use map to transform our
## original array, and we always want to make sure we capture the output of it.

uppercased_list = shopping_list.map do |item|
    item.upcase
end

puts uppercased_list # => ["STEAK", "POTATOES", "CEREAL", "MILK", "BEER", "BROCCOLI"]

## Change an array item at an index
## We can change an array item at a specific index if we know it's location.

# If we know that our significant other always puts "broccoli" at the end of our 
# shopping list but we want to trick them into not getting it when they go shopping, we 
# can change the list:

puts shopping_list # => ["steak", "potatoes", "cereal", "milk", "beer", "broccoli"]

shopping_list[shopping_list.length - 1] = "wine"

puts shopping_list # => ["steak", "potatoes", "cereal", "milk", "beer", "wine"]

# You can alter any item in the list this way. So they can get their revenge:

shopping_list[3] = "broccoli"

puts shopping_list.to_s # => ["steak", "potatoes", "cereal", "broccoli", "beer", "wine"]

# Join
## If we want our shopping list as one big string, we can "join" our array together with
## characters of our choice. Let's put commas in between everything


str_list = shopping_list.join(", ")
puts str_list # => steak, potatoes, cereal, broccoli, beer, wine

# We can make the joining characters anything we want!
str_list = shopping_list.join("||-*-||") 
puts str_list # => steak||-*-||potatoes||-*-||cereal||-*-||broccoli||-*-||beer||-*-||wine

# Insert

# Slice
## we can slice a list by using square brackets and specifying the starting index we want plus how many 
## elements long we want our slice to be. If we want items 3,4, and 5 we can say:

puts shopping_list # => ["steak", "potatoes", "cereal", "broccoli", "beer", "wine"]
sliced_arr = shopping_list[2,3]
puts sliced_arr # => ["cereal", "broccoli", "beer"]

# Remove
# Destructively remove the last element using `pop`
last_item = shopping_list.pop
puts last_item # => "wine"
puts shopping_list # No longer has "wine"


## Further reading
# There is a lot more you can do with arrays. Check out the ruby docs for arrays to see everything!

### Deep Cuts:

### So what's the downside of using arrays? Well, finding things in arrays can be tough. If you have an array with 
### a LOT of elements, then you have to look through EACH ONE to find something! This is an O(n) process (ie it will take
### a time that is linearlly proportional to the lenght of the array). If you sort your array, you can do something called 
### `binary search` that makes findng something in an array faster, specifically in O(lg(n)) time. (ie proportional to log base 2 of the 
## length of the array). To do this, you have to sort the array first, which is O(n*lg(n)), which is not necessarily fast. Also, if you change the array
## you either have to make sure 


## Uses

## What are they good/bad at?

## #reduce

## #with_object

## 

##### Hashes

### Essentials

## Access via a key

## Check if a key exists in the hash

### Deep Cuts

## Why hashes?

## What are they good/bad at?

## How do hashes work? 

## 

## Sets?

