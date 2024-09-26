import { register } from 'node:module';
import { setUncaughtExceptionCaptureCallback } from 'node:process';
import { pathToFileURL } from 'node:url';

register('ts-node/esm/transpile-only', pathToFileURL('./'));

setUncaughtExceptionCaptureCallback((error) => console.error(error));
