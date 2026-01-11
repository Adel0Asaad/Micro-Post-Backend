import {Request} from 'express';
import {IncomingHttpHeaders} from 'http';
import * as core from 'express-serve-static-core';

export type AppClient = {
  id?: string;
  businessId?: string;
  scopes?: string[];
};

type DefaultCustomData = {
  status?: number;
  description?: string;
  body?: {[key: string]: any};
  client?: AppClient;
};

interface CustomRequest<
  T extends Record<string, any> | null | undefined = {},
  K = undefined,
  R = undefined,
  Q = core.Query,
> extends Request {
  customData: DefaultCustomData & T;
  body: K;
  headers: IncomingHttpHeaders & R;
  query: Request['query'] & Q;
}

export default CustomRequest;
