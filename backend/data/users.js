import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('1234567', 10),

  },
  {
    name: 'Rcardo MB',
    email: 'ricardomb@gmail.com',
    password: bcrypt.hashSync('1234567', 10),
    isAdmin: true,
  },
  {
    name: 'Aymard M',
    email: 'aymard@.com',
    password: bcrypt.hashSync('1234567', 10),
  },
];

export default users;
