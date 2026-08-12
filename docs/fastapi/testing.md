---
title: Testing — FastAPI বাংলা গাইড
description: FastAPI-তে TestClient, pytest fixtures, dependency_overrides দিয়ে DB/Auth mocking, AsyncClient দিয়ে async testing এবং coverage report — বাংলায় সম্পূর্ণ গাইড।
---

# Testing (টেস্টিং) 🧪

## Testing কী? (What)

**Testing** হলো এমন একটি প্রক্রিয়া যার মাধ্যমে কোড চালানোর আগেই নিশ্চিত হওয়া যায় যে API সঠিকভাবে কাজ করছে কিনা। 

FastAPI-তে টেস্টিং করার জন্য মূলত **Pytest** এবং Starlette-এর **TestClient** (বা `httpx.AsyncClient`) ব্যবহার করা হয়। TestClient এর সুবিধা হলো — এটি বাস্তব HTTP Server (যেমন Uvicorn) চালু না করেই সরাসরি Python memory-র মধ্যে FastAPI app-কে call করে দ্রুত response চেক করতে পারে।

---

## কেন Testing প্রয়োজন? (Why)

```
❌ Test ছাড়া Application:
   - কোডে সামান্য পরিবর্তন করলে অন্য কোথায় ভেঙে গেল তা বোঝা যায় না (Regression)
   - ম্যানুয়ালি Postman/Swagger দিয়ে বারবার টেস্ট করতে সময় নষ্ট হয়
   - Production এ bug যাওয়ার ভয় থাকে
   - Refactoring বা কোড আপডেট করা ঝুঁকিপূর্ণ হয়ে ওঠে

✅ Test সহ Application:
   - Command চালিয়ে কয়েক সেকেন্ডে পুরো প্রজেক্ট টেস্ট করা যায় (`pytest`)
   - CI/CD pipeline-এ স্বয়ংক্রিয়ভাবে টেস্ট রান হয়ে বাগ ঠেকায়
   - নির্ভয়ে কোড Refactor করা যায়
   - Documentation এবং API Contract ঠিক থাকে
```

---

## Testing Workflow Architecture

```mermaid
graph TD
    Pytest["🧪 Pytest Runner"]
    Fixture["🔌 Pytest Fixture\n(Test Client, DB Override)"]
    TestClient["⚡ TestClient (httpx)\nSimulated HTTP Calls"]
    FastAPIApp["🚀 FastAPI Application"]
    MockDB["🗄️ In-Memory SQLite DB\n(Dependency Override)"]
    Assert["✅ Assertions\n(Status 200, JSON Validation)"]

    Pytest --> Fixture
    Fixture --> TestClient
    Fixture --> MockDB
    TestClient -->|GET / POST / PUT| FastAPIApp
    FastAPIApp --> MockDB
    FastAPIApp -->|Response| TestClient
    TestClient --> Assert
```

---

## প্রয়োজনীয় Package ইন্সটল

```bash
# Pytest এবং HTTPX ইন্সটল করো
pip install pytest httpx

# Coverage report দেখার জন্য (Optional)
pip install pytest-cov
```

---

## ১. Basic TestClient — প্রথম API টেস্ট

ধরা যাক আমাদের একটি সাধারণ FastAPI app আছে:

```python
# main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "হ্যালো বাংলাদেশ!"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

এখন `test_main.py` ফাইল তৈরি করে টেস্ট লিখবো:

```python
# test_main.py
from fastapi.testclient import TestClient
from main import app

# TestClient Instance তৈরি করো
client = TestClient(app)

def test_read_root():
    """GET / testing"""
    response = client.get("/")
    # Check Status Code
    assert response.status_code == 200
    # Check Response JSON Body
    assert response.json() == {"message": "হ্যালো বাংলাদেশ!"}

def test_read_item():
    """GET /items/42?q=pencil testing"""
    response = client.get("/items/42?q=pencil")
    assert response.status_code == 200
    assert response.json() == {"item_id": 42, "q": "pencil"}

def test_read_item_invalid_id():
    """Invalid path parameter (string formatted id) type check"""
    response = client.get("/items/abc")
    # Validation Error হওয়া উচিত (422 Unprocessable Entity)
    assert response.status_code == 422
```

টেস্ট রান করার জন্য Terminal-এ লিখো:

```bash
pytest
```

---

## ২. Pytest Fixtures — Reusable Testing Setup

বারবার `TestClient(app)` না লিখে `pytest.fixture` ব্যবহার করে কোড রিইউজেবল করা যায়।

```python
# conftest.py (Pytest স্বয়ংক্রিয়ভাবে এই ফাইল লোড করে)
import pytest
from fastapi.testclient import TestClient
from main import app

@pytest.fixture
def client():
    """সব টেস্টের জন্য সাধারণ HTTP Client প্রদান করে"""
    with TestClient(app) as test_client:
        yield test_client  # Setup & Teardown handle করে
```

এখন যেকোনো টেস্ট ফাইলে সরাসরি `client` argument হিসেবে ব্যবহার করা যাবে:

```python
# test_users.py

def test_get_users(client):
    response = client.get("/users/")
    assert response.status_code == 200
```

---

## ৩. Dependency Overrides — DB & Auth Mocking

টেস্ট করার সময় রিয়েল প্রোডাকশন ডাটাবেজ ব্যবহার করা বিপজ্জনক। তাই FastAPI-র `app.dependency_overrides` ব্যবহার করে Database এবং Authentication মক (Mock) করা হয়।

### Real Code (`main.py`)

```python
# main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

app = FastAPI()

def get_db():
    """Real Database Session (Production)"""
    db = "Real Production DB Session"
    try:
        yield db
    finally:
        pass

def get_current_user():
    """Real Auth Check"""
    raise HTTPException(status_code=401, detail="Not Authenticated")

@app.get("/profile")
def get_profile(user: dict = Depends(get_current_user)):
    return {"user": user}

@app.get("/items")
def get_items(db = Depends(get_db)):
    return {"db": str(db), "items": ["Item A", "Item B"]}
```

### Test Code (`test_override.py`)

```python
# test_override.py
import pytest
from fastapi.testclient import TestClient
from main import app, get_db, get_current_user

# ===== Fake / Mock Dependencies =====
def override_get_db():
    """Test-এর জন্য In-Memory / Test DB Session"""
    return "Fake In-Memory Test DB"

def override_get_current_user():
    """Test-এর জন্য Fake Logged-in User"""
    return {"id": 1, "username": "testuser", "role": "admin"}

# ===== Pytest Fixture for Overrides =====
@pytest.fixture(autouse=True)
def setup_overrides():
    # Dependency Override সেট করো
    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = override_get_current_user
    
    yield  # টেস্ট চলবে এখানে
    
    # টেস্ট শেষে Override পরিষ্কার করো
    app.dependency_overrides.clear()

client = TestClient(app)

def test_profile_with_mock_user():
    response = client.get("/profile")
    assert response.status_code == 200
    assert response.json() == {"user": {"id": 1, "username": "testuser", "role": "admin"}}

def test_items_with_mock_db():
    response = client.get("/items")
    assert response.status_code == 200
    assert response.json()["db"] == "Fake In-Memory Test DB"
```

---

## ৪. Database Testing with SQLite In-Memory

বাস্তব ডাটাবেজ মডেল (SQLAlchemy) ইন-মেমোরি SQLite ডাটাবেজের সাহায্যে টেস্ট করার পূর্ণাঙ্গ উদাহরণ:

```python
# test_database_crud.py
import pytest
from fastapi import FastAPI, Depends, HTTPException
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base, Session

# 1. Test In-Memory SQLite Engine তৈরি
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# 2. Sample ORM Model
class DBUser(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

# 3. FastAPI App Setup
app = FastAPI()

def get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", status_code=201)
def create_user(name: str, db: Session = Depends(get_db)):
    user = DBUser(name=name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "name": user.name}

# 4. Pytest Setup Fixture
@pytest.fixture(scope="function")
def db_session():
    # Database Table তৈরি
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        # Test শেষে Table মুছে ফেলো (Clean state)
        Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def client(db_session):
    def _override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = _override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()

# 5. Tests
def test_create_user_in_db(client):
    response = client.post("/users/?name=Arif")
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Arif"
    assert "id" in data
```

---

## ৫. Async Route Testing (`httpx.AsyncClient`)

যদি তোমার FastAPI অ্যাপের Routeগুলো `async def` হয় এবং তুমি Asynchronous টেস্টিং করতে চাও:

```python
# test_async.py
import pytest
from httpx import AsyncClient, ASGITransport
from main import app

@pytest.mark.asyncio
async def test_async_endpoint():
    # HTTPX AsyncClient তৈরি
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/")
    
    assert response.status_code == 200
    assert response.json() == {"message": "হ্যালো বাংলাদেশ!"}
```

::: tip Async Test চালানোর নিয়ম
Async test চালানোর জন্য `pytest-asyncio` প্যাকেজ ইন্সটল থাকতে হবে:
```bash
pip install pytest-asyncio
```
এবং `pytest.ini` ফাইলে এই কনফিগারেশন যোগ করো:
```ini
[pytest]
asyncio_mode = auto
```
:::

---

## Comparison: TestClient vs AsyncClient

| বৈশিষ্ট্য | `TestClient` (Starlette) | `AsyncClient` (HTTPX) |
|-----------|------------------------|----------------------|
| **ভিত্তি** | Requests / Starlette | HTTPX |
| **Async Support** | Synchronous (Internal Async handle করে) | Native Async/Await (`async def test_*`) |
| **ব্যবহারের ধরন** | `client.get("/")` | `await client.get("/")` |
| **ব্যবহারযোগ্যতা** | সাধারণ API টেস্টিং-এর জন্য সহজ | WebSocket, SSE, এবং Pure Async টেস্টিং |

---

## Code Coverage Report তৈরি

তোমার লেখা টেস্টগুলো কোডের কত শতাংশ কাভার করেছে তা দেখতে `pytest-cov` ব্যবহার করো:

```bash
# Coverage সহ টেস্ট চালাও
pytest --cov=. --cov-report=html
```

এটি `htmlcov/` ফোল্ডারে একটি সুন্দর ইন্টারঅ্যাক্টিভ HTML ফাইল জেনারেট করবে। `htmlcov/index.html` ফাইলটি ব্রাউজারে খুললে দেখতে পাবে কোন লাইনে টেস্ট মিস হয়েছে।

---

## Common Mistakes ⚠️

::: danger ভুল ১: Test শেষে Dependency Overrides ক্লিয়ার না করা
```python
# ❌ ভুল — Overrides Clear না করলে পরবর্তী টেস্টগুলো প্রভাবিত হবে
def test_one():
    app.dependency_overrides[get_db] = mock_db
    # clear না করেই টেস্ট শেষ!

# ✅ সঠিক — Fixture teardown অথবা clear() ব্যবহার করা
@pytest.fixture(autouse=True)
def cleanup():
    yield
    app.dependency_overrides.clear()
```
:::

::: danger ভুল ২: Production Database-এ টেস্ট রান করা
```python
# ❌ ভুল — Production/Development Database URL ব্যবহার করা
DATABASE_URL = "postgresql://user:pass@localhost/prod_db"  # Data মুছে যেতে পারে!

# ✅ সঠিক — In-Memory SQLite অথবা আলাদা Test DB ব্যবহার করো
DATABASE_URL = "sqlite:///:memory:"
```
:::

::: warning ভুল ৩: State isolate না করা (একটি টেস্টের প্রভাব অন্য টেস্টে পড়া)
টেস্টগুলো এমনভাবে লিখতে হবে যেন প্রতিটি টেস্ট স্বাধীনভাবে কাজ করে। একটি টেস্টের তৈরি করা ডাটা যেন অন্য টেস্টের আউটপুট নষ্ট না করে। Fixture-এ teardown বা transactional rollback ব্যবহার করা উচিত।
:::

---

## Best Practices ✨

- **`conftest.py` ব্যবহার করো:** সব reusable fixtures এবং test database setup `conftest.py` ফাইলে রাখো।
- **In-Memory SQLite বা Docker Test DB ব্যবহার করো:** টেস্ট ডাটা যেন আসল ডাটাবেজ নষ্ট না করে।
- **`app.dependency_overrides` দিয়ে Auth Bypass করো:** টেস্ট করার সময় বারবার রিয়েল JWT জেনারেট না করে Mock User ইনজেক্ট করো।
- **প্রতিরোধমূলক Assertions লেখো:** কেবল Status Code 200 চেক না করে Response JSON-এর Data টাইপ ও মান নিখুঁতভাবে `assert` করো।
- **CI/CD Pipeline-এ `pytest` যুক্ত করো:** GitHub Actions বা GitLab CI-তে প্রতি Pull Request-এ টেস্ট অটোমেটিক চালাও।

---

## Interview Questions 🎯

**প্রশ্ন ১: FastAPI অ্যাপ টেস্টিং-এ `TestClient` কীভাবে কাজ করে?**

> **উত্তর:** `TestClient` নির্মিত হয়েছে `HTTPX` (বা অভ্যন্তরীণভাবে `requests`) এর উপর। এটি কোনো বাস্তব পোর্ট (যেমন 8000) লিসেন না করেই FastAPI ASGI অ্যাপলিকেশনকে সরাসরি মেমোরিতে কল করে HTTP Request এবং Response সিমুলেট করে।

**প্রশ্ন ২: `app.dependency_overrides` কী এবং এটি কেন ব্যবহৃত হয়?**

> **উত্তর:** `app.dependency_overrides` হলো একটি Python dictionary যা FastAPI-র Dependency Injection সিস্টেমের মূল উপাদানগুলোকে টেস্টের সময় ওভাররাইড (প্রতিস্থাপন) করতে ব্যবহৃত হয়। উদাহরণস্বরূপ, রিয়েল Database session বা External Auth check এর বদলে Mock session বা Dummy Auth user ইনজেক্ট করতে এটি ব্যবহৃত হয়।

**প্রশ্ন ৩: `conftest.py` ফাইলের কাজ কী?**

> **উত্তর:** Pytest-এ `conftest.py` হলো একটি বিশেষ কনফিগারেশন ফাইল। এই ফাইলে সংজ্ঞায়িত `pytest.fixture` গুলো প্রজেক্টের যেকোনো টেস্ট ফাইল থেকে স্বয়ংক্রিয়ভাবে অ্যাক্সেস করা যায় (import করার প্রয়োজন হয় না)।

**প্রশ্ন ৪: Async Route টেস্টিং এর ক্ষেত্রে `httpx.AsyncClient` কেন দরকার?**

> **উত্তর:** `TestClient` সিঙ্ক্রোনাসভাবে কাজ করে। কিন্তু অ্যাপে যদি WebSockets, Server-Sent Events (SSE), অথবা অন্যান্য Asynchronous Non-blocking IO টেস্টিং করার প্রয়োজন হয়, তখন `httpx.AsyncClient` এবং `pytest-asyncio` ব্যবহার করে আসল Async ইভেন্ট লুপের মধ্যে টেস্ট চালানো হয়।

---

## Summary 📋

- ✅ **TestClient**: Starlette-এর Built-in টুল যা দিয়ে খুব সহজে HTTP endpoints টেস্ট করা যায়।
- ✅ **Pytest Fixture**: Reusable setup/teardown লজিক তৈরির জন্য ব্যবহৃত হয়।
- ✅ **Dependency Overrides**: Real DB বা Authentication-কে Mock করার জন্য `app.dependency_overrides` ব্যবহার করা হয়।
- ✅ **In-Memory Database**: SQLite `sqlite:///:memory:` ব্যবহার করে টেস্ট ডাটাবেজ আইসোলেটেড রাখা হয়।
- ✅ **Coverage Report**: `pytest --cov` দিয়ে কত শতাংশ কোড টেস্ট কাভার হয়েছে তা দেখা যায়।

---

## পরবর্তী ধাপ ➡️

Testing শেখা শেষ হলো। পরের টপিকে তোমরা শিখবে **Performance Optimization** — Asynchronous programming (`async/wait`), Background Tasks, Caching (Redis), Gunicorn + Uvicorn workers এবং Profiling।
