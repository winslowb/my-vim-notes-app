## 1. Technology Stack

**Frontend:**
- Framework: React (with Redux or Zustand for state management)
- Editor: monaco-editor, react-codemirror, or [TipTap](https://tiptap.dev/) (for flexible blocks and Vim mode)
- Drag-and-drop: react-beautiful-dnd or dnd-kit
- Themes: Custom Gruvbox-based CSS/Sass
- Calendar: [fullcalendar.io](https://fullcalendar.io) or [react-big-calendar](https://jquense.github.io/react-big-calendar/)
- Embeds: Use iFrame or document viewers for PDFs, JPGs, and Google Drive embedding support

**Backend:**
- API: Node.js/Express or Next.js API routes
- Database: PostgreSQL (for robust querying, especially for calendar/tasks), or SQLite for local dev
- File storage: Store Markdown files locally/cloud (S3/GCS/Azure Blob)

**AI Integration:**
- Use OpenAI API for ChatGPT features

**Other Integrations:**
- Google Drive API (auth+embedding)
- Authentication: NextAuth.js or Auth0

**Platform:**
- Containerization: Docker (multi-stage for front+back end)
- CI/CD: GitHub Actions or GitLab CI
- Deployment: Vercel, Netlify (if JAMStack), or Kubernetes cluster on GCP/AWS/Azure if scaling up
- Observability: Prometheus & Grafana (for large scale); Sentry for error reporting

---

## 2. Core Features Mapping

| Feature                   | Tools/Tech                                                     | Notes                                                   |
|---------------------------|----------------------------------------------------------------|---------------------------------------------------------|
| Markdown, Vim keybindings | monaco-editor/codemirror with Vim extension, Markdown renderer | CodiMirror has mature Vim mode; can be extended         |
| Movable "blocks"          | React state management, dnd-kit                                | Arrange blocks in any order, persistent positions to DB |
| Gruvbox Themes            | Custom SCSS/themes                                             | Can toggle via React Context                            |
| Embeds (PDF/JPG/Drive)    | pdf.js, Google Drive API, native img tags                      | Handle security/sandboxing for external embeds          |
| AI integration            | OpenAI API                                                     | ChatGPT prompts, summarize, generate                    |
| Calendar/task integration | FullCalendar/React Big Calendar, Postgres joins                | Tasks model, highlight days with tasks                  |
| Tables & Arithmetic       | Markdown tables, mini-latex/MDX/MathJax, front-end eval        | Simple spreadsheet-like features                        |

---

## 3. High-Level Architecture Diagram

```plaintext
User <-> React App (Markdown/Blocks UI, Vim mode, Calendar)
                |
                v
         Node.js/Next.js API
                |
       ----------------------
       |       |     |     |
   PostgreSQL  S3  OpenAI  Google API

```

---

## 4. Development Roadmap (Initial Iteration)

**Phase 1: MVP**
1. Set up project repo (lerna/yarn workspace for mono-repo, or separate repos for FE/BE)
2. Build the Markdown editor in React with Vim keybindings
3. Implement block creation, drag, and move within the workspace (keep in React state first)
4. Add dark/light Gruvbox themes, toggling in UI
5. Save notes as .md files (locally, or to backend API)
6. Basic calendar view; highlight notes with tasks [stubbed tasks]
7. Basic PDF/image embed in blocks

**Phase 2: Integrations & Extensibility**
1. Persist notes/blocks/positions in DB
2. Google Drive integration for embedding documents
3. Extended AI integration (select text, "Ask AI" actions)
4. Tables/arithmetic block (evaluate expressions)
5. Robust calendar/tasks (CRUD, reminders)

**Phase 3: DevOps & Scale**
1. Dockerize app, add CI/CD
2. Set up secret management for API keys
3. Add observability/logging (Sentry, etc.)
4. Auth, multi-user support

---
