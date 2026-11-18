import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, ArrowRight, ChevronDown, Plus, PlayCircle, Clock, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import SmartGastroText from '../components/SmartGastroText';
import { PageHero, Reveal, CtaBand } from '../components/Sections';
import { useShop } from '../context/ShopContext';
import { COURSES, CONTACT_HREF } from '../constants';

type Course = (typeof COURSES)[number];

export default function Academy() {
  const { addToCart } = useShop();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(COURSES[0].id);
  const [added, setAdded] = useState<string | null>(null);

  const handleAddLesson = (course: Course, lessonName: string) => {
    const id = `${course.id}-lesson-${lessonName.replace(/\s+/g, '-').toLowerCase()}`;
    addToCart({
      id,
      title: `${course.title}: ${lessonName}`,
      price: course.pricePerLesson,
      priceLabel: `Einzel-Lektion (CHF ${course.pricePerLesson})`
    });
    setAdded(id);
    window.setTimeout(() => setAdded((a) => (a === id ? null : a)), 1500);
  };

  const handleAddBundle = (course: Course) => {
    addToCart({
      id: `${course.id}-bundle`,
      title: `${course.title} (Komplett-Paket)`,
      price: (course.lessons.length - 1) * course.pricePerLesson,
      priceLabel: `Alle ${course.lessons.length} Lektionen (1 geschenkt)`
    });
    navigate('/warenkorb');
  };

  return (
    <>
      <PageMeta
        title="Academy: Online-Kurse für die Gastronomie"
        description="Masterclass «Digitale Speisekarte»: 12 Video-Lektionen von der QR-Code-Erstellung bis zur Menü-Psychologie. Ab CHF 9 pro Lektion."
      />
      <PageHero
        eyebrow="SmartGastro Academy"
        title={<>Lernen Sie, Ihren Betrieb <span className="text-forest">selbst</span> zu digitalisieren.</>}
        lead="Praxisnahe Video-Kurse von einem Koch für Gastronomen. Kaufen Sie einzelne Lektionen nach Bedarf oder das Komplett-Paket, bei dem eine Lektion geschenkt ist."
      />

      <section className="pb-24">
        <div className="container-x grid lg:grid-cols-3 gap-6">
          {COURSES.map((course, idx) => {
            const soon = course.status === 'soon';
            const isOpen = expanded === course.id;
            return (
              <Reveal key={course.id} delay={idx * 0.06}>
                <article className="card overflow-hidden flex flex-col h-full">
                  <div className="relative aspect-[16/9] bg-anthrazit overflow-hidden">
                    <img src={`/assets/img/${course.img}`} alt="" loading="lazy" className={`absolute inset-0 w-full h-full object-cover ${soon ? 'opacity-50 grayscale-[40%]' : ''}`} />
                    <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${soon ? 'bg-white text-anthrazit' : 'bg-accent text-anthrazit'}`}>
                      {soon ? 'In Produktion' : 'Jetzt verfügbar'}
                    </span>
                    {!soon && <PlayCircle size={56} className="absolute inset-0 m-auto text-white/90 drop-shadow-lg" />}
                  </div>

                  <div className="p-7 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-xs font-semibold text-anthrazit/55">
                      <span className="rounded-full bg-forest/10 text-forest px-2.5 py-1">{course.level}</span>
                      <span className="inline-flex items-center gap-1"><Clock size={13} />{course.duration}</span>
                      <span>{course.lessons.length} Lektionen</span>
                    </div>
                    <h2 className="text-2xl mt-4">{course.title}</h2>
                    <p className="text-anthrazit/70 mt-3 leading-relaxed">{course.desc}</p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-hellgrau p-4">
                        <p className="text-xs text-anthrazit/55">Pro Lektion</p>
                        <p className="font-display text-xl font-bold mt-1">CHF {course.pricePerLesson}</p>
                      </div>
                      <div className="rounded-2xl bg-forest/[0.07] p-4">
                        <p className="text-xs text-forest">Komplett-Paket</p>
                        <p className="font-display text-xl font-bold text-forest mt-1">CHF {(course.lessons.length - 1) * course.pricePerLesson}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpanded(isOpen ? null : course.id)}
                      aria-expanded={isOpen}
                      className="mt-6 flex items-center justify-between w-full py-3 border-t border-linie text-sm font-semibold"
                    >
                      Lektionen anzeigen
                      <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ol initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          {course.lessons.map((lesson, i) => {
                            const id = `${course.id}-lesson-${lesson.replace(/\s+/g, '-').toLowerCase()}`;
                            return (
                              <li key={lesson} className="flex items-center justify-between gap-3 py-2.5 text-sm border-b border-linie/70 last:border-0">
                                <span className="text-anthrazit/75"><span className="text-anthrazit/40 tabular-nums mr-2">{String(i + 1).padStart(2, '0')}</span>{lesson}</span>
                                {!soon && (
                                  <button
                                    onClick={() => handleAddLesson(course, lesson)}
                                    aria-label={`Lektion «${lesson}» in den Warenkorb`}
                                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${added === id ? 'bg-forest text-white border-forest' : 'border-linie hover:bg-forest hover:text-white hover:border-forest'}`}
                                  >
                                    {added === id ? <CheckCircle size={15} /> : <Plus size={15} />}
                                  </button>
                                )}
                              </li>
                            );
                          })}
                        </motion.ol>
                      )}
                    </AnimatePresence>

                    <div className="mt-auto pt-6">
                      {soon ? (
                        <Link to={CONTACT_HREF} className="btn-ghost w-full"><Bell size={16} /> Bei Start informieren</Link>
                      ) : (
                        <button onClick={() => handleAddBundle(course)} className="btn-primary w-full">
                          Komplett-Paket kaufen <ArrowRight size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="py-24 bg-white border-y border-linie">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <p className="eyebrow mb-4">Warum die <SmartGastroText withAcademy className="!text-xs" /></p>
            <h2 className="h-section">Von Gastronomen für Gastronomen</h2>
            <ul className="mt-8 space-y-4">
              {[
                'Praxisnahe Inhalte aus dem echten Gastro-Alltag',
                'Jederzeit und überall verfügbar, auch auf dem Handy',
                'Zertifikat nach erfolgreichem Abschluss',
                'Inklusive Vorlagen und Checklisten für Ihren Betrieb',
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle className="text-primary mt-0.5 shrink-0" size={22} />
                  <span className="text-lg text-anthrazit/80">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[1.5rem] overflow-hidden aspect-video bg-anthrazit shadow-xl">
              <iframe
                src="https://www.youtube-nocookie.com/embed/xEAaUUx6iMw"
                title="Datenbereinigung in der Gastronomie"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="text-sm text-anthrazit/55 mt-3">Einblick: Datenbereinigung in der Gastronomie</p>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Sie möchten Unterstützung bei der Umsetzung?" text="Wenn Sie die Umsetzung nicht selbst machen möchten, übernehme ich das für Sie, vom Konzept bis zum Go-Live." />
    </>
  );
}
