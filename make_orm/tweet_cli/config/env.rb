require 'sqlite3'
require 'pry'

DB = {
  conn: SQLite3::Database.new('db/twitter.db')
}

DB[:conn].results_as_hash = true

require_relative '../lib/tweet.rb'
require_relative '../lib/tweet_app.rb'



