import { FluentVariable } from "@fluent/bundle";
import { StaticImageData } from "next/image";
import {
  getBundlePrice,
  getBundleSubscribeLink,
  isBundleAvailableInCountry,
} from "../../functions/getPlan";
import { RuntimeData } from "../../hooks/api/runtimeData";
import styles from "./MegaBundleBanner.module.scss";
import { LinkButton } from "../Button";
import womanInBanner400w from "./images/bundle-banner-woman-400w.png";
import womanInBanner768w from "./images/bundle-banner-woman-768w.png";
import megabundleShield from "./images/megabundle-shield-field-illus.svg";
import { trackPlanPurchaseStart } from "../../functions/trackPurchase";
import { useGaViewPing } from "../../hooks/gaViewPing";
import { useGaEvent } from "../../hooks/gaEvent";
import { useL10n } from "../../hooks/l10n";
import { Localized } from "../Localized";
import VpnIcon from "./images/vpn-icon.svg";
import RelayIcon from "./images/relay-icon.svg";
import MonitorIcon from "./images/monitor-icon.svg";

export type Props = {
  runtimeData: RuntimeData;
};

export const MegaBundleBanner = (props: Props) => {
  const l10n = useL10n();
  const gaEvent = useGaEvent();

  const mainImage = (
    <img
      src={megabundleShield.src}
      // srcSet={`${womanInBanner768w.src} 768w, ${womanInBanner400w.src} 400w`}
      sizes={`(max-width: 600px) 400px, 768px`}
      alt=""
      className={styles["main-image"]}
    />
  );

  const bundleUpgradeCta = useGaViewPing({
    category: "Bundle banner",
    label: "bundle-banner-upgrade-promo",
  });

  return (
    <div className={styles["bundle-banner-wrapper"]}>
      <div className={styles["first-section"]}>
        {/* <div className={styles["main-img-wrapper"]}>{mainImage}</div> */}
      </div>
      {isBundleAvailableInCountry(props.runtimeData) && (
        <div className={styles["second-section"]}>
          <div className={styles["bundle-banner-description"]}>
            {props.runtimeData && (
              <h2>
                {l10n.getString("megabundle-banner-header", {
                  monthly_price: getBundlePrice(props.runtimeData, l10n),
                })}
              </h2>
            )}
            <div>
              <p className={styles["bundle-banner-one-year-plan-headline"]}>
                <strong>
                  {l10n.getString("megabundle-banner-header-tools")}
                </strong>
              </p>
              <ul className={styles["bundle-banner-value-props"]}>
                <li>
                  <VpnIcon alt="vpn icon" width="20" height="20" />
                  {l10n.getString("bundle-banner-plan-modules-mozilla-vpn")}
                </li>
                <li>
                  <MonitorIcon alt="monitor icon" width="15" height="15" />
                  {l10n.getString("megabundle-banner-plan-modules-monitor")}
                </li>
                <li>
                  <RelayIcon alt="relay icon" width="15" height="20" />
                  {l10n.getString("megabundle-banner-plan-modules-relay")}
                </li>
              </ul>
            </div>
            <p>{l10n.getString("megabundle-banner-plan-body")}</p>
            <div className={styles["bottom-section"]}>
              <LinkButton
                ref={bundleUpgradeCta}
                className={styles["button"]}
                href={getBundleSubscribeLink(props.runtimeData)}
                onClick={() =>
                  trackPlanPurchaseStart(
                    gaEvent,
                    { plan: "bundle" },
                    { label: "bundle-banner-upgrade-promo" },
                  )
                }
              >
                {l10n.getString("megabundle-banner-cta")}
              </LinkButton>
              <span className={styles["money-back-guarantee"]}>
                {l10n.getString("megabundle-banner-billed-annually", {
                  billed: "$90",
                })}
              </span>
              <span className={styles["money-back-guarantee"]}>
                {l10n.getString("megabundle-banner-money-back-guarantee", {
                  days_guarantee: "30",
                })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
