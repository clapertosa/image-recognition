import React from "react";
import { mount, shallow } from "enzyme";
import Caption from "../Caption/Caption";

describe("Caption component", () => {
  test("should render if type === 'describe'", () => {
    const data = { BestOutcome: { description: "A bench in the wood" } };
    const wrapper = shallow(<Caption type="describe" data={data} />);
    expect(wrapper.find("div").exists()).toBe(true);
  });

  test("should render if type === 'objects'", () => {
    const data = { ObjectCount: 12 };
    const wrapper = shallow(<Caption type="objects" data={data} />);
    expect(wrapper.find("div").exists()).toBe(true);
  });

  test("should render if type === 'faces'", () => {
    const data = { FaceCount: 12 };
    const wrapper = shallow(<Caption type="faces" data={data} />);
    expect(wrapper.find("div").exists()).toBe(true);
  });

  test("should render if type === 'nsfw'", () => {
    const data = { Score: 0.1 };
    const wrapper = shallow(<Caption type="nsfw" data={data} />);
    expect(wrapper.find("div").exists()).toBe(true);
  });

  test("should not fail if no type nor data is provided", () => {
    const wrapper = shallow(<Caption />);
    expect(wrapper.find("div").exists()).toBe(true);
  });
});
