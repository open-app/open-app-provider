import React, { Component } from 'react'
import { translate, I18nextProvider } from 'react-i18next'
import ThemeWrapper, { ThemeProvider } from './src/Theme'
import ApolloWrapper, { ApolloProvider } from './src/Apollo'
import childrenWithProps from './src/childrenWithProps'

export default (CMP, theme, i18n) => {
  translate.setI18n(i18n)
  return translate()(ThemeWrapper(ApolloWrapper(CMP), theme))
}
 
export class Provider extends Component {
  render() {
    const { i18n, theme, children } = this.props
    return (
      <I18nextProvider i18n={i18n}>
        {/* <ThemeProvider theme={theme}> */}
          <ApolloProvider>
            {/* {childrenWithProps(children)} */}
            {children}
          </ApolloProvider>
        {/* </ThemeProvider> */}
      </I18nextProvider>
    )
  }
}