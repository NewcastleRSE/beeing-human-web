<script>
    import {createEventDispatcher} from 'svelte';
    import { splitStringIntoArray } from '../utils/stringOperations';

    const dispatch = createEventDispatcher();

    function searchGo(event) {
        const searchString = event.target.firstElementChild.value;
        const searchTerms = splitStringIntoArray(searchString);
        if (searchString.length === 0) {
            dispatch('reset');
        } else {
            dispatch('search', {
                searchString: searchString,
                searchTerms: searchTerms
            });
        }
    }

</script>

<h4>Search</h4>
<form on:submit={searchGo} id="submit-form">
    <input class="input max-w-sm p-2" type="search" name="searchBar" placeholder="Search..." id='search-bar'/>
    <button type="submit" class="btn variant-filled">Go</button>
</form>