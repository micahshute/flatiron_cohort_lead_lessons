require 'pry'
class MyHash

    def initialize()
        @arr = Array.new(100, nil)
        @hash_alg = ->(input, arr_size){
            prime_num = 7727
            hash = 0
            input.each_byte do |c|
                hash += (c + 123) ** 2 
            end
            output = hash % prime_num
            return output % arr_size
        }
    end

    def [](key)
        index = @hash_alg[key.to_s, @arr.length]
        @arr[index]
    end

    def []=(key, val)
        index = @hash_alg[key.to_s, @arr.length]
        @arr[index] = val
    end

end

binding.pry