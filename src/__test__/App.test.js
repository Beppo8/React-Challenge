import React from 'react'
import { mount, shallow } from 'enzyme';
import { create } from 'react-test-render'
import CursosMock from '../__mocks__/CursosMock';
import App from '../App';

describe('App.js', () => {
    test('Render de el div App', () => {
        const app = mount(
            <App />
        );
        expect(app.find("App"));
    });
    test('Render de el Titulo', () => {
        const app = mount(
            <App />
        );
        expect(app.find(".Header-title").text()).toEqual('Cursos EdTeam');
    });
    test('Comprobar el boton de CrearCurso', () => {
        const handleChange = jest.fn();
        const wrapper = mount(
            <App 
                cursos={CursosMock}
                handleChange={handleChange}
            />
        );
        wrapper.find('button').simulate('click');
        expect(handleChange).toHaveBeenCalledTimes(1)
    });
    
})