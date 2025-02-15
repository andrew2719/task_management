const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
}, 10000);

afterAll(async () => {
  const collections = mongoose.connection.collections;

  for (let key in collections) {
    await collections[key].deleteMany({});
  }

  await mongoose.connection.close();
}, 10000);
