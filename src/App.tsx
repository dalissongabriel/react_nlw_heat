import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import styles from './app.module.scss';
import {useAuthContext} from './contexts/auth';
import {SendMessageForm} from "./components/SendMessageForm";

export function App() {
  const {user} = useAuthContext();
  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSinged : ''}`}>
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  )
};