export default function Stat({
  value,
  description
}) {
  return (
    <div className="o-stat">
      <span className="o-stat__value o-heading--l">{value}</span>
      <span className="o-stat__description o-heading--m">{description}</span>
    </div>
  )
}
