import { describe, expect, it, afterEach } from "vitest";
import {render, cleanup, screen} from '@testing-library/svelte';

import InjectMD from '../../src/lib/InjectMD.svelte';

describe("InjectMD component", () => {
    afterEach(() => cleanup())

    it('should be able to mount the component', () => {
        const container = render(InjectMD);
        expect(container).toBeTruthy();
    });

    it('should create a progress radial if no the prop is undefined', () => {
        render(InjectMD);
        expect(() => screen.getByTestId('progress-radial')).not.toThrow();
    });

    it('should not create a progress radial if a md string exists', () => {
        render(InjectMD, {content: "This is a string"});
        expect( ()=> screen.getByTestId('progress-radial')).toThrow();
    });
    
    it('should convert to html formatting, given a md string', () => {
        render(InjectMD, {content: 'This is the start. This **string** contains *markdown* syntax'});
        const par = screen.getByText('This is the start.', {exact: false}).innerHTML;
        expect(par).toContain('<em>');
        expect(par).toContain('</em>');
        expect(par).toContain('<strong>');
        expect(par).toContain('</strong>');
    })
})