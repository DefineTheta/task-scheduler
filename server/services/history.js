import HistoryModel from 'Models/history';
import StateModel from 'Models/state';
import CountryModel from 'Models/country';

import UtilityService from 'Services/utility';

export default class HistoryService {
  static async GetLatestCountryStateHistory(cn) {
    let history = await HistoryModel.aggregate([
      { $match: { type: { $eq: 'state' }, country: { $eq: cn } } },
      {
        $project: {
          _id: 0,
          state: '$state',
          latest: { $arrayElemAt: ['$history', -1] },
        },
      },
    ]);

    return history;
  }

  static async UpdateCountryHistory(cn) {
    const currentStateData = await CountryModel.findOne({ country: cn });

    let o = {
      date: currentStateData.lastChecked,
      cases: currentStateData.cases,
      recovered: currentStateData.recovered,
      active: currentStateData.active,
      death: currentStateData.death,
      tests: currentStateData.tests,
    };

    await HistoryModel.updateOne({ country: cn, state: null }, { $push: { history: o } });
  }

  static async UpdateCountryStateHistory(cn) {
    const currentStateData = await StateModel.find({ country: cn });

    for (let data of currentStateData) {
      let o = {
        date: data.lastChecked,
        cases: data.cases,
        recovered: data.recovered,
        active: data.active,
        death: data.death,
        tests: data.tests,
      };

      await HistoryModel.updateOne(
        { country: cn, state: data.state },
        { $push: { history: o } }
      );
    }
  }

  /**
   *
   * @param {string} cn Name of the country whose history data is being updated
   */
  static async Seed(cn) {
    const res = await UtilityService.ApiCall(
      'https://covidtracking.com/api/v1/states/daily.json',
      'GET'
    );
    const resC = await UtilityService.ApiCall(
      'https://covidtracking.com/api/v1/us/daily.json',
      'GET'
    );
    const resr = [...res].reverse();
    const resCr = [...resC].reverse();

    for (let data of res) {
      let f = await HistoryModel.findOne({ state: data.state, country: 'US' });

      if (f === null) {
        await HistoryModel.create({
          type: 'state',
          country: cn,
          state: data.state,
          history: [],
        });
      }
    }
    await HistoryModel.create({
      type: 'country',
      country: cn,
      state: null,
      history: [],
    });

    for (let data of resCr) {
      let date = data.dateChecked;
      let cases = data.positive === undefined ? null : data.positive;
      let recovered = data.recovered === undefined ? null : data.recovered;
      let death = data.death === undefined ? null : data.death;
      let tests = data.totalTestResults === undefined ? null : data.totalTestResults;
      let active = cases === null ? null : cases - recovered - death;

      let o = { date, cases, recovered, death, tests, active };
      await HistoryModel.updateOne(
        { country: cn, type: 'country' },
        { $push: { history: o } }
      );
    }

    for (let data of resr) {
      let date = data.dateChecked;
      let cases = data.positive === undefined ? null : data.positive;
      let recovered = data.recovered === undefined ? null : data.recovered;
      let death = data.death === undefined ? null : data.death;
      let tests = data.totalTestResults === undefined ? null : data.totalTestResults;
      let active = cases === null ? null : cases - recovered - death;

      let o = { date, cases, recovered, death, tests, active };
      await HistoryModel.updateOne({ state: data.state }, { $push: { history: o } });
    }
  }
}
