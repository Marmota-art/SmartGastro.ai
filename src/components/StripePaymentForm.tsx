import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ArrowRight } from 'lucide-react';

interface StripePaymentFormProps {
  onSuccess: () => void;
  amount: number;
}

export default function StripePaymentForm({ onSuccess, amount }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/thanks',
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message || 'Ein Fehler ist aufgetreten.');
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {errorMessage && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing || !stripe}
        className={`w-full py-6 rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all shadow-xl ${
          isProcessing 
            ? 'bg-anthrazit/10 text-anthrazit/30 cursor-not-allowed' 
            : 'bg-primary text-white hover:bg-accent hover:text-anthrazit shadow-primary/20'
        }`}
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-anthrazit/30 border-t-anthrazit animate-spin rounded-full"></div>
            <span>Zahlung wird verarbeitet...</span>
          </>
        ) : (
          <>
            <span>Jetzt CHF {amount.toFixed(2)} sicher bezahlen</span>
            <ArrowRight size={20} />
          </>
        )}
      </button>
    </form>
  );
}
