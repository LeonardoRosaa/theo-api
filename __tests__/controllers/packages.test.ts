import request from 'supertest';

import server from '../../src/app_controller'

import packageJSON from '../services/package.json'

describe('Package controller', () => {
  it('Should passed devDependencies and or dependencies returns updates the same', async () => {

    const response = await request(server)
      .put('/packages')
      .send(packageJSON)

    expect(response).toBeDefined()
  })
})