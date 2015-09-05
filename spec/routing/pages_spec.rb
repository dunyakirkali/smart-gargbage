require 'spec_helper'

RSpec.describe "routing to pages", type: :routing do
  it "routes / to pages#home" do
    expect(:get => "/").to route_to(
      :controller => "pages",
      :action => "home"
    )
  end

  it "routes /pages/home to pages#home" do
    expect(:get => "/pages/home").to route_to(
      :controller => "pages",
      :action => "home"
    )
  end
end
