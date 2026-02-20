export const DEFAULTS = {
  homepage: {
    hero: {
      eyebrow: "Austin's Premier Visual Media",
      title: 'Bold. Refined.',
      titleAccent: 'Unforgettable.',
      description:
        "We don't just take photos or shoot videos — we create visual experiences that elevate your brand, your property, and your story. Cinematic quality. Fast turnaround. Visuals that leave a lasting impression.",
      ctaPrimary: { text: 'Book a Session', link: '/booking' },
      ctaSecondary: { text: 'View Portfolio', link: '/portfolio' },
      backgroundImage:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    },
    services: {
      eyebrow: 'What We Do',
      title: 'High-End Creativity Meets Precision Execution',
      description:
        'In a city as dynamic as Austin, standing out takes more than a camera and a tripod. We blend artistry with technical expertise to deliver visuals that move people.',
      items: [
        {
          id: 'svc-1',
          icon: 'Camera',
          title: 'Real Estate Photography',
          description:
            'HDR interior and exterior shots that make listings sell faster. Styled, lit, and edited to showcase every property at its absolute best.',
        },
        {
          id: 'svc-2',
          icon: 'Plane',
          title: 'Aerial Drone Coverage',
          description:
            'FAA-licensed aerial photography and video that reveals the full scope of a property, neighborhood, and surrounding landscape.',
        },
        {
          id: 'svc-3',
          icon: 'Video',
          title: 'Cinematic Video Tours',
          description:
            'Smooth, story-driven walkthroughs that give buyers the feel of stepping through the front door — before they ever visit.',
        },
        {
          id: 'svc-4',
          icon: 'Users',
          title: 'Events & Portraits',
          description:
            'From corporate gatherings to milestone celebrations, we capture every moment with an eye for authenticity and emotion.',
        },
      ],
    },
    cta: {
      title: 'Standing Out in Austin Takes More Than Good Lighting',
      description:
        "Whether you're selling a property or capturing an unforgettable moment, let's create visuals that demand attention.",
      buttonText: 'Get Started',
      buttonLink: '/booking',
    },
  },

  testimonials: [
    {
      id: 'test-1',
      name: 'Tina D.',
      role: 'Compass Real Estate',
      text: 'Every shoot is smooth, professional, and beautifully executed. Fast turnaround and consistently stunning results.',
      stars: 5,
    },
    {
      id: 'test-2',
      name: 'Liam G.',
      role: 'Luxury Agent',
      text: 'The drone footage, the music, the pacing, it all felt cinematic. My million-dollar listing looked like it belonged in a magazine.',
      stars: 5,
    },
    {
      id: 'test-3',
      name: 'Sarah M.',
      role: 'Realtor, Austin TX',
      text: "The quality of the photos and video was beyond anything I've ever used in a listing. We had multiple showings the first day it went live and I know the visuals played a big part in that.",
      stars: 5,
    },
    {
      id: 'test-4',
      name: 'Jason R.',
      role: 'Keller Williams',
      text: "They didn't just take photos, they told the story of the home. The video felt like a lifestyle ad, and my client was thrilled!",
      stars: 5,
    },
  ],

  pricing: {
    heading: {
      eyebrow: 'Pricing',
      title: 'Services & Packages',
      description:
        'Transparent pricing for every need. All packages include professional editing and fast turnaround.',
    },
    categories: [
      { key: 'real-estate', label: 'Real Estate' },
      { key: 'more', label: 'More' },
    ],
    services: [
      {
        id: 'pkg-1',
        category: 'real-estate',
        name: 'Luxury Package',
        icon: 'Crown',
        price: '$1,289',
        description:
          'Recommended for $1M+ listings. The complete package for high-end properties.',
        features: [
          '40+ marketing images',
          '15 aerial images',
          '60 second video',
          'Interior video',
          'Aerial exterior video',
          'Luxury editing / retouching',
          'Printable flyers',
        ],
        popular: false,
      },
      {
        id: 'pkg-2',
        category: 'real-estate',
        name: 'Photo + Drone + Video',
        icon: 'Package',
        price: '$650',
        description:
          'The full visual storytelling experience for serious sellers.',
        features: [
          'All Photo + Drone features',
          '2 min cinematic video',
          'Social media edits',
          'Virtual tour link',
          'Priority delivery',
        ],
        popular: true,
      },
      {
        id: 'pkg-3',
        category: 'real-estate',
        name: 'Photo + Drone',
        icon: 'Package',
        price: '$450',
        description:
          'Complete visual coverage combining ground and aerial photography.',
        features: [
          'Up to 25 interior/exterior',
          'Up to 10 drone shots',
          'Consistent color grading',
          'Same-day delivery',
          'MLS & social ready',
        ],
        popular: false,
      },
      {
        id: 'pkg-4',
        category: 'real-estate',
        name: 'Property Video',
        icon: 'Video',
        price: '$349',
        description:
          'Cinematic video walkthrough tours that bring your listings to life.',
        features: [
          'Up to 2 min video tour',
          'Professional editing',
          'Background music',
          'Stabilized footage',
          'Social media cuts included',
        ],
        popular: false,
      },
      {
        id: 'pkg-5',
        category: 'real-estate',
        name: 'Property Photos',
        icon: 'Camera',
        price: '$279',
        description:
          'Professional HDR interior and exterior photography for your property listings.',
        features: [
          'Up to 25 edited photos',
          'HDR processing',
          'Same-day delivery',
          'MLS-ready formats',
          'Basic retouching',
        ],
        popular: false,
      },
      {
        id: 'pkg-6',
        category: 'real-estate',
        name: 'Drone Photos',
        icon: 'Plane',
        price: '$199',
        description:
          'Stunning aerial photography showcasing properties and surrounding areas.',
        features: [
          'Up to 10 aerial shots',
          'FAA licensed pilot',
          'Multiple altitudes & angles',
          'Edited & color corrected',
          '48-hour delivery',
        ],
        popular: false,
      },
      {
        id: 'pkg-7',
        category: 'more',
        name: 'Event Video',
        icon: 'Video',
        price: 'Custom',
        description:
          'Cinematic coverage of corporate events, galas, and celebrations that tells the full story.',
        features: [
          'Multi-camera coverage',
          'Professional audio capture',
          'Highlight reel included',
          'Full-length edit available',
          'Fast turnaround',
        ],
        popular: false,
      },
      {
        id: 'pkg-8',
        category: 'more',
        name: 'Event Photos',
        icon: 'PartyPopper',
        price: 'Custom',
        description:
          'Polished, candid, and detail-rich photography for events of all sizes.',
        features: [
          'Full event coverage',
          'Candid & posed shots',
          'Professional retouching',
          'Online gallery delivery',
          'Print-ready files',
        ],
        popular: false,
      },
      {
        id: 'pkg-9',
        category: 'more',
        name: 'Portraits',
        icon: 'User',
        price: 'Custom',
        description:
          'Professional headshots for agents, teams, and corporate profiles.',
        features: [
          'Studio or on-location',
          'Multiple looks & backgrounds',
          'Professional retouching',
          'High-res digital files',
          'Quick turnaround',
        ],
        popular: false,
      },
    ],
  },

  about: {
    intro: {
      eyebrow: 'About Vast Media',
      title: 'Where Professionalism Meets',
      titleAccent: 'Passion',
      paragraphs: [
        "Welcome to Vast Media. Having called Austin home for the past four years, I've immersed myself in the dynamic culture and energy of this city — and it fuels everything I create. With nearly a decade of dedicated experience in photography, I bring a keen eye for detail and an unwavering commitment to excellence to every single project.",
        "For me, photography has never been just about pressing a shutter. Every image is a product of intentional craft — designed to encapsulate the essence, emotion, and authenticity of whatever stands before my lens. Whether it's a luxury listing that needs to sell, a portrait that tells someone's story, or a live event that deserves to be remembered, I approach every shoot with the same standard: nothing less than exceptional.",
        "I invite you to explore my portfolio and see the artistry that unfolds through my lens. Let's collaborate and create something that preserves the significance of your most important moments.",
      ],
      image:
        'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80',
      badge: { value: '~10 yrs', label: 'Behind the Lens' },
    },
    austin: {
      eyebrow: 'Based in Austin, TX',
      title: 'Rooted in Austin. Inspired by Its Energy.',
      paragraphs: [
        "Austin is a city that moves fast and rewards creativity. That same energy drives every project at Vast Media — blending high-end production quality with the bold, authentic spirit this city is known for.",
        "From South Congress to the Hill Country, I know this city's light, its landscapes, and its people. That local knowledge shows in every frame.",
      ],
    },
    stats: {
      eyebrow: 'At a Glance',
      title: 'The Vast Media Difference',
      items: [
        { id: 'stat-1', icon: 'Camera', value: '~10', label: 'Years Behind the Lens' },
        { id: 'stat-2', icon: 'MapPin', value: '4+', label: 'Years in Austin' },
        { id: 'stat-3', icon: 'Clock', value: '24hr', label: 'Typical Turnaround' },
        { id: 'stat-4', icon: 'Award', value: '100%', label: 'Dedication to Every Shot' },
      ],
    },
  },

  'portfolio-real-estate': [
    {
      id: 'pre-1',
      src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      title: 'Modern Lakefront Estate',
      subtitle: 'Luxury Residential',
      type: 'image',
    },
    {
      id: 'pre-2',
      src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      title: 'Contemporary Villa',
      subtitle: 'Residential',
      type: 'image',
    },
    {
      id: 'pre-3',
      src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
      title: 'Minimalist Kitchen',
      subtitle: 'Interior',
      type: 'image',
    },
    {
      id: 'pre-4',
      src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
      title: 'Suburban Home',
      subtitle: 'Residential',
      type: 'image',
    },
    {
      id: 'pre-5',
      src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
      title: 'Hillside Mansion',
      subtitle: 'Luxury',
      type: 'image',
    },
    {
      id: 'pre-6',
      src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
      title: 'Poolside Twilight',
      subtitle: 'Twilight Photography',
      type: 'image',
    },
    {
      id: 'pre-7',
      src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
      title: 'Aerial Estate View',
      subtitle: 'Drone Photography',
      type: 'image',
    },
  ],

  'portfolio-videography': [
    {
      id: 'pvid-1',
      src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
      title: 'Property Walkthrough',
      subtitle: 'Real Estate Video Tour',
      type: 'image',
    },
    {
      id: 'pvid-2',
      src: 'https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?w=600&q=80',
      title: 'Aerial Cinematic',
      subtitle: 'Drone Videography',
      type: 'image',
    },
    {
      id: 'pvid-3',
      src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80',
      title: 'Behind the Lens',
      subtitle: 'Production BTS',
      type: 'image',
    },
    {
      id: 'pvid-4',
      src: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80',
      title: 'Commercial Spot',
      subtitle: 'Brand Video',
      type: 'image',
    },
    {
      id: 'pvid-5',
      src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80',
      title: 'Sunset Flyover',
      subtitle: 'Aerial Videography',
      type: 'image',
    },
  ],

  'portfolio-portraits': [
    {
      id: 'ppor-1',
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      title: 'Professional Headshot',
      subtitle: 'Corporate Portrait',
      type: 'image',
    },
    {
      id: 'ppor-2',
      src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80',
      title: 'Creative Portrait',
      subtitle: 'Studio Session',
      type: 'image',
    },
    {
      id: 'ppor-3',
      src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
      title: 'Natural Light',
      subtitle: 'Outdoor Portrait',
      type: 'image',
    },
    {
      id: 'ppor-4',
      src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
      title: 'Executive Portrait',
      subtitle: 'Business Headshot',
      type: 'image',
    },
    {
      id: 'ppor-5',
      src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
      title: 'Fashion Portrait',
      subtitle: 'Creative Direction',
      type: 'image',
    },
  ],

  'portfolio-events': [
    {
      id: 'pev-1',
      src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      title: 'Corporate Gala',
      subtitle: 'Event Coverage',
      type: 'image',
    },
    {
      id: 'pev-2',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
      title: 'Wedding Ceremony',
      subtitle: 'Wedding Photography',
      type: 'image',
    },
    {
      id: 'pev-3',
      src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80',
      title: 'Conference',
      subtitle: 'Corporate Event',
      type: 'image',
    },
    {
      id: 'pev-4',
      src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
      title: 'Outdoor Celebration',
      subtitle: 'Private Event',
      type: 'image',
    },
    {
      id: 'pev-5',
      src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=80',
      title: 'Live Performance',
      subtitle: 'Concert Photography',
      type: 'image',
    },
  ],
}
