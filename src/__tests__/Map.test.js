import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import Map from '../components/Map';

function setup() {
    const props = {
        //TODO: props
    };

    return shallow(<Map {...props}/>);
}

describe("Map should", () => {

    it("render without crashing", () => {
        const wrapper = setup();
        expect(wrapper.find("div").length).toBe(1);
    });

});