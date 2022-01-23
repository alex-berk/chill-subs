import { useState, useEffect } from 'react';
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import Image from 'next/image'
import { CloseOutline } from 'react-ionicons';
import favorites from '!!json5-loader!../data/favorites.json5';
import Checkbox from '../components/Checkbox';
import Footer from '../components/Footer';
import Select from '../components/Select';
import SortSelect from '../components/SortSelect';
import styles from '../styles/Browse.module.scss'

// size - select - smaller, popular but fun, popular but not like "the fanciest", very fucking fancy
// targets specific demographic - select (lgbt, black, bipoc, latinx, women, specific country, young, old)
// nominate for awards - checkbox
// new (accepting their first submissions :) ) - checkbox
// have 24h submission windows

export default function Browse() {
  const initialResults = favorites.sort((m1, m2) => m1.name.toLowerCase() > m2.name.toLowerCase() ? 1 : -1)
  const [ values, setValues ] = useState<any>({
    search: '',
  });
  const [ results, setResults ] = useState<any[]>(initialResults);
  const [ isMobile, setIsMobile ] = useState<boolean>(false);

  useEffect(() => {
    if (window && window.innerWidth <= 600) {
      setIsMobile(true);
    }
  }, [])

  useEffect(() => {
    setResults(favorites.filter(magazine => {
      let match = true;
      for (const [key, value] of Object.entries(values)) {
        if (key === 'search') {
          match = value ? magazine.name.toLowerCase().includes((value as any).toLowerCase()) : true;
        } else if (key === 'responseTime') {
          match = value ? magazine.responseDays && magazine.responseDays <= value : true;
        } else if (key === 'noFee') {
          match = value ? !magazine.fee : true;
        } else if (key === 'vibe') {
          match = value ? magazine[key] === value : true;
        } else {
          // if (value && magazine[key] === undefined || magazine[key] !== value) {
          //   match = false;
          // }
          match = value ? magazine[key] : true;
        }
      }
      return match;
    }))
  }, [values])

  const handleValuesChange = (name, value) => {
    setValues({ ...values, [name]: value });
  }

  const sortResults = (option) => {
    let sortedResults = [...results];
    if (option.value === 'followersDesc') {
      sortedResults.sort((m1, m2) => m1.twitterFollowers < m2.twitterFollowers ? 1 : -1)
    } else if (option.value === 'followersAsc') {
      sortedResults.sort((m1, m2) => m1.twitterFollowers >= m2.twitterFollowers ? 1 : -1)
    } else {
      sortedResults.sort((m1, m2) => m1.name.toLowerCase() > m2.name.toLowerCase() ? 1 : -1)
    }
    setResults(sortedResults);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Lit Mag Finder</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/">
        <div className={styles.logo}>
          chill subs
        </div>
      </Link>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Search magazines
        </h1>

        <div className={styles.filters}>
          <div className={styles.searchContainer}>
            <input
              className={styles.search}
              placeholder="Search..."
              value={values.search}
              onChange={e => handleValuesChange('search', e.target.value)}
            />
            {values.search && <CloseOutline onClick={e => handleValuesChange('search', '')} />}
          </div>

          <Select
            style={! isMobile ? { marginRight: 32, width: 220 } : { marginBottom: 16, width: '100%' }}
            placeholder="Response time"
            options={[
              { value: undefined, title: 'Any time' },
              { value: 7, title: 'Within 1 week' },
              { value: 30, title: 'Within 1 month' },
              { value: 90, title: 'Within 3 months' },
              { value: 180, title: 'Within 6 months' },
            ]}
            onSelect={option => handleValuesChange('responseTime', option.value)}
          />

          <Select
            style={!isMobile ? { width: 530 } : { marginBottom: 16, width: '100%'} }
            placeholder="Vibe"
            options={[
              { value: undefined, title: 'all the vibes' },
              { value: 'bestest', title: 'send us your best (make it award level or sth)' },
              { value: 'best', title: 'send us your best but less intimidating' },
              { value: 'worst', title: 'send us your fucking worst' },
            ]}
            onSelect={option => handleValuesChange('vibe', option.value)}
          />

        </div>

        <div className={styles.filters}>

          <Checkbox
            name="open"
            label="Open for submissions"
            className={styles.checkbox}
            onChange={e => handleValuesChange('open', e.target.checked)}
          />

          <Checkbox
            name="expedited"
            label="Offer expedited submissions"
            className={styles.checkbox}
            onChange={e => handleValuesChange('expeditedResponse', e.target.checked)}
          />

        </div>

        <div className={styles.filters}>

          <div className={styles.filterBlock}>
            <div className={styles.filterBlockTitle}>Basic human needs</div>
            
            <Checkbox
              name="simSubs"
              label="Simultaneous submissions"
              className={styles.checkbox}
              onChange={e => handleValuesChange('simultaneousSubmissions', e.target.checked)}
            />

            <Checkbox
              name="previouslyPublished"
              label="Previously published OK"
              className={styles.checkbox}
              onChange={e => handleValuesChange('acceptPreviouslyPublished', e.target.checked)}
            />

          </div>

          <div className={styles.filterBlock}>
            <div className={styles.filterBlockTitle}>Money</div>
            
            <Checkbox
              name="noFee"
              label="No submission fee"
              className={styles.checkbox}
              onChange={e => handleValuesChange('noFee', e.target.checked)}
            />

            <Checkbox
              name="payment"
              label="Paying publication"
              className={styles.checkbox}
              onChange={e => handleValuesChange('payment', e.target.checked)}
            />
          </div>

          <div className={styles.filterBlock}>
            <div className={styles.filterBlockTitle}>Promotion and hype</div>

            <Checkbox
              name="activeOnSocials"
              label="Active on social media"
              className={styles.checkbox}
              onChange={e => handleValuesChange('activeOnSocials', e.target.checked)}
            />

            <Checkbox
              name="promoteAfterPublication"
              label="Promote after publication"
              className={styles.checkbox}
              onChange={e => handleValuesChange('promoteAfterPublication', e.target.checked)}
            />
          </div>

          <div className={styles.filterBlock}>
            <div className={styles.filterBlockTitle}>Availability</div>

            <Checkbox
              name="print"
              label="Available in print"
              className={styles.checkbox}
              onChange={e => handleValuesChange('print', e.target.checked)}
            />

            <Checkbox
              name="online"
              label="Has examples online"
              className={styles.checkbox}
              onChange={e => handleValuesChange('freeExamples', e.target.checked)}
            />
          </div>
        </div>

        <div className={styles.browseHeader}>
          <h2>Browse</h2>
          <SortSelect
            options={[
              { value: 'az', dir: 'asc', label: 'Name (A-Z)' },
              { value: 'followersDesc', dir: 'desc', label: 'Twitter followers (high to low)' },
              { value: 'followersAsc', dir: 'asc', label: 'Twitter followers (low to high)' },
            ]}
            onSelect={option => sortResults(option)}
          />
        </div>

        <div className={styles.cards}>
          {results.map((magazine, i) => (
            <Link href={`/magazine/${magazine.id}`} key={i}>
              <div className={styles.card}>
                <Image src={magazine.cover || ''} width={120} height={120} />
                <h3>{magazine.name}</h3>
                <div className={styles.cardDescription}>{`"${magazine.description}"`}</div>
                <div className={styles.cardStats}>
                  <div className={styles.cardStat}>
                    <div>Response time</div>
                    <div>{magazine.responseTime || '?'}</div>
                  </div>
                  <div className={styles.cardStat}>
                    <div>Payment</div>
                    <div>{magazine.payment || 'No'}</div>
                  </div>
                  <div className={styles.cardStat}>
                    <div>Followers</div>
                    <div>{magazine.twitterFollowers || '-'}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </main>

      <Footer />
      <Script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js" />
    </div>
  )
}
