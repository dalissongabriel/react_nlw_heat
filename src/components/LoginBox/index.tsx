import { VscGithubInverted } from 'react-icons/vsc';
import { API_URL_GITHUB_AUTH } from '../../constants';
import { useAuthContext } from '../../contexts/auth';
import styles from './styles.module.scss';

export function LoginBox() {
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={API_URL_GITHUB_AUTH} className={styles.singInWithGithub}>
        <VscGithubInverted size="24" />
        Entrar com o Github
      </a>
    </div>
  )
}