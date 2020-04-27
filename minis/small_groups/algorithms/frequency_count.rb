r = Random.new

testarr = []

10000.times { testarr << r.rand(100)}


def freq_n_sq(testarr)
    fhash = {}
    testarr.each do |num|
        count = 0
        testarr.each do |n2|
            count += 1 if num == n2
        end
        fhash[num] = count
    end
    fhash
end

def freq_n(testarr)
    f_hash = {}
    testarr.each do |num|
        f_hash[num] ||= 0
        f_hash[num] += 1
    end
    f_hash
end

def freq_n_fun(testarr)
    testarr.each_with_object({}){ |el, mem| mem[el] ||= 0; mem[el] += 1}
end


puts "O(n^2)"
h1 = freq_n_sq(testarr)
puts "O(n)"
h2 = freq_n(testarr)
puts "O(n) again!"
h3 = freq_n_fun(testarr)
puts h1 == h2 && h1 == h3