import type { ReactNode } from "react";

/** Line icons for the admin, drawn on a 24px grid and stroked in currentColor. */
function Icon({ children, className = "size-[18px]" }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

type P = { className?: string };

export const HomeIcon = (p: P) => <Icon {...p}><path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-4.5v-6h-5v6H5a1 1 0 01-1-1z" /></Icon>;
export const InboxIcon = (p: P) => <Icon {...p}><path d="M4 13l2.5-8h11L20 13v6a1 1 0 01-1 1H5a1 1 0 01-1-1z" /><path d="M4 13h4.5l1.5 2.5h4l1.5-2.5H20" /></Icon>;
export const BuildingIcon = (p: P) => <Icon {...p}><path d="M5 21V5a1 1 0 011-1h8a1 1 0 011 1v16M15 9h3a1 1 0 011 1v11M3 21h18M8.5 8h3M8.5 12h3M8.5 16h3" /></Icon>;
export const ListIcon = (p: P) => <Icon {...p}><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r="1" /><circle cx="4.5" cy="12" r="1" /><circle cx="4.5" cy="18" r="1" /></Icon>;
export const UsersIcon = (p: P) => <Icon {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5M16 4.8a3.5 3.5 0 010 6.4M18.5 14.8c1.6.8 2.7 2.6 3 5.2" /></Icon>;
export const UserIcon = (p: P) => <Icon {...p}><circle cx="12" cy="8" r="4" /><path d="M4.5 21c.7-4 3.6-6.5 7.5-6.5s6.8 2.5 7.5 6.5" /></Icon>;
export const MenuIcon = (p: P) => <Icon {...p}><path d="M4 6h16M4 12h16M4 18h16" /></Icon>;
export const CloseIcon = (p: P) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18" /></Icon>;
export const PlusIcon = (p: P) => <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>;
export const DownloadIcon = (p: P) => <Icon {...p}><path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" /></Icon>;
export const LogoutIcon = (p: P) => <Icon {...p}><path d="M15 4h3a1 1 0 011 1v14a1 1 0 01-1 1h-3M10 16l4-4-4-4M14 12H4" /></Icon>;
export const ExternalIcon = (p: P) => <Icon {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" /></Icon>;
export const ArrowLeftIcon = (p: P) => <Icon {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></Icon>;
export const ChevronRightIcon = (p: P) => <Icon {...p}><path d="M9 6l6 6-6 6" /></Icon>;
export const StoryIcon = (p: P) => <Icon {...p}><path d="M5 4h11l3 3v13H5z" /><path d="M8.5 10h7M8.5 13.5h7M8.5 17h4" /></Icon>;
export const MailIcon = (p: P) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3.5 6l8.5 7 8.5-7" /></Icon>;

/** Six dots: the drag handle. */
export function GripIcon({ className = "size-4" }: P) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={className} fill="currentColor">
      <circle cx="5.5" cy="3.5" r="1.25" /><circle cx="10.5" cy="3.5" r="1.25" />
      <circle cx="5.5" cy="8" r="1.25" /><circle cx="10.5" cy="8" r="1.25" />
      <circle cx="5.5" cy="12.5" r="1.25" /><circle cx="10.5" cy="12.5" r="1.25" />
    </svg>
  );
}
