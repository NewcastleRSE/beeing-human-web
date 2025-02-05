import { describe, expect, it, afterEach, vi } from "vitest";
import {render, cleanup, screen} from '@testing-library/svelte';

import InjectMD from '../../src/lib/InjectMD.svelte';

vi.hoisted(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        enumerable: true,
        value: vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // deprecated
            removeListener: vi.fn(), // deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

describe("InjectMD component", () => {
    afterEach(() => cleanup())

    it('should be able to mount the component', () => {
        const container = render(InjectMD, {content: ''});
        expect(container).toBeTruthy();
    });

    // Doesn't render onMount by default, so this would never work
    // it('should convert to html formatting, given a md string', () => {
    //     render(InjectMD, {content: 'This is the start. This **string** contains *markdown* syntax', layout:false});
    //     const par = screen.getByText('This is the start.', {exact: false}).innerHTML;
    //     expect(par).toContain('<em>');
    //     expect(par).toContain('</em>');
    //     expect(par).toContain('<strong>');
    //     expect(par).toContain('</strong>');
    //     screen.debug();
    // })
})