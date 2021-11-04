import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import styles from './app.module.scss';
import { AuthProvider } from './contexts/auth';

export function App() {
  return (
    <AuthProvider>
      <main className={styles.contentWrapper}>
        <MessageList />
        <LoginBox />
      </main>
    </AuthProvider>
   
  )
};