import { useContext } from "react";

const CurrentTemperatureUnitContext = useContext({
    currentTemperateUnit: "",
    handleToggleSwitchChange: () => {},
  });

  export default CurrentTemperatureUnitContext;