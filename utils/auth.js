import { useEffect } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import cookie from "js-cookie";
import { spotifyProfileURL } from "./constants";
import axios from "axios";

export const login = ({ authObject }) => {};

export const loginWithSpotify = async ({ token }) => {
  console.log(token);
  cookie.set("spotify_token", token, { expires: 1 });
  const res = await fetch(spotifyProfileURL + token);
  const user = await res.json();
  login({ username: user.display_name, email: user.email });
  Router.push("/chat");
};

export const auth = ctx => {
  const { auth_token } = nextCookie(ctx);

  // If there's no token, it means the user is not logged in.
  if (!auth_token) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
    } else {
      Router.push("/");
    }
  }

  return auth_token;
};

export const logout = () => {
  cookie.remove("spotify_token");
  cookie.remove("auth_token");
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  Router.push("/");
};

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};
