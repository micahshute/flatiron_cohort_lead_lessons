r = Random.new
arr = []
40000.times { arr << r.rand(40000) + 11 }
# Since the data is randomized, you can run multiple times to see how the runtimes change

class Checks
    def self.sqcount
        @@sqcount
    end

    def self.sqcount=(cnt)
        @@sqcount = cnt
    end

    def self.lincount
        @@lincount
    end

    def self.lincount=(cnt)
        @@lincount = cnt
    end

    def self.sqcount2
        @@sqcount2
    end

    def self.sqcount2=(cnt)
        @@sqcount2 = cnt
    end

    @@sqcount = 0
    @@lincount = 0
    @@sqcount2 = 0
end




def smallest_num_nsquared(a)
    # "Optimized"n^2. It runs each number against each other, but is
    # "optimized" because it will stop checking if it finds a number bigger than the 
    # number it is testing to be minimum. It will still always be slower than the O(n) 
    # algorithm though.

    for num in a 
        for innernum in a
            smallest = true
            Checks.sqcount += 1
            if num > innernum
                smallest = false
                break
            end
        end
        return num if smallest
    end
end


def smallest_num_n(a)
    # Always only checks once per item in the array
    smallest = Float::INFINITY
    for num in a
        Checks.lincount += 1
        smallest = num if num < smallest
    end
    return smallest
end


def smallest_n_squared_harder_to_tell(a)
    for num in a 
        Checks.sqcount2 += 1
        return num if a.select { |numcheck| Checks.sqcount2 += 1; numcheck < num }.length == 0
        # Note: this is even "worse" than the other n^2 because it doesn't stop checking if one too big
        # is found. It only looks for the one that ALL of them are smaller. 
        # This is still optimized in the sense that it returns once finding the lowest number
    end
end


puts "O(n squared)"
puts smallest_num_nsquared(arr)
puts "Count: #{Checks.sqcount}"
puts "O(n)"
puts smallest_num_n(arr)
puts "Count: #{Checks.lincount}"
puts "O(n squared), but harder to identify"
puts smallest_n_squared_harder_to_tell(arr)
puts "Count: #{Checks.sqcount2}"