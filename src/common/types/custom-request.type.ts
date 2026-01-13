import {Request} from 'express';
import {IncomingHttpHeaders} from 'http';
import * as core from 'express-serve-static-core';

type DefaultCustomData = {}; // unused, can be extended in the future with common properties, was used in previous project and copied here.

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
