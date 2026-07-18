import { OriginalExperience, PreferenceItem, TradeOffOption } from './types';

export const originalExperience: OriginalExperience = {
  title: "Kyoto, Slowly",
  location: "Kyoto, Japan",
  duration: "7 days",
  originalPrice: 3200,
  level: "Premium",
  tags: ["Slow Travel", "Design-Led", "Local Food", "Boutique Stay"],
  creator: {
    name: "Maya Chen",
    handle: "@mayaexplores",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    bio: "Design researcher and slow traveler focusing on cultural craft, quiet neighborhood stays, and local foodways."
  },
  description: "A quiet four-to-seven-day Kyoto experience built around design, local food, walkable neighborhoods, and a proper ryokan stay in Gion. We spent most nights at Gion Ryokan Karaku (499 Minamigawa Gionmachi, Higashiyama-ku, Kyoto 605-0074) — a meticulously restored machiya that felt completely woven into the neighborhood. The trip values atmosphere over sightseeing checklists.",
  signatureElements: [
    {
      id: "el-hotel",
      title: "Stay in Gion",
      description: "A peaceful sanctuary in a restored building near Gion's quiet canals. Featured stay is 'The Shinmonzen'.",
      iconName: "Hotel"
    },
    {
      id: "el-walks",
      title: "Quiet Morning Walks",
      description: "Pre-dawn walks around Yasaka Pagoda and the traditional Shirakawa canal before the crowds arrive.",
      iconName: "Footprints"
    },
    {
      id: "el-design",
      title: "Local Design & Craft",
      description: "Curated visits to multi-generational indigo dye workshops, lacquerware shops, and modernist design studios.",
      iconName: "Compass"
    },
    {
      id: "el-dinner",
      title: "One Unforgettable Meal",
      description: "A slow, 9-course seasonal kaiseki dinner prepared by a master chef in a hidden Gion alleyway.",
      iconName: "UtensilsCrossed"
    }
  ]
};

export const initialPreferences: PreferenceItem[] = [
  // Must Keep
  { id: "p-hotel", text: "Stay at The Shinmonzen, even if only for one night", category: "must-keep" },
  
  // Strong Preferences
  { id: "p-quiet", text: "Quiet Kyoto atmosphere", category: "preference" },
  { id: "p-walkable", text: "Walkable neighborhood", category: "preference" },
  { id: "p-design", text: "Design and craft shops", category: "preference" },
  { id: "p-food", text: "One memorable food experience (Kaiseki)", category: "preference" },

  // Hard Constraints
  { id: "p-duration", text: "Four days maximum", category: "hard-constraint" },
  { id: "p-budget", text: "Total budget around $1,800", category: "hard-constraint" },
  { id: "p-origin", text: "Departing from San Francisco (SFO)", category: "hard-constraint" },

  // Flexible
  { id: "p-dates", text: "Exact dates of travel", category: "flexible" },
  { id: "p-flights", text: "Direct vs. connecting flight", category: "flexible" },
  { id: "p-restaurants", text: "Exact choice of restaurants", category: "flexible" },
  { id: "p-alt-hotel", text: "Secondary hotel substitute", category: "flexible" },
  { id: "p-attractions", text: "Total number of attractions visited", category: "flexible" }
];

export const tradeOffOptions: TradeOffOption[] = [
  {
    id: 'A',
    title: "Split-Stay Experience",
    subtitle: "Stay at The Shinmonzen for 1 night, then move to a lower-cost boutique nearby.",
    description: "Preserves your dream of staying at The Shinmonzen while keeping the overall trip strictly under your $1,800 budget limit.",
    price: 1760,
    hotelNights: "1 night at The Shinmonzen, 2 nights at Gion Terrace Boutique",
    flightType: "Direct Flight (SFO to KIX)",
    timelineNotes: "Splits hotel stay to balance premium atmosphere with strict budget constraints.",
    attributionTier: "Direct + Adapted",
    commissionWeight: 80,
    attributionReason: "Direct property match for the anchor hotel, with an adapted secondary hotel choice that matches Maya's aesthetic.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & The Shinmonzen Sanctuary",
        description: "Arrive via Kansai Express. Check into the luxury design masterpiece 'The Shinmonzen' in Gion. Afternoon tea overlooking the river.",
        activities: ["Settle into Gion luxury", "Quiet riverside walk", "In-hotel curated welcome sake flight"],
        accommodation: "The Shinmonzen (Featured Luxury Stay)"
      },
      {
        day: 2,
        title: "Quiet Morning & Master Kaiseki",
        description: "Wake early for a quiet stroll along Gion's stone-paved streets. Check out of Shinmonzen, luggage transferred automatically. Afternoon design gallery hop.",
        activities: ["Pre-dawn Yasaka walk", "Curated textile atelier visit", "9-course Kaiseki dinner at hidden alleyway"],
        accommodation: "Gion Terrace Boutique (Premium Companion Stay)"
      },
      {
        day: 3,
        title: "Craft District & Slow Cafés",
        description: "Explore Kyoto's traditional craft shops and modern minimalist cafés. Experience a casual neighborhood matcha demonstration.",
        activities: ["Indigo workshop tour", "Drip coffee at local craft roastery", "Walk through hidden temple gardens"],
        accommodation: "Gion Terrace Boutique (Premium Companion Stay)"
      },
      {
        day: 4,
        title: "Nishiki Market & Return Journey",
        description: "A quick morning visit to taste local street bites before taking the express train back to the airport for your return direct flight.",
        activities: ["Heian shrine stroll", "Local craft purchase", "SFO Direct Flight departure"],
        accommodation: "Departure"
      }
    ]
  },
  {
    id: 'B',
    title: "Flexible Shift Experience",
    subtitle: "Keep the featured hotel for all 3 nights, but travel one week later with a connecting flight.",
    description: "Preserves the complete, original luxury stay at The Shinmonzen, utilizing flexible dates and lower-cost connecting airfare to make the numbers fit.",
    price: 1800,
    hotelNights: "3 nights at The Shinmonzen",
    flightType: "1-Stop Connecting Flight (via Taipei)",
    timelineNotes: "Shifts dates by one week to unlock off-peak hotel pricing and trades direct flights for layovers.",
    attributionTier: "Direct Property Match",
    commissionWeight: 100,
    attributionReason: "Full-stay booking at the creator's exact featured hotel, perfectly preserving Maya's core itinerary sequence.",
    itinerary: [
      {
        day: 1,
        title: "Connecting Arrival & Gion Canal",
        description: "Evening arrival in Kyoto following your connecting flight. Welcome to Gion. The Shinmonzen surrounds you with serene minimalist timber walls.",
        activities: ["Check-in to Gion luxury", "Night stroll along Shirakawa canal", "Quiet midnight ramen bar"],
        accommodation: "The Shinmonzen (Featured Luxury Stay)"
      },
      {
        day: 2,
        title: "Morning Walks & Design Hubs",
        description: "Spend your entire day walking through Gion's design alleys. Visit historic woodblock workshops and beautiful mid-century ceramics galleries.",
        activities: ["Yasaka Pagoda morning", "Modern lacquerware atelier", "Riverside Kyoto-style organic lunch"],
        accommodation: "The Shinmonzen (Featured Luxury Stay)"
      },
      {
        day: 3,
        title: "Kaiseki Dinner & Serene Gardens",
        description: "Enjoy a leisurely morning of reading by the canal before dressing up for Maya's recommended boutique kaiseki culinary feast.",
        activities: ["Zen garden contemplation", "Kyoto paper craft museum", "Premium 9-course Kaiseki reservation"],
        accommodation: "The Shinmonzen (Featured Luxury Stay)"
      },
      {
        day: 4,
        title: "Final Purchases & SFO Flight",
        description: "Grab a matcha latte, say goodbye to the master host at The Shinmonzen, and travel to Kansai Airport for your SFO flight.",
        activities: ["Souvenir craft shopping", "Kansai express train", "Return flight to SFO (with stop)"],
        accommodation: "Departure"
      }
    ]
  },
  {
    id: 'C',
    title: "Curated Substituted Stay",
    subtitle: "Swap the luxury hotel for Gion Terrace Boutique for all 3 nights, preserving direct flights.",
    description: "Keeps your travel direct and your schedule exact, but replaces the premium Shinmonzen with a gorgeous, high-aesthetic neighboring sister hotel.",
    price: 1460,
    hotelNights: "3 nights at Gion Terrace Boutique",
    flightType: "Direct Flight (SFO to KIX)",
    timelineNotes: "Substitutes the high-budget anchor property with an expertly curated neighborhood alternative.",
    attributionTier: "Assisted Substitution",
    commissionWeight: 50,
    attributionReason: "Substitute property is selected, but it directly mirrors the location, design aesthetic, and vibe curated by Maya.",
    itinerary: [
      {
        day: 1,
        title: "Direct Arrival & Cozy Gion Welcomes",
        description: "Breeze into Kyoto after a smooth direct flight. Settle into the beautifully designed, local-hardwood-filled Gion Terrace Boutique.",
        activities: ["Check-in to Gion Terrace", "Atmospheric dinner in neighborhood", "Late-night lantern walk"],
        accommodation: "Gion Terrace Boutique (High-Aesthetic Substitute)"
      },
      {
        day: 2,
        title: "Temple Solitude & Craft Studios",
        description: "Explore the ancient craft district of Higashiyama. Meet with local design curators and visit traditional paper makers.",
        activities: ["Early morning Kiyomizu stroll", "Indigo artisan workshop", "Modern Japanese craft cocktail tasting"],
        accommodation: "Gion Terrace Boutique (High-Aesthetic Substitute)"
      },
      {
        day: 3,
        title: "Hanamikoji Walk & Kaiseki Highlight",
        description: "Walk the historic preservation zones. Tonight, enjoy the unforgettable Kaiseki dining experience centered in Gion's old quarter.",
        activities: ["Zen architecture tour", "Kyoto modernism bookshop", "Signature master Kaiseki reservation"],
        accommodation: "Gion Terrace Boutique (High-Aesthetic Substitute)"
      },
      {
        day: 4,
        title: "Gion Sunrise & Fast Departure",
        description: "Soak in the Gion sunrise, wrap up your souvenirs, and board the Express train for a quick departure back to San Francisco.",
        activities: ["Shirakawa pre-dawn walk", "Traditional pottery purchase", "Express train to flight home"],
        accommodation: "Departure"
      }
    ]
  }
];

export const mockCreatorDashboard = {
  experienceName: "Kyoto, Slowly",
  stats: {
    opens: 148,
    conversations: 67,
    sessions: 21,
    directMatches: 14,
    assistedSubstitutions: 5
  },
  travelerSession: {
    name: "Nicole",
    request: "I want a similar experience, but I only have four days and my total budget is around $1,800. I really love the hotel. The rest is flexible.",
    preserved: ["Stay in Gion (The Shinmonzen - 1 Night)", "Quiet morning atmosphere", "Design & craft focus", "Unforgettable Kaiseki dinner"],
    changed: ["Trip duration reduced from 7 days to 4 days", "Two nights substituted to Gion Terrace Boutique to maintain budget", "Connecting flight or shifted dates parsed but direct flight chosen with split-stay"],
    attributionTier: "Direct + Adapted",
    commissionWeight: 80,
    reason: "Nicole retained the premium anchor property (The Shinmonzen) for part of her stay and followed the core slow-travel blueprint for food and art."
  },
  conversionFactors: [
    { element: "The Shinmonzen (Anchor Hotel)", count: 18, pct: 85, color: "bg-amber-500" },
    { element: "Quiet Kyoto Atmosphere Walks", count: 15, pct: 71, color: "bg-sage-600" },
    { element: "Local Craft & Design Studios", count: 12, pct: 57, color: "bg-stone-600" },
    { element: "Boutique Kaiseki Dining", count: 14, pct: 66, color: "bg-amber-700" }
  ]
};
