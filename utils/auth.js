import cookie from "js-cookie";
import Router from "next/router";

export const handleLogin = (t, routeNext, role, learning) => {
  cookie.set("elarniv_users_token", t);
  if (routeNext.query && routeNext.query.next) {
    Router.push(routeNext.query.next);
  } else {
    if (role === "admin" || role === "cord") {
      Router.push("/admin/");
    } else if (role === "instructor") {
      Router.push("/instructor/courses/");
    } else if (role === "student") {
      Router.push(`/learning/student/${learning}`);
    }
    // Router.push("/admin/");
  }
};

export const handleLogout = () => {
  cookie.remove("elarniv_users_token");
  Router.push("/");
};

export const destroyCookie = () => {
  cookie.remove("elarniv_users_token");
  Router.reload("/");
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push({ pathname: location, query: { next: ctx.pathname } });
  }
};

export const slugify = (string) => {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};
