require 'spec_helper'

describe "pages/home" do
  it "should display a google map on the left" do
    render
    rendered.should have_selector('#map_left')
  end

  it "should display a google map on the right" do
    render
    rendered.should have_selector('#map_right')
  end
end
