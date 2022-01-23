import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Script from 'next/script'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Modal from 'react-modal';
import { AddOutline, BookOutline, CloseOutline, GlobeOutline, LogoTwitter, LogoInstagram } from 'react-ionicons';
import { iconsByName } from '../../utils/iconsByName';
import favorites from '!!json5-loader!../../data/favorites.json5';
import Footer from '../../components/Footer';
import styles from '../../styles/Magazine.module.scss';

Modal.setAppElement('#__next');

export default function Magazine() {
  const [ modal, setModal ] = useState<string | null>(null);
  const [ suggestionText, setSuggestionText ] = useState<string>('');
  const [ suggestionSubmitted, setSuggestionSubmitted ] = useState<boolean>(false);
  const router = useRouter();
  const { magazineId } = router.query;
  const currentMagazine = favorites.find(m => m.id === Number(magazineId));

  const [ isMobile, setIsMobile ] = useState<boolean>(false);

  useEffect(() => {
    if (window && window.innerWidth <= 600) {
      setIsMobile(true);
    }
  }, [])

  const sendSuggestions = () => {
    const formData = new FormData();
    formData.append('magazine', currentMagazine.name);
    formData.append('type', modal);
    formData.append('value', suggestionText); 
    fetch('https://script.google.com/macros/s/AKfycbzkve_uTUHCaVIIchiTNg9LxdaroBgifcE-KwRipI-LOrJ9E_gl5pYhtlPojhi3p6upYA/exec', { method: 'POST', mode: "no-cors", body: formData})
      .then(response => setSuggestionSubmitted(true))
      .catch(error => console.error('Error!', error.message))
    setSuggestionText('');
  }

  const closeModal = () => {
    setModal(null);
    setSuggestionSubmitted(false);
  }

  const customStyles = {
    content: {
      display: 'flex',
      flexDirection: 'column',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      padding: !isMobile ? '2.5rem' : '1.75rem',
      width: !isMobile ? '36rem' : '100%',
      height: !isMobile ? 'auto' : '100%',
      border: 'none',
      borderRadius: !isMobile ? 12 : 0,
      transform: 'translate(-50%, -50%)',
      color: '#316760',
    },
    overlay: {
      zIndex: 999,
      background: 'rgba(0, 0, 0, 0.5)',
    }
  };

  if (!currentMagazine) return null;
  
  return (
    <div className={styles.container}>
      <Head>
        <title>chill subs</title>
        <meta name="description" content="Find the right home for your writing without losing your shit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.nav}>
        <Link href="/">
          <div className={styles.logo}>
            chill subs
          </div>
        </Link>
        <div className={styles.links}>
          <Link href="https://twitter.com/chillsubs">
            <LogoTwitter color="#316760" width="24px" height="24px" />
          </Link>
          {!isMobile && (
            <Link href="/about">
              <div className={styles.link}>About</div>
            </Link>
          )}
          <Link href="https://www.buymeacoffee.com/karinakupp">
            <div className={styles.link}>{!isMobile ? 'Support the project' : 'Support'}</div>
          </Link>
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.header}>
          <Image src={currentMagazine.cover || ''} width={120} height={120} />
          <h1 className={styles.title}>{currentMagazine.name}</h1>
          <div className={styles.description}>{`"${currentMagazine.description}"`}</div>
          <div className={styles.contacts}>
          <a href={currentMagazine.website} className={styles.contact}>
            <GlobeOutline cssClasses={styles.contactIcon} />
          </a>
          {currentMagazine.twitter && (
            <a href={currentMagazine.twitter} className={styles.contact}>
              <LogoTwitter cssClasses={styles.contactIcon} />
            </a>
          )}
          {currentMagazine.instagram && (
            <a href={currentMagazine.instagram} className={styles.contact}>
              <LogoInstagram cssClasses={styles.contactIcon} />
            </a>
          )}
        </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div>Response time:</div>
              <div>{currentMagazine.responseTime || '?'}</div>
            </div>
            <div className={styles.stat}>
              <div>Payment:</div>
              <div>{currentMagazine.payment || 'No'}</div>
            </div>
            <div className={styles.stat}>
              <div>Simultaneous submissions:</div>
              <div>{currentMagazine.simultaneousSubmissions ? 'Yes' : 'No'}</div>
            </div>
            <div className={styles.stat}>
              <div>Previously published:</div>
              <div>{currentMagazine.acceptPublishedOnSocialMedia ? 'Yes' : 'No'}</div>
            </div>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div>Submission fee:</div>
              <div>{currentMagazine.fee || 'Free'}</div>
            </div>
            <div className={styles.stat}>
              <div>Expedited submissions:</div>
              <div>{currentMagazine.expeditedSubmissions ? 'Yes' : 'No'}</div>
            </div>
            <div className={styles.stat}>
              <div>Available in print:</div>
              <div>{currentMagazine.print ? 'Yes' : 'No'}</div>
            </div>
            <div className={styles.stat}>
              <div>Examples online:</div>
              <div>{currentMagazine.freeExamples ? 'Yes' : 'No'}</div>
            </div>
          </div>
        </div>
        <div className={styles.prosCons}>
          <div className={styles.card}>
            <h3>Nice things</h3>
            <ul>
              {currentMagazine.pros.map((pro, i) => (
                <li key={i}>
                  {iconsByName[pro.icon]}
                  {`  ${pro.title}`}
                </li>
              ))}
            </ul>
            <button onClick={() => setModal('niceThing')} className={styles.btn}>
              <AddOutline cssClasses={styles.icon} width={20} height={20} />
              Suggest a nice thing :)
            </button>
          </div>
          <div className={styles.card}>
            <h3>Potential issues</h3>
            <ul>
              {currentMagazine.cons.map((con, i) => (
                <li key={i}>
                  {iconsByName[con.icon]}
                  {con.title}
                </li>
              ))}
            </ul>
            <button onClick={() => setModal('issue')} className={styles.btn}>
              <AddOutline cssClasses={styles.icon} width={20} height={20} />
              Suggest an issue
            </button>
          </div>
        </div>
        <h2>Examples</h2>
        <div className={styles.examples}>
          {currentMagazine.examples?.map((example, i) => (
            <div className={styles.example} key={i}>
              <h3>'{example.title}' by {example.author}</h3>
              <div className={styles.exampleContent}>
                <span className={styles.excerpt}>(excerpt)</span>
                <div className={styles.exampleText}>{example.text}</div>
                {/* <span className={styles.excerpt}>... (excerpt end)</span> */}
              </div>
              <a href={example.link}>
                <BookOutline cssClasses={styles.icon} />
                Read the full piece in the magazine
              </a>
            </div>
          ))}
        </div>
        {modal === 'niceThing' && (
          <Modal
            isOpen
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {!suggestionSubmitted ? (
              <>
                <div className={styles.modalHeader}>
                  <h2>Share a nice thing about {currentMagazine.name} :)</h2>
                  <CloseOutline
                    cssClasses={styles.modalClose}
                    onClick={() => setModal(null)}
                    width="32px"
                    height="32px"
                    color="#316760"
                  />
                </div>
                <span>We'll review it and add it to the list :)</span>
                <textarea rows={6} className={styles.textarea} onChange={e => setSuggestionText(e.target.value)} />
                <button className={`${styles.btn} ${styles.modalBtn}`} onClick={sendSuggestions}>Send</button>
              </>
            ) : (
              <div className={styles.successContainer}>
                <div className={styles.successEmoji}>
                  👌
                </div>
                <div className={styles.success}>
                  <div className={styles.successText}>You're the best. We'll look at your suggestions soon!</div>
                </div>
                <div className={`${styles.btn} ${styles.successBtn}`} onClick={closeModal}>Keep browsing</div>
              </div>
            )}
          </Modal>
        )}
        {modal === 'issue' && (
          <Modal
            isOpen
            onRequestClose={() => setModal(null)}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {!suggestionSubmitted ? (
              <>
                <div className={styles.modalHeader}>
                  <h2>Report an issue for {currentMagazine.name}</h2>
                  <CloseOutline cssClasses={styles.modalClose} onClick={() => setModal(null)} />
                </div>
                <span>We'll review it and add it to the list :)</span>
                <textarea rows={6} className={styles.textarea} onChange={e => setSuggestionText(e.target.value)} />
                <button className={`${styles.btn} ${styles.modalBtn}`} onClick={sendSuggestions}>Send</button>
              </>
            ) : (
              <div className={styles.successContainer}>
                <div className={styles.successEmoji}>
                  👌
                </div>
                <div className={styles.success}>
                  <div className={styles.successText}>You're the best. We'll look at your suggestions soon!</div>
                </div>
                <div className={`${styles.btn} ${styles.successBtn}`} onClick={closeModal}>Keep browsing</div>
              </div>
            )}
          </Modal>
        )}
      </main>

      <Footer />
      <Script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js" />
    </div>
  )
}
