import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import styles from './app.module.scss';

export function App() {
  return (
    <main className={styles.contentWrapper}>
      <MessageList />
      <LoginBox />
    </main>
  )
};