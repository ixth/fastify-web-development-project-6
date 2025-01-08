// @ts-check

import fastify from 'fastify';

import init from '../server/plugin.js';
import encrypt from '../server/lib/secure.cjs';
import { getTestData, prepareData } from './helpers/index.js';

describe('Users CRUD', () => {
  let app;
  let knex;
  let models;
  const testData = getTestData();

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    ({ knex, models } = app.objection);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await knex.migrate.latest();
    await prepareData(app);
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  it('serves index page', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('users'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('serves registration page', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newUser'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('creates user', async () => {
    const params = testData.users.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: params,
      },
    });
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe(app.reverse('root'));

    const user = await models.user.query().findOne({ email: params.email });
    const { password, ...userParams } = params;
    expect(user).toMatchObject({
      ...userParams,
      passwordDigest: encrypt(params.password),
    });
  });

  it('fails to create existing user', async () => {
    const params = testData.users.existing;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: params,
      },
    });
    expect(response.statusCode).toBe(400);
  });

  it('fails to create user with invalid data', async () => {
    const params = testData.users.invalid;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: params,
      },
    });
    expect(response.statusCode).toBe(400);
  });
});
