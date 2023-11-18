<template>
  <div>
    <h4>Home</h4>
    <nuxt-link to="/about">About</nuxt-link>
    <br />
    <nuxt-link target="_blank" to="http://subdomain1.localhost:3000/ ">subdomain1</nuxt-link>
    <br />
    <nuxt-link target="_blank" to="http://subdomain1.localhost:3000/about ">subdomain1 about</nuxt-link>
    <br />
    <nuxt-link target="_blank" to="http://subdomain1.localhost:3000/blah/ ">subdomain1 blah</nuxt-link>
    <br />
    <nuxt-link target="_blank" to="http://subdomain2.localhost:3000/ ">subdomain2</nuxt-link>
  </div>
</template>