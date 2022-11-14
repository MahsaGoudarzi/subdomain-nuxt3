import type { RouterOptions } from "@nuxt/schema";
import { createMemoryHistory } from "vue-router";
export default <RouterOptions>{
  routes: (_routes) => {
    const currentUrl = useCookie("currentUrl").value;
    let url = null;
    let page = "";
    if (currentUrl)
      url = currentUrl.match(/(?<=\b(localhost:3000[/]|pyango.ch[/])\b).+/g);
    if (url) {
      page = url[0];
      if (currentUrl.charAt(currentUrl.length - 1) === "/")
        page = page.substring(0, url.length - 1);
    }

    const { ssrContext } = useNuxtApp();
    let subdomain = useCookie("subdomain").value;
    if (ssrContext?.event.context.subdomain) {
      subdomain = ssrContext?.event.context.subdomain;
      useCookie("subdomain").value = subdomain;
    }
    if (subdomain) {
      const userRoute = _routes.filter((i) => {
        if (page) return i.path == `/${subdomain}/${page}`;
        else return i.path == `/${subdomain}`;
      });

      const userRouteMapped = userRoute.map((i) => ({
        ...i,
        path: page
          ? i.path === `/${subdomain}/${page}`
            ? i.path.replace(`/${subdomain}/${page}`, `/${page}`)
            : i.path.replace(`/${subdomain}/${page}/`, `/${page}`)
          : i.path === `/${subdomain}`
          ? i.path.replace(`/${subdomain}`, "/")
          : i.path.replace(`/${subdomain}/`, "/"),
      }));
      return userRouteMapped;
    }
  },
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      const el = document.querySelector(to.hash) as HTMLElement;
      return { left: 0, top: (el?.offsetTop ?? 0) - 30, behavior: "smooth" };
    }

    if (to.fullPath === from.fullPath) return;
    return { left: 0, top: 0, behavior: "smooth" };
  },
};
