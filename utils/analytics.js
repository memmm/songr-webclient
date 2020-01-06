import ReactGA from 'react-ga'
import Router from 'next/router'

export const initGA = () => {
  console.log('GA init')
  ReactGA.initialize('UA-155344383-1')
}
export const logPageView = () => {
    Router.events.on('routeChangeComplete', url => {
        console.log(`Logging pageview for ${window.location.pathname}`)
        ReactGA.set({ page: window.location.pathname })
        ReactGA.pageview(window.location.pathname)
    })
}
export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}
export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}