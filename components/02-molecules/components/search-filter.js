
import { parseFilters, stringifyFilters } from '@lib/util'
import moment from 'moment'
import { useEffect } from 'react'

export default function SearchFilter({ filterOptions, setFilter, params}) {

  const activeFilters = params?.filter ? parseFilters(params.filter[0]) : {};

  const dateMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  const dateYears = Array.from({length:21},(v,k) => ~~moment().subtract(11, 'years').format('YYYY') + (k + 1))

  const handleChange = (evt, filterType, val) => {
    let filters = activeFilters;
    if (filters.p) delete filters.p
    switch (filterType) {
      case 'startMonth':
      case 'startYear':
      case 'endMonth':
      case 'endYear':
        // Get start and end dates.
        const startMonth = document.getElementById("start-month").value
        const startYear = document.getElementById("start-year").value
        const endMonth = document.getElementById("end-month").value
        const endYear = document.getElementById("end-year").value
        const startDate = startMonth && startYear ? moment(`1 ${startMonth} ${startYear}`).toISOString() : null
        const endDate = endMonth && endYear ? moment(`1 ${endMonth} ${endYear}`).add(1, 'months').toISOString() : null
        if (startDate) filters.startDate = [startDate]
        else delete filters.startDate
        if (endDate) filters.endDate = [endDate]
        else delete filters.endDate
        break;

      default:
        if (!filters[filterType]) {
          // Add Key and Value.
          filters[filterType] = [val]
        } else {
          // Key exists toggle Value.
          if (filters[filterType].includes(val) && filters[filterType].length === 1) {
            // Only value
            delete filters[filterType]
          } else if (filters[filterType].includes(val)) {
            // Multi value
            filters[filterType] = filters[filterType].filter(item => item !== val)
          } else {
            // Add value
            filters[filterType].push(val)
          }
        }
        break;
    }
    setFilter(stringifyFilters(filters))
  }

  function mobileToggleMenu(e) {
    e.preventDefault()
    e.currentTarget.parentNode.classList.toggle('open')
  }

  function mobileCloseMenu(e) {
    e.preventDefault();
    document.querySelector('.c-filter-block__button.open').classList.remove('open')
  }

  useEffect(() => {
    const filterButtons = [...document.querySelectorAll('.c-filter-block__button')]
    filterButtons.forEach((filterButton) => {
      filterButton.addEventListener('mouseover', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded)
      });

      filterButton.addEventListener('mouseout', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded)
      });
    })
  }, []);



  return (
    <section className="c-link-blocks">
      <form className="c-filter">

          <div className="c-filter-block">
            <a className="c-filter-block__button" aria-labelledby="brand-filter-list">
              <span className="c-filter-block__title" onClick={e => mobileToggleMenu(e)}>Brand</span>


              <div id="brand-filter-list" className="c-filter-block__options">
                <div className="c-filter-block__mobile-heading">
                  <span className="c-filter-block__mobile-title">Brand</span>
                  <span className="c-filter-block__mobile-close" onClick={e => mobileCloseMenu(e)}></span>
                </div>
                {filterOptions?.brand?.map(brand => (
                  <div className="c-filter-block__item" key={brand.key}>
                    <input className="toggle-disabled" role="checkbox" type="checkbox" id={brand.key} value={brand.key} onChange={e => handleChange(e, 'brand', brand.key)} checked={activeFilters?.brand?.includes(brand.key)}></input>
                    <label htmlFor={brand.key}>{brand.title}</label>
                  </div>
                ))}
              </div>
            </a>
          </div>


          <div className="c-filter-block">
            <a className="c-filter-block__button" aria-labelledby="date-filter-list">
              <span className="c-filter-block__title" onClick={e => mobileToggleMenu(e)}>Date</span>

              <div id="date-filter-list" className="c-filter-block__options">
                <div className="c-filter-block__mobile-heading">
                  <span className="c-filter-block__mobile-title">Date</span>
                  <span className="c-filter-block__mobile-close" onClick={e => mobileCloseMenu(e)}></span>
                </div>
                <div className="c-filter-block__date-picker__wrapper">
                  <div id="start-date" className="c-filter-block__date-picker u-space--left">
                    <span className="c-filter__date-label">Start Date:&nbsp;</span>
                    <select className="toggle-disabled" id="start-month" name="start-month" placeholder="Month" onChange={e => handleChange(e, 'startMonth', null)} aria-label="Month">
                      <option name="" value="">Month</option>
                      {dateMonths?.map(month => (
                        <option key={month} name={`start-${month}`} value={month}>{month}</option>
                      ))}
                    </select>
                    <select className="toggle-disabled" id="start-year" name="start-year" placeholder="Year" onChange={e => handleChange(e, 'startYear', null)} aria-label="Year">
                      <option name="" value="">Year</option>
                      {dateYears?.map(year => (
                        <option key={year} name={`start-${year}`} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div id="end-date" className="c-filter-block__date-picker u-space--left">
                    <span className="c-filter__date-label">End Date:&nbsp;</span>
                    <select className="toggle-disabled" id="end-month" name="end-month" placeholder="Month" onChange={e => handleChange(e, 'endMonth', null)} aria-label="Month">
                      <option name="" value="">Month</option>
                      {dateMonths?.map(month => (
                        <option key={month} name={`end-${month}`} value={month}>{month}</option>
                      ))}
                    </select>
                    <select className="toggle-disabled" id="end-year" name="end-year" onChange={e => handleChange(e, 'endYear', null)} aria-label="Year">
                      <option name="" value="">Year</option>
                      {dateYears?.map(year => (
                        <option key={year} name={`end-${year}`} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </a>
          </div>


          <div className="c-filter-block">
            <a className="c-filter-block__button" aria-labelledby="category-filter-list">
              <span className="c-filter-block__title" onClick={e => mobileToggleMenu(e)}>Category</span>

              <div id="category-filter-list" className="c-filter-block__options">
                <div className="c-filter-block__mobile-heading">
                  <span className="c-filter-block__mobile-title">Category</span>
                  <span className="c-filter-block__mobile-close" onClick={e => mobileCloseMenu(e)}></span>
                </div>
                {filterOptions?.category?.map(category => (
                  <div className="c-filter-block__item" key={category.key}>
                    <input className="toggle-disabled" type="checkbox" id={category.key} value={category.key} onChange={e => handleChange(e, 'category', category.key)} checked={activeFilters?.category?.includes(category.key)}></input>
                    <label htmlFor={category.key}>{category.title}</label>
                  </div>
                ))}
              </div>
            </a>
          </div>


          <div className="c-filter-block">
            <a className="c-filter-block__button" aria-labelledby="sponsorship-filter-list">
              <span className="c-filter-block__title" onClick={e => mobileToggleMenu(e)}>Sponsorship</span>

              <div id="sponsorship-filter-list" className="c-filter-block__options">
                <div className="c-filter-block__mobile-heading">
                  <span className="c-filter-block__mobile-title">Sponsorship</span>
                  <span className="c-filter-block__mobile-close" onClick={e => mobileCloseMenu(e)}></span>
                </div>
                {filterOptions?.sponsorship?.map(sponsorship => (
                  <div className="c-filter-block__item" key={sponsorship.key}>
                    <input className="toggle-disabled" type="checkbox" id={sponsorship.key} value={sponsorship.key} onChange={e => handleChange(e, 'sponsorship', sponsorship.key)} checked={activeFilters?.sponsorship?.includes(sponsorship.key)}></input>
                    <label htmlFor={sponsorship.key}>{sponsorship.title}</label>
                  </div>
                ))}
              </div>
            </a>
          </div>

          <div className="c-filter-block">
            <a className="c-filter-block__button" aria-labelledby="location-filter-list">
              <span className="c-filter-block__title" onClick={e => mobileToggleMenu(e)}>Location</span>

              <div id="location-filter-list" className="c-filter-block__options">
                <div className="c-filter-block__mobile-heading">
                  <span className="c-filter-block__mobile-title">Location</span>
                  <span className="c-filter-block__mobile-close" onClick={e => mobileCloseMenu(e)}></span>
                </div>
                {filterOptions?.market?.map((market, index) => (
                  <div className="c-filter-block__item" key={index}>
                    <input className="toggle-disabled" type="checkbox" id={market} value={market} onChange={e => handleChange(e, 'market', market)} checked={activeFilters?.market?.includes(market)}></input>
                    <label htmlFor={market}>{market}</label>
                  </div>
                ))}
              </div>
            </a>
          </div>

      </form>
    </section>
  )
}
