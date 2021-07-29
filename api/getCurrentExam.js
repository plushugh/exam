import dbConnect from "../lib/dbConnect";

import {VercelRequest, VercelResponse} from "@vercel/node"
import Exams from "../lib/models/Exams";

/**
 *  GET the current exam
 * @param req {VercelRequest}
 * @param res {VercelResponse}
 */

export default async (req, res) => {
  const {method, query} = req;
  await dbConnect();
  switch (method) {
    case 'GET':
      if (query.grade) {
        const now = Date.now()
        const currentExam = await Exams.findOne({
          startTime: {
            $lte: now,
          },
          endTime: {
            $gt: now,
          },
          grade: query.grade.toString()
        });
        if (currentExam)
          res.send({exists: true, ...currentExam._doc})
        else
          res.status(400).send({exists: false});
      } else {
        res.send("No grade specified")
      }
      break;
    default:
      res.status(400).send("Only GET is allowed");
      break;
  }
};
