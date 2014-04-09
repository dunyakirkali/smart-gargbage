require 'spec_helper'

describe "pages/home" do
  it "displays a google maps" do
    render
    rendered.should have_selector("#map")
  end
end