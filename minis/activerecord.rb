class ActiveFaker
end

class ActiveFaker::Migration

    
    def create_table(table_name)
        query = QueryManager.new("CREATE TABLE #{table_name} (id INTEGER PRIMARY KEY")
        yield(query)
        query.complete_query
        puts query.current_query
    end

    def add_column(table_name, col_name, col_type)
        query = QueryManager.new("ALTER TABLE #{table_name} ADD COLUMN #{col_name} #{col_type.upcase};")
        puts query.current_query
    end

    class QueryManager

        attr_reader :current_query

        def initialize(query_prefix)
            @current_query = query_prefix
        end

        def string(col_name)
            add_to_query(col_name, "TEXT")
        end

        def integer(col_name)
            add_to_query(col_name, "INTEGER")
        end

        def boolean(col_name)
            add_to_query(col_name, "BOOLEAN")
        end

        def complete_query
            @current_query += ");"
        end

        private 

        def add_to_query(col_name, type)
            @current_query += ", #{col_name} #{type}"
        end
    end

end

# DB[:conn].execute()

class CreateUsers < ActiveFaker::Migration
    def change
      create_table :users do |t|
        t.string :username
        t.string :gender
        t.integer :age
        t.integer :height
        t.integer :weight
      end

      add_column :users, :iq, :integer
    end
  end




CreateUsers.new.change





class ActiveFaker::Base


    def self.belongs_to(type)
        define_method type do
            id = self.send("#{type}_id")
            Object.const_get(type.to_s.capitalize).all.find{ |o| o.id == id}
        end

        define_method("#{type}=") do |obj|
            self.send("#{type}_id=", obj.id)
        end
    end
end

class Todo < ActiveFaker::Base
    
    attr_accessor :user_id
    belongs_to :user

end

class User
    @@all = []
    
    attr_accessor :id, :name

    def self.all
        @@all
    end

    def self.create(id: , name: )
        u = new(id: id, name: name)
        @@all << u
        u
    end

    def initialize(id: , name: )
        @id, @name = id, name
    end
end



u = User.create(id: 1, name: "Micah")
t = Todo.new
puts t.user
t.user = u
puts t.user
puts t.user.name



class NextSteps

    def self.table_name
        self.to_s.downcase + "s"
    end

    def self.column_names
        DB[:conn].results_as_hash = true
       
        sql = "PRAGMA table_info('#{table_name}')"
       
        table_info = DB[:conn].execute(sql)
        column_names = []
       
        table_info.each do |column|
          column_names << column["name"]
        end
       
        column_names.compact
      end

      self.column_names.each do |col_name|
        attr_accessor col_name.to_sym
      end

      def initialize(options={})
        options.each do |property, value|
          self.send("#{property}=", value)
        end
      end

      def table_name_for_insert
        self.class.table_name
      end

      def col_names_for_insert
        self.class.column_names.delete_if {|col| col == "id"}.join(", ")
      end

      def values_for_insert
        values = []
        self.class.column_names.each do |col_name|
          values << "'#{send(col_name)}'" unless send(col_name).nil?
        end
        values.join(", ")
      end

      def save
        sql = "INSERT INTO #{table_name_for_insert} (#{col_names_for_insert}) VALUES (#{values_for_insert})"
       
        DB[:conn].execute(sql)
       
        @id = DB[:conn].execute("SELECT last_insert_rowid() FROM #{table_name_for_insert}")[0][0]
      end
    
      def self.find_by(opt)
        sql = "SELECT * FROM #{self.table_name} WHERE #{opt.keys.first} = '#{opt.values.first}'" 
        DB[:conn].execute(sql)
      end

end