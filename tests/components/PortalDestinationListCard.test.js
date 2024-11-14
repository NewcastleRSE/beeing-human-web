import {cleanup, render, screen} from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi} from 'vitest';

import PortalDestinationListCard from '$lib/PortalDestinationListCard.svelte';

describe('Portal card mounting tests', () => {
    const consoleMock = vi.spyOn(console, 'error').mockImplementation((e) => {console.log(e)});
    // const consoleMock = vi.spyOn(console, 'error').mockImplementation(() => {});
    const mockFetch = vi.spyOn(window, 'fetch');

    afterEach(() => {
        cleanup();
        vi.clearAllMocks()
    });

    it('should be able to mount the component without any data', () => {
        const container = render(PortalDestinationListCard, {link: 'fake#link'});
        expect(container).toBeTruthy();
    });

    it('should print an error to the console if it cannot find the API', async () => {
        render(PortalDestinationListCard, {link: 'fake/article#fakeId'});
        
        // Awaiting for the mock fetch to resolve, necessary to catch the error
        await screen.findByText('Could not fetch preview');

        expect(consoleMock).toHaveBeenCalled();
        // expect(consoleMock).toHaveBeenCalledWith('Could not fetch API');

    });

    it('should print an error to the console if it cannot find the portal ID', async () => {
        mockFetch.mockResolvedValueOnce({json: () => ({'sci1': {'content': 'all good'}})});
        render(PortalDestinationListCard, {link: 'fake/article#fakeID'});

        // Awaiting for the mock fetch to resolve, necessary to catch the error
        await screen.findByText('Could not fetch preview');
        
        expect(mockFetch).toHaveBeenCalled();
        expect(consoleMock).toHaveBeenCalled();
        
        expect(consoleMock).toHaveBeenCalledWith('Could not find portal with ID fakeID, TypeError: Cannot read properties of undefined (reading \'content\')');

    });

    it('should display an error on the UX if something failed in fetching a preview', async () => {
        render(PortalDestinationListCard, {link: 'fakeRoute#fakeID'});

        const errorText = await screen.findAllByText('Could not fetch preview');

        expect(mockFetch).toHaveBeenCalledOnce();
        expect(consoleMock).toHaveBeenCalledTimes(3);
        expect(errorText).toBeTruthy();
    });

    it('should display the content of the Portal preview correctly if everything went well', async () => {
        mockFetch.mockResolvedValueOnce({json: () => ({'testID': {'content': 'This is test content for a portal'}})});

        render(PortalDestinationListCard, {link: 'testRoute/testArticle#testID'});

        expect(mockFetch).toHaveBeenCalledOnce();

        const displayPreview = await screen.findByText('This is test content for a portal');

        expect(displayPreview).toBeTruthy();
    });

    it('should correctly display the card header', async () => {
        mockFetch.mockResolvedValueOnce({json: () => ({'testID': {'content': 'This is test content for a portal'}})});

        render(PortalDestinationListCard, {link: 'testRoute/testArticle#testID'});

        expect(mockFetch).toHaveBeenCalledOnce();

        await screen.findByText('This is test content for a portal');

        const cardHeader = await screen.findByTestId('card-header');

        expect(cardHeader.innerHTML).toEqual('Testroute');
    });

    it('should display the card header correctly if the route is for a buzzword', async () => {
        mockFetch.mockResolvedValueOnce({json: () => ({'testID': {'content': 'This is test content for a portal', 'id': 'header title'}})});

        render(PortalDestinationListCard, {link: 'connections/buzzwords-feed#testID'});

        expect(mockFetch).toHaveBeenCalledOnce();

        await screen.findByText('This is test content for a portal');

        const cardHeader = await screen.findByTestId('card-header');

        expect(cardHeader.innerHTML).toEqual('Buzzwords -- header title');
    });

    it('should not have a link if there is an error', async () => {
        render(PortalDestinationListCard, {link: 'connections/buzzwords-feed#testID'});

        expect(mockFetch).toHaveBeenCalledOnce();

        await screen.findByText('Could not fetch preview');

        expect(consoleMock).toHaveBeenCalledTimes(2);

        const errorLink = await screen.findByTestId('no-link');

        expect(errorLink).toBeTruthy();
    });

    it('should have a link to the correct location if everything was successful', async () => {
        mockFetch.mockResolvedValueOnce({json: () => ({'testID': {'content': 'This is test content for a portal', 'id': 'header title'}})});

        render(PortalDestinationListCard, {link: 'testRoute/testArticle#testID'});

        expect(mockFetch).toHaveBeenCalledOnce();

        await screen.findByText('This is test content for a portal');

        const link = await screen.findByText('⮕');
        
        expect(link.getAttribute('href')).toEqual('/testroute/testarticle#testID')
    });

    it('should have a link to the correct location if everything was successful and it is a buzzword', async () => {
        mockFetch.mockResolvedValueOnce({json: () => ({'testID': {'content': 'This is test content for a portal', 'id': 'header title'}})});

        render(PortalDestinationListCard, {link: 'connections/buzzwords-feed#testID'});

        expect(mockFetch).toHaveBeenCalledOnce();

        await screen.findByText('This is test content for a portal');

        const link = await screen.findByText('⮕');
        
        expect(link.getAttribute('href')).toEqual('/connections/buzzwords-feed#testID')
    });
})