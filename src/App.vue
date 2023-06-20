<template class="app">
  <router-view />
</template>

<style>
/*
                                =============================
                                      Global Varibales
                                ============================== 
*/
:root {
  --main-color: hsl(235, 24%, 19%);
  --bk-color: hsl(235, 21%, 11%);
  --bk-image: url("./assets/bg-desktop-dark.webp");
  --main-Fcolor: hsl(234, 39%, 85%);
  --seconadry-Fcolor: hsl(236, 9%, 61%, 0.5);
  --options-color: rgb(182, 176, 206);
  --border-color: hsl(234, 11%, 52%);
  --hover-color: hsl(236, 33%, 92%);
  --selection-color: hsl(235, 87%, 69%);
}
/*
                                =============================
                                        Imports
                                ============================== 
*/
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap");

/*===============================================================================================*/
/*
                                =============================
                                         General Rules
                                ============================== 
*/

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Josefin Sans", sans-serif;
  background-color: var(--bk-color);
}

.container {
  margin-left: auto;
  margin-right: auto;
  padding: 0 30px;
  transition: 0.3s;
  @media (min-width: 576px) {
    width: 540px;
  }
  @media (min-width: 768px) {
    width: 720px;
  }
}
.checkbox {
  width: 19px;
  height: 19px;
  border-radius: 50%;
  border: 0.5px solid var(--border-color);
}
</style>
