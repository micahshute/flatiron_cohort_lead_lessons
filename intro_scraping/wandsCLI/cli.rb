
class CLI 

    def initialize
        @scraper = WandScraper.new
        @setup_thread = Thread.new{ @scraper.scrape }
        @factory = WandFactory.new
    end

    def run
        puts "\n\n\n\n\n\n\n\n\nWelcome to Ollivander's!"
        puts "\n\n"
        puts "The Wand chooses the Wizard, you know..."
        puts "\n\n"
        main_menu
        
    end

    def main_menu

        loop do
            puts "Do you want a wand?\n\n"
            res = gets.strip.downcase
            break if res == "no" || res == "exit"
            if res == "yes" || res == "y"
                get_wand
                break
            elsif res.match(/i would like \d+ wands please/)
                num = res.match(/\d+/).to_s.to_i
                puts "\n\n#{num} wands it is!\n"
                num.times do 
                    puts "\nWho is this one for?"
                    name = gets.strip
                    puts "\nHello #{name}! Here is your wand!"
                    get_wand
                end
                puts "\n\nThere are your #{num} wands! Thank you!\n\n"
                break
            else
                puts "I don't understand that \n\n"
            end
        end
        puts "\n\n\nGoodbye!"
    end


    def get_wand
        if !@setup_thread.status 
            wand = @factory.make_wand
            puts "\n\n#{wand}\n\n"
            puts "That is a very nice wand! Do you want to see more?\n\n"
            res = gets.strip.downcase
            if res == "yes" || res == "y"
                puts "\n\n"
                puts wand.description
                puts "\n\n"
                puts "Press enter to exit"
                i = gets
            end
        else
            puts "\n\nYour internet connection may be slow. Wait a few seconds and then click enter to try again\n\n"
            gets
            get_wand
        end
    end

end