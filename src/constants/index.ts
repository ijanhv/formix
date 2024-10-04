import Icons from "@/components/globals/icons";

export const apiUrl = "http://localhost:3000/api/v1";

export const perks = [
  {
    icon: Icons.auth,
    title: "Sign Up",
    info: "Create your free account to get started with Astra.",
  },
  {
    icon: Icons.customize,
    title: "Customize",
    info: "Choose a template and customize it to fit your needs.",
  },
  {
    icon: Icons.launch,
    title: "Launch",
    info: "Publish your website and share it with the world.",
  },
];

export const features = [
  {
    icon: Icons.bolt,
    title: "Fast Setup",
    info: "Get your website up and running in minutes with our intuitive AI-powered builder.",
  },
  {
    icon: Icons.palette,
    title: "Customizable Templates",
    info: "Choose from a variety of stunning templates and customize them to suit your brand.",
  },
  {
    icon: Icons.seo,
    title: "SEO Optimized",
    info: "Built-in SEO features ensure your website ranks well on search engines.",
  },
  {
    icon: Icons.monitor,
    title: "Responsive Design",
    info: "Your website will look great on any device, from desktops to mobile phones.",
  },
  {
    icon: Icons.shop,
    title: "E-Commerce Ready",
    info: "Start selling online with our e-commerce features and integrations.",
  },
  {
    icon: Icons.server,
    title: "Secure Hosting",
    info: "Enjoy peace of mind with secure and reliable hosting for your website.",
  },
];

export const pricingCards = [
  {
    title: "Starter",
    description: "Perfect for trying out plura",
    price: "Free",
    duration: "",
    highlight: "Key features",
    buttonText: "Start for free",
    features: ["Limited projects", "1 Team member", "Basic features"],
    priceId: "",
  },
  {
    title: "Unlimited Saas",
    description: "The ultimate agency kit",
    price: "$199",
    duration: "month",
    highlight: "Key features",
    buttonText: "Upgrade to Pro",
    features: [
      "Unlimited projects",
      "5 Team members",
      "Advanced design tools",
      "Customizable domain",
    ],
    priceId: "price_1OYxkqFj9oKEERu1KfJGWxgN",
  },
  {
    title: "Enterprise",
    description: "For serious agency owners",
    price: "$399",
    duration: "month",
    highlight: "Everything in Starter, plus",
    buttonText: "Upgrade to Enterprise",
    features: [
      "Unlimited projects",
      "Unlimited Team members",
      "Custom branding",
      "Priority support (24/7)",
    ],
    priceId: "price_1OYxkqFj9oKEERu1NbKUxXxN",
  },
];

export const bentoCards = [
  {
    title: "Start with Inspiration",
    info: "Browse our vast library of pre-designed templates or upload your own images.",
    imgSrc: "/assets/bento-1.svg", // Lightbulb or Inspiration icon
    alt: "Inspiration for website creation",
  },
  {
    title: "AI Assists Your Vision",
    info: "Our intelligent AI tailors suggestions and functionalities based on your goals.",
    imgSrc: "/assets/bento1.svg", // AI Assistant icon
    alt: "AI website building assistant",
  },
  {
    title: "Drag & Drop Customization",
    info: "Effortlessly personalize your website with our intuitive drag-and-drop editor.",
    imgSrc: "/assets/bento1.svg", // Drag and Drop icon or hand editing a website
    alt: "Website customization with drag and drop",
  },
  {
    title: "Launch & Shine Online",
    info: "Publish your website with a single click and take your brand to the world.",
    imgSrc: "/assets/bento1.svg", // Rocket launching or website going live
    alt: "Website launch and publication",
  },
];

export const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
];

export const themes: Theme[] = [
  {
    id: "light-leaves",
    name: "Light Leaves",
    backgroundImage: "/bg/light-leaves.png",
    textColor: "text-gray-800", // Dark gray for text
    backgroundColor: "bg-white", // White background
    buttonColor: "bg-green-600", // Green for buttons
    buttonText: "text-white", // White text on buttons
    borderColor: "border-gray-400", // Light gray border
    placeholderColor: "placeholder:text-gray-600", // Gray for placeholders
  },
  {
    id: "light-pattern",
    name: "Light Pattern",
    backgroundImage: "/bg/light-pattern.png",
    textColor: "text-gray-800", // Dark gray for text
    backgroundColor: "bg-white", // White background
    buttonColor: "bg-blue-600", // Blue for buttons
    buttonText: "text-white", // White text on buttons
    borderColor: "border-gray-300", // Light gray border
    placeholderColor: "placeholder:text-gray-600", // Gray for placeholders
  },
  {
    id: "light-gradient-1",
    name: "Light Gradient 1",
    backgroundImage: "/bg/light-gradient1.png",
    textColor: "text-gray-800", // Dark gray for text
    backgroundColor: "bg-white", // White background
    buttonColor: "bg-indigo-600", // Indigo for buttons
    buttonText: "text-white", // White text on buttons
    borderColor: "border-gray-400", // Light gray border
    placeholderColor: "placeholder:text-gray-600", // Gray for placeholders
  },
  {
    id: "blue-medical",
    name: "Medical",
    backgroundImage: "/bg/blue-medical.png",
    textColor: "text-gray-900", // Dark gray for text
    backgroundColor: "bg-cyan-400", // Cyan background
    buttonColor: "bg-green-600", // Green for buttons
    buttonText: "text-white", // White text on buttons
    borderColor: "border-teal-700", // Teal border
    placeholderColor: "placeholder:text-gray-600", // Gray for placeholders
  },
  {
    id: "ocean-theme",
    name: "Ocean Theme",
    backgroundImage: "/bg/ocean.png",
    textColor: "text-white", // White for text
    backgroundColor: "bg-blue-800", // Deep blue background
    buttonColor: "bg-cyan-400", // Bright aqua blue for buttons
    buttonText: "text-white", // White text on buttons
    borderColor: "border-blue-300", // Light blue border
    placeholderColor: "placeholder:text-gray-300", // Light gray for placeholders
  },
  {
    id: "sunset-theme",
    name: "Sunset Theme",
    backgroundImage: undefined,
    textColor: "text-gray-900", // Dark gray for text
    backgroundColor: "bg-gradient-to-b from-orange-500 to-yellow-300",
    buttonColor: "bg-red-500", // Bright red for buttons
    buttonText: "text-white", // White text on buttons
    borderColor: "border-yellow-300", // Light yellow border
    placeholderColor: "placeholder:text-gray-600", // Gray for placeholders
  },
  {
    id: "forest-theme",
    name: "Forest Theme",
    backgroundImage: undefined,
    textColor: "text-gray-800", // Dark gray for text
    backgroundColor: "bg-gradient-to-t from-emerald-500 to-lime-600", // Light green background
    buttonColor: "bg-green-800", // Dark green for buttons
    buttonText: "text-white", // White text on buttons
    borderColor: "border-green-500", // Green border
    placeholderColor: "placeholder:text-gray-600", // Gray for placeholders
  },
  {
    id: "night-sky",
    name: "Night Sky",
    backgroundImage: "/bg/night-sky.jpg",
    textColor: "text-white", // White for text
    backgroundColor: "bg-gray-900", // Dark gray background
    buttonColor: "bg-blue-500", // Bright blue for buttons
    buttonText: "text-white", // White text on buttons
    borderColor: "border-gray-700", // Dark gray border
    placeholderColor: "placeholder:text-gray-400", // Light gray for placeholders
  },
];
