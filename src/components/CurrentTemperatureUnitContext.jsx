import React from 'react';

export const CurrentTemperatureUnitContext = React.createContext({
    currentTemperatureUnit: "",
    handleToggleSwitchChange: () => {}
});

// export default CurrentTemperatureUnitContext;