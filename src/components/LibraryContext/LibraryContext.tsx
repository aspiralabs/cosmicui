import React, { useContext } from 'react';

interface LibraryContextObject {}

const Context = React.createContext({} as LibraryContextObject);
export const useLibraryContext = () => useContext(Context);

const LibraryContext = ({ children }: { children: any }) => {
    const values = {};
    return <Context.Provider value={values}>{children}</Context.Provider>;
};

export default LibraryContext;
