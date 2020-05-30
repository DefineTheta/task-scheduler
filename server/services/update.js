import UpdateModel from 'Models/update';

export default class UpdateClass {
  static async UpdateTime(sn) {
    if (sn !== 'current' && sn !== 'historical') return null;

    const currentTime = new Date();

    await UpdateModel.findOneAndUpdate(
      { name: sn },
      { lastUpdated: currentTime.toISOString() }
    );
  }
}
