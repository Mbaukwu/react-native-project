import * as yup from 'yup';

export const bookingSchema = yup.object({
  guestName: yup.string().required('Full name is required').min(2, 'Name must be at least 2 characters'),
  guestEmail: yup.string().required('Email is required').email('Please enter a valid email'),
  guestPhone: yup.string().nullable().optional(),
  checkIn: yup.string().required('Check-in date is required'),
  checkOut: yup.string().required('Check-out date is required'),
  guests: yup.number().required('Number of guests is required').min(1, 'At least 1 guest').max(10, 'Maximum 10 guests'),
  specialRequests: yup.string().nullable().optional(),
})

export type BookingFormData = yup.InferType<typeof bookingSchema>;