# Krishna Vijay G - Portfolio

A high-end, aesthetic personal portfolio built with Next.js 14, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Data-Driven**: All content pulled from `src/data/portfolio.json`
- **Dynamic Theming**: Light/Dark mode with live accent color switching
- **Smooth Animations**: Framer Motion for reveal on scroll, page transitions, and hover effects
- **Responsive Design**: Mobile-first approach, fully responsive on all devices
- **Glassmorphism UI**: Modern glass-effect navigation and cards
- **Bento Box Layout**: Aesthetic grid layouts for content sections
- **Tech Stack Marquee**: Animated scrolling tech icons
- **Settings Panel**: Floating settings button for theme customization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the portfolio directory:
   ```bash
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
portfolio/
├── public/
│   └── images/           # Image assets
│       ├── profile.jpg   # Your profile picture
│       ├── projects/     # Project thumbnails
│       ├── companies/    # Company logos
│       └── certifications/
├── src/
│   ├── app/
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/
│   │   ├── layout/       # Navigation, Footer, Settings
│   │   ├── sections/     # Hero, About, Projects, etc.
│   │   └── ui/           # Reusable UI components
│   ├── config/
│   │   └── theme.ts      # Theme configuration
│   ├── context/
│   │   └── ThemeContext.tsx  # Theme state management
│   ├── data/
│   │   └── portfolio.json    # All portfolio content
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   └── types/
│       └── portfolio.ts  # TypeScript types
```

## 🎨 Customization

### Adding Content

Edit `src/data/portfolio.json` to update your:
- Basic info (name, bio, contact)
- Social links
- Education
- Experience
- Projects
- Skills
- Certifications
- Awards (placeholder included)
- Publications (placeholder included)
- Volunteering (placeholder included)
- Workshops
- Interests
- Languages
- Testimonials (placeholder included)

### Accent Colors

Available accent colors (can be changed via Settings panel):
- Blue (default)
- Purple
- Emerald
- Rose
- Amber
- Cyan

### Adding Images

1. **Profile Picture**: Replace `public/images/profile.jpg` (recommended: 400x400px)
2. **Project Thumbnails**: Add to `public/images/projects/` (recommended: 800x600px)
3. **Company Logos**: Add to `public/images/companies/` (recommended: 100x100px)

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript
- **Font**: Inter + Space Grotesk

## 📱 Sections

1. **Hero**: Bold intro with profile image and social links
2. **About**: Bio, education, interests, languages (Bento Box layout)
3. **Projects**: Filterable project grid with hover effects
4. **Experience**: Alternating timeline design
5. **Skills**: Animated skill bars with tech stack marquee
6. **Certifications**: Achievement cards with verify links
7. **Contact**: Form + contact info cards

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel
```

### Static Export

```bash
npm run build
```

## 📄 License

MIT License - feel free to use this template for your own portfolio!

---

Built with ❤️ by Krishna Vijay G
