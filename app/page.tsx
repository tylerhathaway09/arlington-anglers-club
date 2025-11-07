'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Trophy, Calendar, Fish, Menu } from 'lucide-react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('about');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['about', 'events', 'gallery', 'leaderboard', 'reviews', 'reports', 'join'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { root: null, rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 88;
      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top - headerOffset;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Events', href: '#events', id: 'events' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Leaderboard', href: '#leaderboard', id: 'leaderboard' },
    { name: 'Reviews', href: '#reviews', id: 'reviews' },
    { name: 'Reports', href: '#reports', id: 'reports' },
    { name: 'Join', href: '#join', id: 'join' },
  ];

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      <header className="fixed top-0 left-0 w-full z-50 transition-colors duration-500 bg-[#800000] shadow-lg rounded-t-3xl rounded-b-3xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-2 font-bold text-xl text-white">
            <Fish className="w-6 h-6 text-white" />
            <span>Arlington Anglers Club</span>
          </div>
          <nav className="hidden md:flex space-x-6 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={
                  activeId === link.id
                    ? 'text-white underline underline-offset-8 decoration-white/70 font-semibold'
                    : 'text-gray-200 hover:text-white transition-colors'
                }
              >
                {link.name}
              </a>
            ))}
          </nav>
          <button className="md:hidden bg-white/10 p-2 rounded-full" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Animated Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="md:hidden bg-[#800000] border-t border-gray-500 flex flex-col items-center py-4 space-y-3 rounded-b-3xl"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-200 hover:text-white text-lg"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center text-center text-white overflow-hidden rounded-b-3xl shadow-xl" id="hero">
        <motion.img
          src="https://arlingtonlandtrust.org/wp-content/uploads/2020/06/ElizabethIsland-041-1024x768.jpg"
          alt="Elizabeth Island Pond"
          className="absolute inset-0 w-full h-full object-cover filter brightness-110 contrast-110 rounded-b-3xl"
          animate={{ scale: [1, 1.06, 1], x: ['-1%', '1%', '-1%'], y: ['0%', '-0.5%', '0%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-black/35 rounded-b-3xl" />
        <motion.div
          className="z-10 backdrop-blur-sm bg-black/30 rounded-3xl px-8 py-4 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg leading-snug">
            Arlington Anglers Club
          </h1>
        </motion.div>
        <motion.div
          className="mt-6 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button size="lg" className="bg-[#800000] hover:bg-[#990000] rounded-3xl shadow-xl text-lg px-8 py-3">
            Join Now
          </Button>
        </motion.div>
      </section>

      {/* About Us */}
      <section id="about" className="scroll-mt-28 md:scroll-mt-32 pt-24 pb-16 bg-white text-center rounded-3xl mx-4 mt-8 shadow-md p-6">
        <h2 className="text-3xl font-bold text-[#800000] mb-6">🎣 About the Arlington Anglers Club: More Than Just Fishing</h2>
        <p className="max-w-4xl mx-auto text-lg text-gray-700">
          Welcome! Our club started with a simple idea and a big passion, proving you don't need a boat or a beard to love fishing—just a good attitude and a fishing rod. We were founded right here in Arlington by a local 6th grader! Starting with a handful of friends and a shared love for local waters like Spy Pond, the club's goal is to grow into a vibrant, family-friendly community.
        </p>
        {/* subtle divider */}
        <div className="my-8 flex justify-center" aria-hidden>
          <svg width="160" height="18" viewBox="0 0 160 18" className="opacity-40">
            <path d="M0 9c20-8 40 8 60 0s40 8 60 0 40 8 40 8" fill="none" stroke="#800000" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-[#800000] mb-4">Our Core Catch: Fun, Learning, and Community</h3>
        <ul className="max-w-4xl mx-auto text-left md:text-center text-gray-700 space-y-3">
          <li>🎉 <span className="font-semibold">Fun:</span> Fishing should always be enjoyable! We keep our events lighthearted and welcoming, whether it's a casual Sunday morning cast or a lively evening clinic.</li>
          <li>🧠 <span className="font-semibold">Learning:</span> We're committed to passing on the passion. Our club plans to offer tutorials on everything from knot-tying and tackle selection to reading the water and local conservation practices. Beginners are always welcome!</li>
          <li>🏆 <span className="font-semibold">Friendly Competition:</span> We love a little challenge! Our friendly tournaments will be a great way to improve your skills and win bragging rights (and maybe a small trophy!). It's all about mutual respect and cheering on the next big catch.</li>
          <li>🤝 <span className="font-semibold">Community Involvement:</span> We believe in protecting the places we fish. We organize regular clean-up days, support local conservation efforts, and host community education events to keep our waters healthy for everyone.</li>
        </ul>
        {/* subtle divider */}
        <div className="my-8 flex justify-center" aria-hidden>
          <svg width="200" height="18" viewBox="0 0 200 18" className="opacity-40">
            <path d="M0 9c30-10 60 10 90 0s60 10 110 0" fill="none" stroke="#9a1a1a" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-[#800000] mb-3">Join the School of Fish!</h3>
        <p className="max-w-4xl mx-auto text-lg text-gray-700">
          Whether you're a seasoned angler who knows every local honey hole or you're looking to cast your very first line, the Arlington Anglers Club is your home base. We're proud of our local roots and the friendly, enthusiastic environment our young founder created.
        </p>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="scroll-mt-28 md:scroll-mt-32 py-16 bg-gray-100 text-center rounded-3xl mx-4 mt-8 shadow-md">
        <h2 className="text-3xl font-bold text-[#800000] mb-10">Upcoming Events</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: 'Spring Bass Tournament', date: 'April 20, 2026' },
            { title: 'Family Fishing Derby', date: 'June 10, 2026' },
            { title: 'Fall Catch & Release Challenge', date: 'September 15, 2026' },
          ].map((event, i) => (
            <Card key={i} className="rounded-3xl shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <Calendar className="mx-auto text-[#800000] w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-gray-600">{event.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="gallery" className="scroll-mt-28 md:scroll-mt-32 py-16 bg-white text-center rounded-3xl mx-4 mt-8 shadow-md">
        <h2 className="text-3xl font-bold text-[#800000] mb-10">Photo Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <motion.img
              key={n}
              src={`https://source.unsplash.com/400x400/?fishing,angler,fish&sig=${n}`}
              alt="Fishing"
              className="rounded-3xl shadow-md hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </section>

      {/* Leaderboard */}
      <section id="leaderboard" className="scroll-mt-28 md:scroll-mt-32 py-16 bg-gray-100 text-center rounded-3xl mx-4 mt-8 shadow-md">
        <h2 className="text-3xl font-bold text-[#800000] mb-10">Top Anglers</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { name: 'John Fisher', fish: '8.6 lb Largemouth Bass' },
            { name: 'Sarah Hooks', fish: '7.2 lb Pike' },
            { name: 'Tom Reeler', fish: '6.9 lb Trout' },
          ].map((angler, i) => (
            <Card key={i} className="rounded-3xl shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <Trophy className="mx-auto text-[#800000] w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold">{angler.name}</h3>
                <p className="text-gray-600">{angler.fish}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Product Reviews */}
      <section id="reviews" className="scroll-mt-28 md:scroll-mt-32 py-16 bg-gray-50 text-center rounded-3xl mx-4 mt-8 shadow-md">
        <h2 className="text-3xl font-bold text-[#800000] mb-10">Product Reviews</h2>
        <p className="max-w-3xl mx-auto text-gray-700 mb-8">Check out our latest gear reviews, tackle tests, and fishing equipment breakdowns. Watch and learn what works best on the water!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((n) => (
            <div key={n} className="aspect-video bg-gray-300 rounded-3xl flex items-center justify-center shadow-md">
              <span className="text-gray-600">Video Placeholder {n}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reports Section */}
      <section id="reports" className="scroll-mt-28 md:scroll-mt-32 py-16 bg-white text-center rounded-3xl mx-4 mt-8 shadow-md">
        <h2 className="text-3xl font-bold text-[#800000] mb-6">Fishing Reports</h2>
        <div className="max-w-3xl mx-auto text-left space-y-6">
          {[
            { title: 'Great Week on the Mystic River', date: 'October 15, 2025', body: 'Members reported a surge in smallmouth bass activity near the north bend. Top baits: spinnerbaits and soft plastics.' },
            { title: 'Fall Pike Action is Heating Up', date: 'October 10, 2025', body: 'Cooler temps brought larger pike closer to shore. Early morning bites have been most productive.' },
          ].map((report, i) => (
            <Card key={i} className="rounded-3xl shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">{report.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{report.date}</p>
                <p className="text-gray-700">{report.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact / Join Form */}
      <section id="join" className="scroll-mt-28 md:scroll-mt-32 py-16 bg-gray-100 text-center rounded-3xl mx-4 mt-8 shadow-md">
        <h2 className="text-3xl font-bold text-[#800000] mb-6">Join the Club</h2>
        <p className="text-gray-700 mb-8">Interested in becoming a member or have questions? Drop us a line!</p>
        <form className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <input type="text" placeholder="Your Name" className="w-full border border-gray-300 rounded-3xl p-3 focus:outline-none focus:ring-2 focus:ring-[#800000]" />
          <input type="email" placeholder="Your Email" className="w-full border border-gray-300 rounded-3xl p-3 focus:outline-none focus:ring-2 focus:ring-[#800000]" />
          <textarea placeholder="Your Message" rows={4} className="w-full border border-gray-300 rounded-3xl p-3 focus:outline-none focus:ring-2 focus:ring-[#800000]" />
          <Button className="bg-[#800000] hover:bg-[#990000] rounded-3xl w-full shadow-lg hover:shadow-xl transition-all">Send Message</Button>
        </form>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#800000] text-white text-center rounded-t-3xl rounded-b-3xl mt-8">
        <div className="flex justify-center space-x-4 mb-2">
          <Fish className="w-5 h-5" />
          <Mail className="w-5 h-5" />
        </div>
        <p>&copy; {new Date().getFullYear()} Arlington Anglers Club. All rights reserved.</p>
      </footer>
    </div>
  );
}
