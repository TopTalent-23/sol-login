// src/utils/logout.ts
import Cookies from 'js-cookie';

export function logout() {
  Cookies.remove('telegram-auth-storage', { path: '/' });
  window.location.href = '/login';
}
