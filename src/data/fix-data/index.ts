import {
  IDataFetch
} from '../types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function fixData(data: any): IDataFetch {
  return data?.choices[0]?.message
}