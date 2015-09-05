require "spec_helper"

describe "pages/home" do
  xit "should display two google maps'" do
    render
    rendered.should have_selector(".map_canvas", count: 2)
  end
end
