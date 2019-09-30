# This is the solution
# To start, give them the code from graphs_adjacency_matrix.rb and have them implmement dfs
# Can give them starting nodes as a problem to solve (e.g. starting with this node, what is the closest node which has x)
# For starting, can use code @ bottom of this file
require 'set'
require "pry"
class Graph

    attr_reader :adj_mat, :nodes
  
    def self.create_from_nodes(nodes)
      self.new(nodes.length, nodes.length, nodes)
    end
  
    def initialize(row, col, nodes = nil)
      rows = Array.new(row, nil)
      @adj_mat = rows.map{ |n| Array.new(col, 0)}
      @nodes = nodes
      @nodes.each_with_index { |n, i| n.index = i}
    end

    def bfs(starting_node)
        queue = [starting_node]
        seen = Set.new
        while queue.length > 0
            cnode = queue.shift
            return cnode if yield(cnode)
            next_gen = self.connections_to(cnode)
            for n in next_gen
                if !seen.include?(n)
                    queue << n
                    seen.add(n)
                end
            end
        end
        return nil
    end
  
    # Conncects from node1 to node2
    # Note row is source, column is destination
    def connect_dir(node1, node2)
      node1, node2 = get_index_from_node(node1), get_index_from_node(node2)
      @adj_mat[node1][node2] = 1
    end
  
    def connect(node1, node2)
      self.connect_dir(node1, node2)
      self.connect_dir(node2, node1)
    end
  
    # Get node row, map non-zero items to their node
    # Select any non-zero elements, leaving you with an array of nodes
    # which are connections
    def connections_from(node)
      node = get_index_from_node(node)
      @adj_mat[node].map.with_index do |adj_el, col_num|
        adj_el != 0 ? @nodes[col_num] : nil
      end.select{ |el| el }
    end
  
    # Map matrix to column of node
    # Map any non-zero elements to the node at that row index
    # Select only non-zero elements
    # Note for a non-directed graph, you can use connections_to OR
    # connections_from
    def connections_to(node)
      node = get_index_from_node(node)
      @adj_mat.map {|row| row[node] }.map.with_index do|el, row_num| 
        el == 0 ? nil : @nodes[row_num]
      end.select{ |el| el  } 
    end
  
    def print_adj_mat
      @adj_mat.each do |row|
        puts row.to_s
      end
    end
  
    def node(index)
      @nodes[index]
    end
  
    def remove_conn(node1, node2)
      remove_conn_dir(node1, node2)
      remove_conn_dir(node2, node1)
    end
  
  
    def remove_conn_dir(node1, node2)
      node1, node2 = get_index_from_node(node1), get_index_from_node(node2)
      @adj_mat[node1][node2] = 0
    end
  
    # Can go from node 1 to node 2?
    def can_traverse_dir?(node1, node2)
      node1, node2 = get_index_from_node(node1), get_index_from_node(node2)
      @adj_mat[node1][node2] != 0
    end
  
    def has_conn?(node1, node2)
      can_traverse_dir?(node1, node2) || can_traverse_dir?(node2, node1)
    end
  
    def add_node(node)
      @nodes << node
      node.index = @nodes.length - 1
      @adj_mat.each do |row|
        row << 0
      end
      @adj_mat << Array.new(@adj_mat.length + 1, 0)
    end
  
    private 
  
    # Allows either node OR node indices to be passed into 
    def get_index_from_node(node)
      raise ArgumentError.new if (!node.is_a?(GNode) && !node.is_a?(Integer))
      return node.is_a?(Integer) ? node : node.index
    end
  
    
  
  end
  
  class GNode
    
    attr_accessor :data, :index
  
    def initialize(data, indexloc = nil)
      @data, @index = data, index
    end
  
  end
  

# Find the closest node with gold


coalarr = []
20.times do
coalarr << GNode.new("coal")
end
goldarr = []
3.times do 
goldarr << GNode.new("gold")
end

g = Graph.create_from_nodes(coalarr.concat(goldarr))

starting_node = coalarr.first
ending_node = goldarr.first

g.connect(0,1)
g.connect(0,2)
g.connect(0,3)
g.connect(20, 3)
g.connect(1,4)
g.connect(2,5)
g.connect(5,0)
g.connect(3,6)
g.connect(6,7)
g.connect(5,8)
g.connect(6,9)
g.connect(3,10)
g.connect(9,10)
g.connect(10,11)
g.connect(10,12)
g.connect(12,13)
g.connect(13,14)
g.connect(14,15)
g.connect(15,16)
g.connect(15,18)
g.connect(18,17)
g.connect(18,19)
g.connect(17,21)
g.connect(19,22)

binding.pry

