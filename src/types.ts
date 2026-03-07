export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  role: 'user' | 'admin' | 'business_owner';
  createdAt: string;
}

export interface BusinessListing {
  id: string;
  name: string;
  description: string;
  category: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  reviewCount: number;
  ownerId: string;
  plan: 'free' | 'premium' | 'gold';
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  businessId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AdListing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  city: string;
  userId: string;
  status: 'active' | 'sold' | 'inactive';
  createdAt: string;
}
