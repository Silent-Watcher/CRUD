import type { Application } from 'express';
import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';

import { CONFIGS } from './';

export function configureResources(app: Application) {
  app.set('view engine', CONFIGS.VIEWS.ENGINE);
  app.set('views', CONFIGS.VIEWS.PATH);
  app.use('/static', express.static(CONFIGS.VIEWS.STATICS));
  app.use(expressEjsLayouts);
  app.set('layout', CONFIGS.LAYOUTS.HOME);
  app.set('layout extractScripts', true);
  app.set('layout extractStyles', true);
}
