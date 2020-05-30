import CountryModel from 'Models/country';

import UtilityService from 'Services/utility';

export default class CountryService {
  /**
   * Searches the country database for the and returns current data
   * @param {string} cn Name of the country
   *
   * @return {array} Current data for the given coutnry
   */
  static async GetCurrentCountryTotalData(cn) {
    const countryData = await CountryModel.aggregate([
      { $match: { country: cn } },
      {
        $project: {
          country: '$country',
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

    return countryData;
  }

  /**
   *
   * @param {string} cn Name of the country whose total current data is being updated
   */
  static async UpdatCurrentCountryTotalData(cn) {
    const oldData = await CountryModel.findOne({ country: cn });
    const res = await UtilityService.ApiCall(
      'https://covidtracking.com/api/v1/us/current.json',
      'GET'
    );
    const newTotalData = res[0];
    const activeCases =
      newTotalData.positive === null
        ? null
        : newTotalData.positive - newTotalData.recovered - newTotalData.death;

    const totalObj = {
      new: {
        country: cn,
        cases: newTotalData.positive,
        recovered: newTotalData.recovered,
        active: activeCases,
        death: newTotalData.death,
        tests: newTotalData.totalTestResults,
        lastChecked: newTotalData.lastModified,
      },
      change: {
        cases: newTotalData.positive - oldData.cases,
        recovered:
          newTotalData.recovered === null
            ? null
            : newTotalData.recovered - oldData.recovered,
        active: activeCases === null ? null : activeCases - oldData.active,
        death: newTotalData.death === null ? null : newTotalData.death - oldData.death,
        tests:
          newTotalData.totalTestResults === null
            ? null
            : newTotalData.totalTestResults - oldData.tests,
      },
    };

    await CountryModel.updateOne(
      { country: cn },
      {
        $set: totalObj.new,
        $push: {
          casesToday: { $each: [totalObj.change.cases], $slice: -24 },
          recoveredToday: { $each: [totalObj.change.recovered], $slice: -24 },
          activeToday: { $each: [totalObj.change.active], $slice: -24 },
          deathToday: { $each: [totalObj.change.death], $slice: -24 },
          testsToday: { $each: [totalObj.change.tests], $slice: -24 },
        },
      }
    );
  }

  static async Seed(cn) {
    const res = await UtilityService.ApiCall(
      'https://covidtracking.com/api/v1/us/current.json',
      'GET'
    );
    const newTotalData = res[0];

    const totalObj = {
      country: cn,
      cases: newTotalData.positive,
      recovered: newTotalData.recovered,
      active:
        newTotalData.positive === null
          ? null
          : newTotalData.positive - newTotalData.recovered - newTotalData.death,
      death: newTotalData.death,
      tests: newTotalData.totalTestResults,
      lastChecked: newTotalData.lastModified,
      casesToday: [],
      recoveredToday: [],
      activeToday: [],
      deathToday: [],
      testsToday: [],
    };

    await CountryModel.create(totalObj);
  }
}
