---
title: Database with SQLAlchemy — FastAPI বাংলা গাইড
description: FastAPI-তে SQLAlchemy দিয়ে database setup, model definition, one-to-many relationship, get_db dependency, সম্পূর্ণ CRUD এবং Alembic migration — বাংলায়।
---

# Database with SQLAlchemy 🗄️

## SQLAlchemy কী? (What)

**SQLAlchemy** হলো Python-এর সবচেয়ে জনপ্রিয় ORM (Object-Relational Mapper)। ORM দিয়ে SQL লেখার বদলে Python class দিয়ে database table represent করা যায় এবং Python method দিয়ে query করা যায়।

**ORM মানে:** Database table = Python Class, Row = Object, Column = Attribute

```python
# ❌ Raw SQL — error prone, verbose
cursor.execute("INSERT INTO users (name, email) VALUES (?, ?)", (name, email))

# ✅ SQLAlchemy ORM — Pythonic, safe, readable
db_user = User(name=name, email=email)
db.add(db_user)
db.commit()
```

---

## কেন SQLAlchemy? (Why)

| বৈশিষ্ট্য | SQLAlchemy | Raw SQL | Django ORM |
|-----------|-----------|---------|-----------|
| **SQL Injection Protection** | ✅ Auto | ❌ Manual | ✅ Auto |
| **Migration** | ✅ Alembic | ❌ Manual | ✅ Built-in |
| **Multiple DB Support** | ✅ SQLite/PostgreSQL/MySQL | ⚠️ DB-specific | ✅ হ্যাঁ |
| **Async Support** | ✅ v1.4+ | ⚠️ Library | ⚠️ Limited |
| **Relationship** | ✅ Easy | ❌ Manual joins | ✅ Easy |
| **FastAPI Integration** | ✅ Perfect | ❌ | ❌ (Django-only) |

---

## Database Architecture Diagram

```mermaid
graph TD
    FastAPI["🚀 FastAPI Endpoint"]
    Dep["💉 Depends(get_db)\nDB Session inject"]
    Session["🔗 SQLAlchemy Session\n(SessionLocal)"]
    ORM["📦 ORM Models\nUser, Post, Comment"]
    Engine["⚙️ SQLAlchemy Engine\nConnection Pool"]
    DB["🗄️ Database\nSQLite / PostgreSQL / MySQL"]

    FastAPI --> Dep
    Dep --> Session
    Session --> ORM
    ORM --> Engine
    Engine --> DB

    style DB fill:#fff3e0
    style Engine fill:#e8f5e9
    style Session fill:#e3f2fd
```

---

## Installation

```bash
# SQLAlchemy (সব DB-র জন্য)
pip install sqlalchemy

# Database drivers
pip install psycopg2-binary    # PostgreSQL
pip install pymysql            # MySQL
pip install aiosqlite          # Async SQLite

# Migration tool
pip install alembic
```

---

## Project Structure

```
blog_api/
├── main.py
├── database.py         ← Engine, SessionLocal, Base
├── models.py           ← SQLAlchemy ORM models
├── schemas.py          ← Pydantic request/response models
├── crud.py             ← Database operations (CRUD)
├── deps.py             ← get_db dependency
└── routers/
    ├── users.py
    └── posts.py
```

---

## ১. Database Setup (database.py)

```python
# database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# ===== Database URL =====
# SQLite — Development (ফাইল-ভিত্তিক, install লাগে না)
DATABASE_URL = "sqlite:///./blog.db"

# PostgreSQL — Production
# DATABASE_URL = "postgresql://user:password@localhost:5432/blog_db"
# উদাহরণ: "postgresql://postgres:secret@localhost:5432/myapp"

# MySQL — Alternative
# DATABASE_URL = "mysql+pymysql://root:password@localhost:3306/blog_db"

# Environment variable থেকে নাও (recommended)
# DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./blog.db")

# ===== Engine তৈরি =====
engine = create_engine(
    DATABASE_URL,
    # SQLite-এর জন্য এই argument লাগে (thread safety)
    # PostgreSQL/MySQL-এ এটি দেওয়া যাবে না
    connect_args={"check_same_thread": False},

    # Connection Pool Settings (PostgreSQL/MySQL-এর জন্য)
    # pool_size=5,           # একসাথে ৫টি connection রাখো
    # max_overflow=10,       # Extra ১০টি connection allow
    # pool_pre_ping=True,    # Connection alive কিনা check করো

    echo=False   # True দিলে সব SQL query print হবে (debugging)
)

# ===== Session Factory =====
SessionLocal = sessionmaker(
    autocommit=False,   # Manually commit করতে হবে
    autoflush=False,    # Manually flush করতে হবে
    bind=engine         # এই engine use করবে
)

# ===== Base Class =====
# সব ORM model এই Base থেকে inherit করবে
Base = declarative_base()
```

---

## ২. ORM Models (models.py)

```python
# models.py
from sqlalchemy import (
    Column, Integer, String, Boolean, Float, Text,
    ForeignKey, DateTime, Enum as SAEnum
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base
import enum

# ===== Enum Type =====
class UserRole(str, enum.Enum):
    user = "user"
    admin = "admin"
    moderator = "moderator"

# ===== User Model =====
class User(Base):
    __tablename__ = "users"   # Database-এ table নাম

    # Primary Key
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    # String columns
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    full_name = Column(String(100), nullable=True)
    hashed_password = Column(String(255), nullable=False)

    # Enum column
    role = Column(SAEnum(UserRole), default=UserRole.user, nullable=False)

    # Boolean columns
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)

    # Timestamp columns (auto-set)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # ===== Relationships =====
    # One-to-Many: একজন User অনেক Post করতে পারে
    posts = relationship("Post", back_populates="author", cascade="all, delete-orphan")
    # cascade="all, delete-orphan" → User delete হলে তার সব Post-ও delete হবে

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"


# ===== Category Model =====
class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    slug = Column(String(100), unique=True, nullable=False)
    description = Column(Text, nullable=True)

    # One-to-Many: একটি Category-তে অনেক Post থাকতে পারে
    posts = relationship("Post", back_populates="category")

    def __repr__(self):
        return f"<Category(name='{self.name}')>"


# ===== Post Model =====
class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False, index=True)
    content = Column(Text, nullable=False)
    excerpt = Column(String(500), nullable=True)   # সংক্ষিপ্ত বিবরণ
    is_published = Column(Boolean, default=False)
    view_count = Column(Integer, default=0)
    read_time_minutes = Column(Integer, default=1)

    # ===== Foreign Keys =====
    # Many-to-One: অনেক Post → একজন User
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    # Many-to-One: অনেক Post → একটি Category
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    published_at = Column(DateTime(timezone=True), nullable=True)

    # ===== Relationships =====
    # Back reference to User
    author = relationship("User", back_populates="posts")
    # Back reference to Category
    category = relationship("Category", back_populates="posts")
    # One-to-Many: একটি Post-এ অনেক Comment
    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Post(id={self.id}, title='{self.title[:30]}')>"


# ===== Comment Model =====
class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    is_approved = Column(Boolean, default=False)

    # Foreign Keys
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    post = relationship("Post", back_populates="comments")
    author = relationship("User")
```

---

## ৩. Pydantic Schemas (schemas.py)

```python
# schemas.py
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

# ===== User Schemas =====
class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    email: str
    password: str = Field(min_length=8)
    full_name: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    full_name: Optional[str] = None
    is_active: bool
    role: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True   # ORM object → Pydantic convert

class UserWithPosts(UserResponse):
    """User + তার posts সহ"""
    posts: List["PostResponse"] = []

# ===== Category Schemas =====
class CategoryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    slug: str = Field(min_length=2, max_length=100, pattern=r"^[a-z0-9-]+$")
    description: Optional[str] = None

class CategoryResponse(BaseModel):
    id: int
    name: str
    slug: str
    description: Optional[str] = None

    class Config:
        from_attributes = True

# ===== Post Schemas =====
class PostCreate(BaseModel):
    title: str = Field(min_length=5, max_length=200)
    content: str = Field(min_length=10)
    excerpt: Optional[str] = Field(default=None, max_length=500)
    is_published: bool = False
    category_id: Optional[int] = None

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    is_published: Optional[bool] = None
    category_id: Optional[int] = None

class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    excerpt: Optional[str] = None
    is_published: bool
    view_count: int
    author_id: int
    category_id: Optional[int] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Forward reference resolve করো
UserWithPosts.model_rebuild()
```

---

## ৪. Database Dependency (deps.py)

```python
# deps.py
from database import SessionLocal
from sqlalchemy.orm import Session
from typing import Generator

def get_db() -> Generator:
    """
    Database session dependency।

    প্রতিটি request-এ:
    1. নতুন session তৈরি হয়
    2. yield দিয়ে endpoint-এ inject হয়
    3. Request শেষে finally-তে session close হয়

    এটি connection leak prevent করে।
    """
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        db.rollback()   # Error হলে rollback — data inconsistency এড়াতে
        raise e
    finally:
        db.close()      # সবসময় close করো
```

---

## ৫. CRUD Operations (crud.py)

```python
# crud.py — সব database operations এখানে থাকবে
from sqlalchemy.orm import Session
from sqlalchemy import desc, asc, or_
from typing import List, Optional
import models
import schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ========== USER CRUD ==========

def create_user(db: Session, user_data: schemas.UserCreate) -> models.User:
    """নতুন user তৈরি করো"""
    hashed_password = pwd_context.hash(user_data.password)

    db_user = models.User(
        username=user_data.username,
        email=user_data.email,
        full_name=user_data.full_name,
        hashed_password=hashed_password
    )
    db.add(db_user)       # Session-এ add করো (DB-তে এখনো নেই)
    db.commit()           # SQL INSERT চালাও
    db.refresh(db_user)   # DB-generated fields নাও (id, created_at)
    return db_user

def get_user(db: Session, user_id: int) -> Optional[models.User]:
    """ID দিয়ে user খোঁজো"""
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    """Email দিয়ে user খোঁজো"""
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str) -> Optional[models.User]:
    """Username দিয়ে user খোঁজো"""
    return db.query(models.User).filter(models.User.username == username).first()

def get_users(
    db: Session,
    skip: int = 0,
    limit: int = 10,
    is_active: Optional[bool] = None,
    search: Optional[str] = None
) -> List[models.User]:
    """সব user পাও — filtering ও pagination সহ"""
    query = db.query(models.User)

    if is_active is not None:
        query = query.filter(models.User.is_active == is_active)

    if search:
        query = query.filter(
            or_(
                models.User.username.contains(search),
                models.User.email.contains(search),
                models.User.full_name.contains(search)
            )
        )

    return query.order_by(desc(models.User.created_at)).offset(skip).limit(limit).all()

def update_user(db: Session, user_id: int, update_data: dict) -> Optional[models.User]:
    """User আপডেট করো"""
    db_user = get_user(db, user_id)
    if not db_user:
        return None

    for field, value in update_data.items():
        if hasattr(db_user, field) and value is not None:
            setattr(db_user, field, value)

    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int) -> bool:
    """User মুছে ফেলো"""
    db_user = get_user(db, user_id)
    if not db_user:
        return False

    db.delete(db_user)   # cascade="all, delete-orphan" → posts-ও delete হবে
    db.commit()
    return True

# ========== POST CRUD ==========

def create_post(
    db: Session,
    post_data: schemas.PostCreate,
    author_id: int
) -> models.Post:
    """নতুন post তৈরি করো"""
    db_post = models.Post(
        **post_data.model_dump(),
        author_id=author_id
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def get_post(db: Session, post_id: int) -> Optional[models.Post]:
    """ID দিয়ে post খোঁজো"""
    return db.query(models.Post).filter(models.Post.id == post_id).first()

def get_posts(
    db: Session,
    skip: int = 0,
    limit: int = 10,
    published_only: bool = True,
    author_id: Optional[int] = None,
    category_id: Optional[int] = None,
    search: Optional[str] = None,
    sort_by: str = "created_at",
    order: str = "desc"
) -> List[models.Post]:
    """সব post পাও — filtering, search, sorting, pagination"""
    query = db.query(models.Post)

    if published_only:
        query = query.filter(models.Post.is_published == True)

    if author_id:
        query = query.filter(models.Post.author_id == author_id)

    if category_id:
        query = query.filter(models.Post.category_id == category_id)

    if search:
        query = query.filter(
            or_(
                models.Post.title.contains(search),
                models.Post.content.contains(search)
            )
        )

    # Sorting
    sort_column = getattr(models.Post, sort_by, models.Post.created_at)
    if order == "desc":
        query = query.order_by(desc(sort_column))
    else:
        query = query.order_by(asc(sort_column))

    return query.offset(skip).limit(limit).all()

def update_post(
    db: Session,
    post_id: int,
    update_data: schemas.PostUpdate
) -> Optional[models.Post]:
    """Post আপডেট করো"""
    db_post = get_post(db, post_id)
    if not db_post:
        return None

    update_dict = update_data.model_dump(exclude_none=True)
    for field, value in update_dict.items():
        setattr(db_post, field, value)

    db.commit()
    db.refresh(db_post)
    return db_post

def delete_post(db: Session, post_id: int) -> bool:
    """Post মুছে ফেলো"""
    db_post = get_post(db, post_id)
    if not db_post:
        return False
    db.delete(db_post)
    db.commit()
    return True

def increment_view_count(db: Session, post_id: int) -> None:
    """Post view count বাড়াও"""
    db.query(models.Post).filter(
        models.Post.id == post_id
    ).update({"view_count": models.Post.view_count + 1})
    db.commit()
```

---

## ৬. API Endpoints (routers/users.py)

```python
# routers/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

import crud, schemas
from deps import get_db
from core.deps import get_active_user, get_admin_user

router = APIRouter(prefix="/users", tags=["Users 👤"])

@router.post("/", response_model=schemas.UserResponse, status_code=201,
             summary="নতুন User তৈরি করো")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Registration endpoint"""
    # Duplicate check
    if crud.get_user_by_email(db, user.email):
        raise HTTPException(status_code=409, detail="Email ইতিমধ্যে registered")
    if crud.get_user_by_username(db, user.username):
        raise HTTPException(status_code=409, detail="Username ইতিমধ্যে নেওয়া হয়েছে")

    return crud.create_user(db, user)

@router.get("/", response_model=List[schemas.UserResponse],
            summary="সব User এর তালিকা")
def list_users(
    skip: int = 0,
    limit: int = 10,
    search: Optional[str] = None,
    is_active: Optional[bool] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_admin_user)  # Admin only
):
    """সব user — Admin only"""
    users = crud.get_users(db, skip=skip, limit=limit, search=search, is_active=is_active)
    return users

@router.get("/{user_id}", response_model=schemas.UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """নির্দিষ্ট user এর তথ্য"""
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User পাওয়া যায়নি")
    return user

@router.delete("/{user_id}", status_code=204)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_admin_user)
):
    """User মুছে ফেলো — Admin only"""
    success = crud.delete_user(db, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User পাওয়া যায়নি")
```

---

## ৭. App Startup — Tables তৈরি (main.py)

```python
# main.py
from fastapi import FastAPI
from database import engine, Base
import models   # সব models import করো — তাহলে Base.metadata-তে register হবে

app = FastAPI(title="Blog API 📝")

# ===== Startup Event — Tables তৈরি =====
@app.on_event("startup")
def startup_event():
    """App শুরু হলে database tables তৈরি করো"""
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables তৈরি হয়েছে")

# অথবা lifespan ব্যবহার করো (newer approach)
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    Base.metadata.create_all(bind=engine)
    print("✅ Database ready")
    yield
    # Shutdown (cleanup)
    print("🔴 App shutting down")

app = FastAPI(title="Blog API 📝", lifespan=lifespan)

from routers import users, posts
app.include_router(users.router)
app.include_router(posts.router)
```

---

## Alembic — Database Migration

```bash
# ===== Alembic Setup =====
pip install alembic
alembic init alembic          # alembic/ folder তৈরি হবে

# alembic/env.py-তে এই lines যোগ করো:
# from database import Base
# target_metadata = Base.metadata

# ===== Migration তৈরি করো =====
# Model পরিবর্তন করার পর:
alembic revision --autogenerate -m "create users and posts tables"

# ===== Migration apply করো =====
alembic upgrade head           # সব pending migration apply করো
alembic downgrade -1           # একটি migration undo করো
alembic history                # সব migration দেখো
alembic current                # বর্তমান migration version
```

::: tip Alembic vs create_all()
- `Base.metadata.create_all()` → Development-এ ঠিক আছে, কিন্তু existing table পরিবর্তন করতে পারে না
- `Alembic` → Production-এ ব্যবহার করো — incremental changes track করে, rollback করা যায়
:::

---

## Common Mistakes ⚠️

::: danger ভুল ১: Session close না করা
```python
# ❌ ভুল — Session কখনো close হবে না → Connection pool শেষ হয়ে যাবে
@app.get("/users/")
def list_users():
    db = SessionLocal()
    users = db.query(User).all()
    return users   # db.close() কখনো হলো না!

# ✅ সঠিক — Dependency দিয়ে automatic cleanup
@app.get("/users/")
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()
    # get_db() এর finally block-এ db.close() call হবে
```
:::

::: danger ভুল ২: Commit ছাড়া data save ভাবা
```python
# ❌ ভুল — db.add() করেছে কিন্তু commit নেই
def create_user(db: Session, user_data):
    db_user = User(username=user_data.username)
    db.add(db_user)
    # db.commit() ← ভুলে গেছে!
    return db_user   # id = None, created_at = None (DB-তে নেই!)

# ✅ সঠিক
def create_user(db: Session, user_data):
    db_user = User(username=user_data.username)
    db.add(db_user)
    db.commit()         # ← DB-তে save হলো
    db.refresh(db_user) # ← id, created_at DB থেকে নাও
    return db_user
```
:::

::: warning ভুল ৩: N+1 Query Problem
```python
# ❌ ভুল — N+1 query problem
posts = db.query(Post).all()    # 1 query
for post in posts:
    print(post.author.username)  # প্রতিটি post-এ আলাদা query! 100 posts = 101 queries

# ✅ সঠিক — JOIN দিয়ে eager loading
from sqlalchemy.orm import joinedload
posts = db.query(Post).options(joinedload(Post.author)).all()  # 1 query (JOIN)
for post in posts:
    print(post.author.username)  # No extra query!
```
:::

::: warning ভুল ৪: models import না করে create_all() চালানো
```python
# ❌ ভুল — models import না করলে Base.metadata-তে নেই
from database import engine, Base
Base.metadata.create_all(bind=engine)   # কোনো table তৈরি হবে না!

# ✅ সঠিক — সব models import করো
from database import engine, Base
import models   # ← এটি import করলে User, Post, Comment সব register হবে
Base.metadata.create_all(bind=engine)   # এখন সব table তৈরি হবে
```
:::

---

## Best Practices ✨

- **`get_db()` dependency সবসময় ব্যবহার করো** — Session manually manage করো না
- **CRUD functions আলাদা ফাইলে রাখো** — `crud.py` — endpoint-এ logic লিখবে না
- **`db.refresh(obj)` দাও commit-এর পরে** — DB-generated fields (id, created_at) পেতে
- **N+1 query এড়াতে `joinedload` বা `selectinload` ব্যবহার করো**
- **Production-এ Alembic ব্যবহার করো** — `create_all()` production-এ dangerous
- **`echo=True` শুধু debugging-এ** — সব SQL query print হয়, production-এ False রাখো
- **Connection pool সঠিকভাবে configure করো** — `pool_size`, `max_overflow` দাও
- **Database URL-কে `.env`-এ রাখো** — credentials কখনো code-এ না

---

## Interview Questions 🎯

**প্রশ্ন ১: SQLAlchemy-তে `Session` এবং `Engine` এর পার্থক্য কী?**

> **উত্তর:** `Engine` হলো database connection pool — একবার তৈরি হয়, app-এর সারাজীবন থাকে। `Session` হলো একটি unit of work — প্রতিটি request-এর জন্য আলাদা session তৈরি হয়। Session দিয়ে query করা হয়, commit/rollback করা হয়। Session শেষে close করতে হয়।

**প্রশ্ন ২: `db.add()`, `db.commit()`, `db.refresh()` এর পার্থক্য কী?**

> **উত্তর:** `db.add(obj)` → object-কে session-এ track করে (DB-তে এখনো নেই)। `db.commit()` → SQL INSERT/UPDATE/DELETE execute করে, transaction commit করে। `db.refresh(obj)` → DB থেকে fresh data নিয়ে object update করে — commit-এর পরে `id`, `created_at` পেতে এটি দরকার।

**প্রশ্ন ৩: N+1 Query Problem কী এবং কিভাবে সমাধান করবো?**

> **উত্তর:** ১টি query দিয়ে N টি record আনার পর প্রতিটি record-এর related data আনতে N টি আলাদা query হলে N+1 problem। যেমন ১০০ post আনার পর প্রতিটির author আনতে ১০০টি query → মোট ১০১ query। সমাধান: `joinedload()` বা `selectinload()` দিয়ে eager loading — একটি JOIN query-তে সব আনা।

**প্রশ্ন ৪: Alembic এবং `Base.metadata.create_all()` এর মধ্যে কোনটা কখন ব্যবহার করবো?**

> **উত্তর:** `create_all()` শুধু নতুন table তৈরি করে — existing table-এ column add/remove করতে পারে না। Development শুরুতে ব্যবহার করা যায়। Production-এ Alembic ব্যবহার করো — প্রতিটি schema change track করে, incremental migration file তৈরি করে, rollback করা যায়, team collaboration সহজ হয়।

---

## Summary 📋

- ✅ `database.py` → `engine`, `SessionLocal`, `Base` — তিনটি অবশ্যই লাগবে
- ✅ `models.py` → `Base` থেকে inherit, `Column`, `relationship` দিয়ে table define
- ✅ `ForeignKey("users.id")` + `relationship()` → one-to-many সম্পর্ক
- ✅ `schemas.py` → Pydantic models — Create/Response/Update আলাদা
- ✅ `get_db()` → yield dependency — auto session open/close
- ✅ `crud.py` → সব DB operations আলাদা — endpoint-এ শুধু business logic
- ✅ `db.add() → db.commit() → db.refresh()` — create করার তিন ধাপ
- ✅ `joinedload()` → N+1 problem avoid করতে
- ✅ Production-এ Alembic — `create_all()` নয়
- ✅ DATABASE_URL → `.env` ফাইলে

---

## পরবর্তী ধাপ ➡️

Database শেখা হলো। এখন **Middlewares** শিখবে — CORSMiddleware, custom middleware, request/response logging, GZipMiddleware এবং TrustedHostMiddleware কিভাবে FastAPI-তে ব্যবহার করতে হয়।
