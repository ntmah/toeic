"""
auth.py – JWT authentication thay thế Supabase Auth.

Flow:
  POST /api/auth/register  →  tạo user trong MongoDB, trả JWT
  POST /api/auth/login     →  verify password, trả JWT
  Header: Authorization: Bearer <token>  →  get_current_user()
"""

import os
from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import Depends, HTTPException, Header
from jose import JWTError, jwt
from passlib.context import CryptContext

from database import users_col

SECRET     = os.getenv("JWT_SECRET", "change_me_in_production")
ALGORITHM  = os.getenv("JWT_ALGORITHM", "HS256")
EXPIRE_MIN = int(os.getenv("JWT_EXPIRE_MINUTES", "10080"))   # 7 ngày

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(plain: str) -> str:
    return pwd_ctx.hash(plain)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_ctx.verify(plain, hashed)

def create_token(user_id: str) -> str:
    exp = datetime.now(timezone.utc) + timedelta(minutes=EXPIRE_MIN)
    return jwt.encode({"sub": user_id, "exp": exp}, SECRET, algorithm=ALGORITHM)

def decode_token(token: str) -> Optional[str]:
    try:
        return jwt.decode(token, SECRET, algorithms=[ALGORITHM]).get("sub")
    except JWTError:
        return None


# ── FastAPI dependencies ──────────────────────────────────────────
async def get_current_user(authorization: str = Header(None)) -> Optional[dict]:
    """Trả user dict nếu token hợp lệ, None nếu không có / sai token."""
    if not authorization or not authorization.startswith("Bearer "):
        return None
    user_id = decode_token(authorization.split(" ", 1)[1])
    if not user_id:
        return None
    return await users_col().find_one({"_id": user_id}, {"password": 0})

async def require_user(user=Depends(get_current_user)):
    if not user:
        raise HTTPException(status_code=401, detail="Chưa đăng nhập")
    return user
