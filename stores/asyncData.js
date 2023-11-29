import { useUserStore } from '~~/stores/user'

export default {
  asyncData({ $pinia }) {
    const store = useUserStore($pinia)
  },
}