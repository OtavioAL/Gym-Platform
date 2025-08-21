import 'dotenv/config'
import { debuglog } from 'util'

export const logInfo = (message: string) => {
  debuglog('server:info')(message)
}

export const logWarn = (message: string) => {
  debuglog('server:warn')(message)
}

export const logError = (message: string) => {
  debuglog('server:error')(message)
}

export const logMigrations = debuglog('server:db:migrations')
