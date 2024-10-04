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
    textColor: "text-gray-800",
    backgroundColor: "bg-white",
    buttonColor: "bg-gray-600",
    buttonText: "text-white",
    borderColor: "border-gray-400",
    placeholderColor: "placeholder:text-gray-600",
    checkboxChecked: "bg-gray-200/50 border-gray-600",
    checkboxUnchecked: "bg-white border-gray-400",
    checkboxText: "text-gray-800",
    okButton: "bg-gray-800 text-white",
  },
  {
    id: "light-pattern",
    name: "Light Pattern",
    backgroundImage: "/bg/light-pattern.png",
    textColor: "text-gray-800",
    backgroundColor: "bg-white",
    buttonColor: "bg-gray-600/30 text-gray-600",
    buttonText: "text-white",
    borderColor: "border-gray-300",
    placeholderColor: "placeholder:text-gray-600",
    checkboxChecked: "bg-gray-200 border-gray-600",
    checkboxUnchecked: "bg-gray-100 border-gray-400",
    checkboxText: "text-gray-800",
    okButton: "bg-gray-800 text-white",
  },
  {
    id: "light-gradient-1",
    name: "Light Gradient 1",
    backgroundImage: "/bg/light-gradient1.png",
    textColor: "text-[#e53757]",
    backgroundColor: "bg-white",
    buttonColor: "bg-[#e53757]",
    buttonText: "text-white",
    borderColor: "border-[#e53757]",
    placeholderColor: "placeholder:text-gray-600",
    checkboxChecked: "bg-[#e53757]/10  border-[#e53757]",
    checkboxUnchecked: "bg-transparent border-[#e53757]/40",
    checkboxText: "text-gray-800 ",
    okButton: "bg-white text-gray-300",
  },
  {
    id: "blue-medical",
    name: "Medical",
    backgroundImage: "/bg/blue.png",
    textColor: "text-gray-900",
    backgroundColor: "bg-cyan-400",
    buttonColor: "bg-[#4392bc]",
    buttonText: "text-white",
    borderColor: "border-[#4392bc]",
    placeholderColor: "placeholder:text-gray-600",
    checkboxChecked: "border-[#4392bc] bg-[#4392bc]/20 ",
    checkboxUnchecked: "bg-transparent border-[#4392bc]/40 ",
    checkboxText: "text-gray-900",
    okButton: "bg-white text-gray-300",
  },
  {
    id: "ocean-theme",
    name: "Ocean Theme",
    backgroundImage: "/bg/ocean.png",
    textColor: "text-white",
    backgroundColor: "bg-blue-800",
    buttonColor: "bg-[#00659B]",
    buttonText: "text-white",
    borderColor: "border-blue-300",
    placeholderColor: "placeholder:text-gray-300",
    checkboxChecked: "bg-[#00659B]/30 border-white/50 shadow-lg",
    checkboxUnchecked: " border-[#00659B]",
    checkboxText: "text-white",
    okButton: "bg-white text-gray-300",
  },

  {
    id: "night-sky",
    name: "Night Sky",
    backgroundImage: "/bg/night-sky.jpg",
    textColor: "text-white",
    backgroundColor: "bg-gray-900",
    buttonColor: "bg-blue-500",
    buttonText: "text-white",
    borderColor: "border-gray-700",
    placeholderColor: "placeholder:text-gray-400",
    checkboxChecked: "bg-white/10 border-gray-400",
    checkboxUnchecked: "bg-transparent border-gray-600",
    checkboxText: "text-white",
    okButton: "bg-white text-gray-300",
  },
  {
    id: "pink-purple-theme",
    name: "Pink & Purple",
    backgroundImage: undefined,
    textColor: "text-purple-900",
    backgroundColor: "bg-purple-200",
    buttonColor: "bg-purple-900",
    buttonText: "text-white",
    borderColor: "border-purple-500",
    placeholderColor: "placeholder:text-purple-600",
    checkboxChecked: "bg-purple-300 border-purple-600",
    checkboxUnchecked: "bg-purple-200 border-purple-500",
    checkboxText: "text-purple-900",
    okButton: "bg-purple-900 text-white",
  },
];
