import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'outline' | 'tile';
type ButtonSize = 'md' | 'sm';

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  children: ReactNode;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string;
  };

type ButtonProps = AsButton | AsAnchor;

export default function Button({
  variant = 'primary',
  size = 'md',
  external = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  if ('href' in rest && rest.href) {
    const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };

    // External destinations (résumé PDF, third-party links) get a plain <a>
    // in a new tab; mailto: links get a plain <a> in place (an email draft,
    // not a page); internal routes use react-router's Link so navigation
    // stays client-side.
    const isMailto = href.startsWith('mailto:');
    if (external || isMailto) {
      return (
        <a
          {...anchorProps}
          href={href}
          className={classes}
          {...(isMailto ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {children}
        </a>
      );
    }

    return (
      <Link {...anchorProps} to={href} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonProps} type={buttonProps.type ?? 'button'} className={classes}>
      {children}
    </button>
  );
}
