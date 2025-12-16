import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  tourData?: {
    name: string;
    description: string;
    image: string;
    price: string;
    duration: string;
    rating?: number;
    reviews?: number;
  };
}

const SEO = ({ 
  title = "Marrakech Discover - Unforgettable Tours & Day Trips in Morocco",
  description = "Discover the magic of Marrakech with authentic tours, desert adventures, and day trips. Local experts, best prices guaranteed, 24/7 support. Book Sahara desert tours, Atlas mountains hiking, camel rides & more!",
  keywords = "Marrakech tours, Morocco day trips, Sahara desert tours, Atlas mountains hiking, Agafay desert, Marrakech activities, camel ride Marrakech, Morocco travel",
  image = "https://www.marrakechdiscover.com/hero-desert.jpg",
  url = "https://www.marrakechdiscover.com/",
  type = "website",
  tourData
}: SEOProps) => {
  const fullTitle = title.includes("Marrakech Discover") ? title : `${title} | Marrakech Discover`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
      
      {/* Tour Product Schema */}
      {tourData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            "name": tourData.name,
            "description": tourData.description,
            "image": tourData.image,
            "touristType": "Adventure",
            "offers": {
              "@type": "Offer",
              "price": tourData.price.replace(/[^0-9]/g, ''),
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock",
              "validFrom": new Date().toISOString().split('T')[0]
            },
            "itinerary": {
              "@type": "ItemList",
              "numberOfItems": 1,
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "TouristAttraction",
                  "name": tourData.name
                }
              }]
            },
            "provider": {
              "@type": "TravelAgency",
              "name": "Marrakech Discover",
              "url": "https://www.marrakechdiscover.com"
            },
            ...(tourData.rating && tourData.reviews && {
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": tourData.rating,
                "reviewCount": tourData.reviews,
                "bestRating": 5
              }
            })
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
