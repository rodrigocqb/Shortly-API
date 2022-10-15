function okResponse(res, body) {
  return res.status(200).send(body);
}

function createdResponse(res, body) {
  return res.status(201).send(body);
}

function noContentResponse(res) {
  return res.sendStatus(204);
}

function unauthorizedResponse(res, body) {
  return res.status(401).send(body);
}

function notFoundResponse(res, body) {
  return res.status(404).send(body);
}

function conflictResponse(res, body) {
  return res.status(409).send(body);
}

function unprocessableResponse(res, body) {
  return res.status(422).send(body);
}

function serverError(res, error) {
  return res.status(500).send(error.message);
}

export {
  okResponse,
  createdResponse,
  noContentResponse,
  unauthorizedResponse,
  notFoundResponse,
  conflictResponse,
  unprocessableResponse,
  serverError,
};
