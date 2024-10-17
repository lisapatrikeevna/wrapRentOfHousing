import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'
import { Input } from '@/components/ui/input'

import s from './page-auth-forgot-pass.module.scss'

export const PageAuthForgotPassword = () => {
  const linkHref = 'https://www.google.com/'

  return (
    <div className={s.wrapperCard}>
      <Card className={s.intoAuthCard}>
        <h1 className={s.h1}>Forgot your password?</h1>
        <form>
          <Input label={'Email'} style={{ marginBottom: '20px' }} />
          <label className={s.label}>
            Enter your email address and we will send you further instructions{' '}
          </label>
          <Button className={s.button} variant={'primary'}>
            Send Instructions
          </Button>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              as={'a'}
              className={`${s.link} ${s.dontHaveAccount}`}
              href={linkHref}
              rel={'noopener nopener'}
              target={'_blank'}
              variant={'link'}
            >
              Did you remember your password?
            </Button>
            <p>?</p>
          </div>
          <div className={s.underlineLinkWrapper}>
            <Button
              as={'a'}
              className={s.underlineLink}
              href={linkHref}
              rel={'noopener nopener'}
              target={'_blank'}
              variant={'link'}
            >
              Try logging in
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default PageAuthForgotPassword
