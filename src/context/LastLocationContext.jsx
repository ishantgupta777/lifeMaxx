import React, { useContext, useState } from 'react';

const LastLocationContext = React.createContext();

export const LastLocationProvider = (props) => {
	const [ lastLocation, setLastLocation ] = useState('');
	return (
		<LastLocationContext.Provider value={[ lastLocation, setLastLocation ]}>
			{props.children}
		</LastLocationContext.Provider>
	);
};

export const useStateValue = () => useContext(LastLocationContext);
