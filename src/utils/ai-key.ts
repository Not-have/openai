import { LocalStorageHelper } from 'micro-util-ts'
import { OPENAI_KEY } from '@/const'

export default function aiKey(): string {
  return LocalStorageHelper.get('key') || OPENAI_KEY
}