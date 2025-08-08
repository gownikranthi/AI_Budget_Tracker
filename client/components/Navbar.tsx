import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Expenses', href: '/expenses', icon: '💰' },
  { name: 'Analytics', href: '/analytics', icon: '📈' },
  { name: 'Categories', href: '/categories', icon: '🏷️' },
];

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/">
              <div className="flex-shrink-0 flex items-center cursor-pointer">
                <h1 className="text-xl font-bold text-gray-900">ExpenseTracker</h1>
              </div>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <div
                    className={cn(
                      'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer',
                      location === item.href && 'border-blue-500 text-blue-600'
                    )}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  'text-gray-500 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium cursor-pointer',
                  location === item.href
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent'
                )}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}