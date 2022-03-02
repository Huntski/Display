<template>
  <div class="container max-w-5xl m-auto pt-10 px-10">
    <h2 class="text-3xl font-extralight">Lets get started with</h2>

    <div class="flex items-center mt-5">
      <Logo class="w-16 " />
      <span class="ml-5 text-5xl font-semibold text-purple-800">Display!</span>
    </div>

    <p class="mt-10 text-sm">
      A film mananger for your downloaded<br>
      Movies, Anime, Series and more.
    </p>

    <SetupForm class="mt-20" />
  </div>
</template>
<script>
import Logo from "@/components/icons/Logo"
import SetupForm from "@/components/SetupForm"

export default {
  components: {Logo, SetupForm}
}
</script>