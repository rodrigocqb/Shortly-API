import { unprocessableResponse } from "../controllers/controllers.helper.js";

function validateSchema(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((err) => err.message);
      return unprocessableResponse(res, errors);
    }
    return next();
  };
}

export default validateSchema;
