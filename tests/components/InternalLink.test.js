import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import InternalLink from '../../src/lib/InternalLink.svelte'

describe('InternalLink component', () => {
    afterEach( ()=> cleanup() )

    it('should be able to mount the component', () => {
        const container = render(InternalLink);
        expect(container).toBeTruthy();
    });

    it('should be able to create a link with a base url', () => {
        render(InternalLink, {link: 'about'});
        const tag = screen.getByRole('link').outerHTML;
        expect(tag).toContain('href="/about"');
    });

    // Apparently, it is currently not possible to inject content into a slot through the component API, meaning I cannot test this directly.
    // if('should be able to receive any text in the slot', () => {
    //     render(InternalLink, {link: 'about'});
    // })

    it('should be able to receive a class and pass it on to the component', ()=> {
        render(InternalLink, {link: 'about', class: 'about-class'});
        const tag = screen.getByRole('link').outerHTML;
        expect(tag).toContain('class="about-class"');
    });

})