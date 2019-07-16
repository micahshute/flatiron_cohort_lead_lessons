class Wand < ActiveRecord::Base


    def to_s
        "#{self.wood} wood, #{self.core} core, #{self.length} inches"
    end
end