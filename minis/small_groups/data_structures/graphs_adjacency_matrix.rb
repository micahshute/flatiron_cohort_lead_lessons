require 'pry'

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
  
  
  hideout = GNode.new("Secret Hideout")
  pool = GNode.new("Pool")
  beach = GNode.new("Beach")
  library = GNode.new("Library")
  mansion = GNode.new("Mansion")
  
  g = Graph.create_from_nodes([hideout, pool, beach, library, mansion])
  # Can connect with indices OR nodes
  g.connect(2,1) # Connects Beach with Pool
  puts g.connections_from(2).map(&:data) # Should output "Pool"
  puts g.connections_from(1).map(&:data) #Should output "Beach"
  
  g.connect(mansion, library) # Connects Mansion with Library
  g.connect(mansion, hideout)
  puts g.connections_to(library).map(&:data) # Should output "Mansion"
  puts g.connections_to(mansion).map(&:data).to_s # Should output ["Library", "Secret Hideout"]
  
  g.print_adj_mat
  
  g.remove_conn(mansion, library)
  puts g.connections_to(mansion).map(&:data).to_s # Should output ["Secret Hideout"]
  
  puts g.has_conn?(mansion, library) # Should output false
  puts g.has_conn?(mansion, hideout) # Should output true
  
  # Make a directional connection from hideout to library but not back
  g.connect_dir(library, hideout)
  puts g.can_traverse_dir?(hideout, library) # output false
  puts g.can_traverse_dir?(library, hideout) # output true
  
  # Add a new vertice
  bar = GNode.new("Bar")
  g.add_node(bar)
  
  puts g.nodes.to_s
  g.print_adj_mat
  puts 
  puts
  club = GNode.new("Club")
  g.add_node(club)
  g.connect(club, bar)
  g.connect(bar, pool)
  g.print_adj_mat


  binding.pry