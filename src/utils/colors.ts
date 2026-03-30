export function dbColor(db: number): string {
  if (db > -3)  return '#f38ba8'
  if (db > -12) return '#f9e2af'
  return '#a6e3a1'
}
