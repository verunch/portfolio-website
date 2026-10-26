import { Link } from 'react-router-dom';
import { useLocale } from '../../i18n/LocaleContext';

export default function NotFoundPage() {
  const { t } = useLocale();

  return (
    <div>
      <h1>{t.notFound.title}</h1>
      <Link to="/">{t.notFound.backHome}</Link>
    </div>
  );
}
