type User = {
  username: string;
  password: string;
};

const users: Record<string, User> = {
  standard_user: { username: 'standard_user', password: 'secret_sauce' },
  locked_out_user: { username: 'locked_out_user', password: 'secret_sauce' },
};

export function getUser(key: string): User {
  const user = users[key];
  if (!user) {
    throw new Error(`Usuario no definido en los datos de prueba: ${key}`);
  }
  return user;
}