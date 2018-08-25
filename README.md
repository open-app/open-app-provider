# Open App Provider

Meant to work with react-native and react-native-dom.

- GrahQL: Apollo
- Theming: Styled-Components
- Languages: i18next

## Usage

Just wrap your component passing an optional theme and a i18next object:

```
import Provider from 'open-app-provider'
import theme from './theme'
import i18n from './i18n'

export default (CMP) => Provider(CMP, theme, i18n)
```