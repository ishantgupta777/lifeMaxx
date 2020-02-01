import React, { useContext, useState } from 'react';

const LastCoordsContext = React.createContext();

export const LastCoordsProvider = (props) => {
	const [ lastCoords, setLastCoords ] = useState(null);
	return (
		<LastCoordsContext.Provider value={[ lastCoords, setLastCoords ]}>{props.children}</LastCoordsContext.Provider>
	);
};

export const useCoords = () => useContext(LastCoordsContext);
