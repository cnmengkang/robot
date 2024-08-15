// currentTime.ts

export function getCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0'); // 获取小时，并确保两位数
  const minutes = now.getMinutes().toString().padStart(2, '0'); // 获取分钟，并确保两位数
  return `${hours}:${minutes}`;
}
export function getCurrentDateTime(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${date} ${hours}:${minutes}`;
}
