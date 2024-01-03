import {
  FILTER,
  GET_ALL_DRIVERS,
  GET_DRIVER_DETAIL,
  GET_TEAMS,
  SEARCH_DRIVER,
  RESET,
  CLEAN_DETAIL,
  ORDER,
} from '../action/types';


let initialState = {
  drivers: [],
  driver: {},
  allTeams: [],
  driversFiltered: [],
  driversOrdered: [],
};

//function reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DRIVERS:
      return {
        ...state,
        drivers: action.payload,
        driversFiltered: action.payload,
        driversOrdered: action.payload,
      };
    case SEARCH_DRIVER:
      return {
        ...state,
        drivers: [...action.payload],
      };
    case GET_TEAMS:
      return {
        ...state,
        allTeams: action.payload,
      };
    case ORDER:
      switch (action.payload) {
        case "none":
          const idOrder = [...state.driversOrdered].sort((a, b) => a.id - b.id);
          return {
            ...state,
            drivers: idOrder,
          };
        case "ascendant":
          const ascendantOrder = [...state.driversOrdered].sort((a, b) =>
            a.surname.localeCompare(b.surname)
          );
          return {
            ...state,
            drivers: ascendantOrder,
          };
        case "decendent":
          const decendentOrder = [...state.driversOrdered].sort((a, b) =>
            b.surname.localeCompare(a.surname)
          );
          return {
            ...state,
            drivers: decendentOrder,
          };
        case "younger":
          const youngerOrder = [...state.driversOrdered].sort(
            (a, b) => new Date(b.dob) - new Date(a.dob)
          );
          return {
            ...state,
            drivers: youngerOrder,
          };
        case "older":
          const olderOrder = [...state.driversOrdered].sort(
            (a, b) => new Date(a.dob) - new Date(b.dob)
          );
          return {
            ...state,
            drivers: olderOrder,
          };
      }
    case FILTER:
      switch (action.payload) {
        case "allDrivers":
          return {
            ...state,
            drivers: state.allDriversBackup,
          };
        case "bdd":
          return {
            ...state,
            drivers: state.driversFiltered.filter((driver) => driver.created),
          };
        case "api":
          return {
            ...state,
            drivers: state.driversFiltered.filter((driver) => !driver.created),
          };
        default:
          return {
            ...state,
            drivers: state.driversFiltered.filter((driver) => {
              const driverTeams = driver.teams
                ? driver.teams.split(",").map((team) => team.trim())
                : [];
              return driverTeams.includes(action.payload);
            }),
          };
      }
    case RESET:
      return {
        ...state,
        drivers: state.allDriversBackup,
      };
    case GET_DRIVER_DETAIL:
      return {
        ...state,
        driver: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        driver: {},
      };
    default:
      return { ...state };
  }
};

export default reducer;