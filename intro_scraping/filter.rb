require 'open-uri'
require 'nokogiri'

############ HARVEST ################

base_url = "https://www.pottermore.com/writing-by-jk-rowling/wand-"
woods_url = base_url + "woods"
cores_url =  base_url + "cores"

woods_page = open(woods_url)
woods_html = woods_page.read

cores_page = open(cores_url)
cores_html = cores_page.read

############# FILTER #################

parsed_woods = Nokogiri::HTML(woods_html)
parsed_cores = Nokogiri::HTML(cores_html)

# puts parsed_woods.class 

### Look at webpage -> what info do we want?




wood_types = parsed_woods.css(".jkr-writing-artefact__text h2").map(&:text)
wood_descriptions = parsed_woods.css(".jkr-writing-artefact__text h2+p").map(&:text)

puts wood_types.to_s
puts wood_types.length
puts wood_descriptions.length

puts wood_types[21]
puts wood_descriptions[21]

core_types = parsed_cores.css(".jkr-writing-artefact__text h2").map(&:text)
core_descriptions = parsed_cores.css(".jkr-writing-artefact__text h2~p").map(&:text)

puts core_types.length
puts core_descriptions.length


core_descriptions = core_descriptions.each.with_index.reduce([]){ |memo, (el, i)| i.even? ? memo << el : memo[memo.length - 1] += " #{el}"; memo}




# puts core_descriptions.length
# puts core_descriptions

## A more readable procedure: 

new_des = []
core_descriptions.each_with_index do |des, i|
    if i.even? 
        new_des << des
    else
        new_des[new_des.length - 1] += " #{des}"
    end
end
puts new_des.length
puts new_des


### Filtering Complete ###


# Note: Less elegant alternative (not as good @ CSS selectors)

# wood_types = parsed_woods.css("h2").map(&:text)
# puts wood_types.to_s
# wood_types = wood_types[1, wood_types.length - 2]

# # # OR (slightly less elegantly)

# wood_types[0] = nil
# wood_types[-1] = nil
# wood_types = wood_types.compact
# puts wood_types.to_s

# ## OR

# wood_types.pop
# wood_types.shift
# puts wood_types