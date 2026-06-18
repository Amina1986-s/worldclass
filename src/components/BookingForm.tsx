/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Calendar, Users, DollarSign, Send, CheckCircle2, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingFormProps {
  initialDestinationId?: string;
  initialPackageId?: string;
  onSuccess?: () => void;
  className?: string;
  key?: string;
}

export default function BookingForm({ initialDestinationId = '', initialPackageId = '', onSuccess, className = '' }: BookingFormProps) {
  const { destinations, packages, submitBooking, theme } = useApp();

  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destinationId, setDestinationId] = useState(initialDestinationId);
  const [packageId, setPackageId] = useState(initialPackageId);
  const [departureDate, setDepartureDate] = useState('');
  const [durationDays, setDurationDays] = useState(7);
  const [budgetPerPerson, setBudgetPerPerson] = useState(4000);
  const [passengersCount, setPassengersCount] = useState(2);
  const [notes, setNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketKey, setTicketKey] = useState<string | null>(null);

  // Filter packages based on active destination
  const filteredPackages = packages.filter(p => !destinationId || p.destinationId === destinationId);

  const handleNextStep = () => {
    if (step === 1) {
      if (!destinationId) {
        alert('Please select a destination to continue.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!departureDate) {
        alert('Please select a preferred departure date.');
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert('Please fill out all contact fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury API transit delay
    setTimeout(() => {
      submitBooking({
        fullName,
        email,
        phone,
        destinationId,
        packageId: packageId || undefined,
        departureDate,
        durationDays,
        budgetPerPerson,
        passengersCount,
        notes: notes || undefined
      });

      setIsSubmitting(false);
      const generatedTicket = `WC-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketKey(generatedTicket);
      
      if (onSuccess) {
        onSuccess();
      }
    }, 1200);
  };

  const resetForm = () => {
    setStep(1);
    setFullName('');
    setEmail('');
    setPhone('');
    setDestinationId('');
    setPackageId('');
    setDepartureDate('');
    setDurationDays(7);
    setBudgetPerPerson(4000);
    setPassengersCount(2);
    setNotes('');
    setTicketKey(null);
  };

  const selectedDest = destinations.find(d => d.id === destinationId);
  const selectedPkg = packages.find(p => p.id === packageId);

  // Apply button rounding style from custom theme
  const getBtnRounded = () => {
    if (theme.buttonStyle === 'rounded-none') return 'rounded-none';
    if (theme.buttonStyle === 'rounded-full') return 'rounded-full';
    return 'rounded-lg';
  };

  return (
    <div className={`p-6 xl:p-8 rounded-2xl glass-panel relative overflow-hidden ${className}`}>
      {/* Decorative ambient background glows */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl" />

      <AnimatePresence mode="wait">
        {!ticketKey ? (
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            {/* Steps Ticker */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div className="flex flex-col">
                <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase">Request Quote</span>
                <h3 className="text-xl font-bold font-poppins font-semibold text-white">Custom Private Tour</h3>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-gray-400">
                <span className={`w-2.5 h-2.5 rounded-full ${step >= 1 ? 'bg-brand-secondary' : 'bg-white/10'}`} />
                <span className={`w-2.5 h-2.5 rounded-full ${step >= 2 ? 'bg-brand-secondary' : 'bg-white/10'}`} />
                <span className={`w-2.5 h-2.5 rounded-full ${step >= 3 ? 'bg-brand-secondary' : 'bg-white/10'}`} />
                <span className="ml-2">Step {step}/3</span>
              </div>
            </div>

            {/* STEP 1: Select Tour Location */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">1. Choose Destination *</label>
                  <div className="relative">
                    <Compass className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-gray-400" />
                    <select
                      value={destinationId}
                      onChange={(e) => {
                        setDestinationId(e.target.value);
                        setPackageId(''); // reset package selection when destination shifts
                      }}
                      required
                      className="w-full bg-slate-900/80 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-brand-secondary appearance-none"
                    >
                      <option value="">-- Locate Destination --</option>
                      {destinations.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.country})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">2. Desired Package Option (Optional)</label>
                  <select
                    value={packageId}
                    onChange={(e) => setPackageId(e.target.value)}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-secondary appearance-none"
                  >
                    <option value="">Any Premium Curated Package</option>
                    {filteredPackages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} - ${p.price}/pp
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-gray-400 mt-1.5">
                    {destinationId ? `${filteredPackages.length} packages available for this coordinates.` : 'Select destination first to view linked packages.'}
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className={`w-full py-3 px-6 bg-brand-secondary hover:bg-blue-600 active:scale-[0.98] transition-transform text-white text-sm font-poppins font-semibold flex items-center justify-center gap-2 shadow-lg cursor-pointer ${getBtnRounded()}`}
                  >
                    <span>Proceed to Dates</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Parameters & Preferences */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">Departure Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        required
                        min="2026-06-18"
                        className="w-full bg-slate-900/80 border border-white/10 rounded-xl py-2.5 pl-9 pr-2 text-xs text-white focus:outline-none focus:border-brand-secondary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">Duration (Days)</label>
                    <input
                      type="number"
                      value={durationDays}
                      onChange={(e) => setDurationDays(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      className="w-full bg-slate-900/80 border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-brand-secondary"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-gray-300 mb-1.5">
                    <span className="uppercase tracking-wider">Number of Passengers</span>
                    <span className="text-brand-accent font-semibold">{passengersCount} Guest(s)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPassengersCount(prev => Math.max(1, prev - 1))}
                      className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-lg text-white border border-white/5 active:scale-95"
                    >
                      -
                    </button>
                    <div className="flex-1 bg-slate-900/80 border border-white/10 rounded-lg h-10 flex items-center justify-center font-mono text-sm text-white font-semibold">
                      <Users className="w-4.5 h-4.5 text-gray-400 mr-2" />
                      {passengersCount}
                    </div>
                    <button
                      type="button"
                      onClick={() => setPassengersCount(prev => Math.min(20, prev + 1))}
                      className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-lg text-white border border-white/5 active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-gray-300 mb-1.5">
                    <span className="uppercase tracking-wider">Budget Per Person</span>
                    <span className="text-brand-accent font-semibold">${budgetPerPerson.toLocaleString()} USD</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-brand-accent" />
                    <input
                      type="range"
                      min="1000"
                      max="15000"
                      step="500"
                      value={budgetPerPerson}
                      onChange={(e) => setBudgetPerPerson(parseInt(e.target.value))}
                      className="flex-1 h-1.5 bg-slate-800 rounded-full appearance-none accent-brand-secondary cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="py-3 px-4 border border-white/15 hover:bg-white/5 rounded-lg text-gray-300 text-xs font-semibold cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className={`py-3 px-4 bg-brand-secondary hover:bg-blue-600 text-white text-xs font-poppins font-semibold flex items-center justify-center gap-2 cursor-pointer ${getBtnRounded()}`}
                  >
                    Next Panel
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Contact & Notes */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Lord Alexander Sterling"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-brand-secondary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@vanguard.co.uk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900/80 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-brand-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">Active Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+44 7911 582312"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900/80 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-brand-secondary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">Special Dietary & Accommodations Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Helicopter charters, private translators, wheel-chair or specific kosher meal accommodations..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-brand-secondary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="py-3 px-4 border border-white/15 hover:bg-white/5 rounded-lg text-gray-300 text-xs font-semibold cursor-pointer animate-none"
                  >
                    Prev Phase
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`py-3 px-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-800 disabled:opacity-50 text-white text-xs font-poppins font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${getBtnRounded()}`}
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Request</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        ) : (
          /* VIP CONFIRM TICKET DESIGN */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 text-center space-y-6 py-6"
          >
            <div className="inline-flex p-3 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-2">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <h3 className="text-2xl font-bold font-poppins text-white tracking-tight">Booking Initiated Successfully!</h3>
            <p className="text-xs text-gray-400 font-sans max-w-sm mx-auto">
              Welcome to the elite tier of transcontinental travel. Our 24/7 personal travel design council has received your parameters and will reach out with your private itinerary.
            </p>

            {/* Boarding-Pass Stylized ticket stub */}
            <div className="border border-white/10 rounded-xl overflow-hidden bg-slate-900/90 text-left font-mono relative">
              <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-[#0B1120] border-r border-white/10 -translate-y-1/2" />
              <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-[#0B1120] border-l border-white/10 -translate-y-1/2" />

              <div className="bg-brand-primary p-4 border-b border-white/10 border-dashed flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-brand-accent animate-pulse" />
                  <span className="text-[10px] font-semibold text-white tracking-widest uppercase">VIP TRAVEL RECORD</span>
                </div>
                <span className="text-[11px] text-brand-accent font-bold tracking-widest">{ticketKey}</span>
              </div>

              <div className="p-4 grid grid-cols-2 gap-y-3.5 gap-x-2 text-[10px] border-b border-white/5">
                <div>
                  <div className="text-gray-500 uppercase">PASSENGER NAME</div>
                  <div className="text-white font-bold text-[11px] uppercase truncate">{fullName}</div>
                </div>
                <div>
                  <div className="text-gray-500 uppercase">LOCATION DESIRED</div>
                  <div className="text-white font-bold text-[11px] uppercase truncate">
                    {selectedDest ? selectedDest.name : 'Custom Coordinates'}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 uppercase">DEPARTURE TIMING</div>
                  <div className="text-white font-bold">{departureDate}</div>
                </div>
                <div>
                  <div className="text-gray-500 uppercase">BUDGET ALLOCATED</div>
                  <div className="text-brand-accent font-bold">${(budgetPerPerson * passengersCount).toLocaleString()} USD</div>
                </div>
              </div>

              <div className="p-3 bg-white/5 text-[9px] text-center text-gray-400">
                Show this ticket token inside your Admin Dashboard Bookings portal to verify live state updates!
              </div>
            </div>

            <button
              onClick={resetForm}
              className="px-6 py-2 border border-white/10 hover:bg-white/5 rounded-full text-xs text-gray-300 font-poppins cursor-pointer"
            >
              Configure Another Tour
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
