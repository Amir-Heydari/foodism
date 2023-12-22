import { store } from './app/store'
import { Provider } from 'react-redux'
import AppNavigation from "./src/navigation";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  )
}

