import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Landmark, Wallet, ArrowLeft, ShieldCheck, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { BRAND } from '../constants';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from '../components/StripePaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

type PaymentMethod = 'card' | 'paypal' | 'bank';

export default function Checkout() {
  const { cart, cartTotal, cartCount, clearCart } = useShop();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentMethod === 'card' && cartTotal > 0) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartTotal }),
      })
        .then((res) => res.json())
        .then((data) => setStripeClientSecret(data.clientSecret))
        .catch((err) => console.error('Error fetching Stripe secret:', err));
    }
  }, [paymentMethod, cartTotal]);

  const handlePaymentSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      navigate('/thanks');
    }, 1000);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'bank') {
      handlePaymentSuccess();
    }
  };

  if (cartCount === 0) {
    return (
      <div className="py-32 bg-hellgrau min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="bg-white p-12 rounded-[3rem] card-shadow max-w-lg mx-auto">
            <h1 className="text-3xl font-display font-bold mb-4">Warenkorb ist leer</h1>
            <p className="text-anthrazit/70 mb-8">Bitte fügen Sie zuerst Artikel zum Warenkorb hinzu.</p>
            <Link to="/warenkorb" className="btn-xl bg-primary text-white font-bold hover:bg-accent hover:text-anthrazit inline-flex items-center space-x-2">
              <ArrowLeft size={20} />
              <span>Zum Shop</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-hellgrau min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <Link to="/warenkorb" className="text-anthrazit/40 hover:text-primary transition-colors flex items-center space-x-2 mb-4 font-bold text-sm uppercase tracking-widest">
              <ArrowLeft size={16} />
              <span>Zurück zum Warenkorb</span>
            </Link>
            <h1 className="text-4xl font-display font-bold">Kasse</h1>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
            <ShieldCheck size={20} />
            <span className="text-sm font-bold">Sichere 256-Bit SSL Verschlüsselung</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Payment Details */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Payment Method Selection */}
            <div className="bg-white rounded-[2.5rem] p-8 card-shadow border border-black/5">
              <h2 className="text-2xl font-display font-bold mb-8 flex items-center space-x-3">
                <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                <span>Zahlungsart wählen</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center text-center space-y-3 ${
                    paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-black/5 hover:border-primary/30'
                  }`}
                >
                  <CreditCard size={32} className={paymentMethod === 'card' ? 'text-primary' : 'text-anthrazit/40'} />
                  <span className="font-bold">Kreditkarte</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center text-center space-y-3 ${
                    paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-black/5 hover:border-primary/30'
                  }`}
                >
                  <Wallet size={32} className={paymentMethod === 'paypal' ? 'text-primary' : 'text-anthrazit/40'} />
                  <span className="font-bold">PayPal</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center text-center space-y-3 ${
                    paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-black/5 hover:border-primary/30'
                  }`}
                >
                  <Landmark size={32} className={paymentMethod === 'bank' ? 'text-primary' : 'text-anthrazit/40'} />
                  <span className="font-bold">Banküberweisung</span>
                </button>
              </div>
            </div>

            {/* Payment Details Form */}
            <div className="bg-white rounded-[2.5rem] p-8 card-shadow border border-black/5">
              <h2 className="text-2xl font-display font-bold mb-8 flex items-center space-x-3">
                <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                <span>Zahlungsdetails</span>
              </h2>

              <form onSubmit={handlePayment} className="space-y-6">
                <AnimatePresence mode="wait">
                  {paymentMethod === 'card' && (
                    <motion.div
                      key="card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      {stripeClientSecret ? (
                        <Elements stripe={stripePromise} options={{ clientSecret: stripeClientSecret }}>
                          <StripePaymentForm onSuccess={handlePaymentSuccess} amount={cartTotal} />
                        </Elements>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 space-y-4">
                          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary animate-spin rounded-full"></div>
                          <p className="text-sm text-anthrazit/40">Kreditkartenzahlung wird vorbereitet...</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <motion.div
                      key="paypal"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center py-4"
                    >
                      <PayPalScriptProvider options={{ "clientId": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test" }}>
                        <PayPalButtons 
                          style={{ layout: "vertical", shape: "pill" }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              intent: "CAPTURE",
                              purchase_units: [
                                {
                                  amount: {
                                    currency_code: "CHF",
                                    value: cartTotal.toFixed(2),
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={async (data, actions) => {
                            if (actions.order) {
                              await actions.order.capture();
                              handlePaymentSuccess();
                            }
                          }}
                        />
                      </PayPalScriptProvider>
                    </motion.div>
                  )}

                  {paymentMethod === 'bank' && (
                    <motion.div
                      key="bank"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="bg-hellgrau p-8 rounded-3xl border border-black/5 space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-white p-3 rounded-xl border border-black/5">
                            <Landmark className="text-primary" size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold mb-1">Bankverbindung für Überweisung</h4>
                            <p className="text-sm text-anthrazit/60">Bitte überweisen Sie den Gesamtbetrag auf folgendes Konto:</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-black/5">
                          <div>
                            <span className="block text-[10px] font-bold text-anthrazit/40 uppercase tracking-widest mb-1">Empfänger</span>
                            <span className="font-bold">{BRAND.name}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] font-bold text-anthrazit/40 uppercase tracking-widest mb-1">IBAN</span>
                            <span className="font-mono font-bold text-primary bg-white px-2 py-1 rounded border border-black/5">{BRAND.iban}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] font-bold text-anthrazit/40 uppercase tracking-widest mb-1">Bank</span>
                            <span className="font-bold">{BRAND.bank}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] font-bold text-anthrazit/40 uppercase tracking-widest mb-1">Verwendungszweck</span>
                            <span className="font-bold">Bestellung #{Math.floor(Math.random() * 100000)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-xs text-anthrazit/40 bg-white/50 p-3 rounded-xl italic">
                          <CheckCircle size={14} />
                          <span>Ihr Zugang wird sofort nach Zahlungseingang freigeschaltet.</span>
                        </div>
                      </div>

                      <button
                        onClick={handlePaymentSuccess}
                        className="w-full py-6 rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all shadow-xl bg-primary text-white hover:bg-accent hover:text-anthrazit shadow-primary/20"
                      >
                        <span>Bestellung abschliessen</span>
                        <ArrowRight size={20} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-center space-x-6 pt-4 grayscale opacity-40">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" referrerPolicy="no-referrer" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" referrerPolicy="no-referrer" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" referrerPolicy="no-referrer" />
                </div>
              </form>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] card-shadow border border-black/5">
                <h2 className="text-2xl font-display font-bold mb-8">Bestellübersicht</h2>
                
                <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start text-sm">
                      <div className="pr-4">
                        <span className="font-bold block">{item.title}</span>
                        <span className="text-[10px] text-anthrazit/40 uppercase font-bold tracking-wider">
                          {item.quantity}x {item.priceLabel}
                        </span>
                      </div>
                      <span className="font-bold shrink-0">CHF {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

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

                <div className="mt-8 p-4 bg-hellgrau rounded-2xl border border-black/5 flex items-start space-x-3">
                  <Lock size={18} className="text-anthrazit/20 shrink-0 mt-1" />
                  <p className="text-[10px] text-anthrazit/40 leading-relaxed">
                    Ihre Daten werden ausschliesslich zur Abwicklung dieser Bestellung verwendet und gemäss höchsten Sicherheitsstandards verschlüsselt übertragen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
