import dbConnect from "../lib/dbConnect";

import {VercelRequest, VercelResponse} from "@vercel/node"
import Exams from "../lib/models/Exams";

/**
 *  GET the next exam
 * @param req {VercelRequest}
 * @param res {VercelResponse}
 */

export default async (req, res) => {
  const {method, query} = req;
  await dbConnect();
  switch (method) {
    case 'GET':
      if (query.grade) {
        const now = Date.now();
        const nextExam = await Exams.findOne({
          startTime: {$gt: now},
          grade: query.grade
        });
        if (nextExam)
          res.send({exists: true, ...nextExam._doc})
        else
          res.send({exists: false});
      } else {
        res.status(400).send("No grade specified")
      }
      break;
    default:
      res.status(400).send("Only GET is allowed");
      break;
  }
};
