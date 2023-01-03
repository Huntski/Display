<template>
  <svg width="31px" height="31px" viewBox="0 0 31 31">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="Desktop-HD-Copy-2" transform="translate(-495.000000, -507.000000)">
        <g id="Group-2" transform="translate(497.000000, 509.000000)">
          <g id="Group" :stroke="color" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
            <path d="M7.842,8.99999973 C8.6655,7.25249974 10.887,5.99999973 13.5,5.99999973 C16.815,5.99999973 19.5,8.01449974 19.5,10.4999997 C19.5,12.5999998 17.583,14.3624998 14.991,14.8604998 C14.178,15.0164998 13.5,15.6704998 13.5,16.4999997 M27,13.5 C27,18.3230853 24.4269146,22.7798001 20.2500001,25.1913429 C16.0730855,27.6028857 10.9269145,27.6028857 6.74999994,25.1913429 C2.57308538,22.7798001 6.66133815e-16,18.3230853 6.66133815e-16,13.5 C6.66133815e-16,6.04415572 6.04415599,0 13.5,0 C20.955844,0 27,6.04415572 27,13.5 L27,13.5 Z" id="Shape"></path>
          </g>
          <ellipse id="Oval" :fill="color" cx="13.5" cy="21.0000001" rx="1.5" ry="1.5"></ellipse>
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  props: ['color']
}
</script>