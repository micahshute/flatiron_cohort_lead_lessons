class WandScraper

    def initialize
        @base_url = "https://www.pottermore.com/writing-by-jk-rowling/wand-"
        @woods_url = @base_url + "woods"
        @cores_url =  @base_url + "cores"
    end

    def scrape
        # Harvest
        woods_page = open(@woods_url)
        woods_html = woods_page.read
        cores_page = open(@cores_url)
        cores_html = cores_page.read

        # Filter
        parsed_woods = Nokogiri::HTML(woods_html)
        parsed_cores = Nokogiri::HTML(cores_html)
        wood_types = parsed_woods.css(".jkr-writing-artefact__text h2").map(&:text)
        wood_descriptions = parsed_woods.css(".jkr-writing-artefact__text h2~p").map(&:text)
        core_types = parsed_cores.css(".jkr-writing-artefact__text h2").map(&:text)
        core_descriptions = parsed_cores.css(".jkr-writing-artefact__text h2~p").map(&:text)
        core_descriptions = core_descriptions.each.with_index.reduce([]){ |memo, (el, i)| i.even? ? memo << el : memo[memo.length - 1] += " #{el}"; memo}
        
        # Transform
        Wood.mass_assign_from_arrays(wood_types, wood_descriptions)
        Core.mass_assign_from_arrays(core_types, core_descriptions)      
    end

end