import { signIn } from 'next-auth/react';
import {FC, memo, useState} from 'react';
import {SupportedExportFormats} from "@/types/export";

interface Props {
    error: string;
}

export const LoginPage: FC<Props> = ({ error }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        signIn('credentials', { username, password }); // 使用 'credentials' 提供程序进行用户名密码登录
    };

    return (
        <div>
            <h1>Custom Login Page</h1>
            <form onSubmit={handleSignIn}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};
