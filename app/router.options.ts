import type { RouterOptions } from "@nuxt/schema";
export default <RouterOptions>{
  routes: (_routes) => {
    //_routes give us all the routes
    const currentUrl = useCookie("currentUrl").value;
    let slug = null;
    let page = "";
    if (currentUrl) {
      //extract slug
      slug = currentUrl.match(/(?<=\b(localhost:3000[/]|yourdomain.com[/])\b).+/g);
    }
    if (slug) {
      page = slug[0];
      if (currentUrl.charAt(currentUrl.length - 1) === "/"){
        //delete last backslash from page name if there's any
        page = page.substring(0, slug.length - 1);
      }
    }

    const { ssrContext } = useNuxtApp();
    let subdomain = useCookie("subdomain").value;
    console.log('subdomain',subdomain)
    if (ssrContext?.event.context.subdomain) {
      subdomain = ssrContext?.event.context.subdomain;
      useCookie("subdomain").value = subdomain;
    }
    if (subdomain) {
      // here we check if the subdomain exist filter the routes and find 
      // the index.vue page of the folder with same name as subdomain 
      // also if there is any slug find the page in the folder with same name as subdomain

      const userRoute = _routes.filter((i) => {
        if (page) return i.path == `/${subdomain}/${page}`;
        else return i.path == `/${subdomain}`;
      });


      // based on what we filtered in previous section we replace the path with proper value
      // if theres' any page(slug) in line 48 to 50 , 4 example : subdomain1/about will replace with /about
      // if there's no page line 51 to 53, 4 example : subdomain1/ will replace with / in your url
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
