require('dotenv').config();
const {startServer} = require('../../../../index');
const {request} = require('graphql-request');

let getHost = () => '';
let app;

beforeAll(async () => {
  app = await startServer();
  console.log(app);
  // const {port} = app.address();
  const port = process.env.PORT;
  getHost = () => `http://localhost:${port}`;
});

afterAll(async () => {
  app.close();
});

const email = 'tom@bob.com';
const password = 'jalksdf';

const mutation = (email, password) => `
  mutation {
    register(email: "${email}", password: "${password}") {
      field
      message
    }
  }
`;

describe(`A register mutation`, async () => {
  it(`should register a valid user`, async () => {
    const response = await request(getHost(), mutation(email, password));
    expect(response).toEqual({register: null});
  });
});
