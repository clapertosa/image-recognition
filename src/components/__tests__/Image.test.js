import React from "react";
import { shallow } from "enzyme";
import Image from "../Image/Image";

describe("Image component", () => {
  test("should render", () => {
    const wrapper = shallow(<Image />);
    expect(wrapper.exists()).toBe(true);
  });
});
