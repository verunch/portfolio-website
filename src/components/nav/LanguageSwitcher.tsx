import { LOCALES, LOCALE_LABELS, LOCALE_NAMES } from '../../i18n/locales';
import { useLocale } from '../../i18n/LocaleContext';
import { trackGoal } from '../../lib/analytics';
import styles from './LanguageSwitcher.module.css';

type LanguageSwitcherProps = {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
};

// EN / RU / BE toggle — shared by Header (horizontal) and IdentityRail
// (vertical), same as NavLinks.
export default function LanguageSwitcher({ orientation = 'horizontal', className }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t.languageSwitcher.ariaLabel}
      className={[styles.switcher, orientation === 'vertical' ? styles.vertical : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          className={`${styles.option} ${code === locale ? styles.active : ''}`}
          aria-pressed={code === locale}
          aria-label={LOCALE_NAMES[code]}
          onClick={() => {
            if (code === locale) return;
            setLocale(code);
            trackGoal('language_change', { from: locale, to: code });
          }}
        >
          {LOCALE_LABELS[code]}
        </button>
      ))}
    </div>
  );
}
