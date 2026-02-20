import {
  Camera,
  Plane,
  Video,
  Users,
  Crown,
  Package,
  PartyPopper,
  User,
  MapPin,
  Clock,
  Award,
  Image,
} from 'lucide-react'

export const ICON_MAP = {
  Camera,
  Plane,
  Video,
  Users,
  Crown,
  Package,
  PartyPopper,
  User,
  MapPin,
  Clock,
  Award,
  Image,
}

export const ICON_OPTIONS = Object.keys(ICON_MAP)

export function getIcon(name) {
  return ICON_MAP[name] || Camera
}
