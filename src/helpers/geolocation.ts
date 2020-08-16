/**
 * Transform degree to radian
 *
 * @param {number} deg
 * @return {number}
 */
export function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Calculate distance between two points on GPS Map
 *
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @return {number}
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R: number = 6371; // Radius of the earth in km
  const dLat: number = deg2rad(lat2 - lat1); // deg2rad below
  const dLon: number = deg2rad(lon2 - lon1);
  const a: number =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default {
  calculateDistance,
  deg2rad,
};
