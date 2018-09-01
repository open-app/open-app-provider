import React, { Component } from 'react'
import { ThemeProvider as Provider } from 'styled-components'
import baseTheme from './baseTheme'
import childrenWithProps from './childrenWithProps'


export class ThemeProvider extends Component {
  render() {
    const { theme, children } = this.props
    return (
      <Provider theme={theme || baseTheme}>
        {childrenWithProps(children, this.props)}
      </Provider>
    )
  }
}

export default function ThemeWrapper(CMP, theme) {
  return class Wrapped extends Component {
    render() {
      return (
        <Provider theme={theme || baseTheme}>
          <CMP {...this.props}/>
        </Provider>
      )
    }
  }
}