const respond = (request, response, status, content, type) => {
  response.writeHead(status, `'Content-Type': ${type}`);
  if (type[0] === 'text/xml') {
    let xmlResponse = '<response>';
    xmlResponse += `<message>${content.message}</message>`;
    if (content.id) {
      xmlResponse += `<id>${content.id}</id>`;
    }
    xmlResponse += '</response>';
    response.write(xmlResponse);
  } else {
    response.write(JSON.stringify(content));
  }
  response.end();
};

const getSuccess = (request, response, acceptedTypes) => {
  const successJSON = {
    message: 'This is a successful message',
  };
  // return respond(request, response, 200, successJSON, 'application/json');
  return respond(request, response, 200, successJSON, acceptedTypes);
};

const getBadRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };
  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true.';
    responseJSON.id = 'badRequest';
    return respond(request, response, 400, responseJSON, acceptedTypes);
  }
  return respond(request, response, 200, responseJSON, acceptedTypes);
};

const getUnauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required authorization.',
  };
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes.';
    responseJSON.id = 'unauthorized';
    return respond(request, response, 401, responseJSON, acceptedTypes);
  }
  return respond(request, response, 200, responseJSON, acceptedTypes);
};

const getForbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };
  return respond(request, response, 403, responseJSON, acceptedTypes);
};

const getInternal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };
  return respond(request, response, 500, responseJSON, acceptedTypes);
};

const getNotImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };
  return respond(request, response, 501, responseJSON, acceptedTypes);
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
  return respond(request, response, 404, responseJSON, acceptedTypes);
};

module.exports = {
  notFound,
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
};
