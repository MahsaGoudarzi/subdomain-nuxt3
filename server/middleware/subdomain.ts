export default defineEventHandler(({ req, res, context }) => {
  const hostname = req.headers.host || "yourhost.com"

  const mainDomain = ["localhost:3000", "yourhost.com"]

  if (!mainDomain.includes(hostname)) {
    const currentHost =
      process.env.NODE_ENV === "production"
        ? hostname.replace(`.yourhost.com`, "")
        : hostname.replace(`.localhost:3000`, "")

    context.subdomain = currentHost
  }
})