import { Users, Heart, Award, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import moroccanCulture from "@/assets/moroccan-culture.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for Morocco",
      description: "We love sharing the beauty and culture of our homeland with travelers from around the world.",
    },
    {
      icon: Users,
      title: "Local Expertise",
      description: "Our team consists of born-and-raised Moroccans who know every hidden gem and authentic experience.",
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "We're committed to providing exceptional experiences with attention to every detail.",
    },
    {
      icon: Globe,
      title: "Authentic Experiences",
      description: "We create genuine connections between travelers and Moroccan culture and traditions.",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary via-desert to-gold text-white py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Marrakech Visit</h1>
          <p className="text-xl opacity-90">
            Your trusted local partner for authentic Moroccan experiences
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Marrakech Visit was founded by a group of passionate locals who wanted to share 
                  the magic of Morocco with the world. Growing up in Marrakech, we witnessed the 
                  incredible beauty, rich history, and warm hospitality that makes our city so special.
                </p>
                <p>
                  We noticed that many visitors only experienced the surface of what Marrakech has to 
                  offer. That's when we decided to create a company that would provide authentic, 
                  immersive experiences that go beyond the typical tourist trail.
                </p>
                <p>
                  Today, we're proud to have helped thousands of travelers discover the real Morocco – 
                  from bustling souks and ancient palaces to serene desert landscapes and mountain villages. 
                  Our mission remains the same: to create unforgettable experiences that connect people 
                  with the heart and soul of Morocco.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <img
                src={moroccanCulture}
                alt="Moroccan Culture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Tour Options</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">4.9</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
