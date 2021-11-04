import { VscGithubInverted } from 'react-icons/vsc';
import { useAuthContext } from '../../contexts/auth';
import styles from './styles.module.scss';

export function LoginBox() {
  const {singInUrl, user} = useAuthContext();

  console.log(user);
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={singInUrl} className={styles.singInWithGithub}>
        <VscGithubInverted size="24" />
        Entrar com o Github
      </a>
    </div>
  )
}