import { forwardRef, useState, type FormEvent } from 'react';
import Button from '../../components/ui/Button';
import { profile } from '../../data/profile';
import { useLocale } from '../../i18n/LocaleContext';
import { trackGoal } from '../../lib/analytics';
import styles from './OrderForm.module.css';

export type ServiceOption = { id: string; label: string };

type OrderFormProps = {
  options: ServiceOption[];
  service: string;
  onServiceChange: (id: string) => void;
};

type Status = 'idle' | 'sending' | 'success' | 'error';

// Posts to the /api/order serverless function, which forwards the order to
// Telegram and email. The ref points at the name field so "Order" buttons
// elsewhere on the page can move focus here.
const OrderForm = forwardRef<HTMLInputElement, OrderFormProps>(function OrderForm(
  { options, service, onServiceChange },
  nameRef,
) {
  const { t, locale } = useLocale();
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const serviceLabel = options.find((option) => option.id === service)?.label ?? '';

    setStatus('sending');
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          contact: data.get('contact'),
          service: serviceLabel,
          message: data.get('message'),
          language: locale,
          website: data.get('website'),
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus('success');
      trackGoal('order_request', { service: service || 'none' });
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.result} role="status">
        <p className={styles.resultTitle}>{t.orderForm.successTitle}</p>
        <p className={styles.resultText}>{t.orderForm.successText}</p>
        <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>
          {t.orderForm.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>{t.orderForm.name} *</span>
          <input ref={nameRef} name="name" required maxLength={100} autoComplete="name" className={styles.input} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{t.orderForm.contact} *</span>
          <input
            name="contact"
            required
            maxLength={200}
            placeholder={t.orderForm.contactPlaceholder}
            className={styles.input}
          />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>{t.orderForm.service}</span>
        <select
          name="service"
          value={service}
          onChange={(event) => onServiceChange(event.target.value)}
          className={styles.input}
        >
          <option value="">{t.orderForm.serviceNone}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>{t.orderForm.message}</span>
        <textarea
          name="message"
          rows={5}
          maxLength={3000}
          placeholder={t.orderForm.messagePlaceholder}
          className={`${styles.input} ${styles.textarea}`}
        />
      </label>

      {/* Honeypot for bots — hidden from people and screen readers. */}
      <input name="website" tabIndex={-1} autoComplete="off" className={styles.honeypot} aria-hidden="true" />

      <div className={styles.footer}>
        <Button variant="primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? t.orderForm.sending : t.orderForm.submit}
        </Button>
        <p className={styles.note}>{t.orderForm.privacy}</p>
      </div>

      {status === 'error' && (
        <p className={styles.error} role="alert">
          {t.orderForm.error}{' '}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      )}
    </form>
  );
});

export default OrderForm;
