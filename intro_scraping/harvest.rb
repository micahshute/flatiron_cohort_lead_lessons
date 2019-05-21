require "open-uri"

base_url = "https://www.pottermore.com/writing-by-jk-rowling/wand-"
woods_url = base_url + "woods"
core_url =  base_url + "cores"
# open-uri allows you to "open" a webpage as if it were a file on your computer
page = open(woods_url)

puts page.class
puts page.content_type
# puts page.read
puts page.read.class


html_text = page.read

