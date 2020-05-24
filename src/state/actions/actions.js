export const RESET_APP = "RESET_APP";
export const STORE_SHORTLISTED_HOUSE_COUNT = "STORE_SHORTLISTED_HOUSE_COUNT";
export const STORE_LOGGED_USER = "STORE_LOGGED_USER"
export const STORE_APP_DIALOG_DETAILS = "STORE_APP_DIALOG_DETAILS"

export function resetApp() {
  return {
    type: RESET_APP
  }
}

export function storeShortListedHouseList(payload) {
  return {
    type: STORE_SHORTLISTED_HOUSE_COUNT,
    payload: payload
  }
}

export function storeLoggedUser(payload) {
  return {
    type: STORE_LOGGED_USER,
    payload: payload
  }
}

export function showAppDialog(payload) {
  return {
    type: STORE_APP_DIALOG_DETAILS,
    payload: payload
  }
}
