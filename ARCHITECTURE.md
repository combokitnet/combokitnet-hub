# ComboKit.Net Platform - Kiến Trúc Tổng Thể

## 📋 Tổng Quan

Platform cho phép người dùng:
1. Generate web toolkits bằng AI
2. Edit code với Monaco Editor
3. Preview real-time
4. Save toolkits vào collections
5. Share toolkits với người khác

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **State Management**: React Hooks (useState, useEffect)

### Backend
- **Runtime**: Next.js API Routes (Node.js)
- **Database**: SQLite (dev) → PostgreSQL (production)
- **ORM**: TypeORM
- **AI**: OpenAI API (hoặc mock)

---

## 📁 Cấu Trúc Thư Mục

\`\`\`
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing Page (/)
│   ├── create/
│   │   └── page.tsx              # Generator Page (/create)
│   ├── toolkits/
│   │   ├── page.tsx              # Danh sách toolkits (/toolkits)
│   │   └── [id]/
│   │       └── page.tsx          # Chi tiết toolkit (/toolkits/:id)
│   ├── collections/
│   │   ├── page.tsx              # Danh sách collections (/collections)
│   │   └── [id]/
│   │       └── page.tsx          # Chi tiết collection (/collections/:id)
│   ├── api/
│   │   ├── generate/
│   │   │   └── route.ts          # POST /api/generate - AI generation
│   │   ├── toolkits/
│   │   │   ├── route.ts          # GET/POST /api/toolkits
│   │   │   └── [id]/
│   │   │       └── route.ts      # GET/PUT/DELETE /api/toolkits/:id
│   │   └── collections/
│   │       ├── route.ts          # GET/POST /api/collections
│   │       └── [id]/
│   │           └── route.ts      # GET/PUT/DELETE /api/collections/:id
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles + Tailwind
│
├── components/
│   ├── Editor/
│   │   └── CodeEditor.tsx        # Monaco Editor wrapper
│   ├── ToolkitCard.tsx           # Card hiển thị toolkit
│   ├── CollectionCard.tsx        # Card hiển thị collection
│   └── Header.tsx                # Navigation header
│
├── entities/                     # TypeORM Entities
│   ├── User.ts                   # User model
│   ├── Toolkit.ts                # Toolkit model
│   └── Collection.ts             # Collection model
│
├── db/
│   └── data-source.ts            # TypeORM DataSource config
│
└── lib/
    ├── ai.ts                     # AI generation logic
    └── utils.ts                  # Utility functions

dev.db                            # SQLite database file
\`\`\`

---

## 🗄️ Database Schema

### User
\`\`\`typescript
{
  id: number (PK)
  name: string
  email: string (unique)
  createdAt: Date
  updatedAt: Date
  
  // Relations
  toolkits: Toolkit[]
  collections: Collection[]
}
\`\`\`

### Toolkit
\`\`\`typescript
{
  id: number (PK)
  name: string
  description: string
  code: text (HTML/CSS/JS)
  prompt: string (AI prompt used)
  language: string (html, javascript, etc.)
  createdAt: Date
  updatedAt: Date
  
  // Relations
  ownerId: number (FK -> User)
  owner: User
  collections: Collection[] (Many-to-Many)
}
\`\`\`

### Collection
\`\`\`typescript
{
  id: number (PK)
  name: string
  description: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
  
  // Relations
  ownerId: number (FK -> User)
  owner: User
  toolkits: Toolkit[] (Many-to-Many)
}
\`\`\`

---

## 🔄 Data Flow

### 1. Generate Toolkit Flow
\`\`\`
User Input (prompt) 
  → POST /api/generate 
  → AI Service (OpenAI/Mock) 
  → Return generated code
  → Display in Editor + Preview
  → User can edit
  → Click "Save"
  → POST /api/toolkits
  → Save to Database
\`\`\`

### 2. View Toolkits Flow
\`\`\`
User visits /toolkits
  → GET /api/toolkits
  → Fetch from Database
  → Display list of ToolkitCards
  → Click on card
  → Navigate to /toolkits/:id
  → GET /api/toolkits/:id
  → Display code + preview
\`\`\`

### 3. Collections Flow
\`\`\`
User creates collection
  → POST /api/collections
  → Save to Database
  
User adds toolkit to collection
  → PUT /api/collections/:id
  → Update Many-to-Many relation
  
User views collection
  → GET /api/collections/:id
  → Fetch collection + toolkits
  → Display list
\`\`\`

---

## 🎯 API Endpoints

### Generate
- \`POST /api/generate\`
  - Body: \`{ prompt: string }\`
  - Response: \`{ success: boolean, code: string, name: string }\`

### Toolkits
- \`GET /api/toolkits\` - Lấy danh sách toolkits
- \`POST /api/toolkits\` - Tạo toolkit mới
  - Body: \`{ name, description, code, prompt, language }\`
- \`GET /api/toolkits/:id\` - Lấy chi tiết toolkit
- \`PUT /api/toolkits/:id\` - Update toolkit
- \`DELETE /api/toolkits/:id\` - Xóa toolkit

### Collections
- \`GET /api/collections\` - Lấy danh sách collections
- \`POST /api/collections\` - Tạo collection mới
  - Body: \`{ name, description, isPublic }\`
- \`GET /api/collections/:id\` - Lấy chi tiết collection
- \`PUT /api/collections/:id\` - Update collection (add/remove toolkits)
- \`DELETE /api/collections/:id\` - Xóa collection

---

## 🎨 UI/UX Flow

### Landing Page (/)
- Hero section với gradient animations
- Feature cards (AI Generation, Code Editor, Live Preview)
- CTA button → /create

### Generator Page (/create)
- **Header**: Logo + Input bar + Generate button
- **Main**: 2-pane layout
  - Left: Code Editor (Monaco)
  - Right: Live Preview (iframe)
- **Actions**: Save, Download, Share buttons

### Toolkits Page (/toolkits)
- Grid layout của ToolkitCards
- Filter/Search bar
- Sort options (newest, popular, etc.)

### Toolkit Detail (/toolkits/:id)
- Full screen editor + preview
- Metadata (name, description, created date)
- Actions: Edit, Delete, Add to Collection, Share

### Collections Page (/collections)
- Grid layout của CollectionCards
- Create new collection button

### Collection Detail (/collections/:id)
- Collection info
- Grid of toolkits in collection
- Add/Remove toolkit actions

---

## 🔐 Authentication (Future)

Hiện tại chưa có auth, nhưng khi implement:
- **NextAuth.js** hoặc **Clerk**
- Social login (Google, GitHub)
- Session management
- Protected routes

---

## 🚀 Deployment

### Development
\`\`\`bash
npm run dev
\`\`\`

### Production
- **Frontend + API**: Vercel
- **Database**: 
  - Dev: SQLite (dev.db)
  - Prod: PostgreSQL (Vercel Postgres hoặc Supabase)
- **Environment Variables**:
  - \`DATABASE_URL\`
  - \`OPENAI_API_KEY\`

---

## 📝 Next Steps

### Phase 1: Core Features ✅
- [x] Landing Page
- [x] Generator Page
- [x] AI Generation (mocked)
- [x] Code Editor
- [x] Live Preview

### Phase 2: Persistence (Current)
- [ ] Save Toolkit API
- [ ] Toolkits List Page
- [ ] Toolkit Detail Page
- [ ] Edit Toolkit

### Phase 3: Collections
- [ ] Create Collection
- [ ] Add Toolkit to Collection
- [ ] Collection Detail Page
- [ ] Remove from Collection

### Phase 4: Enhancements
- [ ] Real AI Integration (OpenAI)
- [ ] User Authentication
- [ ] Share Toolkits (public links)
- [ ] Download as HTML file
- [ ] Search & Filter
- [ ] Favorites/Likes

### Phase 5: Advanced
- [ ] Collaborative editing
- [ ] Version history
- [ ] Templates library
- [ ] Analytics dashboard

---

## 🛠️ Development Guidelines

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- Functional components + Hooks
- Tailwind utility classes

### Naming Conventions
- Components: PascalCase (\`ToolkitCard.tsx\`)
- Files: kebab-case (\`data-source.ts\`)
- API routes: REST conventions
- Database: snake_case (if needed)

### Error Handling
- Try-catch in API routes
- User-friendly error messages
- Console logging for debugging

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [TypeORM Docs](https://typeorm.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
