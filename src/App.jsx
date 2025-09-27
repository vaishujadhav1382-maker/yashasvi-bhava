import React, { useEffect, useRef, useState } from 'react'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchInputRef = useRef(null)
  const headerRef = useRef(null)

  // Helpers
  const getHeaderHeight = () => headerRef.current ? headerRef.current.offsetHeight : 80

  // Behaviors from script.js in React
  useEffect(() => {
    // Fade-in on scroll
    const fadeElements = Array.from(document.querySelectorAll('.fade-in'))
    const appearOptions = { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      })
    }, appearOptions)
    fadeElements.forEach(el => appearOnScroll.observe(el))

    // Smooth scrolling for anchor links
    const onAnchorClick = (e) => {
      const anchor = e.currentTarget
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      const top = target.getBoundingClientRect().top + window.scrollY - getHeaderHeight() - 10
      window.scrollTo({ top, behavior: 'smooth' })
      setMenuOpen(false)
    }
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]'))
    anchors.forEach(a => a.addEventListener('click', onAnchorClick))

    // Scrollspy
    const navLinks = Array.from(document.querySelectorAll('.nav-links a'))
    const map = new Map()
    navLinks.forEach(a => { const href = a.getAttribute('href'); if (href && href.startsWith('#')) map.set(href, a) })
    const sections = Array.from(map.keys()).map(sel => document.querySelector(sel)).filter(Boolean)
    let spyObserver
    if (sections.length) {
      spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const id = `#${entry.target.id}`
          const link = map.get(id)
          if (!link) return
          if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'))
            link.classList.add('active')
          }
        })
      }, { root: null, threshold: 0.5, rootMargin: `-${getHeaderHeight()}px 0px -40% 0px` })
      sections.forEach(sec => spyObserver.observe(sec))
    }

    // Forms submit simulation
    const onFormSubmit = async (e) => {
      e.preventDefault()
      const form = e.currentTarget
      const status = form.querySelector('.form-status')
      const submitBtn = form.querySelector('button[type="submit"]')
      if (submitBtn) {
        submitBtn.disabled = true
        submitBtn.dataset.prevText = submitBtn.textContent || ''
        submitBtn.textContent = 'Sending...'
        submitBtn.style.opacity = '0.7'
      }
      await new Promise(r => setTimeout(r, 1000))
      if (status) {
        status.textContent = 'Message sent! We will get back to you soon.'
        status.classList.add('success')
        setTimeout(() => { status.textContent = ''; status.classList.remove('success') }, 4000)
      }
      if (submitBtn) {
        submitBtn.disabled = false
        submitBtn.textContent = submitBtn.dataset.prevText || 'Send Message'
        submitBtn.style.opacity = '1'
        submitBtn.classList.add('sent-bounce')
        setTimeout(() => submitBtn.classList.remove('sent-bounce'), 600)
      }
    }
    const forms = Array.from(document.querySelectorAll('form'))
    forms.forEach(f => f.addEventListener('submit', onFormSubmit))

    return () => {
      anchors.forEach(a => a.removeEventListener('click', onAnchorClick))
      forms.forEach(f => f.removeEventListener('submit', onFormSubmit))
      appearOnScroll.disconnect()
      if (spyObserver) spyObserver.disconnect()
    }
  }, [])

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // Testimonials data for Feedback section
  const testimonials = [
    { name: 'राहुल शर्मा', role: 'व्यापारी', location: 'मुंबई', rating: 5, comment: 'Yashasvibhav च्या सेवा खरोखरच उत्तम आहेत. आमच्या व्यवसायाला डिजिटल प्लॅटफॉर्मवर चांगली ओळख मिळाली आहे.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    { name: 'प्रिया पाटील', role: 'सामाजिक कार्यकर्ता', location: 'पुणे', rating: 5, comment: 'माझ्या सामाजिक कामांसाठी उत्तम डिझाइन आणि व्हिडिओ मिळतात. त्यांची सेवा खरोखर प्रभावी आहे.', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
    { name: 'अमित जोशी', role: 'डिजिटल मार्केटर', location: 'नागपूर', rating: 5, comment: 'मराठी कंटेंटसाठी हे सर्वोत्तम प्लॅटफॉर्म आहे. क्वालिटी आणि सेवा दोन्ही उत्कृष्ट आहे.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    { name: 'सुनीता देशपांडे', role: 'शिक्षिका', location: 'कोल्हापूर', rating: 4, comment: 'शैक्षणिक क्षेत्रातील काम करण्यासाठी उत्तम डिझाइन मिळतात. विद्यार्थ्यांना खूप आवडतात.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
    { name: 'विकास कुलकर्णी', role: 'उद्योजक', location: 'औरंगाबाद', rating: 5, comment: 'आमच्या स्टार्टअपसाठी कमी खर्चात उत्तम ब्रँडिंग सोल्यूशन मिळाले. खरोखरच संतुष्ट आहोत.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
    { name: 'मीरा वाघ', role: 'इव्हेंट ऑर्गनायझर', location: 'नाशिक', rating: 5, comment: 'सणासुदीच्या कार्यक्रमांसाठी लागणारे सर्व डिझाइन येथे मिळतात. वेळेवर आणि दर्जेदार सेवा.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
  ]

  return (
    <>
      {/* Header & Navigation */}
      <header ref={headerRef}>
        <div className="container">
          <nav>
            <div className="logo">
              <img src="/yb logo.jpg" alt="Yashasvi Bhav Logo" className="logo-image" onError={(e) => { e.currentTarget.style.display='none'; const sib = e.currentTarget.nextElementSibling; if (sib && sib.style) sib.style.display='inline-block' }} />
              <span className="logo-text" style={{ display: 'none' }}>Yashasvi Bhav</span>
            </div>
            <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#download" className="btn">Download App</a></li>
            </ul>
            <div className="nav-actions">
              <div className={`nav-search ${searchOpen ? 'active' : ''}`}>
                <input
                  type="text"
                  className="nav-search-input"
                  placeholder="Search..."
                  ref={searchInputRef}
                  onBlur={() => setSearchOpen(false)}
                  onKeyDown={(e) => { if (e.key === 'Escape') setSearchOpen(false) }}
                />
                <button
                  type="button"
                  className="nav-search-btn"
                  aria-label="Toggle search"
                  onClick={() => setSearchOpen(v => !v)}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(v => !v)}>
              <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-animated-bg" aria-hidden="true">
          <span className="orb orb-1"></span>
          <span className="orb orb-2"></span>
          <span className="orb orb-3"></span>
          <span className="orb orb-4"></span>
          <span className="orb orb-5"></span>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <p>तुमच्या प्रत्येक क्षणाला द्या डिजिटल स्पर्श...</p>
              <h1 className="hero-title">YASHASVI BHAVA</h1>
              <p>तुमच्या भावनांना सुंदर शब्द आणि डिझाईन्सची जोड, आता फक्त एका क्लिकवर!!</p>
              <div className="hero-cta">
                <a href="#download" className="btn btn-animated">
                  <span>Get Started Now</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
                <a href="#download" className="btn btn-animated btn-outline">
                  <span>Download Now</span>
                  <i className="fas fa-download"></i>
                </a>
              </div>
            </div>
            <div className="hero-image">
              <div className="mobile-mockup">
                <div className="mobile-frame">
                  <div className="mobile-screen">
                    <div className="mobile-header">
                      <div className="status-bar">
                        <span className="time">3:37</span>
                        <div className="status-icons">
                          <i className="fas fa-signal"></i>
                          <i className="fas fa-wifi"></i>
                          <i className="fas fa-battery-three-quarters"></i>
                        </div>
                      </div>
                      <div className="app-header">
                        <i className="fas fa-arrow-left"></i>
                        <img src="/yb logo.jpg" alt="Yashasvi Bhav" className="app-logo" onError={(e) => { if (e.currentTarget && e.currentTarget.style) e.currentTarget.style.display='none' }} />
                        <span className="app-title">Yashasvi Bhav</span>
                        <i className="fas fa-share-alt"></i>
                      </div>
                    </div>
                    {/* Grid-based content inside the phone */}
                    <div className="mobile-content grid-mode">
                      <div className="poster-grid">
                        <img src="/img/busns1.jpg" alt="Poster" className="poster-cell" />
                        <img src="/img/poster2.png" alt="Poster" className="poster-cell" />
                        <img src="/img/p1.jpeg" alt="Poster" className="poster-cell" />
                        <img src="/img/poster9.jpeg" alt="Poster" className="poster-cell" />
                        <img src="/img/busns3.jpeg" alt="Poster" className="poster-cell" />
                        <img src="/img/poster6.jpg" alt="Poster" className="poster-cell" />
                        <img src="/img/busns1.jpg" alt="Poster" className="poster-cell" />
                        <img src="/img/poster2.png" alt="Poster" className="poster-cell" />
                        <img src="/img/p1.jpeg" alt="Poster" className="poster-cell" />
                      </div>
                      {/* Floating badges like the screenshot, but styled uniquely */}
                      <div className="floating-badge premium"><i className="fas fa-star"></i> प्रीमियम</div>
                      <div className="floating-pill lang">मराठी <small>डिझाइन्स</small></div>

                      {/* Floating toolbox in remaining space */}
                      <div className="toolbox">
                        <button className="tool-btn"><i className="fas fa-crop"></i><span>Crop</span></button>
                        <button className="tool-btn primary"><i className="fas fa-magic"></i><span>Create</span></button>
                        <button className="tool-btn"><i className="fas fa-edit"></i><span>Edit</span></button>
                      </div>
                    </div>
                  </div>
                  <div className="mobile-reflection"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <h2 className="section-title">About Yashasvi Bhav</h2>
          <div className="about-content">
            <div className="about-image fade-in">
              <div className="about-visual">
                <div className="creative-showcase">
                  <div className="showcase-item item-1">
                    <div className="mini-card birthday">
                      <i className="fas fa-birthday-cake"></i>
                      <span>Happy Birthday!</span>
                    </div>
                  </div>
                  <div className="showcase-item item-2">
                    <div className="mini-card festival">
                      <i className="fas fa-om"></i>
                      <span>Festival Wishes</span>
                    </div>
                  </div>
                  <div className="showcase-item item-3">
                    <div className="mini-card anniversary">
                      <i className="fas fa-heart"></i>
                      <span>Anniversary</span>
                    </div>
                  </div>
                  <div className="showcase-item item-4">
                    <div className="mini-card thank-you">
                      <i className="fas fa-hands-helping"></i>
                      <span>Thank You</span>
                    </div>
                  </div>
                  <div className="central-logo">
                    <div className="logo-circle">
                      <i className="fas fa-spa"></i>
                      <div className="pulse-ring"></div>
                      <div className="pulse-ring delay-1"></div>
                      <div className="pulse-ring delay-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-text fade-in">
              <div className="text-content">
                <h3><i className="fas fa-rocket"></i> Our Mission</h3>
                <p>यशस्वी भव डिजिटल शुभेच्छांद्वारे लोक कसे जोडले जातात यात सकारात्मक बदल घडवतो. प्रत्येक साजरीकरणाला खर्‍या भावनांचे प्रतिबिंब असलेला वैयक्तिक स्पर्श मिळावा आणि अविस्मरणीय आठवणी तयार व्हाव्यात, असा आमचा विश्वास आहे.</p>
                <p>आमचे नाविन्यपूर्ण प्लॅटफॉर्म अत्याधुनिक डिझाइन साधने आणि सांस्कृतिक अस्सलतेचा संगम करतो, ज्यामुळे आपल्या आवडीनुसार सुंदर शुभेच्छा सहज तयार करता येतात.</p>

                <h3><i className="fas fa-star"></i> Why Choose Us</h3>
                <div className="features-list">
                  <div className="feature-point">
                    <i className="fas fa-check-circle"></i>
                    <span><strong>1000+ Templates</strong> - Handcrafted designs for every occasion</span>
                  </div>
                  <div className="feature-point">
                    <i className="fas fa-check-circle"></i>
                    <span><strong>AI-Powered Customization</strong> - Smart suggestions based on your preferences</span>
                  </div>
                  <div className="feature-point">
                    <i className="fas fa-check-circle"></i>
                    <span><strong>Instant Sharing</strong> - One-click sharing across all platforms</span>
                  </div>
                  <div className="feature-point">
                    <i className="fas fa-check-circle"></i>
                    <span><strong>Cultural Authenticity</strong> - Designs that honor traditions</span>
                  </div>
                </div>

                <div className="stats-container">
                  <div className="stat-item">
                    <div className="stat-number">50K+</div>
                    <div className="stat-label">Happy Users</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">1M+</div>
                    <div className="stat-label">Wishes Created</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">4.8★</div>
                    <div className="stat-label">App Rating</div>
                  </div>
                </div>

                <a href="#features" className="btn btn-enhanced">
                  <span>Explore Features</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">App Features</h2>
          <div className="features-grid">
            <div className="feature-card fade-in">
              <div className="feature-icon">
                <i className="fas fa-birthday-cake"></i>
              </div>
              <h3>वाढदिवसाच्या शुभेच्छा</h3>
              <p>फोटो आणि वैयक्तिक संदेशांसह आकर्षक वाढदिवस शुभेच्छा तयार करा</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">
                <i className="fas fa-praying-hands"></i>
              </div>
              <h3>सणांच्या शुभेच्छा</h3>
              <p>नवरात्र, दिवाळी, ख्रिसमस आणि सर्व प्रमुख सणांसाठी शुभेच्छा पाठवा</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">
                <i className="fas fa-photo-video"></i>
              </div>
              <h3>फोटो आणि व्हिडिओ इफेक्ट्स</h3>
              <p>आपल्या निर्मितींना सुंदर फिल्टर्स, अ‍ॅनिमेशन आणि इफेक्ट्स जोडा</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">
                <i className="fas fa-share-alt"></i>
              </div>
              <h3>सोपे शेअरिंग</h3>
              <p>आपल्या निर्मिती व्हॉट्सॲप, फेसबुक आणि इतर प्लॅटफॉर्मवर त्वरित शेअर करा</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">
                <i className="fas fa-theater-masks"></i>
              </div>
              <h3>प्रसंगी टेम्पलेट्स</h3>
              <p>प्रत्येक प्रसंगासाठी शेकडो सुंदर टेम्पलेट्समधून निवडा</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">
                <i className="fas fa-cloud-download-alt"></i>
              </div>
              <h3>क्लाउड स्टोरेज</h3>
              <p>आपल्या निर्मिती सुरक्षितपणे जतन करा आणि कोणत्याही डिव्हाइसवरून प्रवेश करा</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Videos Section */}
      <section className="demo-videos" id="videos">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="how-grid">
            <div className="how-text fade-in">
              <ol className="how-steps">
                <li>
                  <span className="step-icon"><i className="fas fa-download"></i></span>
                  <div>
                    <h4>ॲप डाउनलोड करा</h4>
                    <p>Play Store/App Store वरून इंस्टॉल करा आणि साइन-इन करा.</p>
                  </div>
                </li>
                <li>
                  <span className="step-icon"><i className="fas fa-images"></i></span>
                  <div>
                    <h4>टेम्पलेट निवडा</h4>
                    <p>1000+ सण आणि कार्यक्रमांच्या डिझाइन्समधून निवडा.</p>
                  </div>
                </li>
                <li>
                  <span className="step-icon"><i className="fas fa-edit"></i></span>
                  <div>
                    <h4>सोप्या पद्धतीने कस्टमाइज करा</h4>
                    <p>तुमचा फोटो, नाव आणि संदेश काही सेकंदात जोडा.</p>
                  </div>
                </li>
                <li>
                  <span className="step-icon"><i className="fas fa-share-alt"></i></span>
                  <div>
                    <h4>शेअर करा</h4>
                    <p>WhatsApp, Instagram आणि इतर ठिकाणी पोस्ट करा.</p>
                  </div>
                </li>
              </ol>
              <a href="#download" className="btn btn-animated"><span>Get the App</span><i className="fas fa-arrow-right"></i></a>
            </div>
            <div className="how-video fade-in">
              <div className="video-container mobile-video">
                <div className="mobile-mockup video-mockup">
                  <div className="mobile-frame">
                    <div className="mobile-screen">
                      <video src="/demo.mp4" controls playsInline></video>
                    </div>
                    <div className="mobile-reflection"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery" id="gallery">
        <div className="container">
          <h2 className="section-title">Demo Gallery</h2>
          <div className="gallery-grid">
            <div className="gallery-item fade-in">
              <img src="/img/busns1.jpg" alt="Gallery Image 1" />
              <div className="gallery-overlay"><i className="fas fa-search-plus"></i></div>
            </div>
            <div className="gallery-item fade-in">
              <img src="/img/poster2.png" alt="Gallery Image 2" />
              <div className="gallery-overlay"><i className="fas fa-search-plus"></i></div>
            </div>
            <div className="gallery-item fade-in">
              <img src="/img/p1.jpeg" alt="Gallery Image 3" />
              <div className="gallery-overlay"><i className="fas fa-search-plus"></i></div>
            </div>
            <div className="gallery-item fade-in">
              <img src="/img/poster9.jpeg" alt="Gallery Image 4" />
              <div className="gallery-overlay"><i className="fas fa-search-plus"></i></div>
            </div>
            <div className="gallery-item fade-in">
              <img src="/img/busns3.jpeg" alt="Gallery Image 5" />
              <div className="gallery-overlay"><i className="fas fa-search-plus"></i></div>
            </div>
            <div className="gallery-item fade-in">
              <img src="/img/poster6.jpg" alt="Gallery Image 6" />
              <div className="gallery-overlay"><i className="fas fa-search-plus"></i></div>
            </div>
            <div className="gallery-item fade-in">
              <div className="custom-card thank-you-card">
                <i className="fas fa-gift heart"></i>
                <h3>Thank You Messages</h3>
                <p>Express gratitude with beautiful animated cards</p>
              </div>
              <div className="gallery-overlay"><i className="fas fa-search-plus"></i></div>
            </div>
            <div className="gallery-item fade-in">
              <div className="custom-card congratulations-card">
                <div className="gift-box">
                  <div className="lid"></div>
                  <div className="box"></div>
                  <div className="ribbon"></div>
                  <div className="bow"></div>
                </div>
                <h3>Congratulations</h3>
                <p>Celebrate achievements with animated gift boxes</p>
              </div>
              <div className="gallery-overlay"><i className="fas fa-search-plus"></i></div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="subscription" id="subscription">
        <div className="container">
          <h2 className="section-title">Stay Updated</h2>
          <p>Subscribe to our newsletter to get notified about new features, templates, and special offers</p>
          <form className="subscription-form fade-in">
            <input type="email" placeholder="Your Email Address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-grid">
            <div className="contact-info fade-in">
              <h3>Get In Touch</h3>
              <div className="contact-detail">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4>Address</h4>
                  <p>123 App Street, Mumbai, India</p>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>support@yashasvibhav.com</p>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h4>Business Hours</h4>
                  <p>Mon-Sat: 9AM - 6PM</p>
                </div>
              </div>
            </div>
            <div className="contact-form fade-in">
              <h3>Send Message</h3>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input type="email" id="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea id="message" required></textarea>
                </div>
                <button type="submit" className="btn">Send Message</button>
                <div className="form-status" aria-live="polite"></div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback / Testimonials Section */}
      <section id="feedback" className="feedback">
        <div className="container">
          <div className="feedback-header">
            <h2 className="section-title">Our Customers <span className="gradient-text">Say</span></h2>
            <p className="feedback-subtitle">Read honest feedback from our customers about our services</p>
          </div>
          <div className="feedback-grid">
            {testimonials.map((t, idx) => (
              <div className="feedback-card" key={idx}>
                <div className="feedback-card-head">
                  <div className="avatar"><img src={t.avatar} alt={t.name} onError={(e)=>{e.currentTarget.style.visibility='hidden'}}/></div>
                  <div>
                    <h4 className="feedback-name">{t.name}</h4>
                    <div className="feedback-meta">{t.role} • {t.location}</div>
                  </div>
                </div>
                <div className="stars">
                  {Array.from({length:5}).map((_,i)=> (
                    <i key={i} className={`fa-star ${i < t.rating ? 'fas' : 'far'}`}></i>
                  ))}
                </div>
                <div className="feedback-quote">
                  <i className="fas fa-quote-left quote-icon"></i>
                  <p>"{t.comment}"</p>
                </div>
              </div>
            ))}
          </div>
          <div className="feedback-stats">
            <p>आपणही आमच्या समाधानकारक ग्राहकांच्या यादीत सामील व्हा</p>
            <div className="feedback-badges">
              <span>⭐ 500+ समाधानकारक ग्राहक</span>
              <span>⭐ 4.8/5 सरासरी रेटिंग</span>
              <span>⭐ 1000+ प्रोजेक्ट पूर्ण</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <div className="footer-logo">
                <img src="/yb logo.jpg" alt="Yashasvi Bhav Logo" className="footer-logo-image" onError={(e) => { e.currentTarget.style.display='none'; const sib = e.currentTarget.nextElementSibling; if (sib && sib.style) sib.style.display='inline-block' }} />
                <span className="footer-logo-text" style={{ display: 'none' }}>Yashasvi Bhav</span>
              </div>
              <p>Creating meaningful digital connections through beautiful wishes and greetings for every occasion.</p>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Download</h3>
              <ul>
                <li><a href="#"><i className="fab fa-google-play"></i> Google Play</a></li>
                <li><a href="#"><i className="fab fa-apple"></i> App Store</a></li>
                <li><a href="#"><i className="fas fa-globe"></i> Web App</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Contact Us</h3>
              <ul>
                <li><i className="fas fa-envelope"></i> support@yashasvibhav.com</li>
                <li><i className="fas fa-phone"></i> +91 98765 43210</li>
                <li><i className="fas fa-map-marker-alt"></i> Mumbai, India</li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>© 2023 Yashasvi Bhav App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
