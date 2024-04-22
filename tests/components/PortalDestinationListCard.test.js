import {cleanup, render, screen} from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import PortalDestinationListCard from '../../src/lib/PortalDestinationListCard.svelte';

describe('Portal card mounting tests', () => {
    const consoleMock = vi.spyOn(console, 'error').mockImplementation((e) => {console.log(e)});
    const mockFetch = vi.spyOn(window, 'fetch');

    afterEach(() => {
        console.log(consoleMock.mock.calls);
        cleanup();
        vi.clearAllMocks()
    });

    it('should be able to mount the component without any data', () => {
        const container = render(PortalDestinationListCard, {link: 'fake#link'});
        expect(container).toBeTruthy();
    });

    it('should print an error to the console if it cannot find the API', () => {
        render(PortalDestinationListCard, {link: 'fake#link'});
        expect(consoleMock).toHaveBeenCalled();
        expect(consoleMock).toHaveBeenCalledWith('Could not fetch API');
    });

    it('should print an error to the console if it cannot find the portal ID', async () => {
        mockFetch.mockResolvedValueOnce({json: async () =>  ({'sci1': {'content': 'all good'}})});
        render(PortalDestinationListCard, {link: 'science#fakeID'});
        
        expect(mockFetch).toHaveBeenCalled();

        expect(consoleMock).toHaveBeenCalled();
        // This is not finding the correct error?
        expect(consoleMock).toHaveBeenCalledWith('Could not find portal with ID fakeID, TypeError: Cannot read properties of undefined (reading \'content\')');

        console.log(mockFetch.mock.results);
    })
})