import React, { Component } from "react"
import { ThemeProvider as Provider } from 'styled-components'
import baseTheme from './baseTheme'


export class ThemeProvider extends Component {
  render() {
    return (
      <Provider theme={theme || baseTheme}>
       {this.props.children}
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