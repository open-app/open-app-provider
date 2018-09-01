import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
// import { CachePersistor } from 'apollo-cache-persist'
import { ApolloProvider as Provider} from 'react-apollo'
import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { WebSocketLink } from 'apollo-link-ws'
import { HttpLink } from 'apollo-boost'
import { getMainDefinition } from 'apollo-utilities'
import { RetryLink } from 'apollo-link-retry'
import makeId from './makeId'
import childrenWithProps from './childrenWithProps'
const GRAPHQL_SERVER = 'localhost:4000'
const SCHEMA_VERSION = '1' // Must be a string.
const SCHEMA_VERSION_KEY = makeId()

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
}

async function getApolloClient() {
  const cache = new InMemoryCache()
  // ----- TODO ----- Add cache persistor
  // console.log(Platform.OS)
  // const persistor = new CachePersistor({
  //   cache,
  //   storage: (Platform.OS === 'dom') ? window.localStorage : AsyncStorage,
  //   trigger: (Platform.OS === 'dom') ? 'write' : 'background',
  // })
  // try {
  //   let currentVersion
  //   if (Platform.OS === 'dom') {
  //     currentVersion = await window.localStorage.getItem(SCHEMA_VERSION_KEY)
  //   } else {
  //     currentVersion = await AsyncStorage.getItem(SCHEMA_VERSION_KEY)
  //   }
  //   if (currentVersion === SCHEMA_VERSION) {
  //     console.log('Restoring cache')
  //     await persistor.restore()
  //   } else {
  //     console.log('Creating cache')
  //     await persistor.purge()
  //     if (Platform.OS === 'dom') {
  //       await window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  //     } else {
  //       await AsyncStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  //     }
  //   }
  // } catch (error) {
  //   console.log('ERROR on cache', error)
  // }
  const wsLink = new WebSocketLink({
    uri: `ws://${GRAPHQL_SERVER}/subscriptions`,
    options: {
      reconnect: true
    }
  })
  const httpLink = new HttpLink({
    uri: `http://${GRAPHQL_SERVER}/graphql`
  })
  
  const link = new RetryLink({
    delay: {
      initial: 500,
      max: Infinity,
      jitter: true
    },
    attempts: {
      max: Infinity,
      retryIf: (error, _operation) => error
    }
  }).split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink,
  )
  const client = new ApolloClient({
    link,
    cache,
    defaultOptions,
    clientState: {}
  
  })
  return client
}

export class ApolloProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      client: undefined
    }
  }
  
  async componentDidMount() {
    const client = await getApolloClient()
    this.setState({
      client
    })
  }

  render() {
    const { client } = this.state
    const { children } = this.props
    if (client) {
      return (
        <Provider client={client}>
          {childrenWithProps(children, this.props)}
        </Provider>
      )
    } else {
      return <ActivityIndicator />
    }
  }
}

export default function ApolloWrapper(CMP) {
  return class ComponentWrapped extends Component {
    constructor(props) {
      super(props)
      this.state = {
        client: undefined
      }
    }
    
    async componentDidMount() {
      const client = await getApolloClient()
      this.setState({
        client
      })
    }

    render() {
      const { client } = this.state
      if (client) {
        return (
          <Provider client={client}>
            <CMP {...this.props} />
          </Provider>
        )
      } else {
        return <ActivityIndicator />
      }
    }
  }
}
