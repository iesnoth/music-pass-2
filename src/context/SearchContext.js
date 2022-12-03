import { createContext } from "react";

//We will store the search term for which we want to search,
//replacing our need for the search term state property,
//and we will store the function that handles our search within this context as well.
export const SearchContext = createContext({
    term:'',
    handleSearch: () => {}
})