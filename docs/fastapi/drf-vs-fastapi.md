---
title: DRF to FastAPI Guide — Django REST Framework ডেভেলপারদের জন্য FastAPI নির্দেশিকা
description: Django REST Framework (DRF) ডেভেলপারদের জন্য FastAPI শেখার সহজ গাইড। Serializer vs Pydantic, Views vs APIRouter, Auth, ORM সহ সব কনসেপ্টের তুলনা।
---

# DRF Developers-এর জন্য FastAPI নির্দেশিকা (DRF to FastAPI Guide) 🔄

আপনি যদি ইতিমধ্যে **Django REST Framework (DRF)** ডেভেলপার হয়ে থাকেন, তবে FastAPI শেখা আপনার জন্য অত্যন্ত সহজ ও আনন্দদায়ক হবে। কারণ উভয় ফ্রেমওয়ার্কের মূল বিল্ডিং ব্লক এবং স্থাপত্য পদ্ধতি (Architectural Patterns) একই—কেবল কাজের নাম, ডিজাইন প্যাটার্ন এবং কোড লেখার ধরন (Syntax) ভিন্ন।

এই গাইডটিতে DRF-এর প্রতিটি কনসেপ্টের সাথে FastAPI-এর সরাসরি তুলনা (Dot-to-Dot Connection) এবং সাইড-বাই-সাইড কোড উদাহরণ দিয়ে ব্যাখ্যা করা হলো।

---

## 📊 DRF 🆚 FastAPI তুলনামূলক সামারি (Mapping Summary)

| DRF Concept | FastAPI Equivalent | মূল দায়িত্ব (What it does) |
| :--- | :--- | :--- |
| **`serializers.Serializer` / `ModelSerializer`** | **`pydantic.BaseModel`** | ডেটা ভ্যালিডেশন, পার্সিং ও সিরিয়ালাইজেশন |
| **`urls.py` + `views.py`** | **`APIRouter` & Path Operations (`@app.get()`)** | রাউটিং ও HTTP রিকোয়েস্ট হ্যান্ডলিং |
| **`APIView` / `ModelViewSet`** | **Path Operation Functions (`def` / `async def`)** | এন্ডপয়েন্ট প্রসেসিং লজিক |
| **`request.data` / `request.query_params`** | **Function Parameters + Pydantic / `Query()`** | ইনপুট ডেটা পার্সিং (Body, Query, Path) |
| **`permission_classes` / `authentication_classes`** | **`Depends()` (Dependency Injection)** | রিকোয়েস্টের পূর্বে Auth ও Permission চেক করা |
| **Django ORM (`models.Model`)** | **SQLAlchemy 2.0 / SQLModel / Tortoise ORM** | ডাটাবেজ মডেলিং ও ক্যোয়ারি |
| **`settings.py`** | **`pydantic-settings` (`BaseSettings`)** | এনভায়রনমেন্ট কনফিগ ও অ্যাপ সেটিংস |
| **`MIDDLEWARE` in `settings.py`** | **Starlette Middleware (`@app.middleware("http")`)** | গ্লোবাল রিকোয়েস্ট/রেসপন্স ইন্টারসেপ্টর |
| **`drf-spectacular` / `drf-yasg`** | **Built-in Swagger UI (`/docs`) & ReDoc** | অটোমেটিক OpenAPI জেনারেশন |
| **Celery Tasks** | **`BackgroundTasks` (Built-in) / Celery** | ব্যাকগ্রাউন্ড টাস্ক রান করা |

---

## 1. Data Validation & Serialization: Serializer 🆚 Pydantic

DRF-এ ডেটা ভ্যালিডেশন, পার্সিং এবং JSON আউটপুট তৈরি করতে `Serializer` বা `ModelSerializer` ব্যবহার করা হয়। FastAPI-তে ঠিক একই কাজ **Pydantic Model (`BaseModel`)** দ্বারা সম্পাদিত হয়।

### 🔴 DRF-এ Serializer:
```python
# serializers.py
from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    age = serializers.IntegerField(min_value=18)

    def validate_name(self, value):
        if "admin" in value.lower():
            raise serializers.ValidationError("Name cannot be admin")
        return value
```

### 🟢 FastAPI-তে Pydantic Model:
```python
# schemas.py
from pydantic import BaseModel, EmailStr, Field, field_validator

class UserSchema(BaseModel):
    name: str = Field(..., max_length=100)
    email: EmailStr
    age: int = Field(..., ge=18)

    @field_validator('name')
    def validate_name(cls, value: str) -> str:
        if "admin" in value.lower():
            raise ValueError("Name cannot be admin")
        return value
```

> 💡 **মূল পার্থক্য:** 
> - DRF Serializer-এ `.is_valid()` এবং `.save()` ম্যানুয়ালি কল করতে হয়।
> - FastAPI-তে Pydantic Model টাইপ হিসেবে মেথডের আর্গুমেন্টে দিলে FastAPI **অটোমেটিক ভ্যালিডেশন** সম্পন্ন করে এবং ইনভ্যালিড ডেটাতে `422 Unprocessable Entity` এরর রিটার্ন করে।

---

## 2. Views & Routing: `urls.py` + `APIView` 🆚 `APIRouter`

DRF-এ URL রাউটিং (`urls.py`) এবং Business Logic (`views.py`) আলাদা ফাইলে থাকে। FastAPI-তে আপনি ফংশনাল স্টাইলে Decorator ব্যবহার করতে পারেন, অথবা বড় প্রজেক্টে **`APIRouter`** দিয়ে সুন্দরভাবে রাউট ভাগ করতে পারেন।

### 🔴 DRF (Views + URLs):
```python
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response

class UserDetailView(APIView):
    def get(self, request, user_id):
        search = request.query_params.get('search', '')
        return Response({"user_id": user_id, "search": search})

# urls.py
from django.urls import path
from .views import UserDetailView

urlpatterns = [
    path('users/<int:user_id>/', UserDetailView.as_view()),
]
```

### 🟢 FastAPI (APIRouter):
```python
# routers/users.py
from fastapi import APIRouter
from typing import Optional

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/{user_id}")
def get_user_detail(user_id: int, search: Optional[str] = None):
    # user_id -> Path parameter (URL Path-এ আছে)
    # search -> Query parameter (URL Path-এ নেই)
    return {"user_id": user_id, "search": search}
```

---

## 3. Auth & Permissions: `permission_classes` 🆚 `Depends()`

DRF-এ ভিউ ক্লাসে `permission_classes = [IsAuthenticated]` ব্যবহার করা হয়। FastAPI-তে কোনো প্লাগিন ভিত্তিক পারমিশন ক্লাসের বদলে শক্তিশালী **Dependency Injection System (`Depends`)** দিয়ে তৈরি করা হয়।

### 🔴 DRF (Permission Classes):
```python
# views.py
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"username": request.user.username})
```

### 🟢 FastAPI (Dependency Injection `Depends`):
```python
# dependencies.py & routers/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# 1. Dependency Function (Auth Check & User Extraction)
def get_current_user(token: str = Depends(oauth2_scheme)):
    user = verify_token_and_get_user(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    return user

router = APIRouter()

# 2. Endpoint using Dependency
@router.get("/profile")
def get_profile(current_user: User = Depends(get_current_user)):
    return {"username": current_user.username}
```

---

## 4. Database & ORM: Django ORM 🆚 SQLAlchemy / SQLModel

Django REST Framework-এর বড় শক্তি হলো Built-in Django ORM (`models.Model`) এবং Migration Tool (`makemigrations` / `migrate`)। 

FastAPI হলো **ORM-Agnostic** (এতে নিজস্ব কোনো ORM নেই)। আপনি আপনার পছন্দের যেকোনো ORM বা ডাটাবেজ ড্রাইভার ব্যবহার করতে পারেন।

### FastAPI-তে ব্যবহৃত জনপ্রিয় ORM সমূহ:
1. **SQLAlchemy 2.0 + Alembic:** সবচেয়ে পপুলার ও প্রোডাকশন-রেডি কম্বিনেশন (Alembic দিয়ে ডাটাবেজ মাইগ্রেশন হ্যান্ডেল করা হয়)।
2. **SQLModel:** FastAPI সৃষ্টিকর্তা *Tiangolo*-র তৈরি ORM, যা Pydantic Model এবং SQLAlchemy Table-কে একসূত্রে বাঁধে।
3. **Tortoise ORM:** Django ORM-এর মতো সহজ এবং পরিচিত স্যান্ট্যাক্স বিশিষ্ট Async ORM।

### Django ORM 🆚 SQLAlchemy 2.0 ক্যোয়ারি তুলনা:

```python
# 🔴 Django ORM Query
active_users = User.objects.filter(is_active=True).select_related('profile')

# 🟢 SQLAlchemy 2.0 Query (FastAPI)
from sqlalchemy import select
from sqlalchemy.orm import joinedload

stmt = select(User).options(joinedload(User.profile)).where(User.is_active == True)
active_users = db.scalars(stmt).all()
```

---

## 5. Request Data Parsing: `request.data` 🆚 Automatic Injections

DRF-এ রিকোয়েস্ট বডি পেতে `request.data` এবং কুয়েরি প্যারামিটার পেতে `request.query_params` কল করতে হয়। FastAPI-তে প্যারামিটারের টাইপ এবং সংজ্ঞার ওপর ভিত্তি করে **স্বয়ংক্রিয় ইনজেকশন** ঘটে।

```python
@app.post("/items/{item_id}")
def update_item(
    item_id: int,                   # Path Parameter (কারণ URL-এ আছে)
    q: Optional[str] = None,        # Query Parameter (কারণ URL-এ নেই, primitive type)
    item: ItemSchema = Body(...)    # Request Body (কারণ Pydantic Model)
):
    return {"item_id": item_id, "q": q, "item": item}
```

---

## 6. Background Tasks: Celery 🆚 Built-in `BackgroundTasks`

DRF-এ ছোট ব্যাকগ্রাউন্ড কাজের জন্যও (যেমন ইমেইল পাঠানো বা লগ ফাইলে লেখা) Celery worker + Redis/RabbitMQ কন্টেইনার প্রয়োজন হয়। FastAPI-তে হালকা টাস্কের জন্য Built-in **`BackgroundTasks`** ইনজেকশন ফিচার দেওয়া থাকে।

```python
from fastapi import APIRouter, BackgroundTasks

router = APIRouter()

def send_welcome_email(email: str):
    # Simulating email sending logic
    print(f"Sending email to {email}...")

@router.post("/register")
def register_user(user: UserSchema, background_tasks: BackgroundTasks):
    # DB Save User Logic...
    
    # Non-blocking background task added
    background_tasks.add_task(send_welcome_email, user.email)
    
    return {"message": "User registered successfully! Email will be sent in background."}
```

---

## 🧠 DRF ডেভেলপারদের জন্য মাইন্ডসেট শিফট (Core Mindset Shift)

| বিষয় | Django REST Framework (DRF) | FastAPI |
| :--- | :--- | :--- |
| **আর্কিটেকচার** | Monolithic "Batteries-Included" | Modular Micro-Framework |
| **সিস্টেম মোড** | Sync by default (WSGI) | Native Async/Await (ASGI) |
| **টাইপ সিস্টেম** | DRF Custom Fields | Native Python Type Hints + Pydantic |
| **ডকুমেন্টেশন** | `drf-spectacular` দিয়ে সেটআপ করতে হয় | `/docs` এবং `/redoc` এ Built-in |
| **লার্নিং কার্ভ** | ফ্রেমওয়ার্ক কনভেনশন বেশি মনে রাখতে হয় | স্ট্যান্ডার্ড পাইথন টাইপিং জানা থাকলেই যথেষ্ট |

---

## 🎯 কখন কোনটি বেছে নেবেন?

- **Django REST Framework (DRF) বেছে নেবেন যখন:** আপনার প্রজেক্টে Built-in Admin Panel, ডিফল্ট User Model, সেশন বেসড ওয়েব পেইজ এবং বিশাল একটি অল-ইন-ওয়ান ইকোসিস্টেম দরকার।
- **FastAPI বেছে নেবেন যখন:** আপনার প্রয়োজন উচ্চ পারফরম্যান্স (High Throughput/Low Latency), Microservices Architecture, AI/ML Model Deployment, Native Async Processing এবং অটোমেটিক Interactive API Documentation।
