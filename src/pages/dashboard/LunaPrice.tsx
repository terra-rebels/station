import { useTranslation } from "react-i18next"
import { useCurrency } from "data/settings/Currency"
import { useMemoizedPrices } from "data/queries/oracle"
import { Card } from "components/layout"
import { Read } from "components/token"
import { ModalButton } from "components/feedback"
import LunaPriceChart from "../charts/LunaPriceChart"
import DashboardContent from "./components/DashboardContent"
import styles from "./Dashboard.module.scss"

const LunaPrice = () => {
  const { t } = useTranslation()
  const currency = useCurrency()
  const denom = currency === "uluna" ? "uusd" : currency
  const { data: prices, ...state } = useMemoizedPrices(denom)

  const render = () => {
    if (!prices) return
    const { uluna: price } = prices
    return (
      <DashboardContent
        value={<Read amount={String(price * 1e6)} denom={denom} auto />}
        footer={
          <ModalButton
            title={t("Lunc price")}
            renderButton={(open) => (
              <button onClick={open}>{t("Show chart")}</button>
            )}
          >
            <LunaPriceChart />
          </ModalButton>
        }
      />
    )
  }

  return (
    <Card
      {...state}
      title={t("Lunc price")}
      className={styles.price}
      size="small"
    >
      {render()}
    </Card>
  )
}

export default LunaPrice
