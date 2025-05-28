import { ObjectId } from 'mongoose';

export interface User {
  _id: ObjectId;
  userType: 'admin' | 'manager' | 'receptionist' | 'housekeeping' | 'guest';
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
  };
  password: string;
  accessLevel?: number;
  isActive?: boolean;
  preferences?: {
    roomType?: string;
    smoking?: boolean;
  };
}

export interface Room {
  _id: ObjectId;
  roomType: string;
  availability: boolean;
  status: 'cleaning' | 'occupied' | 'available' | 'maintenance';
  pricing: number;
  amenities?: string[];
}

export interface Booking {
  _id: ObjectId;
  guestId: ObjectId;
  roomId: ObjectId;
  checkInDate: Date;
  checkOutDate: Date;
  reservationDate?: Date;
  status: 'reserved' | 'checked-in' | 'checked-out' | 'cancelled';
  confirmationDetails?: string;
}

export interface Feedback {
  _id: ObjectId;
  guestId: ObjectId;
  rating: number;
  comment: string;
  date?: Date;
}

export interface Housekeeping {
  _id: ObjectId;
  roomId: ObjectId;
  task: string;
  status: 'pending' | 'in progress' | 'completed';
  scheduledDate: Date;
  assignedTo?: ObjectId;
}

export interface Maintenance {
  _id: ObjectId;
  roomId: ObjectId;
  requestDetails: string;
  status: 'reported' | 'assigned' | 'in progress' | 'completed';
  reportedBy?: ObjectId;
  assignedTo?: ObjectId;
}

export interface Bill {
  _id: ObjectId;
  bookingId: ObjectId;
  charges: {
    roomRate?: number;
    services?: number;
    taxes?: number;
  };
  paymentStatus: 'paid' | 'pending';
  invoice?: {
    invoiceNumber?: string;
    issueDate?: Date;
  };
}

export interface SystemSettings {
  _id: ObjectId;
  roomRates?: object;
  policies?: object;
  taxes?: object;
  configurations?: object;
}