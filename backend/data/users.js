import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'User',
    email: 'user@example.com',
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
    email: 'aymard@gmail.com',
    password: bcrypt.hashSync('1234567', 10),
  },
];

export default users;
