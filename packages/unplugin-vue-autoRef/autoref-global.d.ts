import type {
  ref as _ref,
  $$ as _$$,
  shallowRef as _shallowRef,
  computed as _computed,
  customRef as _customRef,
  toRef as _toRef,
} from './autoref'

declare global {
  const ref: typeof _ref
  const $$: typeof _$$
  const shallowRef: typeof _shallowRef
  const computed: typeof _computed
  const customRef: typeof _customRef
  const toRef: typeof _toRef
}

declare export { Refs } from './autoref'
