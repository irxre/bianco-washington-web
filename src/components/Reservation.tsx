
import React, { useState } from 'react';
import { Calendar, Clock, Users, Mail, Phone, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Reservation, ReservationInsert } from '@/types/reservation';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const reservationData: ReservationInsert = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        special_requests: formData.specialRequests || undefined,
      };

      // Save reservation to Supabase using type assertion
      const { data: reservation, error: dbError } = await (supabase as any)
        .from('reservations')
        .insert([reservationData])
        .select()
        .single();

      if (dbError) {
        throw new Error(`Database error: ${dbError.message}`);
      }

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-reservation-notification', {
        body: { reservation: reservation }
      });

      if (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't throw here - reservation was saved successfully
      }

      console.log('Reservation submitted successfully:', reservation);
      setIsSubmitted(true);
      
      toast({
        title: "Reservation Submitted!",
        description: "We'll contact you soon to confirm your reservation.",
      });

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          date: '', 
          time: '', 
          guests: '2', 
          specialRequests: '' 
        });
      }, 5000);

    } catch (error) {
      console.error('Error submitting reservation:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  const guestOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <section id="reservation" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
            Reserve Your Table
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book your perfect dining experience at Bianco Washington. We can't wait to welcome you.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {!isSubmitted ? (
            <>
              <div className="mb-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Opening Soon Notice</h3>
                <p className="text-muted-foreground text-sm">
                  We're currently finalizing preparations for our grand opening. Submit your reservation request 
                  and we'll contact you as soon as we confirm our opening date to schedule your visit.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-2">
                      Number of Guests *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none disabled:opacity-50"
                      >
                        {guestOptions.map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                        <option value="10+">10+ Guests</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-foreground mb-2">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-foreground mb-2">
                      Preferred Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none disabled:opacity-50"
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-foreground mb-2">
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    rows={4}
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                    placeholder="Any special dietary requirements, celebrations, or seating preferences..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 rounded-md font-medium transition-colors duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Reservation Request'}
                </button>

                <p className="text-sm text-muted-foreground text-center">
                  * Required fields. We'll confirm your reservation once our opening date is finalized.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-foreground mb-4">Reservation Request Received!</h3>
              <p className="text-muted-foreground mb-6">
                Thank you for your reservation request. We'll contact you as soon as we confirm our opening date 
                to schedule your perfect dining experience at Bianco Washington.
              </p>
              <div className="text-sm text-muted-foreground">
                This form will reset in a few seconds...
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;
