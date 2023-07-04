
import { getUsers } from '@/utils/auth/users';
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { NextAuthOptions } from "next-auth"
import { NEXTAUTH_SECRET } from '@/utils/auth/constants';
import jwt from 'jsonwebtoken';

export const authOptions: NextAuthOptions = {
    debug: true,
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { username, password } = credentials;
                const users = await getUsers();
                const user = users[username];
                if (user && user.password === password) {
                    console.log("login with "+ username)
                    // 验证通过，返回用户信息
                    const signingSecret = NEXTAUTH_SECRET;
                    const payload = {
                      aud: 'authenticated',
                      exp: Math.floor(new Date().getTime() / 1000),
                      role: 'authenticated',
                      user:user.user,
                      token: jwt.sign(user, signingSecret)
                    }; 
                    return payload
                }
                return null;
            }
        }),
    ],
    // pages:{
    //     signIn: '/api/auth/login'
    // }
}

export default NextAuth(authOptions)