import { Provider } from 'react-redux'
import { makeStore, persistor } from '../lib/store'
import { PersistGate } from 'redux-persist/integration/react'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode,
}) {
  return <Provider store={makeStore}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
}