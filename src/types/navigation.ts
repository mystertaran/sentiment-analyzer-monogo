export type Route = 'analyzer' | 'about';

export interface NavigationItem {
  id: Route;
  label: string;
  icon: React.ReactNode;
}
