
class Node 
    attr_accessor :data, :edges
    
    def initialize(data)
      @data = data 
      @edges = []
    end 
    
    def connections 
      self.edges.map do |edge|
        edge.other_node(self)
      end.compact
    end 
    
  end 
  
  
  class Edge 
    attr_accessor :node1, :node2
  
    def initialize(node1, node2)
      @node1, @node2 = node1, node2
      @node1.edges << self
      @node2.edges << self
    end
  
    def display_path
      puts "#{self.node1.data} connects to #{self.node2.data}"
    end
  
    def other_node(current_node)
      current_node == self.node1 ? self.node2 : current_node == self.node2 ? self.node1 : nil
    end
  end 
  
  
  
  n1 = Node.new("The Pool")
  n2 = Node.new("The Zoo")
  n3 = Node.new("The Cabana")
  
  e1 = Edge.new(n1, n2)
  e2 = Edge.new(n1, n3)
  e1.display_path
  
  puts n1.connections.map(&:data).to_s
  