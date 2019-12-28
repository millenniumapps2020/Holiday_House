export const RESET_APP = "RESET_APP";
export const STORE_SHORTLISTED_HOUSE_COUNT = "STORE_SHORTLISTED_HOUSE_COUNT";

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