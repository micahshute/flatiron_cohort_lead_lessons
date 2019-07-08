require 'faker'
require 'pry'




def binary_search(arr, item, offset = 0)
    return nil if arr.length == 0
    mid = arr.length / 2
    if item > arr[mid]
        return binary_search(arr[(mid+1)...arr.length], item, mid + 1 + offset)
    elsif item < arr[mid]
        return binary_search(arr[0...mid], item, offset)
    else
        return mid + offset if arr[mid] == item
    end
end

def linear_search(arr, item)
    arr.each.with_index {|it, i| return i if it == item}
    return nil
end

puts "Setting up..."
num_people = 327 * 10 ** 6
world_population = []
puts "Populating..."
r = Random.new
num_people.to_i.times.with_index { |i| world_population << i + 1}
puts "Sorting..."
# world_population << "Micah Shute"
# world_population.sort!
puts "Ready?"
gets
search_num = 1000 # 327 * 10 ** 6 - 1
puts "Starting Binary Search"
puts binary_search(world_population, search_num)
puts "Starting Linear Search"
puts linear_search(world_population, search_num)
puts "Starting Include"
puts world_population.include?(search_num)