export class RouteMatcher {
  static isActive(pathname: string, href: string | null = '/'): boolean {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href!);
  }
}
