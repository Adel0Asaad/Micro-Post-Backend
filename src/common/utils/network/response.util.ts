import {Response} from 'express';

const responseOk = (
  res: Response,
  data?: {
    body?: {[key: string]: any};
    status?: number;
    description?: string;
  },
  extraInfo?: {[key: string]: any},
) => {
  const {
    body,
    description: passedDescription,
    status: passedStatus,
  } = data || {};
  const status = passedStatus || 200;
  const description = passedDescription || 'OK';
  return finalResponse({res, body, status, description, extraInfo});
};

const responseCreate = (
  res: Response,
  data?: {
    body?: {[key: string]: any};
    status?: number;
    description?: string;
  },
  extraInfo?: {[key: string]: any},
) => {
  const {
    body,
    description: passedDescription,
    status: passedStatus,
  } = data || {};
  const status = passedStatus || 201;
  const description = passedDescription || 'File Created';
  return finalResponse({res, body, status, description, extraInfo});
};

const responseBadRequest = (
  res: Response,
  data?: {
    body?: {[key: string]: any};
    status?: number;
    description?: string;
  },
  extraInfo?: {[key: string]: any},
) => {
  const {
    body,
    description: passedDescription,
    status: passedStatus,
  } = data || {};
  const status = passedStatus || 400;
  const description = passedDescription || 'Bad Request';
  return finalResponse({res, body, status, description, extraInfo});
};

const responseUnauthorized = (
  res: Response,
  data?: {
    body?: {[key: string]: any};
    status?: number;
    description?: string;
  },
  extraInfo?: {[key: string]: any},
) => {
  const {
    body,
    description: passedDescription,
    status: passedStatus,
  } = data || {};
  const status = passedStatus || 401;
  const description = passedDescription || 'Unauthorized';
  return finalResponse({res, body, status, description, extraInfo});
};

const responseForbidden = (
  res: Response,
  data?: {
    body?: {[key: string]: any};
    status?: number;
    description?: string;
  },
  extraInfo?: {[key: string]: any},
) => {
  const {
    body,
    description: passedDescription,
    status: passedStatus,
  } = data || {};
  const status = passedStatus || 403;
  const description = passedDescription || 'Forbidden';
  return finalResponse({res, body, status, description, extraInfo});
};

const responseConflict = (
  res: Response,
  data?: {
    body?: {[key: string]: any};
    status?: number;
    description?: string;
  },
  extraInfo?: {[key: string]: any},
) => {
  const {
    body,
    description: passedDescription,
    status: passedStatus,
  } = data || {};
  const status = passedStatus || 409;
  const description = passedDescription || 'Conflict';
  return finalResponse({res, body, status, description, extraInfo});
};

const responseInternalError = (
  res: Response,
  data?: {
    body?: {[key: string]: any};
    status?: number;
    description?: string;
  },
  extraInfo?: {[key: string]: any},
) => {
  const {
    body,
    description: passedDescription,
    status: passedStatus,
  } = data || {};
  const status = passedStatus || 500;
  const description = passedDescription || 'General Error';
  return finalResponse({res, body, status, description, extraInfo});
};

const finalResponse = ({
  res,
  body,
  status,
  description,
  extraInfo,
}: {
  res: Response;
  body: {[key: string]: any};
  status: number;
  description: string;
  extraInfo?: {[key: string]: any};
}) => {
  const {headers: garbage1, body: garbage2, ...restInfo} = extraInfo || {};
  const resBody = {
    headers: {
      status,
      description,
    },
    body: {...body},
    ...restInfo,
  };
  return res.status(status).json(resBody);
};

export {
  responseOk,
  responseBadRequest,
  responseCreate,
  responseUnauthorized,
  responseForbidden,
  responseConflict,
  responseInternalError,
};
