<template>
  <div class="w-full">
    <svg viewBox="0 0 1440 869" preserveAspectRatio="xMidYMid slice">
      <g stroke="none" stroke-width="1" fill="url(#image)" fill-rule="evenodd">
        <g id="Desktop-HD-Copy-10" fill="url(#image)" fill-opacity="0.6">
          <path
              d="M0,133 C294.626462,214.340012 475.925744,223.508348 543.897848,160.505009 C611.869952,97.5016696 724.663204,87.8169655 882.277603,131.450897 C985.944269,150.820305 1085.2429,129.003339 1180.17349,66 C1275.10407,2.9966608 1361.71291,-18.3366725 1440,2 L1575.05027,756.5 C1512.45512,734.813173 1467.43836,718.646506 1440,708 C1298.28103,653.010856 745.274002,464.288433 543.897848,515.5 C342.521694,566.711567 365.734125,837.304617 223.755864,747.940286 C129.10369,688.364066 52.1850685,734.383971 -7,886 L0,133 Z"></path>
        </g>
      </g>

      <defs>
        <pattern id="image" x="0" y="0" width="1" height="1">
          <image id="thumbnail-img" :href="src" width="100%"/>
        </pattern>
      </defs>
    </svg>

    <svg class="absolute top-0 " viewBox="0 0 1440 869" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="gradient-large-display" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
          <stop offset="20%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgb(0,0,0);stop-opacity:.3" />
          <stop offset="75%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:1" />
        </linearGradient>

        <linearGradient id="gradient-default-display" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgb(0,0,0);stop-opacity:.2" />
          <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:.5" />
        </linearGradient>
      </defs>

      <g stroke="none" fill-rule="evenodd">
        <g id="gradient-overlay" fill="url(#gradient-default-display)">
          <path
              d="M0,133 C294.626462,214.340012 475.925744,223.508348 543.897848,160.505009 C611.869952,97.5016696 724.663204,87.8169655 882.277603,131.450897 C985.944269,150.820305 1085.2429,129.003339 1180.17349,66 C1275.10407,2.9966608 1361.71291,-18.3366725 1440,2 L1575.05027,756.5 C1512.45512,734.813173 1467.43836,718.646506 1440,708 C1298.28103,653.010856 745.274002,464.288433 543.897848,515.5 C342.521694,566.711567 365.734125,837.304617 223.755864,747.940286 C129.10369,688.364066 52.1850685,734.383971 -7,886 L0,133 Z"></path>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    }
  }
}
</script>

<style>
@media screen and (min-width: 1280px) {
  #thumbnail-img {
    width: 80%;
    transform: translateX(10%);
  }

  #gradient-overlay {
    fill: url(#gradient-large-display)
  }
}
</style>