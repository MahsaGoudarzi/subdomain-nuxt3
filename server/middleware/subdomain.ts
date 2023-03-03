import { mainDomain } from "@/constData/app";
import { getCookie, getHeaders } from "h3";
export default defineEventHandler((event) => {
  let subdomain = getCookie(event, "subdomain") || null;
  const headers = getHeaders(event)
  const hostname = headers.host || "yourhost.com"
  
  if (!mainDomain.includes(hostname)) {
    const currentHost = hostname.match(/^[^.]*/g)[0];
    event.context.subdomain = currentHost;
    setCookie(event, "subdomain", currentHost);
    if(event.req.headers.referer)
      setCookie(event, "currentUrl", event.req.headers.referer);
  } 
}) 
