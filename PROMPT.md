# Interactive World Map Explorer - Claude Code Prompt

You are an expert full-stack web developer specializing in 3D graphics, geospatial data visualization, and interactive web experiences. You are building a sophisticated interactive globe explorer that combines cutting-edge 3D graphics with real-world geospatial data.

## Project Brief

Create an interactive 3D globe explorer that allows users to explore countries, view live data overlays, interact with a rotating Earth, and visualize geospatial information in a beautiful, performant, and intuitive interface. The application should feel like a premium data visualization tool with smooth 3D interactions and real-time data updates.

## Core Requirements

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **3D Graphics**: React Three Fiber + Three.js + Drei utilities
- **Data Visualization**: Recharts for charts and graphs
- **UI Animations**: Framer Motion for React component transitions
- **Styling**: Tailwind CSS with glassmorphic design
- **State Management**: Zustand for global globe state
- **Language**: TypeScript for type safety
- **APIs**: REST Countries (no auth), Open-Meteo (no auth), Natural Earth GeoJSON

### 3D Globe Implementation
1. **3D Earth Sphere**:
   - Use Three.js sphere geometry with high polygon count (128x128+)
   - Apply NASA Visible Earth textures for realistic appearance
   - Include bump mapping for surface relief perception
   - Auto-rotating at slow, smooth speed (0.5 deg/sec)
   - Users can manually rotate with mouse drag (Orbit Controls)

2. **Atmosphere Glow Effect**:
   - Implement custom shader material for atmospheric halo
   - Blue-tinted glow around Earth's edge
   - Additive blending for realistic appearance
   - Subtle but noticeable effect that enhances 3D perception

3. **Day/Night Cycle Visualization**:
   - Calculate actual sun position based on UTC time
   - Render semi-transparent shadow hemisphere indicating night side
   - Hemisphere rotates smoothly every 24 hours
   - Smooth transitions as day/night terminator line moves

### Country Interaction & Navigation
1. **Click-to-Zoom Country Selection**:
   - Click any country on the globe
   - Smooth camera animation (GSAP timeline or Framer Motion)
   - Camera zooms in to focus on selected country
   - Country highlights with emissive/brighter color

2. **Country Data Cards**:
   - Animated card flies in from side on country selection
   - Display: country flag emoji/image, name, capital, population, area, currency
   - Show data formatted with proper abbreviations (1.2B for billion, 3.4M for million)
   - Quick access button to view detailed information

3. **Search & Typeahead Navigation**:
   - Search bar to find countries by name
   - Typeahead suggestions as user types
   - Click suggestion to zoom globe to that country
   - Highlight matching text in suggestions

4. **Compare Mode**:
   - Select two countries to compare side-by-side
   - Display side-by-side stat comparison with animated charts
   - Show visual comparison of country sizes
   - Exit compare mode with close button

### Data Overlays & Visualization
1. **Population Density Heatmap**:
   - Toggle-able overlay showing population distribution
   - Use color gradient (blue = low, red = high)
   - Updated from real data via API

2. **GDP Markers**:
   - Scaled 3D bars or spheres on globe representing GDP
   - Bar height/size correlates to GDP value
   - Hover shows exact GDP value
   - Color coding by economic tier (developed, emerging, developing)

3. **Real-Time Weather Data**:
   - Fetch current weather for selected country via Open-Meteo API
   - Display weather icons and temperature floating above country
   - Show weather condition (sunny, cloudy, rainy, etc.)
   - Update automatically every 10 minutes

4. **Flight Paths & Particle Arcs**:
   - Animated bezier curves between major cities
   - Glowing particle points traveling along curves
   - Creates sense of global connectivity
   - Auto-animate or respond to user interaction

### Data Charts & Analytics
1. **GDP Trend Chart**:
   - Recharts line chart showing country's GDP over last 10 years
   - Smooth animations on data update
   - Hover tooltip for detailed values

2. **Population Growth Chart**:
   - Bar or area chart showing population trends
   - Compare with global average
   - Clear, readable color scheme

### User Interface
1. **Search Bar** (top):
   - Typeahead country search
   - Clear button to reset selection
   - Focus state styling

2. **Data Panel** (left side):
   - Toggle switches for overlays (population, GDP, weather, flight paths)
   - Current selected country summary
   - Quick stats display

3. **Country Card** (right side):
   - Animated entrance from right
   - Country flag and basic info
   - Action buttons (compare, details, close)
   - Glassmorphic styling with backdrop blur

4. **Mini Map** (bottom right):
   - Small 2D circle showing camera orientation
   - Helps user understand globe rotation
   - Visual indicator of current view direction

5. **Controls Legend** (bottom left):
   - Show available keyboard shortcuts
   - Mouse interaction hints
   - Toggle visibility on demand

### Mobile Responsiveness
1. **Mobile Layout Adjustments**:
   - Single-column layout with search at top
   - Modals instead of side panels for country data
   - Bottom sheet for overlay controls
   - Simplified UI with touch-optimized buttons

2. **Mobile Performance**:
   - Reduced globe detail on mobile (64x64 geometry)
   - Disable some animations on low-end devices
   - Consider 2D map fallback for very old devices

3. **Touch Interactions**:
   - Two-finger pinch to zoom
   - Single finger drag to rotate
   - Tap to select countries
   - Long press for context menu

### Performance & Optimization
1. **3D Rendering**:
   - Use InstancedMesh for country markers (reduce draw calls)
   - LOD (Level of Detail) system for sphere geometry
   - Limit particle count on lower-end devices
   - Debounce scroll and resize events

2. **Data Loading**:
   - Lazy load country details on demand
   - Cache API responses to reduce network requests
   - Use API route in Next.js to aggregate data server-side
   - Progressive loading with skeleton screens

3. **Bundle Optimization**:
   - Dynamic imports for Three.js addons
   - Code split data visualization components
   - Tree-shake unused Three.js features

### Accessibility
- Keyboard navigation (arrow keys rotate globe, +/- zoom)
- Screen reader support for data cards
- High contrast mode option
- Tooltips with keyboard focus indicators
- ARIA labels for interactive elements
- Color-blind friendly palette options

## Deliverables

1. Fully functional Next.js 15 application with 3D globe
2. Real-time Earth sphere with textures and atmosphere glow
3. Smooth country selection with camera animation
4. Country data cards with real data from APIs
5. Search functionality with typeahead suggestions
6. Multiple data overlays (population, GDP, weather)
7. Flight path visualization with particles
8. Side-by-side country comparison mode
9. Recharts visualizations for economic and demographic data
10. Fully responsive design (desktop, tablet, mobile)
11. Mobile 2D fallback for compatibility
12. Complete TypeScript type definitions
13. Optimized performance (60fps on modern devices)
14. Accessible components (WCAG AA compliance)

## Success Criteria

- Smooth, responsive 3D globe with 60fps rendering on desktop
- All data loads within 2-3 seconds on first visit
- Country selection and zoom animation completes in 1 second
- Overlay toggles are instant with no frame drops
- Mobile version works smoothly with touch interactions
- No console errors or warnings
- Lighthouse Performance score 85+
- Accessibility score 95+ (axe DevTools)
- Keyboard navigation works flawlessly
- Data is always fresh and reflects real-world information
