// import { connect } from "mongoose";
// import wintsonLog from "./logger/winston.utils.js";

// export default async () => {
//   try {
//     await connect(process.env.DB_LINK);
//     wintsonLog.INFO("mongo database connected");
//   } catch (error) {
//     wintsonLog.WARN(error.message);
//   }
// };

import { connect } from "mongoose";
import winstonLog from "./logger/winston.utils.js";

export default async () => {
  try {
    await connect(process.env.DB_LINK);
    winstonLog.INFO("Mongo database connected");
  } catch (error) {
    winstonLog.WARN(error.message);
  }
};
