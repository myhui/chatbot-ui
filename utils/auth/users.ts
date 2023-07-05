import {
  NEXTAUTH_USERS
} from './constants';

const authorization = {
  params: {
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code',
  },
};

export async function getUsers() {
  const users:Record<string, any> = {};
  if (NEXTAUTH_USERS) {
    const userPairs = NEXTAUTH_USERS.split(',');
    userPairs.forEach((pair) => {
      const [username, password] = pair.split(':');
      console.log("load user: " + username + "="+ password)
      users[username] = {user: username, password: password};
    });
    
  }
  return users;
}
