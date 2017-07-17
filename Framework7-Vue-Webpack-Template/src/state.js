var flag = false;
var hasLogon = false;
export function setState(flag) {
      console.log('state.js setState 1 haslog: ',hasLogon)
      hasLogon = flag;
      console.log('state.js setState 2 haslog: ',hasLogon)
};
export function getState() {
      console.log('state.js getState haslog: ',hasLogon)
      return hasLogon
};
