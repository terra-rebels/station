import { useConnectedWallet } from "@terra-rebels/use-wallet"
import useAuth from "./useAuth"

/* auth | walle-provider */
const useAddress = () => {
  const connected = useConnectedWallet()
  const { wallet } = useAuth()
  return wallet?.address ?? connected?.terraAddress
}

export default useAddress
