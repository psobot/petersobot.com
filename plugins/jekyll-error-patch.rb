module Jekyll
  module Convertible
    def do_layout(payload, layouts)
      info = { :filters => [Jekyll::Filters], :registers => { :site => self.site } }

      # render and transform content (this becomes the final content of the object)
      payload["pygments_prefix"] = converter.pygments_prefix
      payload["pygments_suffix"] = converter.pygments_suffix

      begin
        self.content = Liquid::Template.parse(self.content).render!(payload, info)
      rescue => e
        puts "Liquid Exception: #{e.message} in #{self.name}"
        e.backtrace.each do |backtrace|
          puts backtrace
        end
        abort("Build Failed")
      end

      self.transform

      # output keeps track of what will finally be written
      self.output = self.content

      # recursively render layouts
      layout = layouts[self.data["layout"]]
      used = Set.new([layout])

      while layout
        payload = payload.deep_merge({"content" => self.output, "page" => layout.data})

        begin
          self.output = Liquid::Template.parse(layout.content).render!(payload, info)
        rescue => e
          puts "Liquid Exception: #{e.message} in #{self.data["layout"]}"
          e.backtrace.each do |backtrace|
            puts backtrace
          end
          abort("Build Failed")
        end

        if layout = layouts[layout.data["layout"]]
          if used.include?(layout)
            layout = nil # avoid recursive chain
          else
            used << layout
          end
        end
      end
    end
  end
end
