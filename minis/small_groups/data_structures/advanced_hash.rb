require 'pry'
require 'prime'
class MDHash


    def initialize(default_val=nil)
        @arr = Array.new(2, default_val)
        @hashvals = []
        @filled_vals = 0
        @prime_gen = Prime::EratosthenesGenerator.new
    end
   

    def [](k)
        h = index(k)
        @arr[h] 
    end

    def []=(k, v)
        resize if resize?
        h = hash(k) % @arr.length
        if @arr[h] == @default_val
            @filled_vals += 1 
            @hashvals << k
        end
        @arr[h] = v
    end

    def print_report
        puts "Current array length: #{@arr.length}"
        indices_used = @arr.map.with_index{|a,i| i if a != @default_val}.compact
        puts "Array indices used: #{indices_used}"
        puts "Filled vals: #{@filled_vals}"
        puts "Collisions: #{@filled_vals - indices_used.length}"
        puts "Keys used: #{@hashvals}"
    end 


    def to_s
        "{" + @hashvals.map do |h| 
            v = self.[](h)
            prefix = ["", ""]
            postscript = ["", ""]
            if h.is_a?(String)
                prefix[0] = '"'
                postscript[0] = '"'
            elsif h.is_a?(Symbol)
                prefix[0] = ":"
                postscript[0] = ""
            end
            if v.is_a?(String)
                prefix[1] = '"'
                postscript[1] = '"'
            elsif v.is_a?(Symbol)
                prefix[1] = ":"
                postscript[1] = ""
            end
            "#{prefix[0]}#{h}#{postscript[0]} => #{prefix[1]}#{v}#{postscript[1]}"
        end.join(", ") + "}"
    end
  

    # private 

    def resize
        while (p = @prime_gen.next) < (10 * @filled_vals) 
        end
        puts "resizing to #{p}"
        kv_pairs = @hashvals.map{|h| [h, self.[](h)]}
        @arr = Array.new(p, @default_val)
        @hashvals = []
        @filled_vals = 0
        kv_pairs.each do |kvp|
            self.[]=(kvp[0], kvp[1])
        end
    end


    def resize?
        @filled_vals >= resize_val       
    end

    def resize_val
        (@arr.length * 0.7).floor
    end
     
    def index(key)
        hash(key) % @arr.length
    end

    def hash(key)
        val = to_num_naive(key)
    end

    def to_num_naive(key)
        case 
        when key.is_a?(Integer)
            return int2val_strat(key)
        when key.is_a?(String)
            return str2val_strat(key)
        when key.is_a?(Symbol)
            return -1 * (str2val_strat(key.to_s) + 1)
        else 
            return obj2val_strat(key)
        end
    end

    def int2val_strat(i)
        i
    end

    def str2val_strat(s)
        s.each_byte.reduce(""){|mem, b| mem + b.to_s}.to_i
    end

    def obj2val_strat(o)
        o.object_id
    end



end



binding.pry