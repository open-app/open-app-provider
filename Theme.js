import React, { Component } from "react"
import { ThemeProvider } from 'styled-components'
import baseTheme from './baseTheme'

export default function ThemeWrapper(CMP, theme) {
  return class Wrapped extends Component {
    render() {
      return (
        <ThemeProvider theme={theme || baseTheme}>
          <CMP {...this.props}/>
        </ThemeProvider>
      )
    }
  }
}