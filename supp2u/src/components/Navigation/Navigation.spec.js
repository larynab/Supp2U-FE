import React from 'react';
import ReactDOM from 'react-dom';
import { mount, configure, shallow, enzyme } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';

import Navigation from '../Navigation/Navigation'

import Home from './../Home';
import App from './../../App';

// jest.mock('firebase/app');

configure({ adapter: new Adapter() });


describe('Navigation Bar', () => {
    it('should render correctly', () => {
      const component = shallow(<Navigation />);
    
      expect(component).toMatchSnapshot();
    });
});

test('valid path should not redirect to 404', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <Navigation/>
    </MemoryRouter>
  );
  expect(wrapper.find(Navigation)).toHaveLength(1);
  
});

// it('render correctly text component', () => {  
//     const TextInputComponent = renderer.create(<Navigation />).toJSON();
//     expect(TextInputComponent).toMatchSnapshot();
// });