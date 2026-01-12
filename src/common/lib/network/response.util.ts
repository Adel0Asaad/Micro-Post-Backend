import {CookieOptions, Response} from 'express';

const responseOk = (
  res: Response,
  data?: {
    body?: {[key: string]: any};
    status?: number;
    description?: string;
  },
  extraParams?: {
    extraInfo?: {[key: string]: any};
    cookies?: {[key: string]: {value: string; options?: CookieOptions}};
  },
) => {
  const {
    body,
    description: passedDescription,
    status: passedStatus,
  } = data || {};
  const status = passedStatus || 200;
  const description = passedDescription || 'OK';
  const {extraInfo, cookies} = extraParams || {};
  return finalResponse({res, body, status, description, extraInfo, cookies});
};

const responseCreate = (
  res: Response,
  data?: {
    body?: {[key: string]: any};
    status?: number;
    description?: string;
  },
  extraParams?: {
    extraInfo?: {[key: string]: any};
    cookies?: {[key: string]: {value: string; options?: CookieOptions}};
  },
) => {
  const {
    body,
    description: passedDescription,
    status: passedStatus,
  } = data || {};
  const status = passedStatus || 201;
  const description = passedDescription || 'File Created';
  const {extraInfo, cookies} = extraParams || {};
  return finalResponse({res, body, status, description, extraInfo, cookies});
};

const responseBadRequest = (
  res: Response,
  data?: {
    body?: {[key: string]: any};
    status?: number;
    description?: string;
  },
  extraParams?: {
    extraInfo?: {[key: string]: any};
    cookies?: {[key: string]: {value: string; options?: CookieOptions}};
  },
) => {
  const {
    body,
    description: passedDescription,
    status: passedStatus,
  } = data || {};
  const status = passedStatus || 400;
  const description = passedDescription || 'Bad Request';
  const {extraInfo, cookies} = extraParams || {};
  return finalResponse({res, body, status, description, extraInfo, cookies});
};

const responseUnauthorized = (
  res: Response,
  data?: {
    body?: {[key: string]: any};
    status?: number;
    description?: string;
  },
  extraParams?: {
    extraInfo?: {[key: string]: any};
    cookies?: {[key: string]: {value: string; options?: CookieOptions}};
  },
) => {
  const {
    body,
    description: passedDescription,
    status: passedStatus,
  } = data || {};
  const status = passedStatus || 401;
  const description = passedDescription || 'Unauthorized';
  const {extraInfo, cookies} = extraParams || {};
  return finalResponse({res, body, status, description, extraInfo, cookies});
};

const responseForbidden = (
  res: Response,
  data?: {
    body?: {[key: string]: any};
    status?: number;
    description?: string;
  },
  extraParams?: {
    extraInfo?: {[key: string]: any};
    cookies?: {[key: string]: {value: string; options?: CookieOptions}};
  },
) => {
  const {
    body,
    description: passedDescription,
    status: passedStatus,
  } = data || {};
  const status = passedStatus || 403;
  const description = passedDescription || 'Forbidden';
  const {extraInfo, cookies} = extraParams || {};
  return finalResponse({res, body, status, description, extraInfo, cookies});
};

const responseConflict = (
  res: Response,
  data?: {
    body?: {[key: string]: any};
    status?: number;
    description?: string;
  },
  extraParams?: {
    extraInfo?: {[key: string]: any};
    cookies?: {[key: string]: {value: string; options?: CookieOptions}};
  },
) => {
  const {
    body,
    description: passedDescription,
    status: passedStatus,
  } = data || {};
  const status = passedStatus || 409;
  const description = passedDescription || 'Conflict';
  const {extraInfo, cookies} = extraParams || {};
  return finalResponse({res, body, status, description, extraInfo, cookies});
};

const responseInternalError = (
  res: Response,
  data?: {
    body?: {[key: string]: any};
    status?: number;
    description?: string;
  },
  extraParams?: {
    extraInfo?: {[key: string]: any};
    cookies?: {[key: string]: {value: string; options?: CookieOptions}};
  },
) => {
  const {
    body,
    description: passedDescription,
    status: passedStatus,
  } = data || {};
  const status = passedStatus || 500;
  const description = passedDescription || 'General Error';
  const {extraInfo, cookies} = extraParams || {};
  return finalResponse({res, body, status, description, extraInfo, cookies});
};

const finalResponse = ({
  res,
  body,
  status,
  description,
  extraInfo,
  cookies,
}: {
  res: Response;
  body: {[key: string]: any};
  status: number;
  description: string;
  extraInfo?: {[key: string]: any};
  cookies?: {[key: string]: {value: string; options?: CookieOptions}};
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
  if (cookies) {
    for (const [key, {value, options}] of Object.entries(cookies)) {
      res.cookie(key, value, options);
    }
  }
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
