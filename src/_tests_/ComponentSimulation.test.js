import "jest-enzyme";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CountryWiseApp from "../components/CountryWiseApp";


Enzyme.configure({ adapter: new Adapter() });

describe("CountryWiseApp", () => {
  it("should show text", () => {
    const wrapper = shallow(<CountryWiseApp />);
    const text = wrapper.find("div h2");
    expect(text.text()).toBe("Country-wise LIVE Tracker");
  });
});
