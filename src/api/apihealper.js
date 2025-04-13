import {
    authApiUrl
  } from "./apiurl";
  const apiUrlKeys = Object.assign({}, authApiUrl);
  
  export function generateApiUrl(apiKey, payload) {
    const apiUrl = apiUrlKeys[apiKey];
    return typeof apiUrl === "function" ? apiUrl(payload || {}) : apiUrl;
  }
  