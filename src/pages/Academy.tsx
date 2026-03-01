import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlayCircle, BookOpen, Award, CheckCircle, ArrowRight, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SmartGastroText from '../components/SmartGastroText';
import { useShop } from '../context/ShopContext';
import { COURSES } from '../constants';

export default function Academy() {
  const { addToCart } = useShop();
  const navigate = useNavigate();
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const handleAddLesson = (course: typeof COURSES[0], lessonName: string) => {
    addToCart({
      id: `${course.id}-lesson-${lessonName.replace(/\s+/g, '-').toLowerCase()}`,
      title: `${course.title}: ${lessonName}`,
      price: course.pricePerLesson,
      priceLabel: `Einzel-Lektion (CHF ${course.pricePerLesson})`
    });
  };

  const handleAddBundle = (course: typeof COURSES[0]) => {
    const bundlePrice = (course.lessons.length - 1) * course.pricePerLesson;
    addToCart({
      id: `${course.id}-bundle`,
      title: `${course.title} (Komplett-Paket)`,
      price: bundlePrice,
      priceLabel: `Alle ${course.lessons.length} Lektionen (1 geschenkt)`
    });
    navigate('/warenkorb');
  };

  return (
    <div className="py-24 bg-hellgrau">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl mb-4">
            <SmartGastroText withAcademy />
          </h1>
          <div className="inline-block px-6 py-2 bg-accent text-anthrazit text-sm font-bold rounded-full mb-8 tracking-[0.2em] uppercase shadow-sm">
            Coming Soon
          </div>
          <p className="text-xl text-anthrazit/70 max-w-3xl mx-auto leading-relaxed">
            Wählen Sie aus unseren spezialisierten Modulen. Kaufen Sie einzelne Lektionen nach Bedarf oder das Komplett-Paket zum Vorzugspreis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {COURSES.map((course, idx) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden card-shadow flex flex-col h-full"
            >
              <div className="h-48 bg-anthrazit relative flex items-center justify-center group cursor-pointer overflow-hidden">
                <img 
                  src={`/assets/img/${course.img}`} 
                  alt={course.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${course.id}/600/400`;
                  }}
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors"></div>
                <PlayCircle size={64} className="text-white relative z-10 opacity-80 group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex items-center space-x-4 mb-4 text-xs font-bold uppercase tracking-widest text-primary">
                  <span className="bg-primary/10 px-3 py-1 rounded-full">{course.level}</span>
                  <span className="text-anthrazit/40">{course.duration}</span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">{course.title}</h3>
                
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between items-center p-3 bg-hellgrau rounded-xl border border-black/5">
                    <span className="text-sm font-medium">Pro Lektion</span>
                    <span className="font-bold text-primary">CHF {course.pricePerLesson}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary/5 rounded-xl border border-primary/10">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-primary">Komplett-Paket</span>
                      <span className="text-[10px] text-primary/60 uppercase font-bold">1 Lektion geschenkt!</span>
                    </div>
                    <span className="font-bold text-primary">CHF {(course.lessons.length - 1) * course.pricePerLesson}</span>
                  </div>
                </div>

                <p className="text-anthrazit/70 mb-8 leading-relaxed">{course.desc}</p>

                <div className="mt-auto space-y-4">
                  <button
                    onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                    className={`w-full py-3 text-sm font-bold transition-all flex items-center justify-center space-x-2 rounded-xl shadow-sm ${
                      expandedCourse === course.id 
                        ? 'bg-accent text-anthrazit' 
                        : 'bg-accent/20 text-anthrazit hover:bg-accent'
                    }`}
                  >
                    <span>Lektionen anzeigen ({course.lessons.length})</span>
                    {expandedCourse === course.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  <AnimatePresence>
                    {expandedCourse === course.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 pt-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                          {course.lessons.map((lesson, lIdx) => (
                            <div key={lIdx} className="flex items-center justify-between p-3 bg-hellgrau/50 rounded-xl text-xs group hover:bg-primary/5 transition-colors">
                              <span className="text-anthrazit/70 font-medium">{lIdx + 1}. {lesson}</span>
                              <div className="flex flex-col items-center">
                                <span className="text-[8px] font-bold text-primary uppercase tracking-tighter mb-1 leading-none">In den</span>
                                <span className="text-[8px] font-bold text-primary uppercase tracking-tighter mb-1 leading-none -mt-1">Warenkorb</span>
                                <button
                                  onClick={() => handleAddLesson(course, lesson)}
                                  className="p-1.5 bg-white border border-black/5 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm"
                                  title="Lektion hinzufügen"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-6 border-t border-black/5">
                    <button 
                      onClick={() => handleAddBundle(course)}
                      className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-accent hover:text-anthrazit transition-all flex items-center justify-center space-x-2 shadow-lg shadow-primary/20"
                    >
                      <span>Komplett kaufen</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Training Benefits */}
        <section className="bg-white rounded-[3rem] p-12 md:p-20 card-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-8">Warum unsere Schulungen?</h2>
              <div className="space-y-6">
                {[
                  'Praxisnahe Inhalte von Gastronomen für Gastronomen',
                  'Jederzeit und überall verfügbar (Mobile-First)',
                  'Zertifikat nach erfolgreichem Abschluss',
                  'Inklusive Vorlagen und Checklisten für Ihren Betrieb'
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start space-x-4">
                    <CheckCircle className="text-primary mt-1 shrink-0" size={24} />
                    <p className="text-lg text-anthrazit/80">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <button 
                  onClick={() => navigate('/warenkorb')}
                  className="btn-xl bg-primary text-white font-bold hover:bg-accent hover:text-anthrazit"
                >
                  Zum Warenkorb
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-hellgrau rounded-3xl flex items-center justify-center overflow-hidden shadow-inner">
                <Award size={120} className="text-primary/20" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent p-8 rounded-3xl shadow-xl">
                <p className="text-3xl font-display font-bold text-anthrazit">100%</p>
                <p className="text-xs font-bold uppercase tracking-wider text-anthrazit/60">Praxisbezug</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
