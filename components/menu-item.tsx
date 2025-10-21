interface MenuItemProps {
  item: {
    name: string
    description?: string
    price: string
  }
}

export default function MenuItem({ item }: MenuItemProps) {
  return (
    <div className="flex justify-between items-start gap-4 pb-6 border-b border-border last:border-b-0">
      <div className="flex-1">
        <h4 className="text-lg font-serif font-semibold text-foreground mb-1 uppercase tracking-wide">{item.name}</h4>
        {item.description && <p className="text-sm text-muted-foreground font-sans">{item.description}</p>}
      </div>
      <div className="text-lg font-serif font-bold text-primary whitespace-nowrap">{item.price}</div>
    </div>
  )
}
