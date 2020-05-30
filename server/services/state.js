import StateModel from 'Models/state';

import UtilityService from 'Services/utility';

export default class StateService {
  /**
   * Searches the state database for the states in a given country and returns current data
   * @param {string} cn Name of the country
   *
   * @return {array} array of current state data from the given coutnry
   */
  static async GetCurrentCountryStateData(cn) {
    if (cn === undefined) return null;

    const stateData = await StateModel.aggregate([
      { $match: { country: cn } },
      {
        $project: {
          country: '$country',
          state: '$state',
          cases: '$cases',
          recovered: '$recovered',
          active: '$active',
          death: '$death',
          tests: '$tests',
          caseChange: {
            $cond: {
              if: { $eq: [{ $arrayElemAt: ['$casesToday', -1] }, null] },
              then: null,
              else: { $sum: '$casesToday' },
            },
          },
          recoveredChange: {
            $cond: {
              if: { $eq: [{ $arrayElemAt: ['$recoveredToday', -1] }, null] },
              then: null,
              else: { $sum: '$recoveredToday' },
            },
          },
          activeChange: {
            $cond: {
              if: { $eq: [{ $arrayElemAt: ['$activeToday', -1] }, null] },
              then: null,
              else: { $sum: '$activeToday' },
            },
          },
          deathChange: {
            $cond: {
              if: { $eq: [{ $arrayElemAt: ['$deathToday', -1] }, null] },
              then: null,
              else: { $sum: '$deathToday' },
            },
          },
          testChange: {
            $cond: {
              if: { $eq: [{ $arrayElemAt: ['$testsToday', -1] }, null] },
              then: null,
              else: { $sum: '$testsToday' },
            },
          },
        },
      },
    ]);

    return stateData;
  }

  /**
   *
   * @param {string} cn Name of the country for which to update date
   */
  static async UpdateCurrentCountryStateData(cn) {
    const oldStateData = await StateModel.find({ country: cn });
    const newStateData = await UtilityService.ApiCall(
      'https://covidtracking.com/api/v1/states/current.json',
      'GET'
    );

    // Get current state details so they can be used to calculate changes
    // Make it an object with key being state names so they are accessiable inside the mongodb update
    let styledOldStateData = {};
    oldStateData.map(data => {
      styledOldStateData[data.state] = data;
    });

    // Map through the returned data and only pick out the details we want
    let states = newStateData.map(
      ({ dateChecked, state, positive, recovered, death, totalTestResults }) => {
        const oldData = styledOldStateData[state];
        let reducedData = { country: cn };
        let changeData = {};

        reducedData.state = state;
        reducedData.cases = positive;
        reducedData.recovered = recovered;
        reducedData.active = positive === null ? null : positive - recovered - death;
        reducedData.death = death;
        reducedData.tests = totalTestResults;
        reducedData.lastChecked = dateChecked;

        changeData.cases = positive - oldData.cases;
        changeData.recovered = recovered === null ? null : recovered - oldData.recovered;
        changeData.active =
          reducedData.active === null ? null : reducedData.active - oldData.active;
        changeData.death = death === null ? null : death - oldData.death;
        changeData.tests =
          totalTestResults === null ? null : totalTestResults - oldData.tests;

        return { new: reducedData, change: changeData };
      }
    );

    // Loop through each state and update the previous data with new data
    // Also append to each change array the new changes
    // Only keep the last 24 changes in the arrays
    for (let i = 0; i < states.length; ++i) {
      const data = states[i];

      await StateModel.updateOne(
        { country: data.new.country, state: data.new.state },
        {
          $set: data.new,
          $push: {
            casesToday: { $each: [data.change.cases], $slice: -24 },
            recoveredToday: { $each: [data.change.recovered], $slice: -24 },
            activeToday: { $each: [data.change.active], $slice: -24 },
            deathToday: { $each: [data.change.death], $slice: -24 },
            testsToday: { $each: [data.change.tests], $slice: -24 },
          },
        }
      );
    }
  }

  static async Seed(cn) {
    const newStateData = await UtilityService.ApiCall(
      'https://covidtracking.com/api/v1/states/current.json',
      'GET'
    );

    // Map through the returned data and only pick out the details we want
    let states = newStateData.map(
      ({ dateChecked, state, positive, recovered, death, totalTestResults }) => {
        let reducedData = { country: cn };

        reducedData.state = state;
        reducedData.cases = positive;
        reducedData.recovered = recovered;
        reducedData.active = positive === null ? null : positive - recovered - death;
        reducedData.death = death;
        reducedData.tests = totalTestResults;
        reducedData.lastChecked = dateChecked;
        reducedData.casesToday = [];
        reducedData.recoveredToday = [];
        reducedData.activeToday = [];
        reducedData.deathToday = [];
        reducedData.testsToday = [];

        return reducedData;
      }
    );

    for (let i = 0; i < states.length; ++i) {
      const data = states[i];

      await StateModel.create(data);
    }
  }
}
