import { Types } from "mongoose";
import CustomError from "../../utils/errors/CustomError.js";
import errors from "../../utils/errors/errors.js";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class MongoManager {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw new CustomError(errors.internal, error.message);
    }
  }

  async read({ filter, options }) {
    try {
      const all = await this.model.paginate(filter, options);
      if (all.totalDocs === 0) {
        throw new CustomError(errors.notFound);
      }
      return all;
    } catch (error) {
      throw new CustomError(errors.internal, error.message);
    }
  }

  async readOne(id) {
    try {
      const one = await this.model.findById(id).lean();
      notFoundOne(one);
      return one;
    } catch (error) {
      throw new CustomError(errors.internal, error.message);
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.model.findOne({ email }).exec();
      return one;
    } catch (error) {
      throw new CustomError(errors.internal, error.message);
    }
  }

  async update(id, data) {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt).lean();
      notFoundOne(one);
      return one;
    } catch (error) {
      throw new CustomError(errors.internal, error.message);
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id).lean();
      notFoundOne(one);
      return one;
    } catch (error) {
      throw new CustomError(errors.internal, error.message);
    }
  }

  async stats({ filter }) {
    try {
      const stats = await this.model.aggregate([
        { $match: filter },
        { $group: { _id: null, total: { $sum: 1 } } }
      ]);
      return stats;
    } catch (error) {
      throw new CustomError(errors.internal, error.message);
    }
  }

  async reportBill(uid) {
    try {
      const report = await this.model.aggregate([
        { $match: { user_id: new Types.ObjectId(uid) } },
        {
          $lookup: {
            from: 'events',
            foreignField: '_id',
            localField: 'event_id',
            as: 'event_id',
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ['$event_id', 0] }, '$$ROOT'],
            },
          },
        },
        { $set: { subtotal: { $multiply: ['$price', '$quantity'] } } },
        { $group: { _id: '$user_id', total: { $sum: '$subtotal' } } },
        {
          $project: {
            _id: false,
            user_id: '$_id',
            total: '$total',
            date: new Date(),
            currency: 'USD',
          },
        },
      ]);
      return report;
    } catch (error) {
      throw new CustomError(errors.internal, error.message);
    }
  }
}

export default MongoManager;
