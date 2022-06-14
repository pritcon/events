import Stat from '@atoms/text/stat'

export default function Stats({
  stats
}) {
  return (
    <>
      {stats && (
        <section className="c-section-stats u-align--center o-section l-container l-wrap">
          {stats.filter(stat => stat).map((stat, index) => (
            <Stat
              key={index}
              value=<nobr>{stat.value}</nobr>
              description={stat.description}
            />
          ))}
        </section>
      )}
    </>
  )
}
