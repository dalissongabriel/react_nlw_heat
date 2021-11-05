import { Logo } from '../Logo';
import { useMessageList } from './useMessageList';
import styles from './styles.module.scss';

export function MessageList() {
  const { messages } = useMessageList();
  
  return (
    <div className={styles.messageListWrapper}>
      <Logo />
      <ul className={styles.messageList}>
        {messages.map((message, index) => (
          <li className={styles.message} key={index}>
            <p className={styles.messageContent}>{message.text}</p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.name}</span>
            </div>
        </li>
        ))}
      </ul>
    </div>
  );
};