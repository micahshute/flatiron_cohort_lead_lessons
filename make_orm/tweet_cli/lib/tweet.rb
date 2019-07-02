class Tweet

    def self.count
        sql = <<-SQL
            SELECT count(*) FROM tweets;
        SQL
        data = DB[:conn].execute(sql)
        return data.first.values.first
    end

    def self.all
        sql = <<-SQL
            SELECT * FROM tweets;
        SQL

        return self.map_from_db(DB[:conn].execute(sql))
    end

    def self.delete_by_id(id)
        sql = <<-SQL
            DELETE FROM tweets WHERE id = ?;
        SQL
        DB[:conn].execute(sql, id)
    end

    def self.find_by_id(id)
        sql = <<-SQL
            SELECT * FROM tweets WHERE id = ?;
        SQL

        return self.map_from_db(DB[:conn].execute(sql, id).first)
    end 
    
    def self.find_by_username(username)
        # NOTE: This lookup is CASE INSENSITIVE
        sql = <<-SQL
            SELECT * FROM tweets
            WHERE lower(username) = ?;
        SQL
        return self.map_from_db(DB[:conn].execute(sql, username.downcase))
    end

    def self.find_by_content(content)
        sql = <<-SQL
            SELECT * FROM tweets
            WHERE lower(message) like ?
        SQL
        return self.map_from_db(DB[:conn].execute(sql, "%#{content.downcase}%"))
    end

    def self.map_from_db(data)
        if data.is_a?(Array)
            return data.map{ |d| self.new_from_db(d) }
        elsif data.is_a?(Hash)
            return self.new_from_db(data)
        else
            raise ArgumentError.new("Unexpected datatype")
        end
    end 

    def self.new_from_db(data)
        self.new(self.xform_data(data))
    end

    def self.xform_data(data)
        return data.each_with_object({}){ |(k,v), memo| memo[k.to_sym] = v }
    end

    attr_accessor :username, :message
    attr_reader :id # <-- Encapsulation
    def initialize(username: , message: , id: nil)
        @username, @message, @id = username, message, id
    end

    def save
        if self.saved?
            sql = <<-SQL
                UPDATE tweets
                SET username = ?, message = ?
                WHERE id = ?;
            SQL
            DB[:conn].execute(sql, self.username, self.message, self.id)
        else
            sql = <<-SQL
                INSERT INTO tweets (username, message)
                VALUES (?, ?);
            SQL
            
            DB[:conn].execute(sql, self.username, self.message)
            @id = DB[:conn].last_insert_row_id
        end

    end

    def saved?
        !self.id.nil?
    end

end