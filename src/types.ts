export interface CreatorProfile {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
}

export interface CreatorElement {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface OriginalExperience {
  title: string;
  creator: CreatorProfile;
  description: string;
  tags: string[];
  duration: string;
  originalPrice: number;
  level: 'Premium' | 'Standard' | 'Budget';
  location: string;
  signatureElements: CreatorElement[];
}

export type PreferenceCategory = 'must-keep' | 'preference' | 'flexible' | 'hard-constraint';

export interface PreferenceItem {
  id: string;
  text: string;
  category: PreferenceCategory;
}

export interface DecisionTimelineItem {
  time: string;
  label: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
}

export interface TradeOffOption {
  id: 'A' | 'B' | 'C';
  title: string;
  subtitle: string;
  description: string;
  price: number;
  hotelNights: string;
  flightType: string;
  timelineNotes: string;
  attributionTier: string;
  commissionWeight: number;
  attributionReason: string;
  itinerary: ItineraryDay[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  accommodation: string;
}

export interface BudgetBreakdown {
  flights: number;
  hotelFeatured: number;
  hotelAlt: number;
  activities: number;
  total: number;
}
