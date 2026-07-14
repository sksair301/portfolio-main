import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Chess, Square, PieceSymbol, Color } from "chess.js";
import RedoxChessEngine from "../utils/redoxchessEngine";
import "./Play.css";

// ─── Chess Piece SVGs ────────────────────────────────────────────────────────
const PIECES: Record<string, string> = {
  wK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-linejoin="miter" d="M22.5 11.63V6M20 8h5"/><path fill="#fff" stroke-linecap="butt" stroke-linejoin="miter" d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/><path fill="#fff" d="M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7"/><path d="M12.5 30c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0"/></g></svg>`,
  wQ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm16.5-4.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM16 9a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM33 9a2 2 0 1 1-4 0 2 2 0 1 1 4 0z"/><path stroke-linecap="butt" d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15L14 11v14L7 14l2 12z"/><path stroke-linecap="butt" d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"/><path fill="none" d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0"/></g></svg>`,
  wR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-linecap="butt" d="M9 39h27v-3H9v3zm3-3v-4h21v4H12zm-1-22V9h4v2h5V9h5v2h5V9h4v5"/><path d="M34 14l-3 3H14l-3-3"/><path stroke-linecap="butt" stroke-linejoin="miter" d="M31 17v12.5H14V17"/><path d="M31 29.5l1.5 2.5h-20l1.5-2.5"/><path fill="none" stroke-linejoin="miter" d="M11 14h23"/></g></svg>`,
  wB: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><g fill="#fff" stroke-linecap="butt"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/></g><path stroke-linejoin="miter" d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5"/></g></svg>`,
  wN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path fill="#fff" d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/><path fill="#fff" d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3"/><path fill="#000" d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0zm5.433-9.75a.5 1.5 30 1 1-.866-.5.5 1.5 30 1 1 .866.5z"/></g></svg>`,
  wP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"/></svg>`,
  bK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path stroke-linejoin="miter" d="M22.5 11.63V6" stroke="#00e5ff"/><path fill="#1a1a2e" stroke="#00e5ff" d="M20 8h5"/><path fill="#1a1a2e" stroke="#00e5ff" stroke-linecap="butt" stroke-linejoin="miter" d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/><path fill="#1a1a2e" stroke="#00e5ff" d="M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7"/><path stroke="#00e5ff" d="M12.5 30c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0"/></g></svg>`,
  bQ: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill-rule="evenodd" stroke="#00e5ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><g fill="#1a1a2e"><circle cx="6" cy="12" r="2.75"/><circle cx="14" cy="9" r="2.75"/><circle cx="22.5" cy="8" r="2.75"/><circle cx="31" cy="9" r="2.75"/><circle cx="39" cy="12" r="2.75"/></g><path fill="#1a1a2e" stroke-linecap="butt" d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1-5.2 13.6-3-14.5-3 14.5-5.2-13.6L14 25 6.5 13.5 9 26z"/><path fill="#1a1a2e" stroke-linecap="butt" d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"/><path fill="none" stroke-linecap="butt" d="M11 38.5a35 35 1 0 0 23 0"/><path fill="none" d="M11 29a35 35 1 0 1 23 0m-21.5 2.5h20m-21 3a35 35 1 0 0 22 0"/></g></svg>`,
  bR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill-rule="evenodd" stroke="#00e5ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path fill="#1a1a2e" stroke-linecap="butt" d="M9 39h27v-3H9v3zm3.5-7l1.5-2.5h17l1.5 2.5h-20zm-.5 4v-4h21v4H12z"/><path fill="#1a1a2e" stroke-linecap="butt" stroke-linejoin="miter" d="M14 29.5v-13h17v13H14z"/><path fill="#1a1a2e" stroke-linecap="butt" d="M14 16.5L11 14h23l-3 2.5H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z"/><path fill="none" stroke-linejoin="miter" d="M12 35.5h21m-20-4h19m-18-2h17m-17-13h17M11 14h23"/></g></svg>`,
  bB: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#00e5ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><g fill="#1a1a2e" stroke-linecap="butt"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/></g><path stroke-linejoin="miter" d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5"/></g></svg>`,
  bN: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#00e5ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path fill="#1a1a2e" d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/><path fill="#1a1a2e" d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3"/><path fill="#00e5ff" d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0zm5.433-9.75a.5 1.5 30 1 1-.866-.5.5 1.5 30 1 1 .866.5z"/></g></svg>`,
  bP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path fill="#1a1a2e" stroke="#00e5ff" stroke-width="1.5" stroke-linecap="round" d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"/></svg>`,
};

// ─── Debug Game Data ──────────────────────────────────────────────────────────
interface BugChallenge {
  id: number;
  language: string;
  title: string;
  description: string;
  buggyCode: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const CHALLENGES: BugChallenge[] = [
  {
    id: 1,
    language: "Python",
    title: "Off-by-one in pagination",
    description: "This FastAPI endpoint returns paginated results, but users are always missing the last item. Find the bug.",
    difficulty: "Easy",
    buggyCode: `@app.get("/items")
def get_items(page: int = 1, size: int = 10):
    offset = (page - 1) * size
    items = db.query(Item)\\
               .offset(offset)\\
               .limit(size - 1)\\
               .all()
    return {"items": items, "page": page}`,
    options: [
      "limit(size - 1) should be limit(size)",
      "offset should be page * size",
      "page parameter default should be 0",
      "db.query is missing a filter",
    ],
    correctIndex: 0,
    explanation: "limit(size - 1) always fetches one fewer record than requested. It should be limit(size) to return the correct page size.",
  },
  {
    id: 2,
    language: "PHP",
    title: "Laravel N+1 Query",
    description: "This controller is causing 100+ DB queries for a single request. Spot the performance bug.",
    difficulty: "Medium",
    buggyCode: `public function index()
{
    $orders = Order::all();

    $result = $orders->map(function ($order) {
        return [
            'id'       => $order->id,
            'user'     => $order->user->name,
            'total'    => $order->total,
        ];
    });

    return response()->json($result);
}`,
    options: [
      "Order::all() should be Order::paginate()",
      "Missing Order::with('user') — causes N+1 query",
      "$order->user->name should use a join instead",
      "map() should be replaced with collect()",
    ],
    correctIndex: 1,
    explanation: "Without eager loading, every iteration of map() fires a separate SQL query to fetch the user. Fix: Order::with('user')->get()",
  },
  {
    id: 3,
    language: "JavaScript",
    title: "Race condition in async",
    description: "Users report stale data appearing after rapid button clicks. Find the async bug.",
    difficulty: "Hard",
    buggyCode: `async function fetchUserData(userId) {
  setLoading(true);
  const res = await fetch(\`/api/users/\${userId}\`);
  const data = await res.json();
  setUser(data);
  setLoading(false);
}

// Called on every click
button.addEventListener('click', () => {
  fetchUserData(currentUserId);
});`,
    options: [
      "setLoading should be called after setUser",
      "fetch() is missing error handling",
      "No cancellation of previous in-flight requests — stale response overwrites newer one",
      "currentUserId is not re-evaluated inside the closure",
    ],
    correctIndex: 2,
    explanation: "Rapid clicks fire multiple concurrent fetches. The slowest (oldest) response can arrive last and overwrite a newer result. Fix: use AbortController to cancel pending requests.",
  },
  {
    id: 4,
    language: "SQL",
    title: "Missing index causes full table scan",
    description: "This query runs fine in dev with 100 rows but times out in production with 2M rows. What's wrong?",
    difficulty: "Medium",
    buggyCode: `-- Fetch active bookings for a vendor
SELECT b.id, b.scheduled_at, b.status
FROM   bookings b
WHERE  b.vendor_id = 42
  AND  b.status    = 'active'
  AND  YEAR(b.scheduled_at) = 2025
ORDER  BY b.scheduled_at DESC;`,
    options: [
      "SELECT * should be used instead of specific columns",
      "The JOIN is missing",
      "YEAR(b.scheduled_at) wraps the column in a function, preventing index use",
      "ORDER BY on scheduled_at requires a separate sort index",
    ],
    correctIndex: 2,
    explanation: "Wrapping a column in a function (YEAR()) prevents MySQL from using an index on that column. Fix: use range condition — scheduled_at BETWEEN '2025-01-01' AND '2025-12-31'",
  },
  {
    id: 5,
    language: "Python",
    title: "Mutable default argument",
    description: "This utility function produces unexpected results when called multiple times. Find the subtle bug.",
    difficulty: "Hard",
    buggyCode: `def build_pipeline(steps, config={}):
    config['steps'] = steps
    config['version'] = '2.0'
    return config

# First call
p1 = build_pipeline(['load', 'transform'])
# Second call
p2 = build_pipeline(['load', 'export'])
print(p1)  # Why does this print steps from p2?`,
    options: [
      "config['version'] should be set before config['steps']",
      "Default mutable argument `config={}` is shared across all calls",
      "steps list is mutated inside the function",
      "build_pipeline should return a copy with dict.copy()",
    ],
    correctIndex: 1,
    explanation: "In Python, default mutable arguments are created once and shared. Every call modifies the same dict object. Fix: use config=None and set config = {} inside the function body.",
  },
  {
    id: 6,
    language: "Docker",
    title: "Layer cache busted on every build",
    description: "The Docker image rebuilds all layers from scratch every time, even when only app code changes. Spot the issue.",
    difficulty: "Easy",
    buggyCode: `FROM python:3.11-slim

WORKDIR /app

# Copy everything first
COPY . .

# Then install dependencies
RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]`,
    options: [
      "WORKDIR should be /usr/src/app",
      "CMD should use python -m uvicorn instead",
      "COPY . . before pip install busts cache on every code change",
      "FROM should use python:3.11-alpine for smaller image",
    ],
    correctIndex: 2,
    explanation: "Copying all files before installing deps means any code change invalidates the pip install layer. Fix: copy requirements.txt first, run pip install, then COPY . . so deps are cached.",
  },
  {
    id: 7,
    language: "Go",
    title: "Goroutine leak",
    description: "This Go service's memory grows indefinitely over time. Find the goroutine leak.",
    difficulty: "Hard",
    buggyCode: `func processRequests(requests <-chan Request) {
    for req := range requests {
        go func() {
            result := heavyProcess(req)
            log.Println(result)
        }()
    }
}

func heavyProcess(r Request) string {
    time.Sleep(5 * time.Second)
    return r.Data
}`,
    options: [
      "log.Println should be fmt.Println",
      "The goroutine closes over `req` by reference — all goroutines share the last value of req",
      "requests channel should be buffered",
      "time.Sleep should use a context with timeout",
    ],
    correctIndex: 1,
    explanation: "The goroutine captures `req` by reference from the outer loop. By the time it runs, `req` has advanced. Fix: pass req as an argument: go func(r Request) { ... }(req)",
  },
  {
    id: 8,
    language: "Redis",
    title: "Cache stampede",
    description: "Your Redis cache expires and suddenly your DB gets hit by 500 concurrent requests. What pattern is missing?",
    difficulty: "Medium",
    buggyCode: `def get_product(product_id: int):
    cache_key = f"product:{product_id}"
    cached = redis.get(cache_key)

    if cached:
        return json.loads(cached)

    # Cache miss — fetch from DB
    product = db.query(Product).get(product_id)
    redis.setex(cache_key, 300, json.dumps(product))
    return product`,
    options: [
      "json.dumps should be pickle.dumps for Redis",
      "setex TTL of 300 seconds is too short",
      "No mutex/lock — all 500 requests miss cache simultaneously and hammer the DB",
      "db.query should use async/await",
    ],
    correctIndex: 2,
    explanation: "When cache expires, all concurrent requests find an empty cache and hit the DB simultaneously — the thundering herd / cache stampede. Fix: use a distributed lock (Redis SETNX) or probabilistic early expiration.",
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface MoveHistory { from: string; to: string; piece: string; captured?: string; san: string; }
interface ChatMessage  { role: "user" | "assistant" | "system"; content: string; }

const SYSTEM_PROMPT = `You are Sabir Shaikh, a passionate Senior Backend Developer (AI ML / DevOps) from Mumbai, India. You are NOT an AI assistant - you ARE Sabir himself chatting with visitors on your portfolio website.

About you (Sabir Shaikh):
- Full name: Sabir Shaikh
- Location: Mumbai, India
- Profession: Senior Backend Developer (AI ML / DevOps)
- Experience: 3+ years in backend development, AI ML, and DevOps
- Specialties: PHP (Laravel), Python (FastAPI, Flask), Golang, AI/ML (LangChain, ChromaDB), AWS, Docker
- Notable project: AI-Powered Data Retrieval System from DB - enabling 4X faster reporting
- Other projects: CreditFair Chatbot, FurnishHomes (e-commerce platform)
- Languages: English (fluent), Hindi
- Hobbies: Coding, building AI solutions, system architecture
- Personality: Friendly, helpful, passionate about scalable systems, loves solving complex problems

Rules:
1. Always respond as Sabir in first person ("I", "my", "me")
2. Be friendly, casual, and conversational
3. If asked about work/projects, share your genuine experiences
4. Keep responses concise but helpful
5. You can discuss scalable backend systems, AI solutions, DevOps, or anything tech-related
6. Never say you are an AI or language model - you are Sabir
7. Use occasional emoji to be friendly 😊`;

// ─── Debug Game Component ─────────────────────────────────────────────────────
const DebugGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [timerActive, setTimerActive] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(CHALLENGES.length).fill(false));
  const timerRef = useRef<number>();

  const challenge = CHALLENGES[currentIndex];

  // Timer
  useEffect(() => {
    if (!timerActive || gameOver) return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setRevealed(true);
          setTimerActive(false);
          setStreak(0);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIndex, timerActive, gameOver]);

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    setTimerActive(false);
    clearInterval(timerRef.current);
    const correct = idx === challenge.correctIndex;
    const newAnswered = [...answered];
    newAnswered[currentIndex] = true;
    setAnswered(newAnswered);
    if (correct) {
      const bonus = Math.floor(timeLeft / 5);
      setScore((s) => s + 10 + bonus);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    if (currentIndex + 1 >= CHALLENGES.length) {
      setGameOver(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setRevealed(false);
      setTimeLeft(45);
      setTimerActive(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setTimeLeft(45);
    setTimerActive(true);
    setGameOver(false);
    setStreak(0);
    setAnswered(new Array(CHALLENGES.length).fill(false));
  };

  const timerPct = (timeLeft / 45) * 100;
  const timerColor = timeLeft > 20 ? "#00e5ff" : timeLeft > 10 ? "#fb8dff" : "#ff4444";

  if (gameOver) {
    const pct = Math.round((score / (CHALLENGES.length * 15)) * 100);
    return (
      <div className="debug-result">
        <div className="debug-result-icon">{pct >= 70 ? "🏆" : pct >= 40 ? "🎯" : "💡"}</div>
        <h2 className="debug-result-title">{pct >= 70 ? "Senior Dev Energy!" : pct >= 40 ? "Not bad, keep debugging!" : "Keep practicing!"}</h2>
        <div className="debug-result-score">{score} pts</div>
        <p className="debug-result-sub">You scored {pct}% — {pct >= 70 ? "Sabir would hire you 🚀" : "Try again to beat your score"}</p>
        <div className="debug-result-breakdown">
          {CHALLENGES.map((c, i) => (
            <div key={i} className={`debug-result-item ${answered[i] ? "answered" : "skipped"}`}>
              <span className="dri-lang">{c.language}</span>
              <span className="dri-title">{c.title}</span>
              <span className={`dri-diff diff-${c.difficulty.toLowerCase()}`}>{c.difficulty}</span>
            </div>
          ))}
        </div>
        <button className="debug-btn-next" onClick={restart}>Play Again</button>
      </div>
    );
  }

  return (
    <div className="debug-game">
      {/* Header bar */}
      <div className="debug-topbar">
        <div className="debug-score-wrap">
          <span className="debug-label">Score</span>
          <span className="debug-value">{score}</span>
        </div>
        {streak >= 2 && (
          <div className="debug-streak">🔥 {streak}x Streak</div>
        )}
        <div className="debug-progress-wrap">
          {CHALLENGES.map((_, i) => (
            <div key={i} className={`debug-dot ${i < currentIndex ? "done" : i === currentIndex ? "active" : ""}`} />
          ))}
        </div>
        <div className="debug-timer-wrap">
          <span className="debug-label">Time</span>
          <div className="debug-timer-ring" style={{ "--timer-pct": `${timerPct}%`, "--timer-color": timerColor } as React.CSSProperties}>
            <span className="debug-timer-num" style={{ color: timerColor }}>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Challenge */}
      <div className="debug-card">
        <div className="debug-card-top">
          <span className="debug-lang-badge">{challenge.language}</span>
          <span className={`debug-diff-badge diff-${challenge.difficulty.toLowerCase()}`}>{challenge.difficulty}</span>
          <span className="debug-num">{currentIndex + 1}/{CHALLENGES.length}</span>
        </div>
        <h3 className="debug-title">{challenge.title}</h3>
        <p className="debug-desc">{challenge.description}</p>
        <div className="debug-code-wrap">
          <div className="debug-code-header">
            <span className="debug-code-dots"><i /><i /><i /></span>
            <span className="debug-code-lang">{challenge.language.toLowerCase()}</span>
          </div>
          <pre className="debug-code"><code>{challenge.buggyCode}</code></pre>
        </div>
      </div>

      {/* Options */}
      <div className="debug-options">
        <p className="debug-options-label">🐛 What's the bug?</p>
        {challenge.options.map((opt, i) => {
          let cls = "debug-option";
          if (revealed) {
            if (i === challenge.correctIndex) cls += " correct";
            else if (i === selected && i !== challenge.correctIndex) cls += " wrong";
          } else if (i === selected) cls += " selected";
          return (
            <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={revealed}>
              <span className="debug-opt-letter">{String.fromCharCode(65 + i)}</span>
              <span className="debug-opt-text">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {revealed && (
        <div className="debug-explanation">
          <div className="debug-exp-icon">{selected === challenge.correctIndex ? "✅" : "❌"}</div>
          <div className="debug-exp-text">
            <strong>{selected === challenge.correctIndex ? "Correct!" : "Not quite."}</strong>
            {" "}{challenge.explanation}
          </div>
          <button className="debug-btn-next" onClick={next}>
            {currentIndex + 1 >= CHALLENGES.length ? "See Results" : "Next Bug →"}
          </button>
        </div>
      )}
    </div>
  );
};


// ─── Main Play Component ──────────────────────────────────────────────────────
const Play = () => {
  const [activeTab, setActiveTab] = useState<"chess" | "debug">("chess");

  // Chess state
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Square[]>([]);
  const [moveHistory, setMoveHistory] = useState<MoveHistory[]>([]);
  const [capturedWhite, setCapturedWhite] = useState<string[]>([]);
  const [capturedBlack, setCapturedBlack] = useState<string[]>([]);
  const [boardFlipped, setBoardFlipped] = useState(false);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [gameStatus, setGameStatus] = useState<string>("");
  const [playerColor] = useState<Color>("w");
  const [engineThinking, setEngineThinking] = useState(false);
  const redoxchessRef = useRef<RedoxChessEngine | null>(null);

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello there! I'm Sabir Shaikh 👋 Ask me anything about my work, tech stack, or just say hi!" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const files = boardFlipped ? ["h","g","f","e","d","c","b","a"] : ["a","b","c","d","e","f","g","h"];
  const ranks = boardFlipped ? ["1","2","3","4","5","6","7","8"] : ["8","7","6","5","4","3","2","1"];

  const updateGameStatus = useCallback((g: Chess) => {
    if (g.isCheckmate())       setGameStatus(g.turn() === "w" ? "Checkmate! Black wins!" : "Checkmate! White wins!");
    else if (g.isStalemate())  setGameStatus("Draw by stalemate");
    else if (g.isThreefoldRepetition()) setGameStatus("Draw by repetition");
    else if (g.isInsufficientMaterial()) setGameStatus("Draw by insufficient material");
    else if (g.isDraw())       setGameStatus("Draw");
    else if (g.isCheck())      setGameStatus(g.turn() === "w" ? "White is in check!" : "Black is in check!");
    else                       setGameStatus(g.turn() === "w" ? "White's turn" : "Black's turn");
  }, []);

  useEffect(() => { updateGameStatus(game); }, [game, updateGameStatus]);

  useEffect(() => {
    const initEngine = async () => {
      redoxchessRef.current = new RedoxChessEngine();
      await redoxchessRef.current.init();
    };
    initEngine();
    return () => { redoxchessRef.current?.quit(); };
  }, []);

  useEffect(() => {
    if (game.turn() === "b" && !game.isGameOver() && redoxchessRef.current) {
      setEngineThinking(true);
      redoxchessRef.current.setPosition(game.fen());
      redoxchessRef.current.getBestMove((move) => {
        const from = move.substring(0, 2) as Square;
        const to   = move.substring(2, 4) as Square;
        makeMove(from, to);
        setEngineThinking(false);
      }, 12);
    }
  }, [game]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const getPieceAt = (square: Square) => game.get(square) || null;

  const handleSquareClick = (square: Square) => {
    if (engineThinking || game.turn() !== "w") return;
    const piece = getPieceAt(square);
    if (selectedSquare) {
      if (possibleMoves.includes(square)) {
        makeMove(selectedSquare, square);
      } else if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
        setPossibleMoves(game.moves({ square, verbose: true }).map((m) => m.to as Square));
      } else {
        setSelectedSquare(null); setPossibleMoves([]);
      }
    } else {
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
        setPossibleMoves(game.moves({ square, verbose: true }).map((m) => m.to as Square));
      }
    }
  };

  const makeMove = (from: Square, to: Square) => {
    try {
      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({ from, to, promotion: "q" });
      if (move) {
        if (move.captured) {
          if (move.color === "w") setCapturedBlack((p) => [...p, move.captured!]);
          else setCapturedWhite((p) => [...p, move.captured!]);
        }
        setMoveHistory((p) => [...p, { from: move.from, to: move.to, piece: move.piece, captured: move.captured, san: move.san }]);
        setLastMove({ from, to });
        setGame(gameCopy);
        setSelectedSquare(null); setPossibleMoves([]);
      }
    } catch { setSelectedSquare(null); setPossibleMoves([]); }
  };

  const resetGame = () => {
    setGame(new Chess()); setSelectedSquare(null); setPossibleMoves([]);
    setMoveHistory([]); setCapturedWhite([]); setCapturedBlack([]);
    setLastMove(null); setGameStatus("White's turn"); setBoardFlipped(false);
  };

  const flipBoard = () => {
    if (moveHistory.length > 0) {
      if (window.confirm("Start new game?")) { resetGame(); setBoardFlipped(!boardFlipped); }
      return;
    }
    setBoardFlipped(!boardFlipped);
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMessage: ChatMessage = { role: "user", content: chatInput };
    setChatMessages((p) => [...p, userMessage]);
    setChatInput("");
    setIsTyping(true);
    try {
      const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...chatMessages.filter((m) => m.role !== "system").map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: chatInput },
      ];
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      const data = await response.json();
      if (data.choices?.[0]?.message?.content) {
        setChatMessages((p) => [...p, { role: "assistant", content: data.choices[0].message.content }]);
      } else throw new Error("Invalid response");
    } catch {
      setChatMessages((p) => [...p, { role: "assistant", content: "Sorry, having some connection issues. Try again? 😅" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const renderPiece = (piece: { type: PieceSymbol; color: Color } | null) => {
    if (!piece) return null;
    const key = `${piece.color}${piece.type.toUpperCase()}`;
    const svg = PIECES[key];
    return svg ? <div className="chess-piece" dangerouslySetInnerHTML={{ __html: svg }} /> : null;
  };

  const isSquareLight = (file: string, rank: string) =>
    ("abcdefgh".indexOf(file) + parseInt(rank) - 1) % 2 === 1;

  const renderCapturedPieces = (pieces: string[], color: Color) =>
    pieces.map((piece, i) => {
      const svg = PIECES[`${color}${piece.toUpperCase()}`];
      return <div key={i} className="captured-piece" dangerouslySetInnerHTML={{ __html: svg || "" }} />;
    });

  const formatMoveHistory = () => {
    const formatted: { moveNum: number; white: string; black: string }[] = [];
    for (let i = 0; i < moveHistory.length; i += 2)
      formatted.push({ moveNum: Math.floor(i / 2) + 1, white: moveHistory[i]?.san || "", black: moveHistory[i + 1]?.san || "" });
    return formatted;
  };

  return (
    <div className="play-page">
      {/* Header */}
      <div className="play-header">
        <Link to="/" className="back-button" data-cursor="disable">← Back to Home</Link>
      </div>

      {/* Tab switcher */}
      <div className="play-tabs">
        <button
          className={`play-tab ${activeTab === "chess" ? "play-tab--active" : ""}`}
          onClick={() => setActiveTab("chess")}
          data-cursor="disable"
        >
          ♟ Chess vs AI
        </button>
        <button
          className={`play-tab ${activeTab === "debug" ? "play-tab--active" : ""}`}
          onClick={() => setActiveTab("debug")}
          data-cursor="disable"
        >
          🐛 Debug the Code
        </button>
      </div>

      {/* ── DEBUG GAME ── */}
      {activeTab === "debug" && (
        <div className="debug-container">
          <div className="debug-intro">
            <h2>Debug the Code <span>🐛</span></h2>
            <p>Real bugs from real backend systems. PHP, Python, Go, SQL, Docker. Can you spot them before time runs out?</p>
          </div>
          <DebugGame />
        </div>
      )}

      {/* ── CHESS ── */}
      {activeTab === "chess" && (
        <div className="chess-container">
          {/* Chat Panel */}
          <div className="chat-panel">
            <div className="chat-header">
              <span className="chat-title">💬 Talk with me</span>
            </div>
            <div className="chat-messages">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.role}`}>
                  <div className="message-content">{msg.content}</div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-message assistant">
                  <div className="message-content typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="chat-input-area">
              <input
                type="text" className="chat-input" placeholder="Type a message..."
                value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleKeyPress} data-cursor="disable"
              />
              <button className="chat-send-btn" onClick={sendMessage} data-cursor="disable">➤</button>
            </div>
          </div>

          {/* Board */}
          <div className="chess-board-section">
            <div className="player-bar opponent-bar">
              <div className="player-info">
                <div className="player-avatar"><img src="/images/my_images/me.jpeg" alt="Sabir" /></div>
                <div className="player-details">
                  <span className="player-name">Sabir Shaikh</span>
                  <span className="player-rating">{engineThinking ? "🤔 Thinking..." : "ELO 3640"}</span>
                </div>
              </div>
              <div className="captured-pieces">{renderCapturedPieces(capturedWhite, "w")}</div>
            </div>

            <div className="chess-board-wrapper">
              <div className="chess-board">
                {ranks.map((rank) =>
                  files.map((file) => {
                    const square = `${file}${rank}` as Square;
                    const piece = getPieceAt(square);
                    const isSelected = selectedSquare === square;
                    const isPossibleMove = possibleMoves.includes(square);
                    const isLastMoveSquare = lastMove && (lastMove.from === square || lastMove.to === square);
                    const isCheck = game.isCheck() && piece?.type === "k" && piece?.color === game.turn();
                    return (
                      <div
                        key={square}
                        className={`chess-square ${isSquareLight(file, rank) ? "light" : "dark"} ${isSelected ? "selected" : ""} ${isLastMoveSquare ? "last-move" : ""} ${isCheck ? "in-check" : ""}`}
                        onClick={() => handleSquareClick(square)}
                        data-cursor="disable"
                      >
                        {file === (boardFlipped ? "h" : "a") && <span className="coord-rank">{rank}</span>}
                        {rank === (boardFlipped ? "8" : "1") && <span className="coord-file">{file}</span>}
                        {renderPiece(piece)}
                        {isPossibleMove && <div className={`move-indicator ${piece ? "capture" : ""}`} />}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="player-bar player-bar-bottom">
              <div className="player-info">
                <div className="player-avatar"><span>👤</span></div>
                <div className="player-details">
                  <span className="player-name">You</span>
                  <span className="player-rating">{playerColor === "w" ? "White" : "Black"}</span>
                </div>
              </div>
              <div className="captured-pieces">{renderCapturedPieces(capturedBlack, "b")}</div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="chess-side-panel right-panel">
            <div className="game-status">
              <span className={game.isCheck() ? "check" : ""}>{gameStatus}</span>
            </div>
            <div className="move-history">
              <div className="move-history-header">Moves</div>
              <div className="move-history-list">
                {formatMoveHistory().map((move, i) => (
                  <div key={i} className="move-row">
                    <span className="move-num">{move.moveNum}.</span>
                    <span className="move-white">{move.white}</span>
                    <span className="move-black">{move.black}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="game-controls">
              <button onClick={resetGame} className="control-btn" data-cursor="disable">New Game</button>
              <button onClick={flipBoard} className="control-btn" data-cursor="disable">Flip Board</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Play;
