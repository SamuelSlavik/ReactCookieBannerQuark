import React, { Component } from 'react';
// @ts-ignore
import "./CookieBanner.css"

export type CookieBannerProps = {
  type?: string
  decline?: boolean
  store?: string
  title?: string
  description?: string
  acceptButtonText?: string
  declineButtonText?: string
  source?: string
  primaryColor?: string
  accentColor?: string
  backgroundColor?: string
}

type CookieBannerState = {
  isVisible: boolean;
}

class CookieBanner extends Component<CookieBannerProps, CookieBannerState> {
  static defaultProps = {
    type: "bar",
    decline: false,
    store: "cookiesConsent",
    title: "Cookie consent",
    description: "We use cookies to enhance your browsing experience.",
    acceptButtonText: "Accept",
    declineButtonText: "Decline",
    primaryColor: "#3c3c46",
    accentColor: "#248f8d",
    backgroundColor: "#FFFFFF"
  };

  constructor(props: CookieBannerProps) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  componentDidMount() {
    const cookiesAcknowledged = localStorage.getItem("cookiesAcknowledged");
    if (!cookiesAcknowledged) {
      this.setState({ isVisible: true });
    }
  }

  acceptCookies = () => {
    const { store } = this.props;
    localStorage.setItem("cookiesAcknowledged", "true");
    localStorage.setItem(store!, "true");
    this.setState({ isVisible: false });
  }

  declineCookies = () => {
    const { store } = this.props;
    localStorage.setItem("cookiesAcknowledged", "true");
    localStorage.setItem(store!, "false");
    this.setState({ isVisible: false });
  }

  render() {
    const { type, title, description, acceptButtonText, declineButtonText, source, primaryColor, accentColor, backgroundColor } = this.props;
    const { isVisible } = this.state;

    if (!isVisible) {
      return null;
    }
    if (type !== "modal" && type !== "bar") {
      return null;
    }

    return (
      <div
        className={"cookie-banner " + "cookie-banner--" + type}
        style={{
          '--primaryColor': primaryColor,
          '--accentColor': accentColor,
          '--backgroundColor': backgroundColor
        } as React.CSSProperties}
      >
        <div className={"cookie-banner__content"}>
          <h2>{title}</h2>
          <div><p>{description}</p></div>
          <div><a href={source}>Read More</a></div>
        </div>
        <div className={"cookie-banner__buttons"}>
          <button
            className={"cookie-banner__decline-button cookie-banner__button"}
            onClick={this.declineCookies}
          >{declineButtonText}</button>
          <button
            className={"cookie-banner__accept-button cookie-banner__button"}
            onClick={this.acceptCookies}
          >{acceptButtonText}</button>
        </div>
      </div>
    );
  }
}

export default CookieBanner;