require 'pry'

class Node

    attr_accessor :next, :data

    def initialize(data)
        @data, @next = data, nil
    end

    def insert_after_self(node)
        node.next = self.next 
        self.next = node
    end

    def delete_next_node
        self.next = self.next.next
    end

end

class LinkedList

    def self.create_from_array(arr)
        list = LinkedList.new
        for i in (arr.length - 1).downto(0)
            list.insert(node: Node.new(arr[i]), index: 0)
        end
        list
    end

    def initialize(head = nil)
        @head = head
    end

    def node_at(index)
        node = @head
        index.times{ node = node.next }
        node
    end

    def insert(node: , index: )
        if index == 0
            node.next = @head
            @head = node
        else
            curr_node = node_at(index - 1)
            curr_node.insert_after_self(node)
        end
        
    end

    def delete(index)
        if index == 0
            @head = @head.next 
        else
            curr_node = node_at(index - 1)
            curr_node.delete_next_node
        end
    end

    def print_list
        node = @head
        print "#{node.data}"
        node = node.next
        while node
            print " -> #{node.data}"
            node = node.next
        end
        puts
    end

end


arr = [1,2,3,4,5,6,7,8,9,10]
list = LinkedList.create_from_array(arr)
list.print_list

list.insert(node: Node.new(11), index: 10)
list.insert(node: Node.new(3.5), index: 3)
list.print_list
list.delete(3)
list.print_list

binding.pry