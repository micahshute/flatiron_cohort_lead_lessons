require "open-uri"

### HARVEST ###

base_url = "https://www.pottermore.com/writing-by-jk-rowling/wand-"
woods_url = base_url + "woods"
# core_url =  base_url + "cores"


# open-uri allows you to "open" a webpage as if it were a file on your computer
# This will perform the HTTP GET request and return the HTML response to you

page = open(woods_url)

# puts page.class
# puts page.content_type
# puts page.read
puts page.read


html_text = page.read

### HARVESTING COMPLETE ###