import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

export default function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    position: isDragging ? 'relative' : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 ${isDragging ? 'opacity-80 shadow-xl rounded-xl' : ''}`}
    >
      <button
        type="button"
        className="touch-none p-1.5 rounded-lg text-brand-300 hover:text-brand-600 hover:bg-brand-100 cursor-grab active:cursor-grabbing transition-colors flex-shrink-0"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={16} />
      </button>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}
