'use strict'
import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import orderBy from 'lodash.orderby'
import c from 'classnames'

import { environment } from '../config'
import { LoadingSkeleton } from './loading-skeleton'
import OnGrid from './on-grid'
import { ParameterGraph, ParameterBreakdown } from './parameters'
import { padNumber } from '../utils/string'
import { round } from '../utils/math'
import { initializeArrayWithRange } from '../utils/array'

export default class ResultsTable extends React.PureComponent {
  componentDidUpdate () {
    ReactTooltip.rebuild()
  }

  onSort (field, e) {
    e.preventDefault()
    const { sortField, sortDirection, onSort } = this.props
    if (sortField === field) {
      // Same field, change direction.
      onSort(sortField, sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // Different fields, reset direction.
      onSort(field, 'asc')
    }
  }

  renderTableHeader () {
    const headings = [
      {
        id: 'rank',
        sortable: true,
        title: 'Sort by rank',
        value: 'Rank'
      },
      {
        id: 'name',
        sortable: true,
        title: 'Sort by geography',
        value: 'Geography'
      },
      {
        id: 'score',
        sortable: true,
        title: 'Sort by score',
        value: 'Score'
      },
      {
        id: 'graph',
        sortable: false,
        value: <><span className='visually-hidden'>Topics:</span> 0.0 - 5.0</>
      },
      {
        id: 'grid',
        sortable: true,
        title: 'Sort by grid',
        value: 'Grid'
      }
    ]

    return (
      <thead>
        <tr>
          {headings.map(o => {
            if (!o.sortable) return <th className={`th-${o.id}`} key={o.id}>{o.value}</th>

            const { sortField, sortDirection } = this.props
            const klass = c('table__sort', {
              'table__sort--none': sortField !== o.id,
              'table__sort--asc': sortField === o.id && sortDirection === 'asc',
              'table__sort--desc': sortField === o.id && sortDirection === 'desc'
            })
            return <th className={`th-${o.id}`} key={o.id}><a href='#' title={o.title} className={klass} onClick={this.onSort.bind(this, o.id)}>{o.value}</a></th>
          })}
        </tr>
      </thead>
    )
  }

  renderLoadingRows () {
    return initializeArrayWithRange(10).map(v => (
      <tr key={v}>
        <td><LoadingSkeleton /></td>
        <td><LoadingSkeleton /></td>
        <td><LoadingSkeleton /></td>
        <td><LoadingSkeleton /></td>
      </tr>
    ))
  }

  renderRows () {
    const { data, sortField, sortDirection } = this.props
    const rows = orderBy(data, sortField, sortDirection)

    return rows.map(({ iso, score, developingRank, name, topics, grid }) => {
      const isDevelopingMarket = !!developingRank

      return (
        <tr key={iso}>
          <th className='cell-rank'>{isDevelopingMarket ? padNumber(developingRank, 2) : '--'}</th>
          <th className='cell-country'>
            <Link to={`/results/${iso}`} title={`Go to ${name} page`}>{name}</Link>
          </th>
          <td>{isDevelopingMarket ? round(score) : '--'}</td>
          <td>
            <ParameterGraph
              geographyIso={iso}
              data={topics || []}
            />
          </td>
          <td>
            <OnGrid grid={grid} />
          </td>
        </tr>
      )
    })
  }

  renderParamGraphTooltip () {
    const popoverContent = (geographyIso) => {
      const geography = this.props.data.find(c => c.iso === geographyIso)
      if (!geography) return null

      const hasTopics = geography.topics && geography.topics.length

      return (
        <div className='popover__contents'>
          <header className='popover__header visually-hidden'>
            <div className='popover__headline'>
              <h1 className='popover__title'>Topic breakdown</h1>
            </div>
          </header>
          <div className='popover__body'>
            {hasTopics ? (
              <ParameterBreakdown
                className='legend par-legend'
                data={geography.topics}
              />
            ) : (
              <p className='empty'>There is no data for this geography</p>
            )}
          </div>
        </div>
      )
    }

    return (
      <ReactTooltip
        id='param-graph-tooltip'
        effect='solid'
        type='custom'
        className='popover popover--table'
        wrapper='article'
        getContent={popoverContent}
      />
    )
  }

  render () {
    return (
      <>
        <table className='table results-table'>
          {this.renderTableHeader()}
          <tbody>
            {
              this.props.loading
                ? this.renderLoadingRows()
                : this.renderRows()
            }
          </tbody>
        </table>
        {this.renderParamGraphTooltip()}
      </>
    )
  }
}

if (environment !== 'production') {
  ResultsTable.propTypes = {
    onSort: T.func,
    sortField: T.string,
    sortDirection: T.string,
    data: T.array,
    loading: T.bool
  }
}
