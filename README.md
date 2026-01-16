# Quán Ngon - Vietnamese Food Ordering System

Modern web-based food ordering application for Vietnamese restaurant featuring 60+ dishes across 6 categories with advanced search, filtering, and shopping cart functionality.

## Features

### Core Functionality
- **Product Catalog**: 60 Vietnamese dishes with images, descriptions, and prices
- **Category Navigation**: 6 categories (Vegetarian, Meat, Hotpot, Dessert, Beverages, Others)
- **Advanced Search**: Text search, category filter, price range, ascending/descending sort
- **Shopping Cart**: Add items with quantity controls and custom notes
- **User Authentication**: Login/signup system with account persistence
- **Product Details**: Modal view with large images and customization options
- **Pagination**: 12 products per page with dynamic page controls
- **Responsive Design**: Mobile-first layout with adaptive breakpoints

### UI/UX Elements
- Auto-rotating banner slider (4 banners)
- Google Maps integration (shop location)
- Service highlights (shipping, safety, support, refund)
- Toast notifications
- Font Awesome Pro icons
- Smooth scrolling and transitions

## Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Icons**: Font Awesome Pro v6.6.2.0
- **Storage**: Browser LocalStorage
- **Maps**: Google Maps Embed API
- **Build**: None (static files)

## Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required

### Installation

1. Clone or download the repository:
```bash
git clone https://github.com/yourusername/quan-ngon.git
cd quan-ngon
```

2. Open in browser:
```bash
# Option 1: Double-click Trangchu.html
# Option 2: Use a local server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000/Trangchu.html
```

3. First load will initialize:
- 60 products in LocalStorage
- 2 admin accounts (username: "hgbaodev" or "0123456789", password: "123456")

### Usage

**Browse Products**:
- Homepage displays 12 products per page
- Click pagination numbers to navigate
- Use category menu for quick filtering

**Search & Filter**:
- Type in search bar for instant results
- Click "Lọc" button for advanced filters
- Set price range (min/max)
- Sort ascending/descending by price
- Reset filters with circular arrow button

**Product Details**:
- Click product card or "Đặt món" button
- View large image and full description
- Adjust quantity with +/- buttons
- Add custom notes
- Add to cart or order immediately

**User Account**:
- Click user icon in header
- Select "Đăng nhập" (Login) or "Đăng ký" (Signup)
- Use phone number as username
- Cart persists per user account

**Shopping Cart**:
- Click cart icon to view items
- Badge shows item count
- Requires login to add items

## Project Structure

```
quan-ngon/
├── Trangchu.html              # Main entry point (385 LOC)
├── products.js                # Data initialization (115 LOC)
├── duancuoikhoi.js            # Application logic (412 LOC)
├── main.css                   # Primary styles (1,452 LOC)
├── assets/
│   ├── css/
│   │   ├── home-responsive.css    # Mobile breakpoints
│   │   ├── toast-message.css      # Notifications
│   │   ├── admin.css              # Admin panel
│   │   └── admin-responsive.css
│   ├── font/
│   │   └── font-awesome-pro-v6-6.2.0/
│   └── img/
│       ├── banner-2.png → banner-5.png
│       └── products/          # Product images
├── img/
│   ├── logo.png
│   ├── favicon.png
│   └── [90 total images]
├── plans/                     # Development templates
│   ├── template-usage-guide.md
│   ├── feature-implementation-template.md
│   ├── bug-fix-template.md
│   └── refactor-template.md
├── docs/                      # Project documentation
│   ├── project-overview-pdr.md
│   ├── codebase-summary.md
│   ├── code-standards.md
│   └── system-architecture.md
├── .gitignore
└── README.md                  # This file
```

## File Responsibilities

**Trangchu.html**: Static HTML structure, modal templates, form definitions
**products.js**: Initialize 60 products and 2 admin accounts in LocalStorage
**duancuoikhoi.js**: Core logic (product display, search, pagination, auth, cart)
**main.css**: Complete application styling (variables, components, responsive)

## Data Schema

### Product
```javascript
{
  id: Number,           // 1-60
  status: Number,       // 1 = active, 0 = inactive
  title: String,        // Vietnamese name
  img: String,          // Relative path
  category: String,     // One of 6 categories
  price: Number,        // VND (20,000 - 480,000)
  desc: String          // Vietnamese description
}
```

### Account
```javascript
{
  fullname: String,
  phone: String,        // Unique ID
  password: String,     // Plain text (⚠️ not secure)
  address: String,
  email: String,
  status: Number,       // 1 = active, 0 = banned
  join: Date,
  cart: Array,          // Cart items
  userType: Number      // 0 = customer, 1 = admin
}
```

## Key Functions

### products.js
- `createProduct()`: Populate LocalStorage with 60 products
- `createAdminAccount()`: Create 2 default admin users

### duancuoikhoi.js
- `renderProducts(showProduct)`: Generate product grid HTML
- `detailProduct(id)`: Show product detail modal
- `searchProducts(mode)`: Multi-criteria filtering (text, category, price, sort)
- `showCategory(categoryName)`: Filter by category
- `setupPagination(productAll, perPage)`: Create page controls
- `vnd(price)`: Format numbers as Vietnamese Dong

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Requirements**:
- ES6+ JavaScript support
- LocalStorage API
- CSS Grid and Flexbox

## Known Issues & Limitations

### Security Concerns
⚠️ **Critical**: Plain text passwords stored in LocalStorage
⚠️ **High**: No input validation or sanitization (XSS vulnerability)
⚠️ **Medium**: LocalStorage accessible via DevTools (data tampering)

### Missing Features
- Backend integration (orders not actually submitted)
- Payment gateway (no payment processing)
- Email notifications
- Order history tracking
- Admin dashboard (CSS exists but no HTML)

### Technical Debt
- No error handling (LocalStorage operations)
- Large unminified CSS file (1,452 LOC)
- No lazy loading for images
- Missing functions referenced but not defined (toast, addCart, showCart)

## Documentation

For detailed technical information, see:
- [Project Overview & PDR](docs/project-overview-pdr.md)
- [Codebase Summary](docs/codebase-summary.md)
- [Code Standards](docs/code-standards.md)
- [System Architecture](docs/system-architecture.md)

## Development

### Coding Standards
- **JavaScript**: camelCase functions/variables, ES6+ syntax
- **HTML**: Semantic tags, kebab-case classes/IDs
- **CSS**: BEM-like naming, custom properties for theming
- **Comments**: Vietnamese for clarity

### Contributing
1. Follow existing code patterns
2. Add comments for complex logic
3. Test in multiple browsers
4. Validate HTML/CSS

## Roadmap

### Phase 1 (Near-term)
- Backend API for product/user management
- Secure authentication (JWT or session-based)
- Order submission and tracking
- Payment gateway integration (VNPay, MoMo)

### Phase 2 (Mid-term)
- Admin dashboard for CRUD operations
- Customer reviews and ratings
- Favorites/wishlist functionality
- Email notifications
- PWA features (offline support)

### Phase 3 (Long-term)
- Mobile app (React Native or Flutter)
- Delivery tracking with GPS
- Loyalty points system
- Recommendation engine
- Analytics dashboard

## Contact

**Restaurant**: Quán Ngon
**Address**: 359 Lĩnh Nam, P.Lĩnh Nam, Q.Hoàng Mai, TP.Hà Nội
**Phone**: 0123 456 789 / 0987 654 321
**Email**: khoado390@gmail.com

**Developer**: Hoàng Gia Bảo
**GitHub**: https://github.com/hgbaodev

## License

[Add license information here]

## Acknowledgments

- Font Awesome Pro for icon library
- Google Maps for location embedding
- MindX School (project context)
