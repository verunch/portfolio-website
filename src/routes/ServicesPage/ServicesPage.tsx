import { useRef, useState } from 'react';
import Button from '../../components/ui/Button';
import SectionLabel from '../../components/ui/SectionLabel';
import PageFooterNav from '../../components/layout/PageFooterNav';
import { profile } from '../../data/profile';
import {
  PRICE_REGION_BY_LOCALE,
  onRequestServices,
  serviceProcess,
  servicePackages,
  serviceTerms,
} from '../../data/services';
import { useLocale } from '../../i18n/LocaleContext';
import { trackGoal } from '../../lib/analytics';
import OrderForm, { type ServiceOption } from './OrderForm';
import styles from './ServicesPage.module.css';

const priceFormat = new Intl.NumberFormat('en-US');

export default function ServicesPage() {
  const { t, l, locale } = useLocale();
  const region = PRICE_REGION_BY_LOCALE[locale];
  const [selectedService, setSelectedService] = useState('');
  const nameFieldRef = useRef<HTMLInputElement>(null);

  const serviceOptions: ServiceOption[] = [
    ...servicePackages.map((pkg) => ({ id: pkg.id, label: l(pkg.title) })),
    { id: 'on-request', label: t.services.onRequestLabel },
    { id: 'other', label: t.orderForm.serviceOther },
  ];

  // "Order" buttons preselect their service, scroll to the form and focus it.
  const startOrder = (serviceId: string) => {
    setSelectedService(serviceId);
    trackGoal('order_cta_click', { service: serviceId, place: 'services' });
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('order-form')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    nameFieldRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1 className={styles.title}>{t.services.title}</h1>
        <p className={styles.subtitle}>{t.services.subtitle}</p>
      </header>

      <section aria-labelledby="services-packages" className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 id="services-packages" className={styles.sectionTitle}>
            {t.services.packagesLabel}
          </h2>
          <p className={styles.note}>{t.services.currencyNote}</p>
        </div>
        <ul className={styles.packages}>
          {servicePackages.map((pkg) => {
            const title = l(pkg.title);
            return (
              <li key={pkg.id} className={`${styles.card} ${pkg.featured ? styles.cardFeatured : ''}`}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.price}>
                  {t.services.priceFrom} ${priceFormat.format(pkg.priceFrom[region])}
                </p>
                <p className={styles.cardText}>{l(pkg.description)}</p>
                <button type="button" className={styles.orderLink} onClick={() => startOrder(pkg.id)}>
                  {t.services.order} →
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="services-on-request" className={`${styles.section} ${styles.onRequest}`}>
        <div className={styles.sectionHeader}>
          <h2 id="services-on-request" className={styles.sectionTitle}>
            {t.services.onRequestLabel}
          </h2>
          <p className={styles.note}>{t.services.onRequestNote}</p>
        </div>
        <ul className={styles.list}>
          {l(onRequestServices).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Button variant="primary" className={styles.ctaButton} onClick={() => startOrder('on-request')}>
          {t.services.discuss}
        </Button>
      </section>

      <section aria-labelledby="services-process" className={styles.section}>
        <h2 id="services-process" className={styles.sectionTitle}>
          {t.services.processLabel}
        </h2>
        <ol className={styles.process}>
          {l(serviceProcess).map((step, index) => (
            <li key={step} className={styles.step}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="services-terms" className={styles.section}>
        <h2 id="services-terms" className={styles.sectionTitle}>
          {t.services.termsLabel}
        </h2>
        <ul className={styles.list}>
          {l(serviceTerms).map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      </section>

      <section id="order-form" aria-labelledby="services-contact" className={`${styles.section} ${styles.contact}`}>
        <SectionLabel>{t.services.contactLabel}</SectionLabel>
        <h2 id="services-contact" className={styles.contactTitle}>
          {t.services.contactTitle}
        </h2>
        <p className={styles.contactText}>{t.services.contactText}</p>
        <OrderForm
          ref={nameFieldRef}
          options={serviceOptions}
          service={selectedService}
          onServiceChange={setSelectedService}
        />
        <p className={styles.contactText}>{t.services.orContact}</p>
        <div className={styles.contactButtons}>
          <Button
            variant="outline"
            href={profile.telegram}
            external
            onClick={() => trackGoal('contact_click', { channel: 'telegram', place: 'services' })}
          >
            Telegram ↗
          </Button>
          <Button
            variant="outline"
            href={`mailto:${profile.email}`}
            onClick={() => trackGoal('contact_click', { channel: 'email', place: 'services' })}
          >
            {profile.email}
          </Button>
          <Button
            variant="outline"
            href={profile.linkedin}
            external
            onClick={() => trackGoal('contact_click', { channel: 'linkedin', place: 'services' })}
          >
            LinkedIn ↗
          </Button>
          <Button variant="outline" href="/portfolio">
            {t.services.seeWork}
          </Button>
        </div>
      </section>

      <PageFooterNav currentPath="/services" divider={false} />
    </div>
  );
}
