<template>
  <header>
    <h2>todo</h2>
    <i :class="icon" @click="changeMode"></i>
  </header>
</template>
<script>
import bkLight from "../assets/bg-desktop-light.webp";
export default {
  name: "Header",
  data() {
    return {
      icon: "bi bi-brightness-high-fill",
      lightMode: false,
    };
  },
  methods: {
    changeMode() {
      this.lightMode = !this.lightMode;
      let root = document.querySelector(":root");
      if (this.lightMode) {
        this.icon = "bi bi-moon-fill";
        root.style = `--main-color: white ; 
               --bk-color: hsl(0, 0%, 98%) ;
               --bk-image: url(${bkLight});
               --main-Fcolor: hsl(235, 19%, 35%);
               --seconadry-Fcolor: hsl(236, 9%, 61%);
               --options-color: black ;
               --border-color: hsl(233, 11%, 84%) ;
               --hover-color: gray ;
               --selection-color: slateblue ;
               `;
      } else {
        this.icon = "bi bi-brightness-high-fill";
        root.style = ``;
      }
    },
  },
};
</script>
<style>
header {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h2 {
  text-transform: uppercase;
  color: white;
  letter-spacing: 12px;
}
header i {
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}
header i:hover {
  color: var(--main-Fcolor);
}
header i::before {
  transition: 0.3s;
}
header i:hover::before {
  transform: rotateZ(360deg);
}
</style>
