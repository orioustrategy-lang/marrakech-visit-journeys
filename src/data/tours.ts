// Centralized tours data for Marrakech Visit Journeys

export interface Tour {
  id: string;
  title: string;
  category: "activity" | "airport-transfer" | "day-trip" | "tour" | "trekking";
  image?: string;
  images?: string[]; // Multiple images for gallery
  duration: string;
  groupSize: string;
  price: string;
  rating?: number;
  reviews?: number;
  description: string;
  highlights: string[];
  included: string[];
  notIncluded?: string[];
  itinerary?: string[];
}

export const tours: Tour[] = [
  // ACTIVITIES
  {
    id: "agafay-quad-camel-dinner",
    title: "Marrakech: Agafay Desert Quad & Camel Rides with Dinner Show",
    category: "activity",
    image: "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Quad & Camel Rides with Dinner Show/IMG_5401.JPG",
    images: [
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Quad & Camel Rides with Dinner Show/IMG_5401.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Quad & Camel Rides with Dinner Show/IMG_9614.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Quad & Camel Rides with Dinner Show/IMG_5740.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Quad & Camel Rides with Dinner Show/IMG_9615.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Quad & Camel Rides with Dinner Show/IMG_9618.JPG"
    ],
    duration: "5 hours",
    groupSize: "2-20 people",
    price: "From 30€",
    rating: 4.9,
    reviews: 380,
    description: "Experience the magic of Agafay Desert. Ride a quad, enjoy a sunset camel trek, and savor a traditional Moroccan dinner under the stars. End the night with a mesmerizing fire show for an unforgettable adventure.",
    highlights: [
      "Visit an Argan Oil Women's Cooperative",
      "Thrilling quad biking adventure across the rugged desert terrain",
      "Soak in stunning desert views",
      "Authentic Moroccan dinner under the stars with traditional dishes",
      "Enjoy a camel ride in Agafay desert"
    ],
    included: [
      "Roundtrip transportation from designated pickup points",
      "Transportation in an air-conditioned minibus",
      "Guide",
      "40-minute Quad bike tour on a shared double quad (2 people per quad)",
      "15-minute desert camel ride",
      "Moroccan dinner with water",
      "Visit Coopérative Argane",
      "Live Moroccan music during the evening",
      "Fire show under the desert sky"
    ]
  },
  {
    id: "agafay-sunset-camel-dinner",
    title: "Marrakech: Agafay Desert Sunset, Camel Ride, and Dinner Show",
    category: "activity",
    image: "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Sunset, Camel Ride, and Dinner Show/IMG_5740.JPG",
    images: [
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Sunset, Camel Ride, and Dinner Show/IMG_5740.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Sunset, Camel Ride, and Dinner Show/IMG_5602.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Sunset, Camel Ride, and Dinner Show/IMG_9614.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Sunset, Camel Ride, and Dinner Show/IMG_9615.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Sunset, Camel Ride, and Dinner Show/IMG_9618.JPG"
    ],
    duration: "5 hours",
    groupSize: "2-20 people",
    price: "From 30€",
    rating: 4.8,
    reviews: 450,
    description: "Savor a magical dinner in the Agafay Desert with this adventure from Marrakesh. Ride a camel along an ancient Berber path, watch the sunset, and relax with dinner and entertainment at a desert camp.",
    highlights: [
      "Live like a local as you eat authentic Moroccan food at a desert camp",
      "Take in the spectacular colors of the sunset in the sprawling Agafay Desert",
      "Travel on a well-trained camel through the desert's sandy landscapes",
      "Have fun as you listen to Berber music around a crackling fire",
      "Learn about argan oil and rest up with a glass of Moroccan tea"
    ],
    included: [
      "Hotel pickup and drop-off",
      "Camel ride 15 to 20 min",
      "Guide",
      "Dinner show",
      "Tea at a Berber camp",
      "Campfire",
      "Music and Berber show",
      "AC Bus"
    ]
  },
  {
    id: "camel-ride-palmeraie",
    title: "Marrakech: Camel Ride in the Oasis Palmeraie",
    category: "activity",
    image: "/src/assets/Marrakech Discover/Activities/camel ride in the oasis palmerai/145.jpg",
    images: [
      "/src/assets/Marrakech Discover/Activities/camel ride in the oasis palmerai/145.jpg",
      "/src/assets/Marrakech Discover/Activities/camel ride in the oasis palmerai/98.jpg",
      "/src/assets/Marrakech Discover/Activities/camel ride in the oasis palmerai/img-1.jpg",
      "/src/assets/Marrakech Discover/Activities/camel ride in the oasis palmerai/img-2.jpg",
      "/src/assets/Marrakech Discover/Activities/camel ride in the oasis palmerai/img-3.jpg"
    ],
    duration: "2 hours",
    groupSize: "2-15 people",
    price: "From 15€",
    rating: 4.7,
    reviews: 320,
    description: "Enjoy a camel ride through the palm groves of the Oasis Palmeraie on a Shared Tour. Explore the villages of the Palmeraie, try local tea, and admire the incredible landscapes outside Marrakech.",
    highlights: [
      "Ride camel back through the Palmeraie of Marrakech",
      "See the palm groves and orange trees from the back of a ship of the desert",
      "Experience Moroccan village life outside the city center",
      "Enjoy a refreshing mint tea in a nomadic area"
    ],
    included: [
      "Hotel pickup and drop-off",
      "1h Camel ride Tour",
      "Traditional clothing (jilbab and Saharan scarf)",
      "Mint tea",
      "Wifi onboard"
    ]
  },
  {
    id: "quad-palmeraie-tea",
    title: "Marrakech: Dunes of the Palmeraie Quad Bike Ride with Tea",
    category: "activity",
    image: "/src/assets/Marrakech Discover/Activities/Marrakech_ Dunes of the Palmeraie Quad Bike Ride with Tea/148.jpg",
    images: [
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Dunes of the Palmeraie Quad Bike Ride with Tea/148.jpg",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Dunes of the Palmeraie Quad Bike Ride with Tea/148.png",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Dunes of the Palmeraie Quad Bike Ride with Tea/img-22.jpg",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Dunes of the Palmeraie Quad Bike Ride with Tea/img-23.webp",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Dunes of the Palmeraie Quad Bike Ride with Tea/palmeraie-quad-passion.jpg"
    ],
    duration: "3 hours",
    groupSize: "2-12 people",
    price: "From 35€",
    rating: 4.8,
    reviews: 280,
    description: "Explore the jbilet desert, the palm groves wild and rural Berber villages located outside of Marrakech on a quad tour.",
    highlights: [
      "Stroll in the Palmeraie of Marrakech",
      "Discover the wild areas of the region by quad",
      "Taste a Moroccan tea in the middle of the desert"
    ],
    included: [
      "Pick-up and drop-off from your hotel",
      "2h hours of quad biking (couple)",
      "Helmet and protective glasses",
      "Moroccan tea with mint"
    ]
  },
  {
    id: "paragliding-agafay",
    title: "Marrakech: Paragliding over Agafay Desert & Atlas Mnt Views",
    category: "activity",
    image: "/src/assets/Marrakech Discover/Activities/Marrakech_ Paragliding over Agafay Desert & Atlas Mnt Views/IMG_7175.JPG",
    images: [
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Paragliding over Agafay Desert & Atlas Mnt Views/IMG_7175.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Paragliding over Agafay Desert & Atlas Mnt Views/IMG_7188.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Paragliding over Agafay Desert & Atlas Mnt Views/IMG_7189.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Paragliding over Agafay Desert & Atlas Mnt Views/IMG_7197.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Paragliding over Agafay Desert & Atlas Mnt Views/maxresdefault.jpg"
    ],
    duration: "5.5 hours",
    groupSize: "1-8 people",
    price: "90€",
    rating: 5.0,
    reviews: 215,
    description: "Experience tandem paragliding over the Atlas Mountains with an expert instructor. Take off from over 1000m altitude, soaring above the Agafay Desert and stunning landscapes, blending practice, pleasure, and curiosity.",
    highlights: [
      "Experience the exhilarating sensation of gliding through the clouds high above",
      "Learn about argan oil production at a local argan oil cooperative",
      "Indulge in the awe-inspiring spectacle of the Atlas Mountains & Agafay Desert",
      "Ride a camel through the desert landscape on a 15-minute ride (Optional)"
    ],
    included: [
      "Hotel pickup and drop off",
      "Tour guide",
      "All paragliding equipment and safety gear",
      "Paragliding pilot",
      "15-minute paragliding flight",
      "GoPro video footage of flight",
      "15-minute camel ride",
      "Berber breakfast",
      "Tea"
    ],
    notIncluded: [
      "Not suitable for children under 2 years",
      "Not suitable for pregnant women",
      "Not suitable for people with back problems",
      "Not suitable for people over 287 lbs (130 kg)",
      "Not suitable for people with high blood pressure"
    ]
  },
  {
    id: "hammam-massage",
    title: "Marrakech: Traditional Hammam & Massage & Hotel Transfer",
    category: "activity",
    image: "/src/assets/Marrakech Discover/Activities/Marrakech_ Traditional Hammam & Massage & Hotel Transfer/1538777652.jpg",
    images: [
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Traditional Hammam & Massage & Hotel Transfer/1538777652.jpg",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Traditional Hammam & Massage & Hotel Transfer/spa.webp",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Traditional Hammam & Massage & Hotel Transfer/IMG_9373.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Traditional Hammam & Massage & Hotel Transfer/IMG_9374.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Traditional Hammam & Massage & Hotel Transfer/spa-1-2.jpg"
    ],
    duration: "3 hours",
    groupSize: "1-8 people",
    price: "50€",
    rating: 4.9,
    reviews: 185,
    description: "Enjoy a Moroccan spa and hammam in Marrakech. Relax with aromatherapy, steam, and traditional remedies in an authentic spa experience that soothes body and mind.",
    highlights: [
      "Explore the depths of traditional hospitality and culture by visiting a hammam",
      "Relax with a calming massage that melts away stress and tension",
      "End with hot Moroccan tea in a peaceful and calming setting",
      "Immerse yourself in Moroccan culture and experience a centuries-old tradition"
    ],
    included: [
      "Hotel pickup and drop-off",
      "Driver",
      "Entry ticket",
      "45-minute hammam session",
      "45-minute massage",
      "Hammam, body scrub and relaxing massage",
      "Moroccan tea creme with hand chocolat",
      "Water",
      "Wifi"
    ]
  },
  {
    id: "zipline-atlas-breakfast",
    title: "Marrakech: Zipline and Breakfast in the Atlas Mountains",
    category: "activity",
    image: "/src/assets/Marrakech Discover/Activities/Marrakech_ Zipline and Breakfast in the Atlas Mountains/img-30.jpg",
    images: [
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Zipline and Breakfast in the Atlas Mountains/img-30.jpg",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Zipline and Breakfast in the Atlas Mountains/img-31.jpg",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Zipline and Breakfast in the Atlas Mountains/img-32.jpg",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Zipline and Breakfast in the Atlas Mountains/img-35.jpg",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Zipline and Breakfast in the Atlas Mountains/IMG_6438.JPG"
    ],
    duration: "4 hours",
    groupSize: "2-12 people",
    price: "50€",
    rating: 4.8,
    reviews: 195,
    description: "Immerse in an adventure with a thrilling zipline ride in the Atlas Mountains, followed by a traditional Moroccan breakfast at an argan oil cooperative in Tahanaout Valley.",
    highlights: [
      "Experience an exhilarating zipline adventure with stunning mountain views",
      "Round-trip transportation from Marrakech",
      "Zipline adventure with all necessary safety equipment",
      "Memorable cultural immersion experience"
    ],
    included: [
      "Pickup and drop-off",
      "Transport with air-condition",
      "Zipline 1 hour experience",
      "Breakfast at women cooperative",
      "Professionals tour guide"
    ],
    notIncluded: [
      "Not suitable for children under 12 years",
      "Not suitable for people with heart problems",
      "Not suitable for wheelchair users",
      "Not suitable for people over 243 lbs (110 kg)",
      "Not suitable for people over 95 years"
    ]
  },
  {
    id: "rug-making-workshop",
    title: "Moroccan Rug-Making Workshop & Cultural Market Experience",
    category: "activity",
    image: "/src/assets/Marrakech Discover/Activities/Moroccan Rug-Making Workshop & Cultural Market Experience/15_4_11zon-min-2048x1365-1.webp",
    images: [
      "/src/assets/Marrakech Discover/Activities/Moroccan Rug-Making Workshop & Cultural Market Experience/15_4_11zon-min-2048x1365-1.webp",
      "/src/assets/Marrakech Discover/Activities/Moroccan Rug-Making Workshop & Cultural Market Experience/Beni-processs-25.webp",
      "/src/assets/Marrakech Discover/Activities/Moroccan Rug-Making Workshop & Cultural Market Experience/Moroccan-carpets.jpg",
      "/src/assets/Marrakech Discover/Activities/Moroccan Rug-Making Workshop & Cultural Market Experience/moroccan_rugs.jpg",
      "/src/assets/Marrakech Discover/Activities/Moroccan Rug-Making Workshop & Cultural Market Experience/tapis-04-1920x960.jpg"
    ],
    duration: "Half day",
    groupSize: "2-10 people",
    price: "50€",
    rating: 4.9,
    reviews: 165,
    description: "This isn't a tourist show—it's a chance to step into the heart of Moroccan life. You'll learn directly from local women artisans who have been weaving rugs for generations, and every thread carries a story.",
    highlights: [
      "Hands-on connection: you won't just watch, you'll weave your own small piece",
      "Personal, welcoming atmosphere far from the crowds",
      "Supporting local women's cooperatives",
      "Leave with new skills and a handmade memory to take home"
    ],
    included: [
      "Air-conditioned vehicle",
      "Tea",
      "Rug-making workshop",
      "Market showroom visit",
      "All materials and guidance included"
    ]
  },
  {
    id: "horseback-riding-atlas",
    title: "Scenic Horseback Riding Adventure Through the Atlas Mountain",
    category: "activity",
    image: "/src/assets/Marrakech Discover/Activities/Scenic Horseback Riding Adventure Through the Atlas Mountain/img-46.jpg",
    images: [
      "/src/assets/Marrakech Discover/Activities/Scenic Horseback Riding Adventure Through the Atlas Mountain/img-46.jpg",
      "/src/assets/Marrakech Discover/Activities/Scenic Horseback Riding Adventure Through the Atlas Mountain/IMG_0272.JPG",
      "/src/assets/Marrakech Discover/Activities/Scenic Horseback Riding Adventure Through the Atlas Mountain/IMG_0275.JPG",
      "/src/assets/Marrakech Discover/Activities/Scenic Horseback Riding Adventure Through the Atlas Mountain/IMG_6873.JPG",
      "/src/assets/Marrakech Discover/Activities/Scenic Horseback Riding Adventure Through the Atlas Mountain/IMG_6880.JPG"
    ],
    duration: "4 hours",
    groupSize: "2-8 people",
    price: "60€",
    rating: 4.8,
    reviews: 145,
    description: "Our horseback riding experience offers travelers a unique journey through the picturesque Atlas Mountains and authentic Berber villages, far from the usual tourist paths. Unlike other rides, we tailor the adventure to your skill level.",
    highlights: [
      "Scenic ride through the picturesque Atlas Mountains",
      "Explore authentic Berber villages",
      "Visit a women's cooperative to learn about argan oil production",
      "Choose from 1-hour, 2.5-hour, or 5-hour ride options"
    ],
    included: [
      "Air-conditioned vehicle",
      "Breakfast",
      "Choose one of the options below",
      "Water",
      "Tour guide"
    ]
  },
  {
    id: "hot-air-balloon",
    title: "Marrakech: Balloon Ride with Buffet Breakfast & Certificate",
    category: "activity",
    image: "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Sunset, Camel Ride, and Dinner Show/IMG_9614.JPG",
    images: [
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Sunset, Camel Ride, and Dinner Show/IMG_9614.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Quad & Camel Rides with Dinner Show/IMG_5401.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Sunset, Camel Ride, and Dinner Show/IMG_5740.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Quad & Camel Rides with Dinner Show/IMG_9615.JPG",
      "/src/assets/Marrakech Discover/Activities/Marrakech_ Agafay Desert Sunset, Camel Ride, and Dinner Show/IMG_6953.JPG"
    ],
    duration: "4 hours",
    groupSize: "Up to 19 people",
    price: "130€",
    rating: 5.0,
    reviews: 420,
    description: "Enjoy a morning flight over the northern Palmeraie of Marrakech, Jbilet, and the rural douars. Admire beautiful morning views and savor a traditional Moroccan buffet breakfast after landing.",
    highlights: [
      "Enjoy a magical hot air balloon flight over Marrakech, and Oued Tensift Jbilet",
      "Enjoy a warm welcome with tea, coffee, and croissants",
      "Taste a Moroccan breakfast buffet served under a traditional caidal tent",
      "Receive a personalized flight certificate written in Arabic calligraphy",
      "Round-trip transfer included by 4x4, van, or minibus from your accommodation"
    ],
    included: [
      "Round-trip transfer included by 4x4, van, or minibus from your accommodation",
      "Welcome tea and coffee with croissants",
      "40-min morning balloon flight",
      "Typical Moroccan buffet breakfast",
      "Personalized calligraphy flight certificate",
      "Insurance"
    ],
    notIncluded: [
      "Not suitable for children under 4 years",
      "Not suitable for pregnant women"
    ]
  },

  // AIRPORT TRANSFERS
  {
    id: "marrakech-airport-transfer",
    title: "Marrakech: Private Transfer to or from Marrakech Airport RAK",
    category: "airport-transfer",
    image: "/src/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/494926692d21999f77adced882342d586e04432066fd6210a555f93ae556a2fb.avif",
    images: [
      "/src/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/494926692d21999f77adced882342d586e04432066fd6210a555f93ae556a2fb.avif",
      "/src/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/7d43f23092f767c45fe8fb07a3cd95b5c5c9c432a34f2ec039be64656f7a09ce.avif",
      "/src/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/e8711bb6d25b9d4726b388ff58faeda48b1cd60b944c2dc2701c2d6389b388b0.avif"
    ],
    duration: "20 minutes",
    groupSize: "Up to 7 people",
    price: "30€",
    rating: 4.7,
    reviews: 520,
    description: "Treat yourself to a private one-way or return transfer between Marrakech Airport (RAK) and central Marrakech. Travel in a comfortable, air-conditioned vehicle with a professional driver.",
    highlights: [
      "Benefit from a professional driver who will introduce you to the city",
      "Avoid tourist scams and haggling with a taxi driver on the day",
      "Relax knowing your driver will pick you up on-time",
      "Travel to or from the airport in a comfortable, air-conditioned vehicle",
      "Avoid the hassle of carrying luggage across the city on public transport"
    ],
    included: [
      "One-way or return private transfer (depending on the option selected)",
      "Wifi"
    ]
  },
  {
    id: "casablanca-marrakech-transfer",
    title: "Casablanca To Marrakech Private Transfer",
    category: "airport-transfer",
    image: "/src/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/7d43f23092f767c45fe8fb07a3cd95b5c5c9c432a34f2ec039be64656f7a09ce.avif",
    images: [
      "/src/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/7d43f23092f767c45fe8fb07a3cd95b5c5c9c432a34f2ec039be64656f7a09ce.avif",
      "/src/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/494926692d21999f77adced882342d586e04432066fd6210a555f93ae556a2fb.avif",
      "/src/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/e8711bb6d25b9d4726b388ff58faeda48b1cd60b944c2dc2701c2d6389b388b0.avif"
    ],
    duration: "3 hours",
    groupSize: "Up to 7 people",
    price: "300€",
    rating: 4.8,
    reviews: 185,
    description: "Enjoy a reliable and hassle-free private transfer between Casablanca Airport or hotels and Marrakech to start or end your holiday with a smile. Travel in comfort either from or to the airport.",
    highlights: [
      "Experience a reliable and hassle-free airport transfer",
      "Enjoy an airport meet and greet service",
      "Sit back and relax on a private transfer from Casablanca airport or marrakech"
    ],
    included: [
      "One-way airport transfer by private vehicle",
      "Professional driver services",
      "On board Wi-Fi, Mineral Water"
    ]
  },
  {
    id: "fes-casablanca-transfer",
    title: "Fes: One Way Transfer from Fes to Casablanca or Airport(CMN)",
    category: "airport-transfer",
    image: "/src/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/e8711bb6d25b9d4726b388ff58faeda48b1cd60b944c2dc2701c2d6389b388b0.avif",
    images: [
      "/src/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/e8711bb6d25b9d4726b388ff58faeda48b1cd60b944c2dc2701c2d6389b388b0.avif",
      "/src/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/494926692d21999f77adced882342d586e04432066fd6210a555f93ae556a2fb.avif",
      "/src/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/7d43f23092f767c45fe8fb07a3cd95b5c5c9c432a34f2ec039be64656f7a09ce.avif"
    ],
    duration: "5 hours",
    groupSize: "Up to 7 people",
    price: "300€",
    rating: 4.7,
    reviews: 145,
    description: "Leaving the enchanting comforts of your riad or hotel in Fes to embark on a journey to Casablanca's vibrant airport is a transition that marks both the end of a memorable Moroccan stay and the beginning of your next adventure.",
    highlights: [
      "Get dropped off as close to your accommodation as possible",
      "Comfortable air-conditioned car",
      "Professional driver"
    ],
    included: [
      "Hotel pick up in Fes",
      "Comfortable air-conditioned car",
      "Professional driver"
    ]
  },
  {
    id: "marrakech-fes-transfer",
    title: "Marrakech: One Way Transfer from Marrakech to Fes",
    category: "airport-transfer",
    image: "/src/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/494926692d21999f77adced882342d586e04432066fd6210a555f93ae556a2fb.avif",
    images: [
      "/src/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/494926692d21999f77adced882342d586e04432066fd6210a555f93ae556a2fb.avif",
      "/src/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/7d43f23092f767c45fe8fb07a3cd95b5c5c9c432a34f2ec039be64656f7a09ce.avif",
      "/src/assets/Experiences/Marrakech Private One Way tofrom Marrakech Airport/e8711bb6d25b9d4726b388ff58faeda48b1cd60b944c2dc2701c2d6389b388b0.avif"
    ],
    duration: "1 day",
    groupSize: "Up to 7 people",
    price: "450€",
    rating: 4.8,
    reviews: 195,
    description: "Embark on an extraordinary journey through the heart of Morocco with a seamless one-way transfer from Marrakech to Fes. Experience the true essence of Morocco as you pass through charming towns, majestic mountains, and authentic Berber villages.",
    highlights: [
      "Explore fascinating stops along the way",
      "Professional Driver AC vehicle",
      "Hotel pickup and drop off"
    ],
    included: [
      "Hotel pickup and drop-off",
      "One-way transfer",
      "Professional Driver",
      "Transport by air-conditioned vehicle"
    ]
  },

  // DAY TRIPS
  {
    id: "casablanca-day-tour",
    title: "Casablanca Private Day Tour from Marrakech and Big Mosque Visit",
    category: "day-trip",
    image: "/src/assets/Marrakech Discover/Day Trips/Casablanca Day Tour from Marrakech and Big Mosque Visit/145.png",
    images: [
      "/src/assets/Marrakech Discover/Day Trips/Casablanca Day Tour from Marrakech and Big Mosque Visit/145.png",
      "/src/assets/Marrakech Discover/Day Trips/Casablanca Day Tour from Marrakech and Big Mosque Visit/146.png",
      "/src/assets/Marrakech Discover/Day Trips/Casablanca Day Tour from Marrakech and Big Mosque Visit/148.jpg",
      "/src/assets/Marrakech Discover/Day Trips/Casablanca Day Tour from Marrakech and Big Mosque Visit/Casablanca-Tours.jpg",
      "/src/assets/Marrakech Discover/Day Trips/Casablanca Day Tour from Marrakech and Big Mosque Visit/MarrakechtoCasablancaDayTour_VisittheIconicHassanIIMosque.jpg"
    ],
    duration: "11 hours",
    groupSize: "Private tour",
    price: "65€",
    rating: 4.8,
    reviews: 215,
    description: "Experience the best of Casablanca on a captivating day trip from Marrakech. Visit the Cathedral of the Sacred Heart, explore Place Mohamed V, and marvel at the iconic Hassan II Mosque.",
    highlights: [
      "Discover the highlights of Casablanca on a day trip from Marrakech",
      "Admire the intricate mosaic work, handcrafted wood carvings, and marble floors",
      "Discover Hassan II Mosque, Morocco's largest and the world's seventh-largest",
      "Savor a delicious lunch at a local restaurant with authentic Moroccan cuisine",
      "Relax at one of Casablanca's serene beaches and take in the coastal beauty"
    ],
    included: [
      "Hotel pickup and drop-off",
      "Transportation by air-conditioned minibus",
      "Driver",
      "Relaxation time at a Casablanca beach"
    ],
    notIncluded: [
      "Lunch",
      "Entry fees (Mosque 14 EUR per person)",
      "Personal expenses",
      "Drinks"
    ]
  },
  {
    id: "atlas-mountains-hiking",
    title: "From Marrakech: Private Atlas Mountains Full-Day Hiking Trip w Lunch",
    category: "day-trip",
    image: "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Atlas Mountains Full-Day Hiking Trip w Lunch/img-57.jpg",
    images: [
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Atlas Mountains Full-Day Hiking Trip w Lunch/img-57.jpg",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Atlas Mountains Full-Day Hiking Trip w Lunch/img-58.jpg",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Atlas Mountains Full-Day Hiking Trip w Lunch/img-59.jpg",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Atlas Mountains Full-Day Hiking Trip w Lunch/img-62.jpg",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Atlas Mountains Full-Day Hiking Trip w Lunch/img-66.webp"
    ],
    duration: "8 hours",
    groupSize: "Private tour",
    price: "65€",
    rating: 4.9,
    reviews: 320,
    description: "Explore Berber villages and breathtaking landscapes on this full-day High Atlas trek. Ride a camel, hike through Imlil Valley, and enjoy lunch in a traditional Berber home.",
    highlights: [
      "Moderate hike with cultural interaction/Authentic experience off the tourist track",
      "Stunning landscapes, from valleys to peaks",
      "Explore Traditional Berber Villages",
      "Authentic Berber Lunch /Unforgettable Photography Opportunities",
      "Admire the Orchards of Imlil /Passing through villages Agafay Asni Moulay Brahim"
    ],
    included: [
      "Hotel pick-up and drop off",
      "Transportation",
      "Guide",
      "Lunch",
      "Camel ride",
      "Mint tea",
      "Tea in a family house"
    ]
  },
  {
    id: "ouarzazate-ait-ben-haddou",
    title: "From Marrakech: Ouarzazate, Ait Ben Haddou & Atlas Studios",
    category: "day-trip",
    image: "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouarzazate, Ait Ben Haddou & Atlas Studios/img-74.jpg",
    images: [
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouarzazate, Ait Ben Haddou & Atlas Studios/img-74.jpg",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouarzazate, Ait Ben Haddou & Atlas Studios/img-75.jpg",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouarzazate, Ait Ben Haddou & Atlas Studios/kasbah-taourirt-1200x675.jpg",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouarzazate, Ait Ben Haddou & Atlas Studios/studio-atlas.jpg",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouarzazate, Ait Ben Haddou & Atlas Studios/img-77.jpg"
    ],
    duration: "11 hours",
    groupSize: "Private tour",
    price: "65€",
    rating: 4.9,
    reviews: 380,
    description: "Embark on a day trip from Marrakech to explore the stunning earthen architecture of Ait Benhaddou and the Atlas Film Studios in Ouarzazate, plus savor a traditional Moroccan lunch.",
    highlights: [
      "Discover the iconic earthen clay architecture of Ait Benhaddou",
      "See the sets of famous movies at the Atlas Film Studios in Ouarzazate",
      "Enjoy a delicious Moroccan lunch at a local restaurant",
      "Drive through the stunning Atlas Mountains and charming Berber villages",
      "Cross the majestic Tizi n'Tichka Pass at 2,260 meters"
    ],
    included: [
      "Air-conditioned vehicle",
      "Pick-up and drop-off at accommodation in Marrakech",
      "Professional driver/Guide",
      "Scenic drive through the high Atlas mountains & Tizi n'Tichka Pass",
      "Scenic photo stops along the way",
      "Guided Visit of Kasbah Ait Benhaddou (UNESCO World Heritage Site)",
      "Visit to Atlas Film Studios in Ouarzazate"
    ],
    notIncluded: [
      "Studio entry fee: €8 per person",
      "Lunch"
    ]
  },
  {
    id: "ouzoud-waterfalls",
    title: "From Marrakech: Private Ouzoud Waterfalls Guided Hike and Boat Trip",
    category: "day-trip",
    image: "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouzoud Waterfalls Guided Hike and Boat Trip/145.png",
    images: [
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouzoud Waterfalls Guided Hike and Boat Trip/145.png",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouzoud Waterfalls Guided Hike and Boat Trip/148.png",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouzoud Waterfalls Guided Hike and Boat Trip/from-marrakech-ouzoud-waterfalls-guided-hike-and-boat-trip-02.jpg",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouzoud Waterfalls Guided Hike and Boat Trip/From-Marrakech-Ouzoud-Waterfalls-Guided-Hike-and-Boat-Trip3.webp",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouzoud Waterfalls Guided Hike and Boat Trip/OuzoudWaterfalls,GuidedMountainHikeandBoatRidefromMarrakech.jpg"
    ],
    duration: "10 hours",
    groupSize: "Private tour",
    price: "65€",
    rating: 4.8,
    reviews: 295,
    description: "Visit the Ouzoud Waterfalls from Marrakech. Join a guided hike and enjoy a boat ride to admire the falls from up close.",
    highlights: [
      "Admire the spectacular Ouzoud waterfalls",
      "Join a scenic hike with a local guide",
      "Get up close to the falls on a boat ride",
      "Relax with transportation and lunch pre-arranged",
      "See wild monkeys roaming around the falls"
    ],
    included: [
      "Hotel/riad pickup and drop-off",
      "Round-trip transportation by air-conditioned van/minibus",
      "Bilingual driver",
      "Live guide in Ouzoud",
      "Boat ride"
    ],
    notIncluded: [
      "Lunch (approximately €10, paid locally in cash)"
    ]
  },
  {
    id: "essaouira-day-trip",
    title: "From Marrakech: Private Day to Essaouira & Sekkala Trip",
    category: "day-trip",
    image: "/src/assets/Marrakech Discover/Day Trips/From Marrakech_Private Day to essaouira & sekkal trip/Essaouira-Medina-Souks.webp",
    images: [
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_Private Day to essaouira & sekkal trip/Essaouira-Medina-Souks.webp",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_Private Day to essaouira & sekkal trip/Things-to-Do-Essaouira-Canon-Ramparts.webp",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_Private Day to essaouira & sekkal trip/Things-to-Do-Essaouira-Fishing-Boats.webp",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_Private Day to essaouira & sekkal trip/Things-to-do-Essaouira-Fish-Market-Grill.webp",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_Private Day to essaouira & sekkal trip/Gnawa-musician-in-Essaouira.jpg"
    ],
    duration: "11.5 hours",
    groupSize: "Private tour",
    price: "70€",
    rating: 4.8,
    reviews: 365,
    description: "Escape to Essaouira on a day trip from Marrakech. Discover its charming medina, historic port, and breezy beaches. A perfect blend of culture, sea, and relaxation.",
    highlights: [
      "Full-day excursion from Marrakech to Essaouira",
      "Explore the old medina, souks, port, and Skala fortress",
      "Visit Argan oil cooperatives along the route",
      "Free time to enjoy the beach and local cuisine"
    ],
    included: [
      "Pick up and drop off in an Air Conditioned Car",
      "English and French or spanish speaking Driver",
      "Liability insurance",
      "Fuel charges",
      "Free Visit of the Cooperatives"
    ],
    notIncluded: [
      "Personal fees",
      "Lunch"
    ]
  },
  {
    id: "atlas-talamrout-summit",
    title: "From Marrakesh: Private Atlas Mountains Talamrout Summit Day Hike",
    category: "day-trip",
    image: "/src/assets/Marrakech Discover/Day Trips/From Marrakesh_ Atlas Mountains Talamrout Summit Day Hike/img-98.avif",
    images: [
      "/src/assets/Marrakech Discover/Day Trips/From Marrakesh_ Atlas Mountains Talamrout Summit Day Hike/img-98.avif",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakesh_ Atlas Mountains Talamrout Summit Day Hike/img-99.avif",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakesh_ Atlas Mountains Talamrout Summit Day Hike/img-101.avif",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakesh_ Atlas Mountains Talamrout Summit Day Hike/img-102.avif",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakesh_ Atlas Mountains Talamrout Summit Day Hike/img-107.avif"
    ],
    duration: "1 day",
    groupSize: "Private tour",
    price: "70€",
    rating: 4.9,
    reviews: 185,
    description: "Discover the Atlas Mountains on a day hike from Marrakesh. Summit Adrar Talamrout (2,600m) on a moderate trek with panoramic views of the Imlil and Imnane Valleys.",
    highlights: [
      "Moderate day hike with almost 900m ascent and descent",
      "Panoramic views of Imlil and Imnane Valleys",
      "Trek through Berber villages of Ait Souka and Tamatert",
      "Summit the mighty Adrar Talamrout (2,600m)"
    ],
    included: [
      "Guide",
      "Hotel pickup and drop-off",
      "Transportation by air-conditioned car",
      "Lunch",
      "Moroccan mint tea"
    ],
    notIncluded: [
      "Equipment (hiking shoes can be rented in imlil village)",
      "Tips"
    ]
  },
  {
    id: "ourika-valley-waterfall",
    title: "Marrakech: Private Atlas Mountains, Ourika Valley, Waterfall & Lunch",
    category: "day-trip",
    image: "/src/assets/Marrakech Discover/Day Trips/Marrakech_ Atlas Mountains, Ourika Valley, Waterfall & Lunch/09.jpg",
    images: [
      "/src/assets/Marrakech Discover/Day Trips/Marrakech_ Atlas Mountains, Ourika Valley, Waterfall & Lunch/09.jpg",
      "/src/assets/Marrakech Discover/Day Trips/Marrakech_ Atlas Mountains, Ourika Valley, Waterfall & Lunch/10.jpg",
      "/src/assets/Marrakech Discover/Day Trips/Marrakech_ Atlas Mountains, Ourika Valley, Waterfall & Lunch/e0.jpg",
      "/src/assets/Marrakech Discover/Day Trips/Marrakech_ Atlas Mountains, Ourika Valley, Waterfall & Lunch/e6.jpg",
      "/src/assets/Marrakech Discover/Day Trips/Marrakech_ Atlas Mountains, Ourika Valley, Waterfall & Lunch/fd.jpg"
    ],
    duration: "7-8 hours",
    groupSize: "Private tour",
    price: "65€",
    rating: 4.8,
    reviews: 425,
    description: "Take a day trip from Marrakech to explore Ourika Valley. See the Atlas Mountains, visit traditional Berber villages, and learn about argan oil production. Enjoy natural green landscapes and waterfalls.",
    highlights: [
      "Discover cultural treasures in traditional Berber villages",
      "Witness the artistry of Argan Oil production at local cooperatives",
      "Marvel at majestic waterfalls cascading through the valley",
      "Explore lush green landscapes on scenic hiking trails",
      "Escape the city bustle to serene Atlas Mountain views"
    ],
    included: [
      "Pickup and drop-off service",
      "Comfortable transportation in an air-conditioned bus",
      "Scenic stops to enjoy panoramic views",
      "Visit to a traditional Berber house",
      "Explore an Argan oil cooperative",
      "Hike to the beautiful Setti Fatma Waterfalls",
      "Experienced local guide",
      "Lunch: starter, main course, and dessert (if option selected)",
      "Complimentary half-liter bottle of water"
    ]
  },

  // TOURS
  {
    id: "10-day-morocco-highlights",
    title: "10-Day Morocco Highlights & Desert Adventure",
    category: "tour",
    image: "/src/assets/Marrakech Discover/Tours/10-Day Morocco Highlights & Desert Adventure/img-120.webp",
    images: [
      "/src/assets/Marrakech Discover/Tours/10-Day Morocco Highlights & Desert Adventure/img-120.webp",
      "/src/assets/Marrakech Discover/Tours/10-Day Morocco Highlights & Desert Adventure/1664226408648.jpg",
      "/src/assets/Marrakech Discover/Tours/10-Day Morocco Highlights & Desert Adventure/img-132.jpg",
      "/src/assets/Marrakech Discover/Tours/10-Day Morocco Highlights & Desert Adventure/img-133.jpg",
      "/src/assets/Marrakech Discover/Tours/10-Day Morocco Highlights & Desert Adventure/fes--1024x682.jpg"
    ],
    duration: "10 days",
    groupSize: "Private tour",
    price: "1500€",
    rating: 5.0,
    reviews: 245,
    description: "Experience Morocco on a 10-day tour from Casablanca. Explore imperial cities, ride camels in the Sahara, and immerse in Berber culture with luxury, comfort, and unforgettable landscapes.",
    highlights: [
      "Discover Casablanca and the majestic Hassan II Mosque",
      "Wander Chefchaouen's iconic blue streets in the Rif Mountains",
      "Ride camels and watch the sunset over Sahara dunes",
      "Explore ancient Fes and its UNESCO-listed medieval medina",
      "Visit Ait Ben Haddou and historic Marrakech souks"
    ],
    included: [
      "Private comfortable & air-conditioned vehicle",
      "Hotel pick-up and drop-off service",
      "Professional & bilingual driver-guide",
      "Transportation insurance",
      "Sunset camel trekking adventure in the Sahara Desert",
      "Sandboarding experience on the dunes",
      "Authentic Berber drumming and music performance",
      "4WD sunrise transfer from desert camp",
      "Local expert guides in Fes, Chefchaouen, and Marrakech",
      "10 breakfasts & 9 dinners included",
      "8 overnights in comfortable traditional riads/hotels",
      "1 overnight in a luxury desert camp in Merzouga",
      "Airport or hotel transfers at start and end of tour",
      "Local Guide in Ait Ben Haddou"
    ],
    notIncluded: [
      "Lunches",
      "Gratuities",
      "Monument tickets"
    ]
  },
  {
    id: "6-day-casablanca-marrakech",
    title: "Casablanca: 6-Day Tour To Marrakech Via Chefchaouen & Desert",
    category: "tour",
    image: "/src/assets/Marrakech Discover/Tours/Casablanca_ 6-Day Tour To Marrakech Via Chefchaouen & Desert/1664226408648.jpg",
    images: [
      "/src/assets/Marrakech Discover/Tours/Casablanca_ 6-Day Tour To Marrakech Via Chefchaouen & Desert/1664226408648.jpg",
      "/src/assets/Marrakech Discover/Tours/Casablanca_ 6-Day Tour To Marrakech Via Chefchaouen & Desert/img-147.jpg",
      "/src/assets/Marrakech Discover/Tours/Casablanca_ 6-Day Tour To Marrakech Via Chefchaouen & Desert/img-148.jpg",
      "/src/assets/Marrakech Discover/Tours/Casablanca_ 6-Day Tour To Marrakech Via Chefchaouen & Desert/volubilis.jpg",
      "/src/assets/Marrakech Discover/Tours/Casablanca_ 6-Day Tour To Marrakech Via Chefchaouen & Desert/Que-ver-en-Rabat.jpg"
    ],
    duration: "6 days",
    groupSize: "Private tour",
    price: "800€",
    rating: 4.9,
    reviews: 185,
    description: "Discover Morocco on a 6-day adventure from Casablanca to Marrakech via Chefchaouen, Fes, the Sahara Desert, Merzouga camel trek, Todra Gorges & Ait Ben Haddou's iconic kasbah.",
    highlights: [
      "Explore the Hassan II Mosque in Casablanca and Rabat's Hassan Tower",
      "Discover Chefchaouen's blue-painted streets and relaxing medina",
      "Wander through ancient Roman ruins in Volubilis near Meknes",
      "Camel trek into the Erg Chebbi dunes and sleep in a desert camp",
      "Admire the stunning Todra and Dades Gorges' dramatic landscapes"
    ],
    included: [
      "Private comfortable and air-conditioned vehicle",
      "Hotel pickup and drop-off",
      "Professional bilingual driver",
      "Transportation insurance",
      "5 breakfasts & 5 Dinners",
      "Local guides in Fes and Chefchouaen",
      "Sunset Camel Trekking Adventure Ride to the Desert",
      "Sandboarding",
      "Berber drumming and music experience",
      "4WD sunrise transfer from the desert camp",
      "4 Overnights in comfortable traditional riad or hotel",
      "1 Overnight in a luxury camp in Merzouga Desert",
      "Monument entry tickets",
      "Local Guide in Ait Ben Haddou"
    ],
    notIncluded: [
      "Lunches"
    ]
  },
  {
    id: "3-day-merzouga-desert",
    title: "From Marrakech: Private 3-Day Luxury Merzouga Desert Tour",
    category: "tour",
    image: "/src/assets/Marrakech Discover/Tours/From Marrakech_ Private 3-Day Luxury Merzouga Desert Tour/1664226408648.jpg",
    images: [
      "/src/assets/Marrakech Discover/Tours/From Marrakech_ Private 3-Day Luxury Merzouga Desert Tour/1664226408648.jpg",
      "/src/assets/Marrakech Discover/Tours/From Marrakech_ Private 3-Day Luxury Merzouga Desert Tour/img-159.jpg",
      "/src/assets/Marrakech Discover/Tours/From Marrakech_ Private 3-Day Luxury Merzouga Desert Tour/img-157.jpg",
      "/src/assets/Marrakech Discover/Tours/From Marrakech_ Private 3-Day Luxury Merzouga Desert Tour/todgha_gorges.jpg",
      "/src/assets/Marrakech Discover/Tours/From Marrakech_ Private 3-Day Luxury Merzouga Desert Tour/img-160.jpg"
    ],
    duration: "3 days",
    groupSize: "Private tour",
    price: "500€",
    rating: 4.9,
    reviews: 325,
    description: "Experience a private 3-day desert tour from Marrakech. Visit Ait Ben Haddou, explore the Atlas Mountains, ride camels in Merzouga, and sleep under the stars in a Sahara Luxury desert camp.",
    highlights: [
      "Explore the UNESCO site Ait Ben Haddou and Ouarzazate's film studios",
      "Wander through the stunning Valley of Roses and Dades Gorges",
      "Hike the dramatic Todra Gorges and walk along the Todra River",
      "Ride camels across the Erg Chebbi dunes and enjoy a desert sunset",
      "Visit Berber villages and the scenic Draa Valley on your return to Marrakech"
    ],
    included: [
      "Private Comfortable & Air-conditioned Vehicle",
      "Hotel pick-up and drop-off",
      "Professional & Bilingual Driver",
      "Transportation Insurance",
      "Sunset Camel Trekking Adventure Ride to the Desert",
      "Sandboarding",
      "2 Breakfasts & 2 Dinners",
      "1 overnight stay in a comfortable hotel/riad in Dades",
      "1 overnight stay in a luxury desert camp in Merzouga",
      "Berber drumming and music experience",
      "4WD sunrise transfer from the desert camp",
      "Warm showers and toilets",
      "WiFi"
    ],
    notIncluded: [
      "Lunches",
      "Local guide at Ait ben Haddou"
    ]
  },
  {
    id: "4-day-sahara-adventure",
    title: "Marrakech to Merzouga: 4-Day Luxury Sahara Desert Adventure",
    category: "tour",
    image: "/src/assets/Marrakech Discover/Tours/From Marrakech_ Private 3-Day Luxury Merzouga Desert Tour/img-159.jpg",
    images: [
      "/src/assets/Marrakech Discover/Tours/From Marrakech_ Private 3-Day Luxury Merzouga Desert Tour/img-159.jpg",
      "/src/assets/Marrakech Discover/Tours/From Marrakech_ Private 3-Day Luxury Merzouga Desert Tour/1664226408648.jpg",
      "/src/assets/Marrakech Discover/Tours/From Marrakech_ Private 3-Day Luxury Merzouga Desert Tour/todgha_gorges.jpg",
      "/src/assets/Marrakech Discover/Tours/From Marrakech_ Private 3-Day Luxury Merzouga Desert Tour/studio-atlas.jpg",
      "/src/assets/Marrakech Discover/Tours/From Marrakech_ Private 3-Day Luxury Merzouga Desert Tour/img-155.jpg"
    ],
    duration: "4 days",
    groupSize: "Private tour",
    price: "500€",
    rating: 4.9,
    reviews: 285,
    description: "Sleep under a billion stars, cross the Atlas Mountains, visit Ait Ben Haddou, and ride camels through the golden dunes of Merzouga to your luxury desert camp.",
    highlights: [
      "Discover the beauty of the High Atlas Mountains on a scenic drive",
      "Explore the ancient Kasbah of Ait Ben Haddou and Todra Gorges",
      "Ride a camel across the golden dunes and try sandboarding",
      "Spend two magical nights in a luxury desert camp under the stars",
      "Watch unforgettable Sahara sunrises and sunsets in Merzouga"
    ],
    included: [
      "Pickup and drop-off from your accommodation in Marrakech",
      "Transportation in an air-conditioned van or 4×4 vehicle with onboard Wi-Fi",
      "Professional English- or French-speaking driver/guide",
      "Local guide in Tinghir",
      "Visit Khamlia Village to enjoy live Gnawa music",
      "Visit a nomadic Berber family",
      "Camel trek across the Erg Chebbi dunes",
      "Sandboarding experience",
      "1 Night in a hotel (private room with air conditioning)",
      "2 Nights in a luxury desert camp",
      "3 Dinners (Days 1, 2 & 3)",
      "3 Breakfasts (Days 2, 3 & 4)",
      "Berber music and campfire entertainment under the stars"
    ]
  },
  {
    id: "2-day-ait-ben-haddou",
    title: "Marrakech: Private 2-Days Trip Ait Ben Haddou & Ouarzazate",
    category: "tour",
    image: "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouarzazate, Ait Ben Haddou & Atlas Studios/img-75.jpg",
    images: [
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouarzazate, Ait Ben Haddou & Atlas Studios/img-75.jpg",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouarzazate, Ait Ben Haddou & Atlas Studios/kasbah-taourirt-1200x675.jpg",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouarzazate, Ait Ben Haddou & Atlas Studios/studio-atlas.jpg",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouarzazate, Ait Ben Haddou & Atlas Studios/img-74.jpg",
      "/src/assets/Marrakech Discover/Day Trips/From Marrakech_ Ouarzazate, Ait Ben Haddou & Atlas Studios/todgha_gorges.jpg"
    ],
    duration: "2 days",
    groupSize: "Private tour",
    price: "250€",
    rating: 4.8,
    reviews: 165,
    description: "Embark on a private 2-day trip from Marrakech to Ait Ben Haddou & Ouarzazate. Explore UNESCO-listed sites, cinematic landscapes, and ancient kasbahs with a professional guide.",
    highlights: [
      "Cross the scenic Tizi n'Tichka Pass in the High Atlas Mountains",
      "Explore the hidden Fint Oasis and its lush palm groves",
      "Visit Ouarzazate, the Hollywood of Africa",
      "Discover the UNESCO-listed Ait Ben Haddou ksar",
      "Tour the historic Telouet Kasbah in the Atlas Mountains"
    ],
    included: [
      "Private Comfortable & Air-conditioned Vehicle",
      "Hotel pick-up and drop-off",
      "Professional & Bilingual Driver",
      "Transportation Insurance",
      "1 Breakfast & 1 Dinner",
      "1 Overnights in a comfortable hotel in Ouarzazate"
    ],
    notIncluded: [
      "Lunches",
      "Monument tickets",
      "Local Guides In Fint Ouasis And Ait ben haddou"
    ]
  },
  {
    id: "3-day-sahara-to-fez",
    title: "Marrakech: 3-Day Private Sahara Tour to Fez via Merzouga",
    category: "tour",
    image: "/src/assets/Marrakech Discover/Tours/10-Day Morocco Highlights & Desert Adventure/fes--1024x682.jpg",
    images: [
      "/src/assets/Marrakech Discover/Tours/10-Day Morocco Highlights & Desert Adventure/fes--1024x682.jpg",
      "/src/assets/Marrakech Discover/Tours/From Marrakech_ Private 3-Day Luxury Merzouga Desert Tour/img-159.jpg",
      "/src/assets/Marrakech Discover/Tours/From Marrakech_ Private 3-Day Luxury Merzouga Desert Tour/img-157.jpg",
      "/src/assets/Marrakech Discover/Tours/From Marrakech_ Private 3-Day Luxury Merzouga Desert Tour/todgha_gorges.jpg",
      "/src/assets/Marrakech Discover/Tours/10-Day Morocco Highlights & Desert Adventure/Maroc-Fes-03-2024-640.avif"
    ],
    duration: "3 days",
    groupSize: "Private tour",
    price: "500€",
    rating: 4.9,
    reviews: 295,
    description: "Discover the magic of the Sahara on a private 3-day tour from Marrakech to Fez. Ride camels, explore ancient kasbahs, and sleep under the stars in a Merzouga desert camp.",
    highlights: [
      "Discover the UNESCO-listed Ait Ben Haddou and its iconic desert kasbahs",
      "Drive through the stunning Valley of the Roses and traditional Berber villages",
      "Admire the dramatic rock formations of the Dades Gorges and lush valleys",
      "Visit the palm-lined oasis of Tinghir and walk through the Todra Gorges",
      "Ride a camel across golden dunes, watch a Sahara sunset, and camp in Merzouga"
    ],
    included: [
      "Private Comfortable & Air-conditioned Vehicle",
      "Hotel pick-up and drop-off",
      "Professional & Bilingual Driver",
      "Transportation Insurance",
      "Sunset Camel Trekking Adventure Ride to the Desert",
      "Sandboarding",
      "2 Breakfasts & 2 Dinners",
      "1 overnight stay in a comfortable hotel/riad in Dades",
      "1 overnight stay in a luxury desert camp in Merzouga",
      "Berber drumming and music experience",
      "4WD sunrise transfer from the desert camp",
      "Warm showers and toilets",
      "WiFi"
    ],
    notIncluded: [
      "Lunches"
    ]
  },

  // TREKKING
  {
    id: "azzaden-valley-trek-2-days",
    title: "Azzaden Valley & Berber Villages Trek (2 Days)",
    category: "trekking",
    image: "/src/assets/Marrakech Discover/trekking/picture/000df7ec-2aa4-490f-a33a-513ba4953465.avif",
    images: [
      "/src/assets/Marrakech Discover/trekking/picture/000df7ec-2aa4-490f-a33a-513ba4953465.avif",
      "/src/assets/Marrakech Discover/trekking/picture/04be9343-6deb-429d-9755-56522b9f14e4.avif",
      "/src/assets/Marrakech Discover/trekking/picture/0f051d6b-2d7d-4b62-bb95-aafdcc554e6c.avif",
      "/src/assets/Marrakech Discover/trekking/picture/16c73771-af1e-4aec-b90f-b0a64f6a1fbb.avif",
      "/src/assets/Marrakech Discover/trekking/picture/1ebd24a2-b25d-4d27-9635-12c650264081.avif"
    ],
    duration: "2 days",
    groupSize: "Min 2, Max 15",
    price: "From 150€ per person",
    rating: 4.9,
    reviews: 155,
    description: "Trek through the stunning Azzaden Valley, exploring traditional Berber villages and experiencing authentic mountain life over 2 days.",
    highlights: [
      "Trek to Tizi n'Tacht pass with amazing views",
      "Explore Berber villages in Azzaden valley",
      "Visit Ighouliden Waterfalls",
      "Experience traditional Berber hospitality"
    ],
    included: [
      "Private transport to and from Marrakech",
      "Hotel pick up and drop off",
      "All meals during your 2 days trek + coffee and tea",
      "Accommodation in the guest house",
      "Mules to carry your bags",
      "Mountain guide"
    ],
    notIncluded: [
      "Travel insurance",
      "Drinks",
      "Tip"
    ]
  },
  {
    id: "mount-toubkal-trek-5-days",
    title: "Mount Toubkal Trek & Berber Village Trip (5 Days)",
    category: "trekking",
    image: "/src/assets/Marrakech Discover/trekking/picture/04be9343-6deb-429d-9755-56522b9f14e4.avif",
    images: [
      "/src/assets/Marrakech Discover/trekking/picture/04be9343-6deb-429d-9755-56522b9f14e4.avif",
      "/src/assets/Marrakech Discover/trekking/picture/4e2896c7-aed0-4388-89dc-3f0f2f543f55.avif",
      "/src/assets/Marrakech Discover/trekking/picture/5ab8942e-1042-421b-8ae0-ae4659592d1b.avif",
      "/src/assets/Marrakech Discover/trekking/picture/62144af8-299a-4fd6-958e-ea8ac1d1b1a0.avif",
      "/src/assets/Marrakech Discover/trekking/picture/695ade7c-0894-4190-97cb-027ef4e6fde2.avif"
    ],
    duration: "5 days",
    groupSize: "Min 2, Max 15",
    price: "From 280€ per person",
    rating: 5.0,
    reviews: 285,
    description: "Summit Mount Toubkal (4,167m), the highest peak in North Africa, combined with cultural experiences in Berber villages over 5 days.",
    highlights: [
      "Summit Mount Toubkal at 4,167m",
      "Trek through Azzaden Valley",
      "Visit Ighouliden Waterfalls",
      "Experience Berber village life",
      "Panoramic views of the Atlas Mountains"
    ],
    included: [
      "Private Transport to and from Marrakech",
      "Hotel pick up and drop off",
      "All meals during your 4 days trek + coffee and tea",
      "Accommodation in the guest houses & Refuges",
      "Mountain guide",
      "Mules to carry your bags"
    ],
    notIncluded: [
      "Travel insurance",
      "Soft Drinks and water",
      "Tip"
    ]
  },
  {
    id: "three-valleys-trek-3-days",
    title: "Three Valleys & Berber Villages Trek (3 Days)",
    category: "trekking",
    image: "/src/assets/Marrakech Discover/trekking/picture/0f051d6b-2d7d-4b62-bb95-aafdcc554e6c.avif",
    images: [
      "/src/assets/Marrakech Discover/trekking/picture/0f051d6b-2d7d-4b62-bb95-aafdcc554e6c.avif",
      "/src/assets/Marrakech Discover/trekking/picture/6e21e322-27bf-47cd-82aa-dde219c55b86.avif",
      "/src/assets/Marrakech Discover/trekking/picture/7e976740-19fb-40f1-a834-62836b39bd48.avif",
      "/src/assets/Marrakech Discover/trekking/picture/987f35b9-34c6-46fb-aba0-20cd547dfae3.avif",
      "/src/assets/Marrakech Discover/trekking/picture/abe1a25d-a2f7-4f6e-9629-68335400f633.avif"
    ],
    duration: "3 days",
    groupSize: "Min 2, Max 15",
    price: "From 230€ per person",
    rating: 4.8,
    reviews: 165,
    description: "Explore three stunning valleys in the High Atlas Mountains, passing through traditional Berber villages and experiencing authentic mountain culture.",
    highlights: [
      "Trek through three beautiful valleys",
      "Visit traditional Berber villages",
      "Cross mountain passes with panoramic views",
      "Experience authentic mountain hospitality"
    ],
    included: [
      "Private transport to and from Marrakech",
      "Hotel pick up and drop off",
      "All meals during your trek + coffee and tea",
      "Accommodation in guest houses",
      "Mountain guide",
      "Mules to carry your bags"
    ],
    notIncluded: [
      "Travel insurance",
      "Drinks",
      "Tip"
    ]
  },
  {
    id: "atlas-sahara-5-days",
    title: "Atlas Mountains Two Valleys & Sahara Desert Trip (5 Days)",
    category: "trekking",
    image: "/src/assets/Marrakech Discover/trekking/picture/110fda08-c82b-4d17-a5ee-e23e6ef88961.jpg",
    images: [
      "/src/assets/Marrakech Discover/trekking/picture/110fda08-c82b-4d17-a5ee-e23e6ef88961.jpg",
      "/src/assets/Marrakech Discover/trekking/picture/556a21a7-6e00-4aea-8cbc-46bdbfba38c8.jpg",
      "/src/assets/Marrakech Discover/trekking/picture/c19b6230-5620-41f0-b073-2fe34e44ce3c.jpg",
      "/src/assets/Marrakech Discover/trekking/picture/DSC_0110-scaled.jpg",
      "/src/assets/Marrakech Discover/trekking/picture/ef4002ee-c4d1-46f9-9522-55114cbd992f.jpg"
    ],
    duration: "5 days",
    groupSize: "Min 2, Max 15",
    price: "From 450€ per person",
    rating: 4.9,
    reviews: 225,
    description: "Combine Atlas Mountains trekking with a Sahara Desert experience. Trek through valleys, cross mountain passes, and enjoy camel rides in the desert.",
    highlights: [
      "Trek through Atlas Mountains valleys",
      "Visit Ait Ben Haddou UNESCO site",
      "Explore Dades and Todra Gorges",
      "Camel ride in Merzouga dunes",
      "Sleep in a luxury desert camp"
    ],
    included: [
      "Private Transport to and from Marrakech & throughout during your trip",
      "Hotel pick up and drop off",
      "Accommodation on the mountains",
      "All meals during your trek on the mountains",
      "Accommodation in the hotel & in desert tents with half board",
      "Experienced & speak English Mountain guide",
      "Sleeping bags",
      "Speak English desert driver guide",
      "Mules to carry your bags during the trek",
      "Camel ride on the desert"
    ],
    notIncluded: [
      "Travel insurance",
      "Lunches during the desert trek",
      "Soft Drinks & water",
      "Tip"
    ]
  },
  {
    id: "big-tour-toubkal-12-days",
    title: "Big Tour Around Toubkal (12 Days)",
    category: "trekking",
    image: "/src/assets/Marrakech Discover/trekking/picture/16c73771-af1e-4aec-b90f-b0a64f6a1fbb.avif",
    images: [
      "/src/assets/Marrakech Discover/trekking/picture/16c73771-af1e-4aec-b90f-b0a64f6a1fbb.avif",
      "/src/assets/Marrakech Discover/trekking/picture/c666bba6-c67e-4015-8ce8-4f942e3d7429.avif",
      "/src/assets/Marrakech Discover/trekking/picture/d233612a-7bfa-4176-8ba6-26dcc8c20bdb.avif",
      "/src/assets/Marrakech Discover/trekking/picture/e6f806e9-dab6-4cf2-9f01-de5bf645a46f.avif",
      "/src/assets/Marrakech Discover/trekking/picture/f46aa2c0-9159-46f6-bb3d-398ea5da2a0e.avif"
    ],
    duration: "12 days",
    groupSize: "Min 2, Max 15",
    price: "From 800€ per person",
    rating: 5.0,
    reviews: 145,
    description: "The ultimate Atlas Mountains trek, circumnavigating Mount Toubkal over 12 days through diverse valleys, villages, and high mountain passes.",
    highlights: [
      "Complete circuit around Mount Toubkal",
      "Summit Mount Toubkal (4,167m)",
      "Cross multiple high mountain passes",
      "Visit numerous Berber villages",
      "Experience diverse landscapes and valleys"
    ],
    included: [
      "Private transport to and from Marrakech",
      "Hotel pick up and drop off",
      "All meals during your 12 days trek + coffee and tea",
      "Accommodation in the tents and guest houses",
      "Mountain guide",
      "Mules to carry your bags"
    ],
    notIncluded: [
      "Travel insurance",
      "Soft Drinks And water",
      "Accommodation in Marrakech",
      "Tip"
    ]
  }
];

// Helper functions to filter tours by category
export const getActivities = () => tours.filter(t => t.category === "activity");
export const getAirportTransfers = () => tours.filter(t => t.category === "airport-transfer");
export const getDayTrips = () => tours.filter(t => t.category === "day-trip");
export const getTours = () => tours.filter(t => t.category === "tour");
export const getTrekkingTours = () => tours.filter(t => t.category === "trekking");
export const getTourById = (id: string) => tours.find(t => t.id === id);
