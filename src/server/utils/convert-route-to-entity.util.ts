const mapping: Record<string, string> = {
  organizations: 'organization',
  participations: 'participation',
  sessions: 'session',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
