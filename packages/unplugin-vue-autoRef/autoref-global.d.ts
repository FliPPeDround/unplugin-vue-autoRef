import type {
  $ref as _$ref,
  $shallowRef as _$shallowRef,
  $computed as _$computed,
  $customRef as _$customRef,
  $toRef as _$toRef
} from 'vue/macros'

declare global {
  const ref: typeof _$ref
  const shallowRef: typeof _$shallowRef
  const computed: typeof _$computed
  const customRef: typeof _$customRef
  const toRef: typeof _$toRef
}
