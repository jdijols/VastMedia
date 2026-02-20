import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Globe,
} from 'lucide-react'

export const SOCIAL_PLATFORMS = [
  { key: 'facebook', label: 'Facebook', icon: Facebook },
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'x', label: 'X (Twitter)', icon: Twitter },
  { key: 'tiktok', label: 'TikTok', icon: Globe },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { key: 'youtube', label: 'YouTube', icon: Youtube },
  { key: 'snapchat', label: 'Snapchat', icon: Globe },
  { key: 'other', label: 'Other', icon: Globe },
]

const iconMap = Object.fromEntries(
  SOCIAL_PLATFORMS.map((p) => [p.key, p.icon])
)

export function getSocialIcon(platform) {
  return iconMap[platform] || Globe
}
