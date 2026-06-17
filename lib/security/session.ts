export type SessionRole = 'guest' | 'customer' | 'wholesale_buyer' | 'admin';

type BaseSession = {
  id: string;
  role: SessionRole;
  anonymousId?: string;
  createdAt: string;
  expiresAt: string;
};

export type GuestSession = BaseSession & {
  role: 'guest';
};

export type CustomerSession = BaseSession & {
  role: 'customer';
  customerId: string;
  mobile?: string;
  email?: string;
};

export type WholesaleBuyerSession = BaseSession & {
  role: 'wholesale_buyer';
  customerId: string;
  wholesaleProfileId: string;
  approved: boolean;
};

export type AppSession = GuestSession | CustomerSession | WholesaleBuyerSession;
