import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, ShoppingBag, ArrowRight, CheckCircle, Plus, Minus, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import SmartGastroText from '../components/SmartGastroText';
import { COURSES } from '../constants';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, addToCart, cartTotal, cartCount } = useShop();
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const handleAddLesson = (course: typeof COURSES[0], lessonName: string, index: number) => {
    addToCart({
      id: `${course.id}-lesson-${index}`,
      title: `${course.title}: Lektion ${index + 1} - ${lessonName}`,
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
  };

  return (
    <div className="py-24 bg-hellgrau min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left: Shop Catalog */}
          <div className="lg:w-2/3 space-y-12">
            <div>
              <h1 className="text-4xl font-display font-bold mb-4">SmartGastro Shop</h1>
              <p className="text-anthrazit/60 mb-12">
                Wählen Sie einzelne Lektionen oder profitieren Sie von unseren Komplett-Paketen.
              </p>
            </div>

            <div className="space-y-8">
              {COURSES.map((course) => (
                <div key={course.id} className="bg-white rounded-[2.5rem] p-8 card-shadow border border-black/5">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                          {course.level}
                        </span>
                        <span className="text-anthrazit/40 text-xs font-bold uppercase tracking-widest">
                          {course.duration}
                        </span>
                      </div>
                      <h2 className="text-2xl font-display font-bold">{course.title}</h2>
                    </div>
                    <button
                      onClick={() => handleAddBundle(course)}
                      className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-accent hover:text-anthrazit transition-all flex items-center space-x-2 shadow-lg shadow-primary/20 shrink-0"
                    >
                      <div className="text-left">
                        <div className="text-xs opacity-80 font-normal">Komplett-Paket</div>
                        <div className="text-sm">CHF {(course.lessons.length - 1) * course.pricePerLesson} (1 Lektion gratis)</div>
                      </div>
                      <Plus size={20} />
                    </button>
                  </div>

                  <div className="border-t border-black/5 pt-6">
                    <button
                      onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all font-bold text-sm mb-4 ${
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
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
                            {course.lessons.map((lesson, idx) => (
                              <div key={idx} className="flex items-center justify-between p-4 bg-hellgrau/50 rounded-2xl group hover:bg-primary/5 transition-colors">
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-bold text-anthrazit/30 uppercase tracking-wider">Lektion {idx + 1}</span>
                                  <span className="text-sm font-medium text-anthrazit/80">{lesson}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right hidden sm:block">
                                    <span className="text-[9px] font-bold text-primary uppercase tracking-widest block">In den</span>
                                    <span className="text-[9px] font-bold text-primary uppercase tracking-widest block -mt-1">Warenkorb</span>
                                  </div>
                                  <button
                                    onClick={() => handleAddLesson(course, lesson, idx)}
                                    className="p-2 bg-white border border-black/5 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                                    title="Lektion hinzufügen"
                                  >
                                    <Plus size={16} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Cart Summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] card-shadow border border-black/5">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-display font-bold">Warenkorb</h2>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                    {cartCount} Artikel
                  </span>
                </div>

                {cartCount === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag size={48} className="text-anthrazit/10 mx-auto mb-4" />
                    <p className="text-anthrazit/40 text-sm">Ihr Warenkorb ist noch leer.</p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence mode="popLayout">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-4 bg-hellgrau/30 rounded-2xl border border-black/5"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-grow pr-4">
                              <h4 className="text-sm font-bold leading-tight">{item.title}</h4>
                              <p className="text-[10px] text-anthrazit/40 mt-1 uppercase font-bold tracking-wider">{item.priceLabel}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-anthrazit/20 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center bg-white rounded-lg p-1 border border-black/5">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 hover:bg-hellgrau rounded transition-colors text-anthrazit/60"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 hover:bg-hellgrau rounded transition-colors text-anthrazit/60"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="text-sm font-bold text-primary">CHF {(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                <div className="space-y-3 pt-6 border-t border-black/5 text-sm">
                  <div className="flex justify-between text-anthrazit/60">
                    <span>Netto</span>
                    <span>CHF {(cartTotal / 1.081).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-anthrazit/60">
                    <span>MwSt. (8.1%)</span>
                    <span>CHF {(cartTotal - (cartTotal / 1.081)).toFixed(2)}</span>
                  </div>
                  <div className="pt-4 flex justify-between items-end">
                    <div>
                      <span className="text-lg font-bold block">Total</span>
                      <span className="text-[10px] text-anthrazit/40 uppercase font-bold tracking-wider">inkl. MwSt.</span>
                    </div>
                    <span className="text-3xl font-display font-bold text-primary">CHF {cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className={`w-full mt-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all ${
                    cartCount > 0 
                      ? 'bg-primary text-white hover:bg-accent hover:text-anthrazit shadow-lg shadow-primary/20' 
                      : 'bg-anthrazit/5 text-anthrazit/20 cursor-not-allowed'
                  }`}
                  onClick={(e) => cartCount === 0 && e.preventDefault()}
                >
                  <span>Zur Kasse</span>
                  <ArrowRight size={20} />
                </Link>
                
                <p className="text-[10px] text-anthrazit/30 text-center mt-6 leading-relaxed">
                  Mit dem Kauf akzeptieren Sie unsere AGB. <br />
                  Zugangsdaten folgen sofort per E-Mail.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
