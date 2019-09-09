class Node

    attr_accessor :next

    def initialize(data)
        @data, @next = data, nil
    end

end

class LinkedList

    def initialize(head)
        @head = head
    end

end