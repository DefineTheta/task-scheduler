import fetch from 'node-fetch';

import UpdateModel from 'Models/update';

export default class UtilityService {
  /**
   *
   * @param {string} uri The uri to make the api call to
   * @param {string} method Which HTTP method to use to make the API call
   * @param {object} headers An object containing all the headers required to make API call
   * @param {object} bodyData An object containing body data to send with API call
   * @param {function} callback Function to call after making API call with the response from API
   *
   * @return {object} json object with response from the API call
   */
  static async ApiCall(uri, method, headers, bodyData = undefined, callback = undefined) {
    // Create options for different types of api request calls
    const fetchOptions = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    // If a body is provided then add it to the request being made
    if (bodyData !== undefined) {
      fetchOptions['body'] = JSON.stringify(bodyData);
    }

    let response = await fetch(uri, fetchOptions);
    let jsonData = await response.json();

    if (callback !== undefined) {
      callback(jsonData);
    } else {
      return jsonData;
    }
  }

  /**
   * Search the Update databse to find the last time the provided statics was updated
   * @param {string} sn Name of the statistics type
   *
   * @return {object} an object containing last update time if found
   * @return {null} null if statistics doesn't exist
   */
  static async GetLastUpdateTime(sn) {
    if (sn !== 'current' && sn !== 'historical') return null;

    const ro = await UpdateModel.findOne({ name: sn });

    return ro;
  }
}
